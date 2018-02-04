self.addEventListener('install', function(e) {

    e.waitUntil(
    
        caches.open('samresume').then(function(cache) {
        
            return cache.addAll([
            
                '/',
                
                '/index.html',
                
                '/index.html?homescreen=1',
                
                '/?homescreen=1',
                
                '/style.css',
                
                '/index_bundle.js',
            
            ]);
        
        })
    
    );

});