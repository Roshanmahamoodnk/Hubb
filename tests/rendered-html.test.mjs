import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("route-test", `${pathname}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the seven-SKU shop and bundle", async () => {
  const response = await render("/shop");
  const html = await response.text();
  assert.equal(response.status, 200);
  for (const flavor of ["Classic", "Lemon Salt", "Hot &amp; Salt", "Spices", "Ghawa", "Matcha", "Americano"]) assert.match(html, new RegExp(flavor));
  assert.match(html, /The Seven Crack Box/);
});

test("keeps Matcha kernels naturally roasted in visible copy and Product data", async () => {
  const response = await render("/flavors/matcha");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /kernel stays naturally roasted/i);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HUBB-MTC-100/);
});

test("renders discovery, editorial, account and commerce surfaces", async () => {
  for (const pathname of ["/taste-lab", "/films", "/story", "/journal", "/account", "/cart", "/checkout", "/admin", "/saudi-sunflower-seeds"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
  }
});

test("renders the real seven-pack film and short human launch copy", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /hubb-seven-worlds\.webm/);
  assert.match(html, /hubb-seven-worlds\.mp4/);
  assert.match(html, /SEVEN FLAVORS/);
  assert.match(html, /START WITH ONE/);
  assert.match(html, /NOW CRACKING/);
  assert.match(html, /TASTE NOTES/);

  const webm = await stat(new URL("../public/video/hubb-seven-worlds.webm", import.meta.url));
  const mp4 = await stat(new URL("../public/video/hubb-seven-worlds.mp4", import.meta.url));
  assert.ok(webm.size > 500_000 && webm.size < 5_000_000);
  assert.ok(mp4.size > 500_000 && mp4.size < 5_000_000);
});

test("ships cinematic SKU loops and a macro crack study", async () => {
  const response = await render("/films");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /hubb-crack-study\.mp4/);
  assert.match(html, /loops\/classic\.mp4/);
  assert.match(html, /SIX SECONDS/);
  const crack = await stat(new URL("../public/video/hubb-crack-study.mp4", import.meta.url));
  assert.ok(crack.size > 200_000);
  for (const id of ["classic", "lemon-salt", "hot-salt", "spices", "ghawa", "matcha", "americano"]) {
    const loop = await stat(new URL(`../public/video/loops/${id}.mp4`, import.meta.url));
    assert.ok(loop.size > 80_000, id);
  }
});

test("keeps the first viewport free of external font and eager-film blockers", async () => {
  const response = await render("/");
  const html = await response.text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const home = await readFile(new URL("../components/home-experience.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  assert.match(css, /space-grotesk\.woff2/);
  assert.match(css, /noto-kufi-arabic\.woff2/);
  assert.match(html, /<video[^>]*preload="none"/i);
  assert.doesNotMatch(html, /<video[^>]*autoplay/i);
  assert.match(home, /useMotionValue/);
  assert.doesNotMatch(home, /useState\(\{ x: 0, y: 0 \}\)/);

  for (const name of ["space-grotesk.woff2", "noto-kufi-arabic.woff2", "noto-kufi-latin.woff2"]) {
    const font = await stat(new URL(`../public/fonts/${name}`, import.meta.url));
    assert.ok(font.size > 10_000 && font.size < 200_000, name);
  }
});

test("keeps add-to-bag non-disruptive", async () => {
  const source = await readFile(new URL("../components/cart-provider.tsx", import.meta.url), "utf8");
  const addBody = source.slice(source.indexOf("const add ="), source.indexOf("const addBundle ="));
  assert.doesNotMatch(addBody, /setOpen\(true\)/);
  assert.match(source, /setNotice/);
});

test("makes films shoppable and remembers a real flavor choice", async () => {
  const home = await readFile(new URL("../components/home-experience.tsx", import.meta.url), "utf8");
  const detail = await readFile(new URL("../components/flavor-experience.tsx", import.meta.url), "utf8");
  const memory = await readFile(new URL("../lib/taste-memory.ts", import.meta.url), "utf8");
  assert.match(home, /film-buy-signal/);
  assert.match(home, /add\(flavor\.id\)/);
  assert.match(detail, /SAVE AS MY FLAVOR/);
  assert.match(detail, /preferred_flavor/);
  assert.match(memory, /hubb-last-flavor/);
});

test("prepares a useful RLS-backed member dashboard and one-tap reorder", async () => {
  const account = await readFile(new URL("../components/account-experience.tsx", import.meta.url), "utf8");
  const provider = await readFile(new URL("../components/cart-provider.tsx", import.meta.url), "utf8");
  const checkout = await readFile(new URL("../components/checkout-experience.tsx", import.meta.url), "utf8");
  assert.match(account, /from\("profiles"\)/);
  assert.match(account, /from\("orders"\)/);
  assert.match(account, /order_items\(product_id,quantity,unit_price_sar\)/);
  assert.match(account, /REORDER/);
  assert.match(provider, /const addLines/);
  assert.match(checkout, /Your bag will still be here/);
});

test("serves an installable manifest with HUBB shortcuts", async () => {
  const response = await render("/manifest.webmanifest");
  const manifest = await response.json();
  assert.equal(response.status, 200);
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.icons.length, 2);
  assert.deepEqual(manifest.shortcuts.map((item) => item.url), ["/shop", "/taste-lab"]);
});

test("updates the installed app without hanging on a weak connection", async () => {
  const serviceWorker = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
  const registration = await readFile(new URL("../components/experience-layer.tsx", import.meta.url), "utf8");
  assert.match(serviceWorker, /hubb-shell-v6/);
  assert.match(serviceWorker, /NAVIGATION_TIMEOUT_MS = 4000/);
  assert.match(serviceWorker, /staleWhileRevalidate/);
  assert.match(registration, /document\.readyState === "complete"/);
  assert.match(registration, /registration\.update\(\)/);
});

test("keeps the seven-box saving aligned with the future server total", async () => {
  const provider = await readFile(new URL("../components/cart-provider.tsx", import.meta.url), "utf8");
  const sql = await readFile(new URL("../supabase/hubb-commerce.sql", import.meta.url), "utf8");
  assert.match(provider, /starterBundle\.priceSar/);
  assert.match(sql, /discount_sar/);
  assert.match(sql, /full_set_quantity \* 3\.00/);
  assert.match(sql, /revoke all on function public\.create_order/);
  assert.match(sql, /grant execute on function public\.create_order\(jsonb, jsonb\) to authenticated/);
  assert.match(sql, /drop policy if exists "orders_select_own_or_admin"/);
});
