importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// firebase-messaging-sw.js
const config = {
  messagingSenderId: '972618418370',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const title = payload.title;
  const options = {
    body: payload.body,
    icon: payload.icon,
  };

  self.registration.showNotification(title, options);
});

const VERSION = 'v1';
const CACHE_NAMES = {
  css: `css-${VERSION}`,
  js: `js-${VERSION}`,
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      fetch('asset-manifest.json').then((response) => {
        if (response.ok) {
          response.json().then((manifest) => {
            const urls = Object.keys(manifest).map(key => manifest[key]);
            urls.push('/');
            urls.push('/assets/icon.png');
            cache.addAll(urls);
          });
        }
      });
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});
