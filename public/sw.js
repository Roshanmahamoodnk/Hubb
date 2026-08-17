const CACHE = "hubb-shell-v6";
const NAVIGATION_TIMEOUT_MS = 4000;
const SHELL = [
  "/",
  "/shop",
  "/taste-lab",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/icons/hubb-192.png",
  "/brand/hubb-logo.webp",
  "/products/classic.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("network-timeout")), NAVIGATION_TIMEOUT_MS);
  });
  try {
    const response = await Promise.race([fetch(request), timeout]);
    if (response.ok) {
      const copy = response.clone();
      void caches.open(CACHE).then((cache) => cache.put(request, copy));
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/")) || new Response("HUBB is offline. Try again when your connection returns.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const network = fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      void caches.open(CACHE).then((cache) => cache.put(request, copy));
    }
    return response;
  }).catch(() => undefined);
  return cached || (await network) || Response.error();
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.destination === "video") return;
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(staleWhileRevalidate(event.request));
});
