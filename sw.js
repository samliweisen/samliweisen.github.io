self.addEventListener('install', function(e) {

    e.waitUntil(
    
        caches.open('samresume').then(function(cache) {
        
            return cache.addAll([
            
                '/',
                
                '/index.html',
                
                '/style.css',
                
                '/index_bundle.js',
            
            ]);
        
        })
    
    );

});