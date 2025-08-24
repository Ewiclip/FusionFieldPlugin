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

    // Method to display stations as accordion
    function displayStations(stationsData) {
        if (!stationsData || stationsData.length === 0) {
            return '<div class="error">No stations data available</div>';
        }

        const hideComplete = document.getElementById('hideCompleteStations')?.checked || false;
        const hideCheckedOut = document.getElementById('hideCheckedOutStations')?.checked || false;
        
        const filteredStations = stationsData.filter(station => {
            // Don't hide if complete stations are hidden and this station is complete
            if (hideComplete && station.status === 'Complete') {
                return false;
            }
            
            // Don't hide if checked out stations are hidden and this station is checked out by someone else
            if (hideCheckedOut && station.status === 'Checked Out' && station.checkedOutByID !== activeUserID) {
                return false;
            }
            
            return true;
        });

        const stationsHTML = filteredStations.map((station, index) => {
            const statusClass = station.status === 'Complete' ? 'status-complete' : 
                               station.status === 'Checked Out' ? 'status-checked-out' : 'status-open';
            
            // Check if station is checked out and current user doesn't have access
            const isCheckedOutByOther = station.status === 'Checked Out' && station.checkedOutByID !== activeUserID;
            // Check if station is not checked out by anyone (including current user)
            const isNotCheckedOut = station.status !== 'Checked Out';
            
            const cusHTML = station.stationCUs.map(cu => {
                const deletedClass = cu.deleted ? 'cu-deleted' : '';
                const isNewRow = cu.isNew;
                
                // Determine input classes based on whether it's a new row and station status
                const stockInputClass = isNewRow && !isCheckedOutByOther && !isNotCheckedOut ? 'cu-editable-input tooltip-trigger' : 'cu-readonly-input tooltip-trigger';
                const descInputClass = isNewRow && !isCheckedOutByOther && !isNotCheckedOut ? 'cu-editable-input tooltip-trigger' : 'cu-readonly-input tooltip-trigger';
                const dispSelectClass = isNewRow && !isCheckedOutByOther && !isNotCheckedOut ? 'cu-editable-select' : 'cu-readonly-select';
                const requiredInputClass = isNewRow ? 'cu-readonly-input' : 'cu-readonly-input';
                const installedInputClass = isNewRow && !isCheckedOutByOther && !isNotCheckedOut ? 'cu-editable-input' : 'cu-installed-input';
                
                return `
                    <div class="cu-grid-row ${deletedClass} ${isNewRow ? 'cu-new-row' : ''}">
                        <div class="cu-stock">
                            <div class="stock-input-container">
                                <input type="text" 
                                       class="${stockInputClass}" 
                                       value="${cu.stockNumber}" 
                                       ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? '' : 'readonly'}
                                       onclick="event.stopPropagation()"
                                       title="${cu.stockNumber}"
                                       ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `onchange="updateCUField('${station.stationId}', '${cu.cuId}', 'stockNumber', this.value)"` : ''}
                                />
                                ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut && !cu.deleted ? `<div class="search-icon" onclick="event.stopPropagation(); openSearchModal('${station.stationId}', '${cu.cuId}', 'stockNumber')">
                                    <div class="search-magnifier"></div>
                                </div>` : ''}
                            </div>
                        </div>
                        <div class="cu-description">
                            <input type="text" 
                                   class="${descInputClass}" 
                                   value="${cu.description}" 
                                   ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? '' : 'readonly'}
                                   onclick="event.stopPropagation()"
                                   title="${cu.description}"
                                   ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `onchange="updateCUField('${station.stationId}', '${cu.cuId}', 'description', this.value)"` : ''}
                            />
                        </div>
                        <div class="cu-disposition">
                            <select class="${dispSelectClass}" 
                                    onclick="event.stopPropagation()"
                                    ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? '' : 'disabled'}
                                    ${isNewRow && station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `onchange="updateCUField('${station.stationId}', '${cu.cuId}', 'plannedDisposition', this.value)"` : ''}>
                                <option value="Install" ${cu.plannedDisposition === 'Install' ? 'selected' : ''}>Install</option>
                                <option value="Scrap" ${cu.plannedDisposition === 'Scrap' ? 'selected' : ''}>Scrap</option>
                                <option value="Remove" ${cu.plannedDisposition === 'Remove' ? 'selected' : ''}>Remove</option>
                                <option value="Transfer" ${cu.plannedDisposition === 'Transfer' ? 'selected' : ''}>Transfer</option>
                                <option value="Keeper" ${cu.plannedDisposition === 'Keeper' ? 'selected' : ''}>Keeper</option>
                            </select>
                        </div>
                        <div class="cu-required">
                            <div class="required-input-container">
                                <input type="number" 
                                       class="${requiredInputClass}" 
                                       value="${cu.quantityRequired}" 
                                       readonly
                                       onclick="event.stopPropagation()"
                                />
                                ${cu.quantityRequired > 0 && !cu.deleted && !isCheckedOutByOther && !isNotCheckedOut ? `<div class="required-icon" onclick="event.stopPropagation(); copyRequiredToInstalled('${station.stationId}', '${cu.cuId}')">»</div>` : ''}
                            </div>
                        </div>
                        <div class="cu-installed">
                            <input type="number" 
                                   class="${installedInputClass}" 
                                   value="${cu.quantityInstalled}" 
                                   min="0" 
                                   step="1"
                                   ${station.status === 'Complete' || isCheckedOutByOther || isNotCheckedOut ? 'readonly' : ''}
                                   onclick="event.stopPropagation()"
                                   ${station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `onchange="updateInstalledQuantity('${station.stationId}', '${cu.cuId}', this.value)"` : ''}
                                   ${station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? 'onkeypress="return event.charCode >= 48 && event.charCode <= 57"' : ''}
                            />
                        </div>
                        <div class="cu-actions">
                            ${station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `<div class="trash-icon" onclick="event.stopPropagation(); toggleCUDeleted('${station.stationId}', '${cu.cuId}')">
                                <div class="trash-lid"></div>
                                <div class="trash-body"></div>
                            </div>` : ''}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="station-card" data-station-id="${station.stationId}">
                    <div class="accordion-header" onclick="toggleAccordion('${station.stationId}')">
                        <div class="station-info">
                            <div class="station-id-name">${station.stationId} - ${station.stationName}</div>
                            <div class="station-location-status">
                                <span><strong>Location:</strong> ${station.location}</span>
                                <span class="status-badge ${statusClass}">${station.status}</span>
                            </div>
                        </div>
                        <div class="accordion-icon">▼</div>
                    </div>
                    <div class="accordion-content" id="accordion-${station.stationId}">
                        <div class="accordion-inner ${station.status === 'Complete' ? 'station-complete' : ''} ${isCheckedOutByOther ? 'station-checked-out' : ''} ${isNotCheckedOut ? 'station-not-checked-out' : ''}">
                            ${station.status === 'Complete' ? '<div class="complete-overlay"></div>' : ''}
                            ${isCheckedOutByOther ? '<div class="checked-out-overlay"></div>' : ''}
                            ${isNotCheckedOut ? '<div class="not-checked-out-overlay"></div>' : ''}
                            <div class="cu-grid">
                                <div class="cu-grid-header">
                                    <div class="cu-stock">Stock #</div>
                                    <div class="cu-description">Description</div>
                                    <div class="cu-disposition">Planned Disposition</div>
                                    <div class="cu-required">
                                        <div class="planned-qty-container">
                                            <span class="planned-qty-label">Planned Qty</span>
                                            ${station.status !== 'Complete' && !isCheckedOutByOther && !isNotCheckedOut ? `<div class="copy-all-btn" onclick="event.stopPropagation(); copyAllRequiredToInstalled('${station.stationId}')" title="Copy all planned quantities to actual quantities">Bulk >></div>` : ''}
                                        </div>
                                    </div>
                                    <div class="cu-installed">Actual Qty</div>
                                    <div class="cu-actions">Actions</div>
                                </div>
                                ${cusHTML}
                            </div>
                            <div class="button-section">
                                <button class="add-row-btn" onclick="event.stopPropagation(); addNewRow('${station.stationId}')" ${station.status === 'Complete' || isNotCheckedOut ? 'disabled' : ''}>
                                    <span class="add-icon">+</span>
                                    Add New Row
                                </button>
                                ${station.status === 'Complete' ? '<div class="complete-message">✓ Station Complete - Read Only</div>' : ''}
                                ${isCheckedOutByOther ? `<div class="checked-out-message">
                                    <div class="checked-out-line1">Station Checked Out</div>
                                    <div class="checked-out-line2">${station.checkedOutByID} - ${station.checkedOutByName}</div>
                                </div>` : ''}
                                ${isNotCheckedOut && station.status !== 'Complete' ? `<div class="not-checked-out-message">
                                    <div class="not-checked-out-line1">Station Not Checked Out</div>
                                    <div class="not-checked-out-line2">Check out station to enable editing</div>
                                </div>` : ''}
                                ${station.status === 'Checked Out' && station.checkedOutByID === activeUserID ? 
                                    `<button class="complete-station-btn" onclick="event.stopPropagation(); completeStation('${station.stationId}')">
                                        <span class="complete-icon">✓</span>
                                        Complete Station
                                    </button>` : 
                                    station.status !== 'Complete' && station.status !== 'Checked Out' ? 
                                    `<button class="checkout-station-btn" onclick="event.stopPropagation(); checkoutStation('${station.stationId}')">
                                        <span class="checkout-icon"></span>
                                        Check Out Station
                                    </button>` : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `<div class="stations-accordion">${stationsHTML}</div>`;
    }

    // Method to toggle accordion sections
    function toggleAccordion(stationId) {
        const stationCard = document.querySelector(`[data-station-id="${stationId}"]`);
        const header = stationCard.querySelector('.accordion-header');
        const content = document.getElementById(`accordion-${stationId}`);
        
        // Check if this accordion is currently active
        const isCurrentlyActive = header.classList.contains('active');
        
        // Close all other accordions first
        const allHeaders = document.querySelectorAll('.accordion-header');
        const allContents = document.querySelectorAll('.accordion-content');
        
        allHeaders.forEach(h => {
            if (h !== header) {
                h.classList.remove('active');
            }
        });
        
        allContents.forEach(c => {
            if (c !== content) {
                c.classList.remove('active');
            }
        });
        
        // Toggle the clicked accordion
        if (!isCurrentlyActive) {
            // Open the clicked accordion
            header.classList.add('active');
            content.classList.add('active');
            
            // Move the expanded accordion to the top
            moveAccordionToTop(stationId);
        } else {
            // Close the clicked accordion (since it was already open)
            header.classList.remove('active');
            content.classList.remove('active');
        }
    }

    // Method to move an accordion to the top of the list
    function moveAccordionToTop(stationId) {
        const accordionContainer = document.querySelector('.stations-accordion');
        const expandedCard = document.querySelector(`[data-station-id="${stationId}"]`);
        
        // Check if it's already at the top
        if (accordionContainer.firstChild === expandedCard) {
            return;
        }
        
        // Remove it from its current position
        expandedCard.remove();
        
        // Insert it at the beginning
        accordionContainer.insertBefore(expandedCard, accordionContainer.firstChild);
        
        // Update the global data order to match the new visual order
        updateGlobalDataOrder(stationId);
    }

    // Method to update global data order after moving accordion
    function updateGlobalDataOrder(stationId) {
        if (!globalStationsData) return;
        
        // Find the expanded station data by stationId
        const expandedStationIndex = globalStationsData.findIndex(station => station.stationId === stationId);
        
        if (expandedStationIndex === -1) return;
        
        // Get the expanded station data
        const expandedStation = globalStationsData[expandedStationIndex];
        
        // Remove it from its current position
        globalStationsData.splice(expandedStationIndex, 1);
        
        // Add it to the beginning
        globalStationsData.unshift(expandedStation);
    }

    // Method to toggle deleted state of a CU (apply strikethrough)
    function toggleCUDeleted(stationId, cuId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Find the CU
        const cu = station.stationCUs.find(cu => cu.cuId === cuId);
        if (!cu) return;
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Toggle the deleted state
        cu.deleted = !cu.deleted;
        
        // Refresh the display
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        console.log(`Toggled deleted state for CU ${cuId} in station ${stationId}: ${cu.deleted}`);
    }

    // Method to update installed quantity for a CU
    function updateInstalledQuantity(stationId, cuId, newValue) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Find the CU
        const cu = station.stationCUs.find(cu => cu.cuId === cuId);
        if (!cu) return;
        
        // Parse and validate the new value
        const quantity = parseInt(newValue, 10);
        if (isNaN(quantity) || quantity < 0) {
            // Reset to previous value if invalid
            const input = document.querySelector(`[data-station-id="${stationId}"] input[onchange*="${cuId}"]`);
            if (input) {
                input.value = cu.quantityInstalled;
            }
            return;
        }
        
        // Update the quantity
        cu.quantityInstalled = quantity;
        
        console.log(`Updated installed quantity for CU ${cuId} in station ${stationId}: ${quantity}`);
    }

    // Method to add a new row to a station
    function addNewRow(stationId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Generate a unique CU ID for the new row
        const existingCUs = station.stationCUs;
        const maxCuId = Math.max(...existingCUs.map(cu => parseInt(cu.cuId.replace('CU', ''))), 0);
        const newCuId = `CU${String(maxCuId + 1).padStart(3, '0')}`;
        
        // Create new CU data
        const newCu = {
            stockNumber: '',
            description: '',
            cuId: newCuId,
            cuType: '',
            quantityRequired: '0',
            quantityInstalled: '0',
            plannedDisposition: 'Install',
            materialWasNotUsed: 'false',
            isNew: true // Flag to identify this as a new row
        };
        
        // Add to station's CUs
        station.stationCUs.push(newCu);
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Refresh the display
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        // Focus on the first input of the new row
        setTimeout(() => {
            const newRow = document.querySelector(`[data-station-id="${stationId}"] .cu-grid-row:last-child .cu-stock input`);
            if (newRow) {
                newRow.focus();
            }
        }, 100);
        
        console.log(`Added new row to station ${stationId} with CU ID: ${newCuId}`);
    }

    // Method to update CU field values for new rows
    function updateCUField(stationId, cuId, fieldName, newValue) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Find the CU
        const cu = station.stationCUs.find(cu => cu.cuId === cuId);
        if (!cu) return;
        
        // Update the field
        cu[fieldName] = newValue;
        
        console.log(`Updated ${fieldName} for CU ${cuId} in station ${stationId}: ${newValue}`);
    }

    // Method to check out a station
    function checkoutStation(stationId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Update the station status to Checked Out and set the current user as the one who checked it out
        station.status = 'Checked Out';
        station.checkedOutByID = activeUserID;
        station.checkedOutByName = 'Current User'; // You might want to get this from a user profile or session
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Refresh the display to show the updated status
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        console.log(`Checked out station ${stationId} by ${activeUserID}`);
    }

    // Method to complete a station
    function completeStation(stationId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Update the station status to Complete
        station.status = 'Complete';
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Refresh the display to show the updated status
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        console.log(`Completed station ${stationId}`);
    }

    // Method to copy required quantity to installed quantity
    function copyRequiredToInstalled(stationId, cuId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        // Find the CU
        const cu = station.stationCUs.find(cu => cu.cuId === cuId);
        if (!cu) return;
        
        // Copy the required quantity to installed quantity
        cu.quantityInstalled = cu.quantityRequired;
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Refresh the display to show the updated value
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        console.log(`Copied required quantity ${cu.quantityRequired} to installed quantity for CU ${cuId} in station ${stationId}`);
    }

    // Method to copy all required quantities to installed quantities for a station
    function copyAllRequiredToInstalled(stationId) {
        if (!globalStationsData) return;
        
        // Find the station
        const station = globalStationsData.find(s => s.stationId === stationId);
        if (!station) return;
        
        let copiedCount = 0;
        
        // Copy required quantities to installed quantities for all applicable CUs
        station.stationCUs.forEach(cu => {
            // Only copy if required quantity > 0 and CU is not deleted
            if (cu.quantityRequired > 0 && !cu.deleted) {
                cu.quantityInstalled = cu.quantityRequired;
                copiedCount++;
            }
        });
        
        // Remember which accordion is currently open
        const openAccordion = document.querySelector('.accordion-header.active');
        const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
        
        // Refresh the display to show the updated values
        renderMaterialsView();
        
        // Restore the accordion state
        if (openStationId) {
            const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
            const contentToReopen = document.getElementById(`accordion-${openStationId}`);
            if (headerToReopen && contentToReopen) {
                headerToReopen.classList.add('active');
                contentToReopen.classList.add('active');
            }
        }
        
        console.log(`Copied required quantities to installed quantities for ${copiedCount} CUs in station ${stationId}`);
    }

    // -----------------------------
    // Search Modal Functions
    // -----------------------------

    let currentSearchContext = null;

    function openSearchModal(stationId, cuId, fieldName) {
        currentSearchContext = { stationId, cuId, fieldName };
        document.getElementById('searchModal').style.display = 'block';
        document.getElementById('searchStockNumber').value = '';
        document.getElementById('searchDescription').value = '';
        filterSearchResults();
    }

    function closeSearchModal() {
        document.getElementById('searchModal').style.display = 'none';
        currentSearchContext = null;
    }

    function filterSearchResults() {
        const stockNumberFilter = document.getElementById('searchStockNumber').value.toLowerCase();
        const descriptionFilter = document.getElementById('searchDescription').value.toLowerCase();
        
        const filteredResults = preValidatedCUData.filter(item => {
            const stockMatch = item.preValidatedCUstockNumber.toLowerCase().includes(stockNumberFilter);
            
            // Handle multiple word search for description
            let descMatch = true;
            if (descriptionFilter.trim()) {
                const searchWords = descriptionFilter.split(' ').filter(word => word.trim() !== '');
                descMatch = searchWords.every(word => 
                    item.preValidatedCUDescription.toLowerCase().includes(word)
                );
            }
            
            return stockMatch && descMatch;
        });
        
        displaySearchResults(filteredResults);
    }

    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('searchResultsList');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No matching materials found.</div>';
            return;
        }
        
        const resultsHTML = results.slice(0, 50).map(item => `
            <div class="search-result-item" onclick="selectSearchResult('${item.preValidatedCUstockNumber}', '${item.preValidatedCUDescription.replace(/'/g, "\\'")}')">
                <div class="search-result-stock">${item.preValidatedCUstockNumber}</div>
                <div class="search-result-description">${item.preValidatedCUDescription}</div>
            </div>
        `).join('');
        
        resultsContainer.innerHTML = resultsHTML;
    }

    function selectSearchResult(stockNumber, description) {
        if (!currentSearchContext) return;
        
        const { stationId, cuId, fieldName } = currentSearchContext;
        
        // Update the field based on what was being edited
        if (fieldName === 'stockNumber') {
            updateCUField(stationId, cuId, 'stockNumber', stockNumber);
            updateCUField(stationId, cuId, 'description', description);
            
            // Remember which accordion is currently open
            const openAccordion = document.querySelector('.accordion-header.active');
            const openStationId = openAccordion ? openAccordion.closest('[data-station-id]').getAttribute('data-station-id') : null;
            
            // Refresh the display to show the updated values
            renderMaterialsView();
            
            // Restore the accordion state
            if (openStationId) {
                const headerToReopen = document.querySelector(`[data-station-id="${openStationId}"] .accordion-header`);
                const contentToReopen = document.getElementById(`accordion-${openStationId}`);
                if (headerToReopen && contentToReopen) {
                    headerToReopen.classList.add('active');
                    contentToReopen.classList.add('active');
                }
            }
        }
        
        closeSearchModal();
    }

    // -----------------------------
    // Filter Functions
    // -----------------------------

    function toggleCompleteStations() {
        if (globalStationsData) {
            // Preserve checkbox states before re-rendering
            const hideCompleteCheckbox = document.getElementById('hideCompleteStations');
            const hideCheckedOutCheckbox = document.getElementById('hideCheckedOutStations');
            const hideCompleteState = hideCompleteCheckbox ? hideCompleteCheckbox.checked : false;
            const hideCheckedOutState = hideCheckedOutCheckbox ? hideCheckedOutCheckbox.checked : false;
            
            renderMaterialsView();
            
            // Restore checkbox states after re-rendering
            setTimeout(() => {
                const newHideCompleteCheckbox = document.getElementById('hideCompleteStations');
                const newHideCheckedOutCheckbox = document.getElementById('hideCheckedOutStations');
                
                if (newHideCompleteCheckbox) {
                    newHideCompleteCheckbox.checked = hideCompleteState;
                }
                if (newHideCheckedOutCheckbox) {
                    newHideCheckedOutCheckbox.checked = hideCheckedOutState;
                }
            }, 0);
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

        // Always show materials view
        renderMaterialsView();
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
                            <input type="checkbox" id="hideCheckedOutStations" onchange="toggleCompleteStations()">
                            <span class="checkmark"></span>
                            Hide Checked Out By Others
                        </label>
                    </div>
                </div>
            </div>
            
            <div id="stationsContainer">
                ${displayStations(globalStationsData)}
            </div>
        `;

        dynamicContent.innerHTML = content;
    }

    // Initialize materials view (always show materials)
    function initializeMaterialsView() {
        // Always load materials data fresh
        loadXMLData().then(data => {
            globalStationsData = data.stations;
            globalActivityData = data.activity;
            renderMaterialsView();
        }).catch(error => {
            console.error('Error loading materials data:', error);
            document.getElementById("dynamicContent").innerHTML = 
                '<div class="error">Error loading materials data: ' + error + '</div>';
        });
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

    // Fallback: Auto-load materials data after a reasonable delay even if OFS doesn't respond
    setTimeout(() => {
      if (!globalStationsData) {
        console.log('Fallback: Loading materials data after timeout');
        initializeMaterialsView();
      }
    }, 2000);

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
        // Auto-load materials data after init with longer delay to ensure DOM is ready
        setTimeout(() => {
          initializeMaterialsView();
        }, 500);
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
          // Even if no activity data, still show materials view
          initializeMaterialsView();
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
        // Re-render materials view
        initializeMaterialsView();
      });
    }

    // Hide the toggle materials button since materials view is always visible
    var toggleMaterialsBtn = document.getElementById("toggleMaterialsBtn");
    if (toggleMaterialsBtn) {
      toggleMaterialsBtn.style.display = "none";
    }

    // Make functions globally available for HTML onclick handlers
    window.openSearchModal = openSearchModal;
    window.closeSearchModal = closeSearchModal;
    window.filterSearchResults = filterSearchResults;
    window.toggleCompleteStations = toggleCompleteStations;
    window.toggleAccordion = toggleAccordion;
    window.toggleCUDeleted = toggleCUDeleted;
    window.updateInstalledQuantity = updateInstalledQuantity;
    window.addNewRow = addNewRow;
    window.updateCUField = updateCUField;
    window.checkoutStation = checkoutStation;
    window.completeStation = completeStation;
    window.copyRequiredToInstalled = copyRequiredToInstalled;
    window.copyAllRequiredToInstalled = copyAllRequiredToInstalled;
    window.selectSearchResult = selectSearchResult;

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('searchModal');
        if (event.target === modal) {
            closeSearchModal();
        }
    }

  })();
  