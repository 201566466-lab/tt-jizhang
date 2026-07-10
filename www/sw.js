const CACHE_NAME = 'tt-jizhang-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/mobile.css',
  './css/pc.css',
  './js/main.js',
  './js/utils.js',
  './js/echarts.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 安装：缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：缓存优先，网络备选
self.addEventListener('fetch', (event) => {
  // 只处理同源请求，忽略跨域和浏览器扩展
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // 对有效响应做缓存（只缓存同源）
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // 网络失败时返回离线提示
          return caches.match('./index.html');
        });
    })
  );
});
