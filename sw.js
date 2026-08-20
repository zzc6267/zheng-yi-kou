const CACHE_NAME = "one-bite-v7";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260820.3",
  "./app.js?v=20260820.3",
  "./cuisine-atlas.png",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-180.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(cacheOfflineApp());
  self.skipWaiting();
});

async function cacheOfflineApp() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);

  const source = await fetch("./app.js?v=20260820.3").then((response) => response.text());
  const dishIds = [...source.matchAll(/(?:dish|homeDish)\("([^"]+)"/g)].map((match) => match[1]);
  if (dishIds.length !== 177 || new Set(dishIds).size !== 177) {
    throw new Error("Dish image manifest is incomplete");
  }

  const dishImages = dishIds.map((id) => `./assets/dishes/${id}.webp`);
  for (let index = 0; index < dishImages.length; index += 20) {
    await cache.addAll(dishImages.slice(index, index + 20));
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      }))
  );
});
