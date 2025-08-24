// Angular Module for OFS Plugin
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { OFSPluginComponent } from './angular-component';

@NgModule({
  declarations: [
    OFSPluginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [OFSPluginComponent]
})
export class OFSPluginModule { }
