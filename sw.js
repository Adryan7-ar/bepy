const CACHE_NAME = 'bepy-cache-v1';

// Los archivos que queremos guardar en el teléfono del usuario
const urlsToCache = [
  './',
  './index.html',
  './panel-usuario.html',
  './panel-prestador.html',
  './panel-chofer.html',
  './panel-admin.html'
];

// Instalar el robot y guardar los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Bepy: Caché inicializado');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cuando la app pide algo (ej: abrir la credencial), el robot intercepta
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra en la memoria (caché), lo devuelve (funciona sin internet)
        if (response) {
          return response;
        }
        // Si no, va a buscarlo a internet
        return fetch(event.request).catch(() => {
          console.log('Modo Offline: Recurso no disponible sin conexión');
        });
      })
  );
});