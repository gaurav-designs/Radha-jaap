const CACHE_NAME = "radha-jaap-v1";

const files = [
"index.html",
"style.css",
"script.js"
];


self.addEventListener("install", function(event){

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache=>{
return cache.addAll(files);
})
);

});


self.addEventListener("fetch", function(event){

event.respondWith(
caches.match(event.request)
.then(response=>{
return response || fetch(event.request);
})
);

});
