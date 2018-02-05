(function() {
    'use strict';
    var staticFilesToCache = [
        '.',
        'index.html',
        'index_bundle.js',
        'style.css'
    ];
    
    var staticCaches = 'my-appshell-cache';
    var apiCaches = 'my-api-cache';
    
    self.addEventListener('install', function(event) {
        console.info('sw intend to intsall and cache file');
        event.waitUntil(
            caches.open(staticCaches).then(function(cache) {
                return cache.addAll(staticFilesToCache);
            })
        );
    });
    
    self.addEventListener('active', function(event) {
        console.info('active new service work');
        var cacheWhiteList = [staticCaches, apiCaches];
        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
        )
    });
    
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found' + event.request.url + 'in cache');
                    return response;
                }
                
            })
        )
    })
})