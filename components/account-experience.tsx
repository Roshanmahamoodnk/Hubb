"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, type CSSProperties } from "react";
import type { User } from "@supabase/supabase-js";
import { useCart } from "@/components/cart-provider";
import { flavorById, flavors, formatSar } from "@/lib/catalog";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { rememberFlavor, useSavedFlavorId } from "@/lib/taste-memory";

type ProfileRecord = {
  full_name: string | null;
  preferred_flavor: string | null;
};

type OrderLineRecord = {
  product_id: string;
  quantity: number;
  unit_price_sar: number;
};

type OrderRecord = {
  id: string;
  status: string;
  total_sar: number;
  created_at: string;
  order_items: OrderLineRecord[];
};

const orderStatus: Record<string, string> = {
  pending_payment: "AWAITING PAYMENT",
  paid: "PAID",
  packing: "PACKING",
  shipped: "ON THE WAY",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
  refunded: "REFUNDED",
};

const orderDate = (value: string) => new Intl.DateTimeFormat("en-SA", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(new Date(value));

export function AccountExperience() {
  const client = getSupabaseBrowserClient();
  const { add, addLines } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const favoriteId = useSavedFlavorId();

  useEffect(() => {
    if (!client) return;

    let active = true;
    client.auth.getUser().then(({ data }) => { if (active) setUser(data.user); });
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setProfile(null);
        setOrders([]);
        setLoadingDashboard(false);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [client]);

  useEffect(() => {
    if (!client || !user) return;
    let active = true;
    const start = window.setTimeout(() => {
      setLoadingDashboard(true);
      Promise.all([
        client.from("profiles").select("full_name,preferred_flavor").eq("id", user.id).maybeSingle(),
        client.from("orders").select("id,status,total_sar,created_at,order_items(product_id,quantity,unit_price_sar)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(8),
      ]).then(([profileResult, orderResult]) => {
        if (!active) return;
        if (profileResult.error || orderResult.error) {
          setStatus(profileResult.error?.message ?? orderResult.error?.message ?? "We could not load the club dashboard.");
        } else {
          const nextProfile = profileResult.data as ProfileRecord | null;
          setProfile(nextProfile);
          setOrders((orderResult.data ?? []) as unknown as OrderRecord[]);
          if (nextProfile?.preferred_flavor && flavorById(nextProfile.preferred_flavor)) rememberFlavor(nextProfile.preferred_flavor);
        }
        setLoadingDashboard(false);
      });
    }, 0);
    return () => { active = false; window.clearTimeout(start); };
  }, [client, user]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client) {
      setStatus("Accounts are staged. Connect a dedicated HUBB Supabase project to open the club.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    setBusy(true);
    setStatus("");
    const result = mode === "signup"
      ? await client.auth.signUp({ email, password })
      : await client.auth.signInWithPassword({ email, password });
    setBusy(false);
    setStatus(result.error?.message || (mode === "signup" ? "Check your inbox, then come back for your first crack." : "Welcome back."));
  };

  const chooseFlavor = async (flavorId: string) => {
    rememberFlavor(flavorId);
    if (!client || !user) return;
    const { error } = await client.from("profiles").update({ preferred_flavor: flavorId, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) setStatus(error.message);
    else setProfile((current) => ({ full_name: current?.full_name ?? null, preferred_flavor: flavorId }));
  };

  const favorite = favoriteId ? flavorById(favoriteId) : null;

  if (user) {
    return (
      <main className="page-main account-page">
        <header className="account-member-head">
          <div><p>FIRST CRACK CLUB · نادي القرمشة الأولى</p><h1>YOUR<br /><em>WORLD.</em></h1></div>
          <div className="member-id"><span>ACTIVE MEMBER</span><b>{profile?.full_name || user.email}</b><small>YOUR BAG STAYS ON THIS DEVICE</small><button onClick={() => client?.auth.signOut()}>SIGN OUT ↗</button></div>
        </header>
        {status ? <p className="form-status account-status">{status}</p> : null}
        <section className="account-dashboard">
          <article className="saved-world" style={{ "--saved": favorite?.color ?? "#c9a24b", "--saved-pale": favorite?.pale ?? "#efe7d8" } as CSSProperties}>
            <div className="saved-world-copy"><span>YOUR FLAVOR · نكهتك</span><h2>{favorite ? favorite.ar : "اختر نكهتك"}</h2><h3>{favorite?.en ?? "SAVE YOUR FIRST"}</h3><p>{favorite?.moodEn ?? "Pick the bag that feels like your night. We’ll remember it here and on your next visit."}</p>{favorite ? <button onClick={() => add(favorite.id)}>ADD MY FLAVOR <b>{formatSar(favorite.priceSar)}</b></button> : <Link href="/taste-lab">FIND MINE IN 30 SECONDS ↗</Link>}</div>
            {favorite ? <img src={favorite.image} alt={`HUBB ${favorite.en}`} /> : <div className="saved-world-mark">حُبّ</div>}
            <div className="taste-dots" aria-label="Choose your saved flavor">{flavors.map((item) => <button key={item.id} aria-label={`Save ${item.en}`} aria-pressed={favoriteId === item.id} onClick={() => chooseFlavor(item.id)} style={{ "--taste": item.color } as CSSProperties}><i /><span>{item.number}</span></button>)}</div>
          </article>
          <section className="orders-panel">
            <header><div><span>ORDER HISTORY · طلباتك</span><h2>CRACK IT<br /><em>AGAIN.</em></h2></div><Link href="/shop">SHOP ALL 7 ↗</Link></header>
            {loadingDashboard ? <div className="orders-empty"><i /><p>LOADING YOUR CRACKS…</p></div> : orders.length ? <div className="order-list">{orders.map((order) => <article key={order.id}>
              <div className="order-meta"><span>#{order.id.slice(0, 8).toUpperCase()}</span><b>{orderStatus[order.status] ?? order.status.replaceAll("_", " ").toUpperCase()}</b><small>{orderDate(order.created_at)}</small></div>
              <div className="order-packs">{order.order_items.slice(0, 5).map((line) => { const item = flavorById(line.product_id); return item ? <span key={line.product_id}><img src={item.image} alt="" /><i>{line.quantity}</i></span> : null; })}</div>
              <strong>{formatSar(Number(order.total_sar))}</strong>
              <button onClick={() => addLines(order.order_items.map((line) => ({ productId: line.product_id, quantity: line.quantity })))}>REORDER ↗</button>
            </article>)}</div> : <div className="orders-empty"><span>◒</span><h3>NO ORDERS YET.</h3><p>Seven colors are waiting for the first one.</p><Link href="/shop">PICK A BAG ↗</Link></div>}
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main account-page">
      <header><p>FIRST CRACK CLUB · نادي القرمشة الأولى</p><h1>GET THE DROP<br /><em>BEFORE THE FEED.</em></h1><blockquote>Early flavors. Saved orders. Real film from the next shoot.</blockquote></header>
      <section className="account-auth">
        <div><p>{mode === "signin" ? "MEMBER SIGN IN" : "CREATE ACCOUNT"}</p><h2>{mode === "signin" ? "رجعت لنا؟" : "أهلًا بك في النادي"}</h2><span className={`account-connection ${client ? "is-ready" : ""}`}><i />{client ? "SECURE ACCOUNT SERVICE READY" : "PREVIEW MODE · BACKEND NOT CONNECTED"}</span><form onSubmit={submit}><label>EMAIL<input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></label><label>PASSWORD<input type="password" name="password" minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} required placeholder="8+ characters" /></label><button disabled={busy}>{busy ? "CONNECTING…" : mode === "signin" ? "SIGN IN ↗" : "JOIN THE CLUB ↗"}</button></form>{status && <p className="form-status">{status}</p>}<button className="mode-switch" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "NEW HERE? CREATE ACCOUNT" : "ALREADY A MEMBER? SIGN IN"}</button></div>
        <aside>{favorite ? <div className="account-local-taste" style={{ "--local-taste": favorite.color } as CSSProperties}><img src={favorite.image} alt="" /><span>THIS DEVICE REMEMBERS</span><h3>{favorite.ar}</h3><p>{favorite.en} · {favorite.moodEn}</p></div> : null}<span>MEMBER SIGNAL 01</span><h3>Save the flavor that feels like you.</h3><span>MEMBER SIGNAL 02</span><h3>See every order. Reorder in one tap.</h3><span>MEMBER SIGNAL 03</span><h3>Enter new drops before they go public.</h3></aside>
      </section>
    </main>
  );
}
