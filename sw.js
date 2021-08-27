;
const CACHE_NAME = 'v3_cache_bliones_digital_card',
  urlsToCache = [
    '/',
    'https://kit.fontawesome.com/c2462c3380.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&family=Roboto:wght@100;400;700&display=swap',
    '/build/css/app.css',
    '/build/js/bundle.min.js',
    'build/img/logo.webp',
    'build/img/icono-azul.webp',
    'contact.html',
    'build/img/services/1.webp',
    'build/img/services/2.webp',
    'build/img/services/3.webp',
    'build/img/services/4.webp',
    'build/img/services/5.webp',
    'build/img/services/6.webp',
    'build/img/services/7.webp',
    'build/img/8m.webp',
    'build/img/assets/manifest-icon-192.png',
    'build/img/assets/manifest-icon-512.png',
    'build/img/14m.webp',
    'build/img/17m.webp',
    'build/img/20.webp',
    'build/img/assets/apple-splash-2048-2732.jpg',
    'build/img/assets/apple-splash-2732-2048.jpg',
    'build/img/assets/apple-splash-1668-2388.jpg',
    'build/img/assets/apple-splash-2388-1668.jpg',
    'build/img/assets/apple-splash-1536-2048.jpg',
    'build/img/assets/apple-splash-2048-1536.jpg',
    'build/img/assets/apple-splash-1668-2224.jpg',
    'build/img/assets/apple-splash-2224-1668.jpg',
    'build/img/assets/apple-splash-1620-2160.jpg',
    'build/img/assets/apple-splash-2160-1620.jpg',
    'build/img/assets/apple-splash-1284-2778.jpg',
    'build/img/assets/apple-splash-2778-1284.jpg',
    'build/img/assets/apple-splash-1170-2532.jpg',
    'build/img/assets/apple-splash-2532-1170.jpg',
    'build/img/assets/apple-splash-1125-2436.jpg',
    'build/img/assets/apple-splash-2436-1125.jpg',
    'build/img/assets/apple-splash-1242-2688.jpg',
    'build/img/assets/apple-splash-2688-1242.jpg',
    'build/img/assets/apple-splash-828-1792.jpg',
    'build/img/assets/apple-splash-1792-828.jpg',
    'build/img/assets/apple-splash-1242-2208.jpg',
    'build/img/assets/apple-splash-2208-1242.jpg',
    'build/img/assets/apple-splash-750-1334.jpg',
    'build/img/assets/apple-splash-1334-750.jpg',
    'build/img/assets/apple-splash-640-1136.jpg',
    'build/img/assets/apple-splash-1136-640.jpg',
    'build/img/qr.webp'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cachestore')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      })
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
})