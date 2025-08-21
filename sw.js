/**
 * Service Worker for Oracle Fusion Field Service Activity Properties Plugin
 * Provides offline functionality and resource caching
 */

const CACHE_NAME = 'ofs-activity-plugin-v1.0.0';
const CACHE_STRATEGY_VERSION = '1.0';

// Resources to cache for offline functionality
const CACHE_RESOURCES = [
    './',
    './index.html',
    './css/plugin.css',
    './js/plugin.js',
    './js/plugin-api.js',
    './manifest.json',
    // External CDN resources
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
    'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.css'
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
    /\/rest\/ofscCore\/v1\/activities/,
    /\/rest\/ofscCore\/v1\/resources/,
    /\/rest\/ofscCore\/v1\/inventory/
];

// Cache duration in milliseconds
const CACHE_DURATION = {
    static: 7 * 24 * 60 * 60 * 1000, // 7 days for static resources
    api: 60 * 60 * 1000, // 1 hour for API responses
    dynamic: 15 * 60 * 1000 // 15 minutes for dynamic content
};

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing Service Worker v' + CACHE_STRATEGY_VERSION);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching static resources');
                return cache.addAll(CACHE_RESOURCES.map(url => new Request(url, {
                    mode: 'cors',
                    credentials: 'omit'
                })));
            })
            .then(() => {
                console.log('[ServiceWorker] Static resources cached successfully');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Failed to cache static resources:', error);
            })
    );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating Service Worker v' + CACHE_STRATEGY_VERSION);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName !== CACHE_NAME) {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Service Worker activated successfully');
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

/**
 * Fetch Event Handler
 */
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests that are not in our CDN list
    if (url.origin !== location.origin && !isCdnResource(url.href)) {
        return;
    }
    
    // Determine caching strategy based on request type
    if (isStaticResource(request)) {
        event.respondWith(handleStaticResource(request));
    } else if (isApiRequest(request)) {
        event.respondWith(handleApiRequest(request));
    } else {
        event.respondWith(handleDynamicRequest(request));
    }
});

/**
 * Handle static resources (HTML, CSS, JS, images)
 * Strategy: Cache First
 */
async function handleStaticResource(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('[ServiceWorker] Serving from cache:', request.url);
            return cachedResponse;
        }
        
        // Fetch from network and cache
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            console.log('[ServiceWorker] Cached static resource:', request.url);
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('[ServiceWorker] Error handling static resource:', error);
        
        // Try to return cached version as fallback
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for HTML requests
        if (request.destination === 'document') {
            return createOfflineResponse();
        }
        
        throw error;
    }
}

/**
 * Handle API requests
 * Strategy: Network First with cache fallback
 */
async function handleApiRequest(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful API responses
            const cache = await caches.open(CACHE_NAME);
            const responseToCache = networkResponse.clone();
            
            // Add timestamp for cache expiration
            const responseWithTimestamp = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: {
                    ...responseToCache.headers,
                    'sw-cached-at': Date.now().toString()
                }
            });
            
            cache.put(request, responseWithTimestamp);
            console.log('[ServiceWorker] Cached API response:', request.url);
        }
        
        return networkResponse;
        
    } catch (error) {
        console.warn('[ServiceWorker] Network failed, trying cache:', request.url);
        
        // Try cached version
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Check if cached response is still valid
            const cachedAt = cachedResponse.headers.get('sw-cached-at');
            if (cachedAt && (Date.now() - parseInt(cachedAt)) < CACHE_DURATION.api) {
                console.log('[ServiceWorker] Serving cached API response:', request.url);
                return cachedResponse;
            } else {
                console.log('[ServiceWorker] Cached API response expired:', request.url);
            }
        }
        
        // Return offline API response
        return createOfflineApiResponse(request);
    }
}

/**
 * Handle dynamic requests
 * Strategy: Network First
 */
async function handleDynamicRequest(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses for short duration
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        // Try cached version
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

/**
 * Check if request is for a static resource
 */
function isStaticResource(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    return (
        request.destination === 'document' ||
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'image' ||
        request.destination === 'font' ||
        pathname.endsWith('.css') ||
        pathname.endsWith('.js') ||
        pathname.endsWith('.html') ||
        pathname.endsWith('.json') ||
        pathname.endsWith('.xml') ||
        isCdnResource(request.url)
    );
}

/**
 * Check if request is for an API endpoint
 */
function isApiRequest(request) {
    const url = request.url;
    return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Check if URL is a CDN resource we want to cache
 */
function isCdnResource(url) {
    return (
        url.includes('cdn.jsdelivr.net') ||
        url.includes('cdnjs.cloudflare.com') ||
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com')
    );
}

/**
 * Create offline response for HTML documents
 */
function createOfflineResponse() {
    const offlineHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Activity Properties Plugin</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f8f9fa;
            color: #343a40;
        }
        .offline-container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
        }
        .offline-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #ffc107;
        }
        .btn {
            background-color: #0066cc;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 1rem;
        }
        .btn:hover {
            background-color: #0052a3;
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="offline-icon">📱</div>
        <h2>Plugin Offline</h2>
        <p>The Activity Properties Plugin is currently offline. Please check your connection and try again.</p>
        <button class="btn" onclick="location.reload()">Retry</button>
    </div>
</body>
</html>`;

    return new Response(offlineHtml, {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store'
        }
    });
}

/**
 * Create offline response for API requests
 */
function createOfflineApiResponse(request) {
    const offlineData = {
        error: true,
        message: 'Plugin is currently offline. Data may not be current.',
        offline: true,
        timestamp: new Date().toISOString(),
        cachedData: null
    };
    
    return new Response(JSON.stringify(offlineData), {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    });
}

/**
 * Handle background sync (if supported)
 */
self.addEventListener('sync', (event) => {
    console.log('[ServiceWorker] Background sync triggered:', event.tag);
    
    if (event.tag === 'activity-data-sync') {
        event.waitUntil(syncActivityData());
    }
});

/**
 * Sync activity data in background
 */
async function syncActivityData() {
    try {
        console.log('[ServiceWorker] Syncing activity data in background');
        
        // Get all clients (plugin instances)
        const clients = await self.clients.matchAll();
        
        // Notify clients about sync
        clients.forEach(client => {
            client.postMessage({
                type: 'background-sync',
                action: 'activity-data-sync'
            });
        });
        
    } catch (error) {
        console.error('[ServiceWorker] Background sync failed:', error);
    }
}

/**
 * Handle push notifications (if needed in future)
 */
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push message received');
    
    const options = {
        body: event.data ? event.data.text() : 'Activity update received',
        icon: './icon-192x192.png',
        badge: './icon-72x72.png',
        vibrate: [200, 100, 200],
        tag: 'activity-update',
        data: {
            url: './'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Activity Properties Plugin', options)
    );
});

/**
 * Handle notification click
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification clicked');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || './')
    );
});

/**
 * Handle messages from plugin
 */
self.addEventListener('message', (event) => {
    console.log('[ServiceWorker] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[ServiceWorker] Service Worker script loaded');
