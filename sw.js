;
const CACHE_NAME = 'v2_cache_bliones_digital_card',
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
    'build/img/14m.webp',
    'build/img/17m.webp',
    'build/img/20.webp',
    'build/img/icono_16.webp',
    'build/img/icono_32.webp',
    'build/img/icono_64.webp',
    'build/img/icono_128.webp',
    'build/img/icono_256.webp',
    'build/img/icono_512.webp',
    'build/img/qr.webp',
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