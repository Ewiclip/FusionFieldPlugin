// Angular Component for OFS Plugin
(function() {
  'use strict';

  // Angular Component Definition
  const OFSPluginComponent = {
    selector: 'ofs-plugin',
    template: document.querySelector('#app').innerHTML,
    // Styles are now in external CSS file: angular-component.css
    styleUrls: ['angular-component.css']
  };

  // Angular Component Class
  class OFSPluginController {
    constructor() {
      // State
      this.isConnected = false;
      this.activity = null;
      this.debugShowAll = false;
      this.statusMessage = 'Initializing...';
      this.statusClass = '';

      // Fields to display
      this.fieldsToShow = [
        "aid",            // Activity ID
        "appt_number",    // Appointment / WO number
        "customer_number",
        "astatus",        // Activity status code
        "resource_id",    // Assigned tech
        // "u_workorder_id",
        // "u_my_prop"
      ];

      // Computed property for available fields
      this.availableFields = [];

      // OFS Integration
      this.latestOpen = null;
      this.initOFS();
    }

    // OFS Integration Methods
    initOFS() {
      this.send({ 
        apiVersion: 1, 
        method: "ready", 
        showHeader: true, 
        enableBackButton: true, 
        sendMessageAsJsObject: true 
      });

      window.addEventListener("message", (evt) => this.handleOFSMessage(evt));
    }

    send(msg) {
      window.parent.postMessage(msg, "*");
    }

    handleOFSMessage(evt) {
      let data = evt.data;

      // Normalize JSON strings to objects
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          return; // Ignore non-JSON strings
        }
      }

      if (!data || !data.method) return;

      // Handle different OFS messages
      switch (data.method) {
        case "init":
          this.send({ apiVersion: 1, method: "initEnd" });
          break;
        case "open":
          this.handleOpenMessage(data);
          break;
      }
    }

    handleOpenMessage(data) {
      this.latestOpen = data;
      this.isConnected = true;

      if (data.activity) {
        this.setActivity(data.activity);
      } else if (data.activityList && data.activityList.length) {
        this.setActivity(data.activityList[0]);
      } else {
        this.setNoActivity();
      }
    }

    setActivity(activity) {
      this.activity = activity;
      this.statusMessage = '✅ Connected to OFS';
      this.statusClass = 'success';
      
      // Calculate available fields
      this.availableFields = this.fieldsToShow.filter(field => 
        Object.prototype.hasOwnProperty.call(activity, field)
      );
    }

    setNoActivity() {
      this.activity = null;
      this.availableFields = [];
      this.statusMessage = 'ℹ️ No activity data available';
      this.statusClass = 'warning';
    }

    // UI Methods
    closePlugin() {
      this.send({ apiVersion: 1, method: "close", isSuccess: true });
    }

    refreshData() {
      if (this.latestOpen && this.latestOpen.activity) {
        this.setActivity(this.latestOpen.activity);
      }
    }

    toggleDebug() {
      this.debugShowAll = !this.debugShowAll;
    }

    formatFieldValue(value) {
      if (value === null || value === undefined) {
        return '';
      }
      
      if (typeof value === 'object') {
        try {
          return JSON.stringify(value);
        } catch (e) {
          return String(value);
        }
      }
      
      return String(value);
    }
  }

  // Angular Module and Component Registration
  angular.module('ofsPlugin', [])
    .component('ofsPlugin', {
      template: OFSPluginComponent.template,
      controller: OFSPluginController,
      controllerAs: 'vm'
    });

  // Bootstrap Angular when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    angular.bootstrap(document, ['ofsPlugin']);
  });

})();
