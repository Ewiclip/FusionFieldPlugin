/**
 * Oracle Fusion Field Service Plugin API Integration
 * Handles communication with the Oracle Fusion Field Service application
 * 
 * ORACLE API CLIENT USAGE EXAMPLES:
 * 
 * // Initialize the API client
 * const api = new PluginAPI();
 * 
 * // Test Oracle authentication
 * const authResult = await api.oracleApiClient.testAuthentication();
 * if (authResult.success) {
 *     console.log('Authenticated as:', authResult.userInfo.userName);
 * } else {
 *     console.error('Auth failed:', authResult.message);
 * }
 * 
 * // Get activity data
 * const activityResult = await api.oracleApiClient.getActivityData('ACT-123');
 * if (activityResult.success) {
 *     console.log('Activity data:', activityResult.data);
 * }
 * 
 * // Update activity
 * const updateResult = await api.oracleApiClient.updateActivityData('ACT-123', {
 *     astatus: 'completed',
 *     notes: 'Work completed successfully'
 * });
 * 
 * // Make custom API calls
 * const response = await api.oracleApiClient.makeApiCall('/rest/ofscCore/v1/resources', 'GET');
 * 
 * EXTRACTING THE ORACLE API CLIENT:
 * 
 * To extract just the Oracle API client for use in other projects:
 * 1. Copy the 'oracleApiClient' object (lines ~150-450)
 * 2. Initialize it: oracleApiClient.init()
 * 3. Use the methods: testAuthentication(), getActivityData(), etc.
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
            const isStandalone = window.self === window.top || 
                   location.hostname === 'localhost' || 
                   location.hostname.includes('replit') ||
                   location.hostname.includes('127.0.0.1');
            
            // If not standalone, check if we're in Oracle environment
            if (!isStandalone) {
                this.isOracleConnected = this.detectOracleEnvironment();
            }
            
            return isStandalone;
        } catch (e) {
            // Probably in iframe, check if it's Oracle
            this.isOracleConnected = this.detectOracleEnvironment();
            return false; // Assume production
        }
    }

    /**
     * Detect if we're running within Oracle Fusion Field Service
     */
    detectOracleEnvironment() {
        try {
            // Check for Oracle-specific indicators
            const currentUrl = window.location.href;
            const parentUrl = window.parent !== window ? window.parent.location.href : '';
            
            const oracleIndicators = [
                'oracle.com',
                'fusion',
                'ofsc',
                'fieldservice',
                'activity'
            ];
            
            const hasOracleIndicator = oracleIndicators.some(indicator => 
                currentUrl.toLowerCase().includes(indicator) || 
                parentUrl.toLowerCase().includes(indicator)
            );
            
            console.log('[PluginAPI] Oracle environment detection:', {
                currentUrl: currentUrl,
                parentUrl: parentUrl,
                hasOracleIndicator: hasOracleIndicator
            });
            
            return hasOracleIndicator;
        } catch (error) {
            console.warn('[PluginAPI] Error detecting Oracle environment:', error);
            return false;
        }
    }

    /**
     * Initialize the Plugin API
     */
    init() {
        console.log('[PluginAPI] Initializing Oracle Fusion Field Service Plugin API');
        
        // Initialize Oracle API client
        this.oracleApiClient.init();
        
        if (this.isDevelopmentMode) {
            console.log('[PluginAPI] Running in DEVELOPMENT MODE - simulating Oracle responses');
        } else if (this.isOracleConnected) {
            console.log('[PluginAPI] Running in ORACLE ENVIRONMENT - connecting to Oracle Fusion Field Service');
        } else {
            console.log('[PluginAPI] Running in STANDALONE MODE - Oracle not detected');
            this.isStandaloneMode = true;
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
                } else if (this.isStandaloneMode) {
                    console.log('[PluginAPI] Standalone mode - no Oracle connection available');
                    this.handleStandaloneMode();
                } else {
                    this.handleError(new Error('Plugin ready timeout - failed to initialize within 2 minutes'));
                }
            }
        }, timeoutDuration);
        
        // Send ready message
        this.sendReady();
        
        // Set up connection monitoring
        this.setupConnectionMonitoring();
        
        // Test Oracle authentication if not in development mode
        if (!this.isDevelopmentMode && !this.isStandaloneMode) {
            this.testOracleAuthentication();
        }
        
        // In development mode, simulate Oracle responses after a delay
        if (this.isDevelopmentMode) {
            setTimeout(() => {
                this.simulateOracleResponses();
            }, 2000);
        } else if (this.isStandaloneMode) {
            // Quick timeout for standalone mode
            setTimeout(() => {
                this.handleStandaloneMode();
            }, 3000);
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
        
        // Try to get real data from Oracle API first
        if (this.isOracleConnected) {
            console.log('[PluginAPI] Requesting activity data from Oracle API...');
            this.getRealActivityData();
        } else {
            // Fall back to postMessage method
            console.log('[PluginAPI] Oracle API not available, using postMessage method');
            this.requestActivityDataViaPostMessage();
        }
    }

    /**
     * Get real activity data from Oracle API
     */
    async getRealActivityData() {
        try {
            const result = await this.oracleApiClient.getActivityData();
            
            if (result.success) {
                console.log('[PluginAPI] Real activity data retrieved from Oracle API');
                this.activityData = result.data;
                this.triggerEvent('activityLoaded', this.activityData);
            } else {
                console.warn('[PluginAPI] Failed to get real activity data:', result.message);
                // Fall back to postMessage method
                this.requestActivityDataViaPostMessage();
            }
            
        } catch (error) {
            console.error('[PluginAPI] Error getting real activity data:', error);
            // Fall back to postMessage method
            this.requestActivityDataViaPostMessage();
        }
    }

    /**
     * Request activity data via postMessage (fallback method)
     */
    requestActivityDataViaPostMessage() {
        const message = {
            apiVersion: this.apiVersion,
            method: 'getActivityData',
            callId: this.generateCallId()
        };
        
        console.log('[PluginAPI] Requesting activity data via postMessage');
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
        const wasConnected = this.isConnected;
        
        // Check basic internet connectivity
        const hasInternet = navigator.onLine;
        
        // Determine connection status based on mode
        if (this.isDevelopmentMode) {
            this.isConnected = hasInternet; // Always connected in dev mode
        } else if (this.isStandaloneMode) {
            this.isConnected = hasInternet; // Just internet for standalone
        } else {
            // For Oracle mode, we need both internet and Oracle connectivity
            this.isConnected = hasInternet && this.isOracleConnected;
            
            // If we have internet but Oracle connection is uncertain, test it
            if (hasInternet && !this.isOracleConnected && !this.oracleTestInProgress) {
                this.testOracleConnection();
            }
        }
        
        if (wasConnected !== this.isConnected) {
            if (this.isConnected) {
                this.triggerEvent('connectionRestored');
            } else {
                this.triggerEvent('connectionLost');
            }
        }
    }

    /**
     * Test Oracle connection with real API calls
     */
    async testOracleConnection() {
        if (this.oracleTestInProgress) return;
        
        this.oracleTestInProgress = true;
        
        console.log('[PluginAPI] Testing Oracle connection with real API...');
        
        try {
            // Use the Oracle API client to test authentication
            const authResult = await this.oracleApiClient.testAuthentication();
            
            if (authResult.success) {
                this.isOracleConnected = true;
                console.log('[PluginAPI] Oracle connection test successful');
                this.triggerEvent('oracleConnectionRestored');
            } else {
                this.isOracleConnected = false;
                console.warn('[PluginAPI] Oracle connection test failed:', authResult.message);
                this.triggerEvent('oracleConnectionLost');
            }
            
        } catch (error) {
            this.isOracleConnected = false;
            console.error('[PluginAPI] Oracle connection test error:', error);
            this.triggerEvent('oracleConnectionLost');
        } finally {
            this.oracleTestInProgress = false;
        }
    }

    /**
     * Test Oracle authentication
     */
    async testOracleAuthentication() {
        console.log('[PluginAPI] Testing Oracle authentication...');
        const authResult = await this.oracleApiClient.testAuthentication();
        if (authResult.success) {
            console.log('[PluginAPI] Oracle authentication successful.');
            this.isOracleConnected = true;
            this.triggerEvent('oracleConnectionRestored');
        } else {
            console.error('[PluginAPI] Oracle authentication failed:', authResult.message);
            this.isOracleConnected = false;
            this.triggerEvent('oracleConnectionLost');
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
     * Handle standalone mode (when Oracle is not detected)
     */
    handleStandaloneMode() {
        console.warn('[PluginAPI] Oracle Fusion Field Service not detected. Running in standalone mode.');
        this.isStandaloneMode = true;
        this.isConnected = true; // Assume connected for standalone mode
        this.isReady = true; // Assume ready for standalone mode
        this.triggerEvent('standaloneMode');
        this.triggerEvent('ready'); // Still trigger ready for consistency
        this.requestActivityData(); // Still try to request activity data
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

    /**
     * Oracle API Client for authentication and data retrieval
     */
    oracleApiClient = {
        baseUrl: null,
        authToken: null,
        sessionId: null,
        
        /**
         * Initialize Oracle API client
         */
        init() {
            // Try to detect Oracle base URL from current environment
            this.baseUrl = this.detectOracleBaseUrl();
            this.authToken = this.getAuthToken();
            this.sessionId = this.getSessionId();
            
            console.log('[OracleAPI] Initialized with:', {
                baseUrl: this.baseUrl,
                hasAuthToken: !!this.authToken,
                hasSessionId: !!this.sessionId
            });
        },
        
        /**
         * Detect Oracle base URL from current environment
         */
        detectOracleBaseUrl() {
            try {
                // Check if we're in Oracle Fusion Field Service
                const currentUrl = window.location.href;
                const parentUrl = window.parent !== window ? window.parent.location.href : '';
                
                // Common Oracle Fusion Field Service URL patterns
                const oraclePatterns = [
                    /https:\/\/([^.]+)\.oracle\.com/,
                    /https:\/\/([^.]+)\.fusion\.oracle\.com/,
                    /https:\/\/([^.]+)\.ofsc\.oracle\.com/,
                    /https:\/\/([^.]+)\.fieldservice\.oracle\.com/
                ];
                
                for (const pattern of oraclePatterns) {
                    const match = currentUrl.match(pattern) || parentUrl.match(pattern);
                    if (match) {
                        return `https://${match[1]}.oracle.com`;
                    }
                }
                
                // Fallback to current domain
                return window.location.origin;
            } catch (error) {
                console.warn('[OracleAPI] Error detecting base URL:', error);
                return window.location.origin;
            }
        },
        
        /**
         * Get authentication token from various sources
         */
        getAuthToken() {
            // Try multiple sources for auth token
            const sources = [
                // 1. Check for token in localStorage
                () => localStorage.getItem('oracle_auth_token'),
                // 2. Check for token in sessionStorage
                () => sessionStorage.getItem('oracle_auth_token'),
                // 3. Check for token in cookies
                () => this.getCookie('oracle_auth_token'),
                // 4. Check for OAuth token
                () => localStorage.getItem('oracle_oauth_token'),
                // 5. Check for JWT token
                () => localStorage.getItem('oracle_jwt_token')
            ];
            
            for (const source of sources) {
                try {
                    const token = source();
                    if (token) {
                        console.log('[OracleAPI] Found auth token from source');
                        return token;
                    }
                } catch (error) {
                    // Continue to next source
                }
            }
            
            return null;
        },
        
        /**
         * Get session ID from various sources
         */
        getSessionId() {
            // Try multiple sources for session ID
            const sources = [
                // 1. Check for session in cookies
                () => this.getCookie('JSESSIONID'),
                // 2. Check for Oracle session
                () => this.getCookie('oracle_session_id'),
                // 3. Check for Fusion session
                () => this.getCookie('fusion_session_id')
            ];
            
            for (const source of sources) {
                try {
                    const sessionId = source();
                    if (sessionId) {
                        console.log('[OracleAPI] Found session ID from source');
                        return sessionId;
                    }
                } catch (error) {
                    // Continue to next source
                }
            }
            
            return null;
        },
        
        /**
         * Get cookie value by name
         */
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        },
        
        /**
         * Test Oracle API authentication
         */
        async testAuthentication() {
            console.log('[OracleAPI] Testing authentication...');
            
            try {
                // Test 1: Check if we can access Oracle REST API
                const authResult = await this.testRestApiAuth();
                if (!authResult.success) {
                    return authResult;
                }
                
                // Test 2: Check if we can access activity data
                const activityResult = await this.testActivityApiAccess();
                if (!activityResult.success) {
                    return activityResult;
                }
                
                // Test 3: Check user permissions
                const permissionResult = await this.testUserPermissions();
                if (!permissionResult.success) {
                    return permissionResult;
                }
                
                console.log('[OracleAPI] All authentication tests passed');
                return {
                    success: true,
                    message: 'Oracle authentication successful',
                    userInfo: permissionResult.userInfo
                };
                
            } catch (error) {
                console.error('[OracleAPI] Authentication test failed:', error);
                return {
                    success: false,
                    message: 'Authentication test failed: ' + error.message,
                    error: error
                };
            }
        },
        
        /**
         * Test Oracle REST API authentication
         */
        async testRestApiAuth() {
            const endpoints = [
                '/rest/ofscCore/v1/activities',
                '/rest/ofscCore/v1/resources',
                '/rest/ofscCore/v1/context'
            ];
            
            for (const endpoint of endpoints) {
                try {
                    const response = await this.makeApiCall(endpoint, 'GET');
                    
                    if (response.status === 200) {
                        console.log(`[OracleAPI] REST API test successful: ${endpoint}`);
                        return { success: true, endpoint: endpoint };
                    }
                    
                    if (response.status === 401) {
                        console.error(`[OracleAPI] Authentication failed: ${endpoint}`);
                        return { 
                            success: false, 
                            message: 'Invalid authentication token',
                            status: 401,
                            endpoint: endpoint
                        };
                    }
                    
                    if (response.status === 403) {
                        console.error(`[OracleAPI] Authorization failed: ${endpoint}`);
                        return { 
                            success: false, 
                            message: 'Insufficient permissions',
                            status: 403,
                            endpoint: endpoint
                        };
                    }
                    
                } catch (error) {
                    console.warn(`[OracleAPI] Endpoint test failed: ${endpoint}`, error);
                }
            }
            
            return { 
                success: false, 
                message: 'No Oracle REST API endpoints accessible',
                status: 0
            };
        },
        
        /**
         * Test activity API access
         */
        async testActivityApiAccess() {
            try {
                const response = await this.makeApiCall('/rest/ofscCore/v1/activities?limit=1', 'GET');
                
                if (response.status === 200) {
                    const data = await response.json();
                    console.log('[OracleAPI] Activity API access successful');
                    return { 
                        success: true, 
                        hasActivities: data.items && data.items.length > 0 
                    };
                }
                
                return { 
                    success: false, 
                    message: 'Cannot access activity data',
                    status: response.status
                };
                
            } catch (error) {
                return { 
                    success: false, 
                    message: 'Activity API test failed: ' + error.message 
                };
            }
        },
        
        /**
         * Test user permissions
         */
        async testUserPermissions() {
            try {
                const response = await this.makeApiCall('/rest/ofscCore/v1/context', 'GET');
                
                if (response.status === 200) {
                    const context = await response.json();
                    console.log('[OracleAPI] User context retrieved:', context);
                    
                    return {
                        success: true,
                        userInfo: {
                            userId: context.userId,
                            userName: context.userName,
                            userType: context.userType,
                            permissions: context.permissions || []
                        }
                    };
                }
                
                return { 
                    success: false, 
                    message: 'Cannot retrieve user context',
                    status: response.status
                };
                
            } catch (error) {
                return { 
                    success: false, 
                    message: 'Permission test failed: ' + error.message 
                };
            }
        },
        
        /**
         * Make authenticated API call to Oracle
         */
        async makeApiCall(endpoint, method = 'GET', body = null) {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = this.getAuthHeaders();
            
            const options = {
                method: method,
                headers: headers,
                credentials: 'include' // Include cookies for session auth
            };
            
            if (body) {
                options.body = JSON.stringify(body);
            }
            
            console.log(`[OracleAPI] Making ${method} request to: ${url}`);
            
            const response = await fetch(url, options);
            
            console.log(`[OracleAPI] Response status: ${response.status} for ${endpoint}`);
            
            return response;
        },
        
        /**
         * Get authentication headers
         */
        getAuthHeaders() {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            
            // Add auth token if available
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
            
            // Add session ID if available
            if (this.sessionId) {
                headers['X-Session-ID'] = this.sessionId;
            }
            
            return headers;
        },
        
        /**
         * Get activity data from Oracle
         */
        async getActivityData(activityId = null) {
            try {
                const endpoint = activityId 
                    ? `/rest/ofscCore/v1/activities/${activityId}`
                    : '/rest/ofscCore/v1/activities?limit=10';
                
                const response = await this.makeApiCall(endpoint, 'GET');
                
                if (response.status === 200) {
                    const data = await response.json();
                    console.log('[OracleAPI] Activity data retrieved:', data);
                    return { success: true, data: data };
                }
                
                return { 
                    success: false, 
                    message: 'Failed to retrieve activity data',
                    status: response.status
                };
                
            } catch (error) {
                return { 
                    success: false, 
                    message: 'Activity data request failed: ' + error.message 
                };
            }
        },
        
        /**
         * Update activity data in Oracle
         */
        async updateActivityData(activityId, updates) {
            try {
                const endpoint = `/rest/ofscCore/v1/activities/${activityId}`;
                const response = await this.makeApiCall(endpoint, 'PATCH', updates);
                
                if (response.status === 200) {
                    const data = await response.json();
                    console.log('[OracleAPI] Activity updated successfully:', data);
                    return { success: true, data: data };
                }
                
                return { 
                    success: false, 
                    message: 'Failed to update activity',
                    status: response.status
                };
                
            } catch (error) {
                return { 
                    success: false, 
                    message: 'Activity update failed: ' + error.message 
                };
            }
        }
    };
}

// Export for use in main plugin script
window.PluginAPI = PluginAPI;
