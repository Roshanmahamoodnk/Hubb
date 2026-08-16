import assert from "node:assert/strict";
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
  for (const pathname of ["/taste-lab", "/story", "/journal", "/account", "/cart", "/checkout", "/admin", "/saudi-sunflower-seeds"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
  }
});
