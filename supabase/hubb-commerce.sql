-- HUBB commerce foundation
-- Review in a dedicated HUBB Supabase project before applying. Never apply to unrelated projects.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  preferred_flavor text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  sku text not null unique,
  name_en text not null,
  name_ar text not null,
  price_sar numeric(10,2) not null check (price_sar >= 0),
  image_url text not null,
  inventory integer not null default 0 check (inventory >= 0),
  active boolean not null default true,
  sort_order smallint not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  status text not null default 'pending_payment' check (status in ('pending_payment','paid','packing','shipped','delivered','cancelled','refunded')),
  currency text not null default 'SAR' check (currency = 'SAR'),
  subtotal_sar numeric(10,2) not null default 0 check (subtotal_sar >= 0),
  discount_sar numeric(10,2) not null default 0 check (discount_sar >= 0),
  shipping_sar numeric(10,2) not null default 0 check (shipping_sar >= 0),
  total_sar numeric(10,2) not null default 0 check (total_sar >= 0),
  shipping jsonb not null,
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists discount_sar numeric(10,2) not null default 0 check (discount_sar >= 0);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  quantity integer not null check (quantity between 1 and 20),
  unit_price_sar numeric(10,2) not null check (unit_price_sar >= 0),
  line_total_sar numeric(10,2) generated always as (quantity * unit_price_sar) stored
);

create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

revoke all on public.profiles, public.products, public.orders, public.order_items from anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.orders, public.order_items to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "products_public_read_active" on public.products;
drop policy if exists "products_admin_insert" on public.products;
drop policy if exists "products_admin_update" on public.products;
drop policy if exists "products_admin_delete" on public.products;
drop policy if exists "orders_select_own_or_admin" on public.orders;
drop policy if exists "orders_admin_update" on public.orders;
drop policy if exists "order_items_select_own_or_admin" on public.order_items;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "products_public_read_active" on public.products for select to anon, authenticated using (active or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'));
create policy "products_admin_insert" on public.products for insert to authenticated with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "products_admin_update" on public.products for update to authenticated using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "products_admin_delete" on public.products for delete to authenticated using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "orders_select_own_or_admin" on public.orders for select to authenticated using ((select auth.uid()) = user_id or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'));
create policy "orders_admin_update" on public.orders for update to authenticated using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "order_items_select_own_or_admin" on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'))));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.create_order(cart_input jsonb, shipping_input jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_order_id uuid;
  line jsonb;
  product_record public.products%rowtype;
  requested_quantity integer;
  calculated_subtotal numeric(10,2) := 0;
  full_set_quantity integer := 0;
  calculated_discount numeric(10,2) := 0;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(cart_input) <> 'array' or jsonb_array_length(cart_input) = 0 then raise exception 'Cart is empty'; end if;
  if jsonb_array_length(cart_input) > 20 then raise exception 'Cart has too many lines'; end if;
  if coalesce(shipping_input->>'name','') = '' or coalesce(shipping_input->>'phone','') = '' or coalesce(shipping_input->>'city','') = '' or coalesce(shipping_input->>'address','') = '' then raise exception 'Shipping details are incomplete'; end if;

  insert into public.orders (user_id, shipping) values (auth.uid(), shipping_input) returning id into new_order_id;

  for line in select value from jsonb_array_elements(cart_input)
  loop
    requested_quantity := (line->>'quantity')::integer;
    if requested_quantity < 1 or requested_quantity > 20 then raise exception 'Invalid quantity'; end if;
    select * into product_record from public.products where id = line->>'product_id' and active = true for share;
    if not found then raise exception 'Product is unavailable'; end if;
    if product_record.inventory < requested_quantity then raise exception 'Insufficient inventory for %', product_record.name_en; end if;

    insert into public.order_items (order_id, product_id, quantity, unit_price_sar)
    values (new_order_id, product_record.id, requested_quantity, product_record.price_sar);
    calculated_subtotal := calculated_subtotal + (product_record.price_sar * requested_quantity);
  end loop;

  select min(flavor_quantity) into full_set_quantity
  from (
    select coalesce((
      select (entry->>'quantity')::integer
      from jsonb_array_elements(cart_input) entry
      where entry->>'product_id' = required_flavor
      limit 1
    ), 0) as flavor_quantity
    from unnest(array['classic','lemon-salt','hot-salt','spices','ghawa','matcha','americano']) required_flavor
  ) complete_set;

  calculated_discount := full_set_quantity * 3.00;
  update public.orders
  set subtotal_sar = calculated_subtotal,
      discount_sar = calculated_discount,
      total_sar = calculated_subtotal - calculated_discount,
      updated_at = now()
  where id = new_order_id;
  return new_order_id;
end;
$$;

revoke all on function public.create_order(jsonb, jsonb) from public, anon;
grant execute on function public.create_order(jsonb, jsonb) to authenticated;

insert into public.products (id, sku, name_en, name_ar, price_sar, image_url, inventory, sort_order) values
  ('classic','HUBB-CLS-100','Classic','كلاسيك',5,'/products/classic.webp',500,1),
  ('lemon-salt','HUBB-LMS-100','Lemon Salt','ليمون وملح',5,'/products/lemon-salt.webp',500,2),
  ('hot-salt','HUBB-HOT-100','Hot & Salt','حار وملح',5,'/products/hot-salt.webp',500,3),
  ('spices','HUBB-SPC-100','Spices','بهارات',5,'/products/spices.webp',500,4),
  ('ghawa','HUBB-GHW-100','Ghawa','قهوة عربية',5,'/products/ghawa.webp',500,5),
  ('matcha','HUBB-MTC-100','Matcha','ماتشا',5,'/products/matcha.webp',500,6),
  ('americano','HUBB-AMR-100','Americano','أمريكانو',5,'/products/americano.webp',500,7)
on conflict (id) do update set sku = excluded.sku, name_en = excluded.name_en, name_ar = excluded.name_ar, sort_order = excluded.sort_order;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-media','product-media',true,10485760,array['image/png','image/jpeg','image/webp','video/mp4'])
on conflict (id) do nothing;

drop policy if exists "product_media_public_read" on storage.objects;
drop policy if exists "product_media_admin_insert" on storage.objects;
drop policy if exists "product_media_admin_update" on storage.objects;
drop policy if exists "product_media_admin_delete" on storage.objects;

create policy "product_media_public_read" on storage.objects for select to public using (bucket_id = 'product-media');
create policy "product_media_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'product-media' and ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'));
create policy "product_media_admin_update" on storage.objects for update to authenticated using (bucket_id = 'product-media' and ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')) with check (bucket_id = 'product-media' and ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'));
create policy "product_media_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'product-media' and ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'));
