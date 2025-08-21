/**
 * Oracle Fusion Field Service Plugin API Integration
 * Handles communication with the Oracle Fusion Field Service application
 */

class PluginAPI {
    constructor() {
        this.apiVersion = 1;
        this.isReady = false;
        this.isConnected = false;
        this.activityData = null;
        this.callbacks = {};
        this.messageQueue = [];
        this.retryCount = 0;
        this.maxRetries = 3;
        this.readyTimeout = null;
        
        // Development mode detection
        this.isDevelopmentMode = this.detectDevelopmentMode();
        
        // Initialize API
        this.init();
    }

    /**
     * Detect if running in development mode (not inside Oracle Fusion Field Service)
     */
    detectDevelopmentMode() {
        // Check if we're running standalone or in Oracle environment
        try {
            return window.self === window.top || 
                   location.hostname === 'localhost' || 
                   location.hostname.includes('replit') ||
                   location.hostname.includes('127.0.0.1');
        } catch (e) {
            return false; // Probably in iframe, assume production
        }
    }

    /**
     * Initialize the Plugin API
     */
    init() {
        console.log('[PluginAPI] Initializing Oracle Fusion Field Service Plugin API');
        
        if (this.isDevelopmentMode) {
            console.log('[PluginAPI] Running in DEVELOPMENT MODE - simulating Oracle responses');
        }
        
        // Set up message listener
        window.addEventListener('message', this.handleMessage.bind(this), false);
        
        // Set up ready timeout (2 minutes as per Oracle documentation, shorter in dev mode)
        const timeoutDuration = this.isDevelopmentMode ? 5000 : 120000;
        this.readyTimeout = setTimeout(() => {
            if (!this.isReady) {
                if (this.isDevelopmentMode) {
                    console.log('[PluginAPI] Development mode - simulating plugin ready');
                    this.simulatePluginReady();
                } else {
                    this.handleError(new Error('Plugin ready timeout - failed to initialize within 2 minutes'));
                }
            }
        }, timeoutDuration);
        
        // Send ready message
        this.sendReady();
        
        // Set up connection monitoring
        this.setupConnectionMonitoring();
        
        // In development mode, simulate Oracle responses after a delay
        if (this.isDevelopmentMode) {
            setTimeout(() => {
                this.simulateOracleResponses();
            }, 2000);
        }
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
        try {
            const data = event.data;
            
            // Filter out non-Oracle messages (browser events, etc.)
            if (!data || typeof data !== 'object' || !data.method) {
                // Don't log these as they're likely browser events
                return;
            }
            
            console.log('[PluginAPI] Received Oracle message:', data);

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
        
        if (this.isDevelopmentMode) {
            console.log('[PluginAPI] Development mode - providing mock activity data');
            setTimeout(() => {
                this.simulateActivityData();
            }, 500);
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
        
        if (this.isDevelopmentMode) {
            console.log('[PluginAPI] Development mode - providing mock activity properties');
            setTimeout(() => {
                this.simulateActivityData();
            }, 500);
            return;
        }
        
        const message = {
            apiVersion: this.apiVersion,
            method: 'getActivityProperties',
            properties: properties.length > 0 ? properties : [
                'aid', 'astatus'
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
        // Simple connection check - can be enhanced with actual API ping
        const wasConnected = this.isConnected;
        this.isConnected = navigator.onLine;
        
        if (wasConnected !== this.isConnected) {
            if (this.isConnected) {
                this.triggerEvent('connectionRestored');
            } else {
                this.triggerEvent('connectionLost');
            }
        }
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
     * Simulate Oracle Fusion Field Service responses for development mode
     */
    simulateOracleResponses() {
        if (!this.isDevelopmentMode) return;
        
        console.log('[PluginAPI] Simulating Oracle Fusion Field Service responses');
        
        // Simulate initEnd message
        this.handleInitEnd({
            method: 'initEnd',
            apiVersion: this.apiVersion
        });
        
        // Simulate activity data after a short delay
        setTimeout(() => {
            this.simulateActivityData();
        }, 1000);
    }

    /**
     * Simulate plugin ready state
     */
    simulatePluginReady() {
        if (!this.isDevelopmentMode) return;
        
        console.log('[PluginAPI] Simulating plugin ready state');
        this.simulateOracleResponses();
    }

    /**
     * Simulate activity data from Oracle
     */
    simulateActivityData() {
        if (!this.isDevelopmentMode) return;
        
        const mockActivityData = {
            aid: 'ACT-2025-001234',
            astatus: 'pending'
        };
        
        console.log('[PluginAPI] Simulating activity data:', mockActivityData);
        
        // Simulate open message with activity data
        this.handleOpen({
            method: 'open',
            activity: mockActivityData
        });
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
