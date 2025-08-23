(function () {
    // Helper to send messages to OFS
    function send(msg) {
      window.parent.postMessage(msg, "*");
    }
  
    // 1) Tell OFS we’re ready ASAP
    send({
      apiVersion: 1,
      method: "ready",
      showHeader: true,
      enableBackButton: true,
      sendMessageAsJsObject: true
    });
  
    // 2) Listen for messages from OFS
    window.addEventListener("message", function (evt) {
      let data = evt.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch { /* ignore */ }
      }
      if (!data || !data.method) return;
  
      if (data.method === "init") {
        // (Optional but safe) Acknowledge init so OFS can finish
        send({ apiVersion: 1, method: "initEnd" });
      }
  
      if (data.method === "open") {
        // 'open' carries the context payload (activity/resource/etc.)
        const el = document.getElementById("app");
        el.firstChild.nodeValue = "✅ OFS sent 'open'. Plugin is active.";
        // console.log("OPEN payload:", data);
      }
    });
  
    // 3) Example: programmatic close
    document.getElementById("closeBtn").addEventListener("click", function () {
      send({ apiVersion: 1, method: "close", isSuccess: true });
    });
  })();
  