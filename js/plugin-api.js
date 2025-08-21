/**
 * Oracle Fusion Field Service Plugin API Integration
 * Handles communication with the Oracle Fusion Field Service application
 */

class PluginAPI {
    constructor() {
        this.apiVersion = 1;
        this.isReady = false;
        this.isConnected = false;
        this.isStandaloneMode = false;
        this.isOracleConnected = false;
        this.oracleTestInProgress = false;
        this.activityData = null;
        this.callbacks = {};
        this.messageQueue = [];
        this.retryCount = 0;
        this.maxRetries = 3;
        this.readyTimeout = null;
        
        // Initialize API
        this.init();
    }

    /**
     * Initialize the Plugin API
     */
    init() {
        console.log('[PluginAPI] Initializing Oracle Fusion Field Service Plugin API');
        
        // Set up message listener
        window.addEventListener('message', this.handleMessage.bind(this), false);
        
        // Set up ready timeout (2 minutes as per Oracle documentation)
        this.readyTimeout = setTimeout(() => {
            if (!this.isReady) {
                console.warn('[PluginAPI] Oracle connection timeout - running in standalone mode');
                this.handleOracleTimeout();
            }
        }, 120000); // 2 minutes
        
        // Send ready message
        this.sendReady();
        
        // Set up connection monitoring
        this.setupConnectionMonitoring();
        
        // Quick Oracle availability check (5 seconds)
        setTimeout(() => {
            this.checkOracleAvailability();
        }, 5000);
    }

    /**
     * Handle Oracle timeout - plugin is running standalone
     */
    handleOracleTimeout() {
        this.isReady = true;
        this.isConnected = false;
        this.isStandaloneMode = true;
        
        // Clear ready timeout
        if (this.readyTimeout) {
            clearTimeout(this.readyTimeout);
            this.readyTimeout = null;
        }
        
        console.log('[PluginAPI] Running in standalone mode - Oracle not available');
        this.triggerEvent('ready', { mode: 'standalone' });
    }

    /**
     * Check if Oracle is actually available
     */
    checkOracleAvailability() {
        // Try to detect if we're running within Oracle Fusion Field Service
        const isInOracleFrame = this.detectOracleFrame();
        
        if (!isInOracleFrame) {
            console.log('[PluginAPI] Not running in Oracle frame - standalone mode');
            this.handleOracleTimeout();
            return;
        }
        
        // Try a simple ping to Oracle
        this.pingOracle();
    }

    /**
     * Detect if we're running within Oracle Fusion Field Service
     */
    detectOracleFrame() {
        try {
            // Check if we're in an iframe
            if (window.self !== window.top) {
                // Check for Oracle-specific window properties or frame structure
                const parentUrl = window.parent.location.href;
                const currentUrl = window.location.href;
                
                // Look for Oracle Fusion Field Service indicators
                const oracleIndicators = [
                    'oracle.com',
                    'fusion',
                    'ofsc',
                    'fieldservice',
                    'activity'
                ];
                
                const hasOracleIndicator = oracleIndicators.some(indicator => 
                    parentUrl.toLowerCase().includes(indicator) || 
                    currentUrl.toLowerCase().includes(indicator)
                );
                
                console.log('[PluginAPI] Frame detection:', {
                    inIframe: true,
                    parentUrl: parentUrl,
                    hasOracleIndicator: hasOracleIndicator
                });
                
                return hasOracleIndicator;
            }
            
            return false;
        } catch (error) {
            console.warn('[PluginAPI] Error detecting Oracle frame:', error);
            return false;
        }
    }

    /**
     * Ping Oracle to test connectivity
     */
    pingOracle() {
        const pingMessage = {
            apiVersion: this.apiVersion,
            method: 'ping',
            callId: this.generateCallId()
        };
        
        console.log('[PluginAPI] Pinging Oracle...');
        
        // Set up ping timeout
        const pingTimeout = setTimeout(() => {
            console.warn('[PluginAPI] Oracle ping timeout - no response received');
            this.handleOracleTimeout();
        }, 10000); // 10 second ping timeout
        
        // Send ping and listen for response
        this.postMessage(pingMessage);
        
        // Listen for ping response
        const originalHandleMessage = this.handleMessage.bind(this);
        const pingHandler = (event) => {
            if (event.data && event.data.method === 'pong') {
                clearTimeout(pingTimeout);
                console.log('[PluginAPI] Oracle ping successful');
                window.removeEventListener('message', pingHandler);
                // Restore original handler
                window.addEventListener('message', originalHandleMessage, false);
            }
        };
        
        window.addEventListener('message', pingHandler, false);
    }

    /**
     * Send ready message to Oracle Fusion Field Service
     */
    sendReady() {
        console.log('[PluginAPI] Sending ready message to Oracle Fusion Field Service');
        
        const readyMessage = {
            apiVersion: this.apiVersion,
            method: 'ready',
            callId: this.generateCallId()
        };
        
        this.postMessage(readyMessage);
        
        // Retry mechanism for ready message
        if (this.retryCount < this.maxRetries && !this.isReady) {
            setTimeout(() => {
                if (!this.isReady) {
                    this.retryCount++;
                    console.log(`[PluginAPI] Retrying ready message (attempt ${this.retryCount}/${this.maxRetries})`);
                    this.sendReady();
                }
            }, 2000 * this.retryCount); // Progressive delay
        }
    }

    /**
     * Handle incoming messages from Oracle Fusion Field Service
     */
    handleMessage(event) {
        console.log('[PluginAPI] Received message:', event.data);
        
        try {
            const data = event.data;
            
            // Validate message format
            if (!data || typeof data !== 'object') {
                console.warn('[PluginAPI] Invalid message format received');
                return;
            }

            // Handle different message types
            switch (data.method) {
                case 'initEnd':
                    this.handleInitEnd(data);
                    break;
                    
                case 'open':
                    this.handleOpen(data);
                    break;
                    
                case 'updateActivity':
                    this.handleActivityUpdate(data);
                    break;
                    
                case 'close':
                    this.handleClose(data);
                    break;
                    
                case 'error':
                    this.handleApiError(data);
                    break;
                    
                default:
                    console.log(`[PluginAPI] Unhandled message method: ${data.method}`);
            }
            
            // Execute callback if present
            if (data.callId && this.callbacks[data.callId]) {
                this.callbacks[data.callId](data);
                delete this.callbacks[data.callId];
            }
            
        } catch (error) {
            console.error('[PluginAPI] Error handling message:', error);
            this.handleError(error);
        }
    }

    /**
     * Handle initialization end message
     */
    handleInitEnd(data) {
        console.log('[PluginAPI] Plugin initialization completed');
        this.isReady = true;
        this.isConnected = true;
        
        // Clear ready timeout
        if (this.readyTimeout) {
            clearTimeout(this.readyTimeout);
            this.readyTimeout = null;
        }
        
        // Process queued messages
        this.processMessageQueue();
        
        // Trigger ready event
        this.triggerEvent('ready', data);
        
        // Request activity data
        this.requestActivityData();
    }

    /**
     * Handle open message with activity context
     */
    handleOpen(data) {
        console.log('[PluginAPI] Plugin opened with context:', data);
        
        if (data.activity) {
            this.activityData = data.activity;
            this.triggerEvent('activityLoaded', this.activityData);
        }
        
        // Request additional activity properties if needed
        this.requestActivityProperties();
    }

    /**
     * Handle activity update message
     */
    handleActivityUpdate(data) {
        console.log('[PluginAPI] Activity data updated:', data);
        
        if (data.activity) {
            this.activityData = { ...this.activityData, ...data.activity };
            this.triggerEvent('activityUpdated', this.activityData);
        }
    }

    /**
     * Handle plugin close message
     */
    handleClose(data) {
        console.log('[PluginAPI] Plugin close requested');
        this.triggerEvent('close', data);
    }

    /**
     * Handle API error message
     */
    handleApiError(data) {
        console.error('[PluginAPI] API Error received:', data);
        const error = new Error(data.message || 'API Error occurred');
        error.code = data.code;
        this.handleError(error);
    }

    /**
     * Request activity data from Oracle Fusion Field Service
     */
    requestActivityData() {
        if (!this.isReady) {
            console.warn('[PluginAPI] Cannot request activity data - plugin not ready');
            return;
        }
        
        const message = {
            apiVersion: this.apiVersion,
            method: 'getActivityData',
            callId: this.generateCallId()
        };
        
        console.log('[PluginAPI] Requesting activity data');
        this.sendMessage(message);
    }

    /**
     * Request specific activity properties
     */
    requestActivityProperties(properties = []) {
        if (!this.isReady) {
            console.warn('[PluginAPI] Cannot request activity properties - plugin not ready');
            return;
        }
        
        const message = {
            apiVersion: this.apiVersion,
            method: 'getActivityProperties',
            properties: properties.length > 0 ? properties : [
                'aid', 'cname', 'astatus', 'sla_window_start', 'sla_window_end',
                'duration', 'atype', 'city', 'state', 'street', 'zip',
                'resources', 'priority'
            ],
            callId: this.generateCallId()
        };
        
        console.log('[PluginAPI] Requesting activity properties:', message.properties);
        this.sendMessage(message);
    }

    /**
     * Update activity status
     */
    updateActivityStatus(status, callback = null) {
        if (!this.isReady) {
            console.warn('[PluginAPI] Cannot update activity status - plugin not ready');
            return false;
        }
        
        const callId = this.generateCallId();
        const message = {
            apiVersion: this.apiVersion,
            method: 'updateActivity',
            activity: {
                astatus: status
            },
            callId: callId
        };
        
        if (callback) {
            this.callbacks[callId] = callback;
        }
        
        console.log('[PluginAPI] Updating activity status to:', status);
        this.sendMessage(message);
        return true;
    }

    /**
     * Send message to Oracle Fusion Field Service
     */
    sendMessage(message, callback = null) {
        if (!this.isReady) {
            console.log('[PluginAPI] Queueing message - plugin not ready:', message);
            this.messageQueue.push({ message, callback });
            return;
        }
        
        if (callback) {
            this.callbacks[message.callId] = callback;
        }
        
        this.postMessage(message);
    }

    /**
     * Post message using window.postMessage
     */
    postMessage(message) {
        try {
            console.log('[PluginAPI] Sending message:', message);
            window.parent.postMessage(message, '*');
        } catch (error) {
            console.error('[PluginAPI] Error sending message:', error);
            this.handleError(error);
        }
    }

    /**
     * Process queued messages
     */
    processMessageQueue() {
        console.log(`[PluginAPI] Processing ${this.messageQueue.length} queued messages`);
        
        while (this.messageQueue.length > 0) {
            const { message, callback } = this.messageQueue.shift();
            this.sendMessage(message, callback);
        }
    }

    /**
     * Generate unique call ID
     */
    generateCallId() {
        return 'call_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Set up connection monitoring
     */
    setupConnectionMonitoring() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            console.log('[PluginAPI] Connection restored');
            this.isConnected = true;
            this.triggerEvent('connectionRestored');
        });
        
        window.addEventListener('offline', () => {
            console.log('[PluginAPI] Connection lost');
            this.isConnected = false;
            this.triggerEvent('connectionLost');
        });
        
        // Periodic connection check
        setInterval(() => {
            this.checkConnection();
        }, 30000); // Check every 30 seconds
    }

    /**
     * Check connection status
     */
    checkConnection() {
        const wasConnected = this.isConnected;
        
        // Check basic internet connectivity
        const hasInternet = navigator.onLine;
        
        // If we're in standalone mode, just use internet status
        if (this.isStandaloneMode) {
            this.isConnected = hasInternet;
        } else {
            // For Oracle mode, we need both internet and Oracle connectivity
            this.isConnected = hasInternet && this.isOracleConnected;
        }
        
        if (wasConnected !== this.isConnected) {
            if (this.isConnected) {
                this.triggerEvent('connectionRestored');
            } else {
                this.triggerEvent('connectionLost');
            }
        }
        
        // If we have internet but Oracle connection is uncertain, test it
        if (hasInternet && !this.isStandaloneMode && !this.isOracleConnected) {
            this.testOracleConnection();
        }
    }

    /**
     * Test Oracle connection with a simple API call
     */
    testOracleConnection() {
        if (this.oracleTestInProgress) return;
        
        this.oracleTestInProgress = true;
        
        const testMessage = {
            apiVersion: this.apiVersion,
            method: 'testConnection',
            callId: this.generateCallId()
        };
        
        console.log('[PluginAPI] Testing Oracle connection...');
        
        // Set up test timeout
        const testTimeout = setTimeout(() => {
            this.oracleTestInProgress = false;
            this.isOracleConnected = false;
            console.warn('[PluginAPI] Oracle connection test failed - timeout');
            this.triggerEvent('oracleConnectionLost');
        }, 15000); // 15 second test timeout
        
        // Send test message
        this.postMessage(testMessage);
        
        // Listen for test response
        const testHandler = (event) => {
            if (event.data && event.data.method === 'testConnectionResponse') {
                clearTimeout(testTimeout);
                this.oracleTestInProgress = false;
                this.isOracleConnected = true;
                console.log('[PluginAPI] Oracle connection test successful');
                this.triggerEvent('oracleConnectionRestored');
                window.removeEventListener('message', testHandler);
            }
        };
        
        window.addEventListener('message', testHandler, false);
    }

    /**
     * Event handling
     */
    on(eventName, callback) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.callbacks[eventName]) {
            const index = this.callbacks[eventName].indexOf(callback);
            if (index > -1) {
                this.callbacks[eventName].splice(index, 1);
            }
        }
    }

    triggerEvent(eventName, data = null) {
        console.log(`[PluginAPI] Triggering event: ${eventName}`, data);
        
        if (this.callbacks[eventName]) {
            this.callbacks[eventName].forEach(callback => {
                try {
                    if (Array.isArray(callback)) {
                        callback.forEach(cb => cb(data));
                    } else {
                        callback(data);
                    }
                } catch (error) {
                    console.error(`[PluginAPI] Error in event callback for ${eventName}:`, error);
                }
            });
        }
        
        // Also dispatch custom DOM event
        const customEvent = new CustomEvent(`plugin-${eventName}`, {
            detail: data,
            bubbles: true
        });
        document.dispatchEvent(customEvent);
    }

    /**
     * Handle errors
     */
    handleError(error) {
        console.error('[PluginAPI] Error:', error);
        this.triggerEvent('error', {
            message: error.message,
            code: error.code || 'UNKNOWN_ERROR',
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Get current activity data
     */
    getActivityData() {
        return this.activityData;
    }

    /**
     * Check if plugin is ready
     */
    isPluginReady() {
        return this.isReady;
    }

    /**
     * Check connection status
     */
    isPluginConnected() {
        return this.isConnected;
    }

    /**
     * Cleanup
     */
    destroy() {
        console.log('[PluginAPI] Cleaning up Plugin API');
        
        // Clear timeouts
        if (this.readyTimeout) {
            clearTimeout(this.readyTimeout);
        }
        
        // Remove event listeners
        window.removeEventListener('message', this.handleMessage);
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
        
        // Clear callbacks
        this.callbacks = {};
        this.messageQueue = [];
        
        // Reset state
        this.isReady = false;
        this.isConnected = false;
        this.activityData = null;
    }
}

// Export for use in main plugin script
window.PluginAPI = PluginAPI;
