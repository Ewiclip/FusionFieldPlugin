// plugin.js
// Enhanced OFS Plugin with Materials Display
// Integrates both basic activity data and comprehensive materials management

(function () {
    // -----------------------------
    // Helpers / State
    // -----------------------------
    function send(msg) {
      // Send messages to the OFS host (Plugin API)
      window.parent.postMessage(msg, "*");
    }
  
    // Keep the most recent 'open' payload in case you need it later
    var latestOpen = null;
    
    // Global variables for materials functionality
    let globalStationsData = null;
    let globalActivityData = null;
    let activeUserID = "AmerenIDNotMe";
    let showMaterialsView = false;

    // Choose which fields to display (must also be included in OFS "Available Properties")
    var fieldsToShow = [
      "aid",            // Activity ID
      "appt_number",    // Appointment / WO number (example; use what your tenant exposes)
      "customer_number",
      "astatus",        // Activity status code
      "resource_id",    // Assigned tech
      // "u_workorder_id",
      // "u_my_prop"
    ];

    // -----------------------------
    // Materials Data Processing
    // -----------------------------
    
    // Method to load and parse XML data from external fake_data.js file
    function loadXMLData() {
        return new Promise((resolve, reject) => {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(embeddedXMLData, 'text/xml');
                const parsedData = parseXMLData(xmlDoc);
                resolve(parsedData);
            } catch (error) {
                reject('Error parsing XML: ' + error.message);
            }
        });
    }

    // Method to parse XML data and extract stations information
    function parseXMLData(xmlDoc) {
        const activity = xmlDoc.querySelector('activity');
        if (!activity) {
            throw new Error('No activity element found in XML');
        }

        // Parse activity-level data
        const activityData = {
            activityId: getElementText(activity, 'activityId'),
            activityType: getElementText(activity, 'activityType')
        };

        // Parse stations data
        const stations = activity.querySelectorAll('station');
        const stationsData = [];

        stations.forEach(station => {
            const stationData = {
                stationId: getElementText(station, 'stationId'),
                stationName: getElementText(station, 'stationName'),
                location: getElementText(station, 'location'),
                status: getElementText(station, 'status'),
                checkedOutByName: getElementText(station, 'checkedOutByName'),
                checkedOutByID: getElementText(station, 'checkedOutByID'),
                stationCUs: []
            };

            // Parse station CUs
            const stationCUs = station.querySelectorAll('stationCU');
            stationCUs.forEach(cu => {
                const cuData = {
                    stockNumber: getElementText(cu, 'stationCUstockNumber'),
                    description: getElementText(cu, 'stationCUDescription'),
                    cuId: getElementText(cu, 'stationCUId'),
                    cuType: getElementText(cu, 'stationCUType'),
                    quantityRequired: getElementText(cu, 'stationCUQuantityRequired'),
                    quantityInstalled: getElementText(cu, 'stationCUQuantityInstalled'),
                    plannedDisposition: getElementText(cu, 'stationCUPlannedDisposition'),
                    materialWasNotUsed: getElementText(cu, 'stationCUMaterialWasNotUsed')
                };
                stationData.stationCUs.push(cuData);
            });

            stationsData.push(stationData);
        });

        return {
            activity: activityData,
            stations: stationsData
        };
    }

    // Helper method to safely get element text
    function getElementText(parent, elementName) {
        const element = parent.querySelector(elementName);
        return element ? element.textContent.trim() : '';
    }

    // -----------------------------
    // Materials Display Functions
    // -----------------------------

    // Method to display activity information
    function displayActivityInfo(activityData) {
        return `
            <div class="activity-info">
                <h2>Activity Information</h2>
                <p><strong>Activity ID:</strong> ${activityData.activityId}</p>
                <p><strong>Activity Type:</strong> ${activityData.activityType}</p>
            </div>
        `;
    }

    // Method to update summary statistics
    function updateSummaryStats(stationsData) {
        const totalStations = stationsData.length;
        const totalCUs = getTotalCUs();
        const openStations = getStationsByStatus('Open').length;
        const completeStations = getStationsByStatus('Complete').length;
        const checkedOutStations = getStationsByStatus('Checked Out').length;
        
        return `
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Stations:</span>
                    <span class="stat-value">${totalStations}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total CUs:</span>
                    <span class="stat-value">${totalCUs}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Open Stations:</span>
                    <span class="stat-value">${openStations}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Complete Stations:</span>
                    <span class="stat-value">${completeStations}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Checked Out Stations:</span>
                    <span class="stat-value">${checkedOutStations}</span>
                </div>
            </div>
        `;
    }

    // Helper functions for materials
    function getTotalCUs() {
        if (!globalStationsData) return 0;
        return globalStationsData.reduce((total, station) => total + station.stationCUs.length, 0);
    }

    function getStationsByStatus(status) {
        if (!globalStationsData) return [];
        return globalStationsData.filter(station => station.status === status);
    }

    // Method to display stations
    function displayStations(stationsData) {
        if (!stationsData || stationsData.length === 0) {
            return '<div class="no-stations">No stations data available.</div>';
        }

        const hideComplete = document.getElementById('hideCompleteStations')?.checked || false;
        const hideCheckedOut = document.getElementById('hideCheckedOutStations')?.checked || false;

        let filteredStations = stationsData;
        
        if (hideComplete) {
            filteredStations = filteredStations.filter(station => station.status !== 'Complete');
        }
        
        if (hideCheckedOut) {
            filteredStations = filteredStations.filter(station => station.status !== 'Checked Out');
        }

        if (filteredStations.length === 0) {
            return '<div class="no-stations">No stations match the current filters.</div>';
        }

        return filteredStations.map(station => createStationHTML(station)).join('');
    }

    // Create HTML for a single station
    function createStationHTML(station) {
        const statusClass = getStatusClass(station.status);
        const isCheckedOut = station.status === 'Checked Out';
        const checkedOutInfo = isCheckedOut ? 
            `<div class="checked-out-info">Checked out by: ${station.checkedOutByName} (${station.checkedOutByID})</div>` : '';

        return `
            <div class="station-card ${statusClass}">
                <div class="station-header">
                    <h3>${station.stationName}</h3>
                    <div class="station-meta">
                        <span class="station-id">${station.stationId}</span>
                        <span class="station-location">${station.location}</span>
                        <span class="station-status ${statusClass}">${station.status}</span>
                    </div>
                    ${checkedOutInfo}
                </div>
                <div class="station-cus">
                    ${station.stationCUs.map(cu => createCUHTML(cu)).join('')}
                </div>
            </div>
        `;
    }

    // Create HTML for a single CU
    function createCUHTML(cu) {
        const progressPercent = cu.quantityRequired > 0 ? 
            (cu.quantityInstalled / cu.quantityRequired) * 100 : 0;
        const progressClass = progressPercent === 100 ? 'complete' : 
            progressPercent > 0 ? 'partial' : 'not-started';

        return `
            <div class="cu-item">
                <div class="cu-header">
                    <span class="cu-stock-number">${cu.stockNumber}</span>
                    <span class="cu-type">${cu.cuType}</span>
                </div>
                <div class="cu-description">${cu.description}</div>
                <div class="cu-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${progressPercent}%"></div>
                    </div>
                    <span class="progress-text">${cu.quantityInstalled}/${cu.quantityRequired}</span>
                </div>
                <div class="cu-disposition">${cu.plannedDisposition}</div>
            </div>
        `;
    }

    // Get CSS class for status
    function getStatusClass(status) {
        switch (status) {
            case 'Open': return 'status-open';
            case 'Complete': return 'status-complete';
            case 'Checked Out': return 'status-checked-out';
            default: return 'status-unknown';
        }
    }

    // -----------------------------
    // Search Modal Functions
    // -----------------------------

    function openSearchModal() {
        document.getElementById('searchModal').style.display = 'block';
        filterSearchResults();
    }

    function closeSearchModal() {
        document.getElementById('searchModal').style.display = 'none';
    }

    function filterSearchResults() {
        const stockNumberFilter = document.getElementById('searchStockNumber').value.toLowerCase();
        const descriptionFilter = document.getElementById('searchDescription').value.toLowerCase();
        
        const filteredResults = preValidatedCUData.filter(item => {
            const matchesStock = item.preValidatedCUstockNumber.toLowerCase().includes(stockNumberFilter);
            const matchesDescription = item.preValidatedCUDescription.toLowerCase().includes(descriptionFilter);
            return matchesStock && matchesDescription;
        });

        displaySearchResults(filteredResults);
    }

    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('searchResultsList');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No materials found matching your search criteria.</div>';
            return;
        }

        const resultsHTML = results.map(item => `
            <div class="search-result-item">
                <div class="result-stock-number">${item.preValidatedCUstockNumber}</div>
                <div class="result-description">${item.preValidatedCUDescription}</div>
            </div>
        `).join('');

        resultsContainer.innerHTML = resultsHTML;
    }

    // -----------------------------
    // Filter Functions
    // -----------------------------

    function toggleCompleteStations() {
        if (globalStationsData) {
            renderMaterialsView();
        }
    }

    function toggleCheckedOutStations() {
        if (globalStationsData) {
            renderMaterialsView();
        }
    }

    // -----------------------------
    // Main Render Functions
    // -----------------------------

    // Render basic activity data (original functionality)
    function renderActivity(activity) {
        // Hide loading state
        var loadingState = document.getElementById("loadingState");
        if (loadingState) loadingState.style.display = "none";

        // Update status indicator
        var statusIndicator = document.getElementById("statusIndicator");
        if (statusIndicator) {
            statusIndicator.innerHTML = '<span class="status-text success">✅ Connected to OFS</span>';
        }

        // Get the dynamic content container
        var dynamicContent = document.getElementById("dynamicContent");
        if (!dynamicContent) return;

        // Clear previous content
        dynamicContent.innerHTML = "";

        if (showMaterialsView) {
            renderMaterialsView();
        } else {
            renderBasicActivityView(activity);
        }
    }

    // Render basic activity view (original functionality)
    function renderBasicActivityView(activity) {
        var dynamicContent = document.getElementById("dynamicContent");
        
        // Build a details container
        var wrap = document.createElement("div");
        wrap.id = "activityDetails";
        wrap.style.marginTop = "12px";

        var list = document.createElement("div");
        list.style.display = "grid";
        list.style.gridTemplateColumns = "180px 1fr";
        list.style.gap = "6px 12px";

        // Header
        var h = document.createElement("div");
        h.style.gridColumn = "1 / -1";
        h.style.fontWeight = "600";
        h.style.marginBottom = "4px";
        h.textContent = "Activity Details";
        list.appendChild(h);

        // Rows for chosen fields (only if present on the payload)
        for (var i = 0; i < fieldsToShow.length; i++) {
            var key = fieldsToShow[i];
            if (Object.prototype.hasOwnProperty.call(activity, key)) {
                var label = document.createElement("div");
                label.textContent = key;
                label.style.opacity = "0.8";

                var value = document.createElement("div");
                var val = activity[key];
                // Stringify objects/arrays defensively
                if (val !== null && typeof val === "object") {
                    try {
                        value.textContent = JSON.stringify(val);
                    } catch (e) {
                        value.textContent = String(val);
                    }
                } else {
                    value.textContent = val !== undefined ? String(val) : "";
                }

                list.appendChild(label);
                list.appendChild(value);
            }
        }

        // Fallback if none of the requested fields were present
        if (list.children.length <= 1) {
            var note = document.createElement("div");
            note.style.gridColumn = "1 / -1";
            note.textContent =
                "No requested fields were found in the payload. " +
                "Ensure they're added under the plugin's Available Properties in OFS.";
            list.appendChild(note);
        }

        wrap.appendChild(list);
        dynamicContent.appendChild(wrap);
    }

    // Render materials view
    function renderMaterialsView() {
        var dynamicContent = document.getElementById("dynamicContent");
        
        if (!globalStationsData) {
            dynamicContent.innerHTML = '<div class="loading">Loading materials data...</div>';
            return;
        }

        const content = `
            ${displayActivityInfo(globalActivityData)}
            
            <div class="controls">
                ${updateSummaryStats(globalStationsData)}
                
                <div class="filter-controls">
                    <div class="filter-checkboxes">
                        <label class="filter-checkbox">
                            <input type="checkbox" id="hideCompleteStations" onchange="toggleCompleteStations()">
                            <span class="checkmark"></span>
                            Hide Complete Stations
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" id="hideCheckedOutStations" onchange="toggleCheckedOutStations()">
                            <span class="checkmark"></span>
                            Hide Checked Out By Others
                        </label>
                    </div>
                </div>
            </div>
            
            <div id="stationsContainer" class="stations-container">
                ${displayStations(globalStationsData)}
            </div>
        `;

        dynamicContent.innerHTML = content;
    }

    // Toggle between basic and materials view
    function toggleMaterialsView() {
        showMaterialsView = !showMaterialsView;
        
        if (showMaterialsView) {
            // Load materials data if not already loaded
            if (!globalStationsData) {
                loadXMLData().then(data => {
                    globalStationsData = data.stations;
                    globalActivityData = data.activity;
                    renderMaterialsView();
                }).catch(error => {
                    console.error('Error loading materials data:', error);
                    document.getElementById("dynamicContent").innerHTML = 
                        '<div class="error">Error loading materials data: ' + error + '</div>';
                });
            } else {
                renderMaterialsView();
            }
        } else {
            // Switch back to basic view
            if (latestOpen && latestOpen.activity) {
                renderBasicActivityView(latestOpen.activity);
            }
        }
    }

    // -----------------------------
    // Handshake with OFS
    // -----------------------------
    // Tell OFS we're ready ASAP. Avoid delaying on framework boot, network, etc.
    send({
      apiVersion: 1,
      method: "ready",
      showHeader: true,
      enableBackButton: true,
      sendMessageAsJsObject: true
      // Optional: request only specific data to reduce payload size
      // dataItems: [{ entity: "activity", properties: fieldsToShow }]
    });

    // Listen for messages from OFS
    window.addEventListener("message", function (evt) {
      var data = evt.data;

      // Older paths can send a JSON string; normalize to object
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // Ignore non-JSON strings
        }
      }
      if (!data || !data.method) return;

      // OFS init → acknowledge so the host can complete its init flow
      if (data.method === "init") {
        send({ apiVersion: 1, method: "initEnd" });
        return;
      }

      // OFS open → contains the context payload (activity/activityList/etc.)
      if (data.method === "open") {
        latestOpen = data;

        // When opened on Activity details, you'll get data.activity
        // When opened on an Activity list, you may get data.activityList instead
        if (data.activity) {
          renderActivity(data.activity);
        } else if (data.activityList && data.activityList.length) {
          // If invoked from a list, show the first item as an example
          renderActivity(data.activityList[0]);
        } else {
          // Update status for no activity data
          var statusIndicator = document.getElementById("statusIndicator");
          if (statusIndicator) {
            statusIndicator.innerHTML = '<span class="status-text warning">ℹ️ No activity data available</span>';
          }
          
          var dynamicContent = document.getElementById("dynamicContent");
          if (dynamicContent) {
            dynamicContent.innerHTML = '<div class="no-data-message">No activity data was provided by OFS.</div>';
          }
        }
        return;
      }
    });

    // -----------------------------
    // Event Handlers
    // -----------------------------
    var closeBtn = document.getElementById("closeBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        send({ apiVersion: 1, method: "close", isSuccess: true });
      });
    }

    var refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", function () {
        // Re-render with latest data if available
        if (latestOpen && latestOpen.activity) {
          renderActivity(latestOpen.activity);
        }
      });
    }

    var toggleMaterialsBtn = document.getElementById("toggleMaterialsBtn");
    if (toggleMaterialsBtn) {
      toggleMaterialsBtn.addEventListener("click", function () {
        toggleMaterialsView();
      });
    }

    // Make functions globally available for HTML onclick handlers
    window.openSearchModal = openSearchModal;
    window.closeSearchModal = closeSearchModal;
    window.filterSearchResults = filterSearchResults;
    window.toggleCompleteStations = toggleCompleteStations;
    window.toggleCheckedOutStations = toggleCheckedOutStations;

  })();
  