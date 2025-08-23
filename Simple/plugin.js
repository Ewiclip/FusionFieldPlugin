// plugin.js
// Minimal, framework-free OFS Plugin script that:
// 1) Handshakes with OFS (ready → initEnd)
// 2) Reads the 'open' payload when launched on an Activity page
// 3) Renders selected Activity fields to the page
// 4) Supports a Close button

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
  
    // Choose which fields to display (must also be included in OFS "Available Properties")
    // Tip: add your custom properties here, e.g., 'u_workorder_id', 'u_my_prop'
    var fieldsToShow = [
      "aid",            // Activity ID
      "appt_number",    // Appointment / WO number (example; use what your tenant exposes)
      "customer_number",
      "astatus",        // Activity status code
      "resource_id",    // Assigned tech
      // "u_workorder_id",
      // "u_my_prop"
    ];
  
    // Render a simple two-column list of selected fields (if present)
    function renderActivity(activity) {
      var app = document.getElementById("app");
      if (!app) return;
  
      // Replace the first text node with a status line
      if (app.firstChild && app.firstChild.nodeType === Node.TEXT_NODE) {
        app.firstChild.nodeValue = "✅ OFS sent 'open'. Plugin is active.";
      }
  
      // Remove any previous details panel
      var old = document.getElementById("activityDetails");
      if (old) old.parentNode.removeChild(old);
  
      // Build a details container
      var wrap = document.createElement("div");
      wrap.id = "activityDetails";
      wrap.style.marginTop = "12px";
  
      // If you’d like to show everything for debugging, flip this flag to true
      var debugShowAll = false;
  
      if (debugShowAll) {
        var pre = document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.textContent = JSON.stringify(activity, null, 2);
        wrap.appendChild(pre);
      } else {
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
            "Ensure they’re added under the plugin’s Available Properties in OFS.";
          list.appendChild(note);
        }
  
        wrap.appendChild(list);
      }
  
      app.appendChild(wrap);
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
          var app = document.getElementById("app");
          if (app && app.firstChild && app.firstChild.nodeType === Node.TEXT_NODE) {
            app.firstChild.nodeValue =
              "ℹ️ Plugin opened, but no single activity payload was provided.";
          }
        }
        return;
      }
    });
  
    // -----------------------------
    // Example: programmatic close
    // -----------------------------
    var closeBtn = document.getElementById("closeBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        send({ apiVersion: 1, method: "close", isSuccess: true });
      });
    }
  })();
  