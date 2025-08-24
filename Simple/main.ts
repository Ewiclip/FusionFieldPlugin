// Main entry point for Angular OFS Plugin
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OFSPluginModule } from './angular-app.module';

platformBrowserDynamic().bootstrapModule(OFSPluginModule)
  .catch(err => console.error('Error bootstrapping Angular app:', err));
