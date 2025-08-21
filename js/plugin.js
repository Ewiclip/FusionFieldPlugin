/**
 * Oracle Fusion Field Service Activity Properties Plugin
 * Main plugin logic and UI handling
 */

class ActivityPropertiesPlugin {
    constructor() {
        this.api = null;
        this.elements = {};
        this.activityData = {};
        this.isOfflineMode = false;
        this.lastUpdateTime = null;
        
        // Initialize plugin
        this.init();
    }

    /**
     * Initialize the plugin
     */
    async init() {
        console.log('[Plugin] Initializing Activity Properties Plugin');
        
        try {
            // Cache DOM elements
            this.cacheElements();
            
            // Initialize Plugin API
            this.api = new PluginAPI();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set up UI event handlers
            this.setupUIHandlers();
            
            // Show loading state
            this.showLoadingState();
            
            console.log('[Plugin] Plugin initialized successfully');
            
        } catch (error) {
            console.error('[Plugin] Error initializing plugin:', error);
            this.showError('Failed to initialize plugin: ' + error.message);
        }
    }

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // States
            loadingState: document.getElementById('loading-state'),
            errorState: document.getElementById('error-state'),
            mainContent: document.getElementById('main-content'),
            
            // Error handling
            errorMessage: document.getElementById('error-message'),
            retryButton: document.getElementById('retry-button'),
            
            // Connection status
            connectionStatus: document.getElementById('connection-status'),
            
            // Activity properties
            activityId: document.getElementById('activity-id'),
            customerName: document.getElementById('customer-name'),
            activityStatus: document.getElementById('activity-status'),
            scheduledTime: document.getElementById('scheduled-time'),
            activityType: document.getElementById('activity-type'),
            duration: document.getElementById('duration'),
            location: document.getElementById('location'),
            assignedResource: document.getElementById('assigned-resource'),
            priority: document.getElementById('priority'),
            
            // Controls
            refreshButton: document.getElementById('refresh-data'),
            lastUpdated: document.getElementById('last-updated')
        };
        
        console.log('[Plugin] DOM elements cached');
    }

    /**
     * Set up Plugin API event listeners
     */
    setupEventListeners() {
        // Plugin ready
        this.api.on('ready', (data) => {
            console.log('[Plugin] Plugin API ready');
            this.onPluginReady(data);
        });
        
        // Activity data loaded
        this.api.on('activityLoaded', (data) => {
            console.log('[Plugin] Activity data loaded');
            this.onActivityLoaded(data);
        });
        
        // Activity data updated
        this.api.on('activityUpdated', (data) => {
            console.log('[Plugin] Activity data updated');
            this.onActivityUpdated(data);
        });
        
        // Connection events
        this.api.on('connectionLost', () => {
            console.log('[Plugin] Connection lost');
            this.onConnectionLost();
        });
        
        this.api.on('connectionRestored', () => {
            console.log('[Plugin] Connection restored');
            this.onConnectionRestored();
        });
        
        // Error handling
        this.api.on('error', (error) => {
            console.error('[Plugin] API Error:', error);
            this.showError(error.message);
        });
        
        // Plugin close
        this.api.on('close', () => {
            console.log('[Plugin] Plugin close requested');
            this.cleanup();
        });
    }

    /**
     * Set up UI event handlers
     */
    setupUIHandlers() {
        // Retry button
        if (this.elements.retryButton) {
            this.elements.retryButton.addEventListener('click', () => {
                this.retry();
            });
        }
        
        // Refresh button
        if (this.elements.refreshButton) {
            this.elements.refreshButton.addEventListener('click', () => {
                this.refreshData();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'r':
                        event.preventDefault();
                        this.refreshData();
                        break;
                }
            }
        });
    }

    /**
     * Handle plugin ready event
     */
    onPluginReady(data) {
        console.log('[Plugin] Plugin ready, waiting for activity data...');
        this.updateConnectionStatus(true);
        
        // If we don't receive activity data within 5 seconds, request it
        setTimeout(() => {
            if (!this.activityData || Object.keys(this.activityData).length === 0) {
                console.log('[Plugin] No activity data received, requesting...');
                this.api.requestActivityData();
            }
        }, 5000);
    }

    /**
     * Handle activity data loaded
     */
    onActivityLoaded(data) {
        console.log('[Plugin] Activity data loaded:', data);
        this.activityData = data;
        this.updateUI();
        this.hideLoadingState();
        this.showMainContent();
    }

    /**
     * Handle activity data updated
     */
    onActivityUpdated(data) {
        console.log('[Plugin] Activity data updated:', data);
        this.activityData = { ...this.activityData, ...data };
        this.updateUI();
    }

    /**
     * Handle connection lost
     */
    onConnectionLost() {
        this.isOfflineMode = true;
        this.updateConnectionStatus(false);
        this.showOfflineMessage();
    }

    /**
     * Handle connection restored
     */
    onConnectionRestored() {
        this.isOfflineMode = false;
        this.updateConnectionStatus(true);
        this.hideOfflineMessage();
        
        // Refresh data when connection is restored
        setTimeout(() => {
            this.refreshData();
        }, 1000);
    }

    /**
     * Update the UI with activity data
     */
    updateUI() {
        try {
            const data = this.activityData;
            
            if (!data) {
                console.warn('[Plugin] No activity data to display');
                return;
            }
            
            console.log('[Plugin] Updating UI with data:', data);
            
            // Update activity properties
            this.updateElement('activityId', data.aid || data.activityId);
            this.updateElement('customerName', data.cname || data.customerName);
            this.updateActivityStatus(data.astatus || data.status);
            this.updateScheduledTime(data.sla_window_start, data.sla_window_end);
            this.updateElement('activityType', data.atype || data.activityType);
            this.updateDuration(data.duration);
            this.updateLocation(data);
            this.updateElement('assignedResource', this.formatResourceInfo(data.resources));
            this.updateElement('priority', data.priority);
            
            // Update last updated time
            this.lastUpdateTime = new Date();
            this.updateElement('lastUpdated', this.formatDateTime(this.lastUpdateTime));
            
            // Add fade-in animation
            this.elements.mainContent.classList.add('fade-in');
            
        } catch (error) {
            console.error('[Plugin] Error updating UI:', error);
            this.showError('Failed to update display: ' + error.message);
        }
    }

    /**
     * Update a single element with value
     */
    updateElement(elementKey, value) {
        const element = this.elements[elementKey];
        if (element) {
            const displayValue = value || '-';
            element.textContent = displayValue;
            
            // Add empty class if no value
            if (!value) {
                element.classList.add('empty');
            } else {
                element.classList.remove('empty');
            }
        }
    }

    /**
     * Update activity status with appropriate styling
     */
    updateActivityStatus(status) {
        const element = this.elements.activityStatus;
        if (!element) return;
        
        if (!status) {
            element.innerHTML = '<span class="badge bg-secondary">-</span>';
            return;
        }
        
        // Clear previous status classes
        const badge = element.querySelector('.badge') || document.createElement('span');
        badge.className = 'badge';
        
        // Apply status-specific styling
        const statusLower = status.toLowerCase();
        let badgeClass = 'bg-secondary';
        let displayStatus = status;
        
        switch (statusLower) {
            case 'pending':
                badgeClass = 'status-pending';
                break;
            case 'started':
            case 'en route':
                badgeClass = 'status-started';
                break;
            case 'complete':
            case 'completed':
                badgeClass = 'status-complete';
                break;
            case 'cancelled':
            case 'canceled':
                badgeClass = 'status-cancelled';
                break;
            case 'suspended':
                badgeClass = 'status-suspended';
                break;
            default:
                badgeClass = 'bg-info';
        }
        
        badge.className = `badge ${badgeClass}`;
        badge.textContent = displayStatus;
        
        if (!element.querySelector('.badge')) {
            element.appendChild(badge);
        }
    }

    /**
     * Update scheduled time display
     */
    updateScheduledTime(startTime, endTime) {
        const element = this.elements.scheduledTime;
        if (!element) return;
        
        if (!startTime && !endTime) {
            element.textContent = '-';
            element.classList.add('empty');
            return;
        }
        
        let timeDisplay = '';
        
        if (startTime) {
            timeDisplay += this.formatDateTime(startTime);
        }
        
        if (endTime && endTime !== startTime) {
            timeDisplay += ' - ' + this.formatTime(endTime);
        }
        
        element.textContent = timeDisplay || '-';
        element.classList.remove('empty');
    }

    /**
     * Update duration display
     */
    updateDuration(duration) {
        const element = this.elements.duration;
        if (!element) return;
        
        if (!duration) {
            element.textContent = '-';
            element.classList.add('empty');
            return;
        }
        
        // Convert duration to readable format
        let displayDuration = '';
        
        if (typeof duration === 'number') {
            // Assuming duration is in minutes
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            
            if (hours > 0) {
                displayDuration = `${hours}h ${minutes}m`;
            } else {
                displayDuration = `${minutes}m`;
            }
        } else {
            displayDuration = duration.toString();
        }
        
        element.textContent = displayDuration;
        element.classList.remove('empty');
    }

    /**
     * Update location display
     */
    updateLocation(data) {
        const element = this.elements.location;
        if (!element) return;
        
        const locationParts = [];
        
        if (data.street) locationParts.push(data.street);
        if (data.city) locationParts.push(data.city);
        if (data.state) locationParts.push(data.state);
        if (data.zip) locationParts.push(data.zip);
        
        const location = locationParts.join(', ') || 
                        data.location || 
                        data.address || 
                        '-';
        
        element.textContent = location;
        
        if (location === '-') {
            element.classList.add('empty');
        } else {
            element.classList.remove('empty');
        }
    }

    /**
     * Format resource information
     */
    formatResourceInfo(resources) {
        if (!resources) return null;
        
        if (Array.isArray(resources)) {
            return resources.map(r => r.name || r.resourceId || r).join(', ');
        }
        
        if (typeof resources === 'object') {
            return resources.name || resources.resourceId || resources.toString();
        }
        
        return resources.toString();
    }

    /**
     * Format date and time
     */
    formatDateTime(dateTime) {
        if (!dateTime) return '';
        
        try {
            const date = new Date(dateTime);
            return date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.warn('[Plugin] Error formatting datetime:', error);
            return dateTime.toString();
        }
    }

    /**
     * Format time only
     */
    formatTime(time) {
        if (!time) return '';
        
        try {
            const date = new Date(time);
            return date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.warn('[Plugin] Error formatting time:', error);
            return time.toString();
        }
    }

    /**
     * Update connection status display
     */
    updateConnectionStatus(isConnected) {
        const element = this.elements.connectionStatus;
        if (!element) return;
        
        const icon = element.querySelector('[data-feather]');
        
        if (isConnected) {
            element.className = 'badge bg-success';
            element.innerHTML = '<i data-feather="wifi" class="small-icon"></i> Online';
            if (icon) feather.replace();
        } else {
            element.className = 'badge bg-warning';
            element.innerHTML = '<i data-feather="wifi-off" class="small-icon"></i> Offline';
            if (icon) feather.replace();
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        this.hideAllStates();
        if (this.elements.loadingState) {
            this.elements.loadingState.classList.remove('d-none');
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        if (this.elements.loadingState) {
            this.elements.loadingState.classList.add('d-none');
        }
    }

    /**
     * Show main content
     */
    showMainContent() {
        this.hideAllStates();
        if (this.elements.mainContent) {
            this.elements.mainContent.classList.remove('d-none');
        }
    }

    /**
     * Show error state
     */
    showError(message) {
        console.error('[Plugin] Showing error:', message);
        
        this.hideAllStates();
        
        if (this.elements.errorState) {
            this.elements.errorState.classList.remove('d-none');
        }
        
        if (this.elements.errorMessage) {
            this.elements.errorMessage.textContent = message;
        }
    }

    /**
     * Hide all states
     */
    hideAllStates() {
        const states = [this.elements.loadingState, this.elements.errorState, this.elements.mainContent];
        states.forEach(state => {
            if (state) {
                state.classList.add('d-none');
            }
        });
    }

    /**
     * Show offline message
     */
    showOfflineMessage() {
        // Could add a toast or banner notification here
        console.log('[Plugin] Plugin is now in offline mode');
    }

    /**
     * Hide offline message
     */
    hideOfflineMessage() {
        console.log('[Plugin] Plugin is back online');
    }

    /**
     * Refresh data
     */
    refreshData() {
        console.log('[Plugin] Refreshing activity data');
        
        if (this.elements.refreshButton) {
            this.elements.refreshButton.disabled = true;
            this.elements.refreshButton.innerHTML = '<i data-feather="refresh-cw" class="me-1"></i> Refreshing...';
            feather.replace();
        }
        
        if (this.api && this.api.isPluginReady()) {
            this.api.requestActivityData();
            this.api.requestActivityProperties();
        } else {
            this.showError('Plugin not ready - cannot refresh data');
        }
        
        // Re-enable refresh button after delay
        setTimeout(() => {
            if (this.elements.refreshButton) {
                this.elements.refreshButton.disabled = false;
                this.elements.refreshButton.innerHTML = '<i data-feather="refresh-cw" class="me-1"></i> Refresh';
                feather.replace();
            }
        }, 2000);
    }

    /**
     * Retry initialization
     */
    retry() {
        console.log('[Plugin] Retrying plugin initialization');
        
        this.showLoadingState();
        
        // Cleanup current API if exists
        if (this.api) {
            this.api.destroy();
        }
        
        // Reinitialize
        setTimeout(() => {
            this.init();
        }, 1000);
    }

    /**
     * Cleanup plugin resources
     */
    cleanup() {
        console.log('[Plugin] Cleaning up plugin resources');
        
        if (this.api) {
            this.api.destroy();
            this.api = null;
        }
        
        // Remove event listeners
        if (this.elements.retryButton) {
            this.elements.retryButton.removeEventListener('click', this.retry);
        }
        
        if (this.elements.refreshButton) {
            this.elements.refreshButton.removeEventListener('click', this.refreshData);
        }
    }
}

// Initialize plugin when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Plugin] DOM loaded, initializing Activity Properties Plugin');
    window.activityPlugin = new ActivityPropertiesPlugin();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.activityPlugin) {
        window.activityPlugin.cleanup();
    }
});
