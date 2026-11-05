// Guarda o app no celular para abrir mesmo sem internet.
// Ao publicar uma versão nova, troque o número abaixo (v1 → v2).
const CACHE = "obrabit-visita-v2";
const CORE = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  const mine = u.origin === location.origin;
  const lib = u.hostname === "www.gstatic.com" || u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com";
  if (!mine && !lib) return; // banco de dados e login passam direto
  if (mine) {
    // Arquivos do app: tenta a internet (pega a versão nova), sem internet usa a cópia guardada.
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r, {ignoreSearch: true}).then(m => m || caches.match("index.html"))));
    return;
  }
  // Bibliotecas e fontes: usa a cópia guardada, busca só na primeira vez.
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })));
});
