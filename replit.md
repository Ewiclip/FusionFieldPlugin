# Oracle Fusion Field Service Activity Properties Plugin

## Overview

This is a web-based plugin for Oracle Fusion Field Service that displays activity properties within the Activity entity context. The plugin provides a modern, responsive interface for viewing key activity information including Activity ID, Customer Name, Status, Scheduled Time, Activity Type, Duration, Location, Assigned Resources, and Priority. It's built as a Progressive Web App (PWA) with full offline functionality and real-time data synchronization with the Oracle Fusion Field Service platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with no heavy frameworks
- **UI Framework**: Bootstrap 5.3.0 for responsive design and consistent styling
- **Icon System**: Feather Icons for modern, scalable iconography
- **Progressive Web App**: Full PWA implementation with manifest.json and service worker for app-like experience
- **Responsive Design**: Mobile-first approach supporting desktop, tablet, and mobile devices

### Plugin Integration Architecture
- **Oracle Plugin API**: Custom JavaScript class (`PluginAPI`) implementing Oracle Fusion Field Service Plugin API specifications
- **Message-based Communication**: Uses window.postMessage for secure communication with the parent Oracle application
- **Context-aware**: Operates within the Activity entity context to display relevant activity properties
- **Real-time Updates**: Automatic synchronization when activity data changes in the parent system

### Offline and Caching Strategy
- **Service Worker**: Advanced caching implementation (`sw.js`) for offline functionality
- **Cache Strategy**: Multi-tier caching with different durations for static resources (7 days), API responses (1 hour), and dynamic content (15 minutes)
- **Resource Caching**: Pre-caches all essential files including CSS, JavaScript, and external CDN resources
- **API Response Caching**: Caches Oracle Fusion Field Service API responses for offline access

### Performance and User Experience
- **Loading States**: Comprehensive loading, error, and success state management
- **Error Handling**: Robust error handling with retry mechanisms and user-friendly error messages
- **Connection Monitoring**: Real-time online/offline status detection and display
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation support

### Code Organization
- **Modular Structure**: Separation of concerns with dedicated files for API integration, UI logic, and styling
- **Event-driven Architecture**: Uses callback patterns and event listeners for responsive user interactions
- **Configuration Management**: Centralized configuration through CSS custom properties and JavaScript constants

## External Dependencies

### CDN Dependencies
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Feather Icons**: Icon library for consistent iconography across the interface

### Oracle Integration
- **Oracle Fusion Field Service Plugin API**: Core integration point for communicating with the Oracle platform
- **Oracle Activity Entity Context**: Retrieves and displays activity-specific data from Oracle's backend systems

### Development Dependencies
- **http-server**: Local development server for testing and development
- **Node.js Package Management**: Standard npm configuration for dependency management

### Browser APIs
- **Service Worker API**: For offline functionality and resource caching
- **Web App Manifest**: For PWA installation and mobile app-like behavior
- **PostMessage API**: For secure cross-frame communication with Oracle Fusion Field Service
- **LocalStorage/IndexedDB**: For offline data persistence and caching strategies