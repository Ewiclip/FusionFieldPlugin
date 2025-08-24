// Angular Component for OFS Plugin - TypeScript Version
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Activity {
  aid?: string;
  appt_number?: string;
  customer_number?: string;
  astatus?: string;
  resource_id?: string;
  [key: string]: any;
}

interface OFSMessage {
  apiVersion: number;
  method: string;
  activity?: Activity;
  activityList?: Activity[];
  [key: string]: any;
}

@Component({
  selector: 'ofs-plugin',
  templateUrl: './angular-component.html',
  styleUrls: ['./angular-component.css']
})
export class OFSPluginComponent implements OnInit, OnDestroy {
  // Component State
  isConnected = false;
  activity: Activity | null = null;
  debugShowAll = false;
  statusMessage = 'Initializing...';
  statusClass = '';

  // Fields to display
  fieldsToShow = [
    "aid",            // Activity ID
    "appt_number",    // Appointment / WO number
    "customer_number",
    "astatus",        // Activity status code
    "resource_id",    // Assigned tech
    // "u_workorder_id",
    // "u_my_prop"
  ];

  // Computed property for available fields
  availableFields: string[] = [];

  // OFS Integration
  private latestOpen: OFSMessage | null = null;
  private messageHandler: (event: MessageEvent) => void;

  constructor() {
    // Bind the message handler to maintain 'this' context
    this.messageHandler = this.handleOFSMessage.bind(this);
  }

  ngOnInit(): void {
    this.initOFS();
  }

  ngOnDestroy(): void {
    // Clean up event listener
    window.removeEventListener('message', this.messageHandler);
  }

  // OFS Integration Methods
  private initOFS(): void {
    this.send({ 
      apiVersion: 1, 
      method: "ready", 
      showHeader: true, 
      enableBackButton: true, 
      sendMessageAsJsObject: true 
    });

    window.addEventListener("message", this.messageHandler);
  }

  private send(msg: OFSMessage): void {
    window.parent.postMessage(msg, "*");
  }

  private handleOFSMessage(evt: MessageEvent): void {
    let data: OFSMessage = evt.data;

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

  private handleOpenMessage(data: OFSMessage): void {
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

  private setActivity(activity: Activity): void {
    this.activity = activity;
    this.statusMessage = '✅ Connected to OFS';
    this.statusClass = 'success';
    
    // Calculate available fields
    this.availableFields = this.fieldsToShow.filter(field => 
      Object.prototype.hasOwnProperty.call(activity, field)
    );
  }

  private setNoActivity(): void {
    this.activity = null;
    this.availableFields = [];
    this.statusMessage = 'ℹ️ No activity data available';
    this.statusClass = 'warning';
  }

  // UI Methods
  closePlugin(): void {
    this.send({ apiVersion: 1, method: "close", isSuccess: true });
  }

  refreshData(): void {
    if (this.latestOpen && this.latestOpen.activity) {
      this.setActivity(this.latestOpen.activity);
    }
  }

  toggleDebug(): void {
    this.debugShowAll = !this.debugShowAll;
  }

  formatFieldValue(value: any): string {
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
