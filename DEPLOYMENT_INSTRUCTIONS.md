# Oracle Fusion Field Service Activity Properties Plugin
## Deployment and Configuration Instructions

### Plugin Overview
This is a Plugin Archive for Oracle Fusion Field Service that displays activity properties within the Activity entity context. The plugin features a modern, responsive interface with real-time data synchronization and offline functionality.

### Plugin Features
- Display key activity properties (ID, Customer, Status, Schedule, Type, Duration, Location, Resources, Priority)
- Real-time data updates when activity information changes
- Offline functionality with Service Worker implementation
- Responsive design for desktop, tablet, and mobile devices
- Plugin API integration for seamless Oracle Fusion Field Service communication
- **Simplified deployment** - No configuration files needed, all settings managed through Oracle interface

---

## STEP 1: Upload the Plugin Archive

### Prerequisites
- Oracle Fusion Field Service administrator access
- The `ofs-activity-properties-plugin-no-config.zip` file

### Upload Process
1. **Access Oracle Fusion Field Service Administration**
   - Log in to your Oracle Fusion Field Service instance
   - Navigate to Configuration → Forms & Plugins

2. **Create New Plugin**
   - Click "Add Plugin" or "New Plugin"
   - Select plugin type: **"PlugIn Archive"**
   - Enter plugin details:
     - **Name**: Activity Properties Plugin
     - **Description**: Display activity properties within Activity entity context
     - **Version**: 1.0.0

3. **Upload Archive**
   - Choose the `ofs-activity-properties-plugin-no-config.zip` file
   - Wait for upload completion and validation
   - Verify all files are properly loaded

---

## STEP 2: Configure Activity Properties

### Required Activity Properties
The plugin needs access to these activity properties. Configure them in Configuration → Properties:

#### Core Properties
- `aid` (Activity ID) - String, Read-only
- `cname` (Customer Name) - String, Read-only  
- `astatus` (Activity Status) - Enumeration, Read/Write
- `sla_window_start` (Scheduled Start) - DateTime, Read-only
- `sla_window_end` (Scheduled End) - DateTime, Read-only
- `duration` (Duration) - Integer, Read-only
- `atype` (Activity Type) - String, Read-only

#### Location Properties
- `street` (Street Address) - String, Read-only
- `city` (City) - String, Read-only
- `state` (State/Province) - String, Read-only
- `zip` (ZIP/Postal Code) - String, Read-only

#### Resource Properties
- `resources` (Assigned Resources) - ResourceArray, Read-only
- `priority` (Priority) - String, Read-only

### Property Configuration Steps
1. Go to Configuration → Properties → Activity Properties
2. Ensure all listed properties are defined and accessible
3. Configure read/write permissions as specified above
4. Enable properties for Plugin API access

---

## STEP 3: Add Plugin to Activity Screens

### Activity Details Screen
1. Navigate to Configuration → User Types → [Your User Type] → Screen → Activity Details
2. Add Action Link:
   - **Label**: Activity Properties
   - **Type**: Plugin
   - **Plugin**: Activity Properties Plugin
   - **Position**: Toolbar
   - **Icon**: activity (optional)

### Activity List Screen  
1. Navigate to Configuration → User Types → [Your User Type] → Screen → Activity List
2. Add Row Action:
   - **Label**: Properties
   - **Type**: Plugin
   - **Plugin**: Activity Properties Plugin
   - **Position**: Row Action Menu
   - **Icon**: info (optional)

---

## STEP 4: Configure Plugin Parameters

### Plugin Context Settings
Configure the plugin directly in Oracle Fusion Field Service:

1. **Activity Properties Context**
   - Enable all required activity properties
   - Set property visibility and permissions
   - Configure default values if needed

2. **Resource Properties Context**
   - Enable resource ID and name properties
   - Configure resource assignment display

3. **Security Settings**
   - HTTPS is automatically handled in Oracle environment
   - No additional configuration files needed
   - Plugin uses standard Oracle security policies

---

## STEP 5: Test Plugin Functionality

### Testing Checklist
1. **Plugin Loading**
   - ✓ Plugin appears on Activity Details screen
   - ✓ Plugin appears in Activity List row actions
   - ✓ Plugin loads without errors

2. **Data Display**
   - ✓ Activity ID displays correctly
   - ✓ Customer name appears
   - ✓ Status shows with proper styling
   - ✓ Scheduled time formats correctly
   - ✓ Location information displays
   - ✓ Resource assignments appear

3. **Real-time Updates**
   - ✓ Plugin updates when activity data changes
   - ✓ Status changes reflect immediately
   - ✓ Connection status indicator works

4. **Offline Functionality**
   - ✓ Plugin works when offline
   - ✓ Cached data displays correctly
   - ✓ Sync occurs when connection restored

---

## STEP 6: User Training

### End User Instructions
1. **Accessing the Plugin**
   - From Activity Details: Click "Activity Properties" in toolbar
   - From Activity List: Use row action menu → "Properties"

2. **Using the Plugin**
   - View activity information in organized sections
   - Use "Refresh" button to update data manually
   - Monitor connection status in header
   - Plugin works offline automatically

3. **Troubleshooting**
   - If plugin doesn't load: Check user permissions
   - If data missing: Verify property configuration
   - If offline issues: Clear browser cache and reload

---

## Advanced Configuration Options

### Custom Property Mapping
To add additional activity properties:

1. **Configure in Oracle Fusion Field Service**
   - Add properties in Configuration → Properties → Activity Properties
   - Define property type and permissions
   - Enable for Plugin API access

2. **Modify Plugin Code** (Optional)
   - Add property display in `index.html`
   - Update property handling in `js/plugin.js`
   - Test thoroughly before deployment

### Performance Optimization
- **Cache Duration**: Default 1 hour for API responses
- **Offline Storage**: 7 days for static resources
- **Service Worker**: Automatically handles caching strategies

### Monitoring and Logging
- Plugin logs to browser console
- Oracle Fusion Field Service audit logs track plugin usage
- Performance metrics available in browser developer tools

---

## Support and Maintenance

### Regular Maintenance
- Monitor plugin performance in Oracle logs
- Update properties configuration as business needs change
- Test plugin after Oracle Fusion Field Service updates

### Troubleshooting Common Issues
1. **Plugin not appearing**: Check user type screen configuration
2. **Missing data**: Verify activity property permissions
3. **Slow loading**: Review cache settings and network connectivity
4. **Offline issues**: Clear service worker cache and re-register

### Version Updates
When updating the plugin:
1. Upload new plugin archive with incremented version
2. Test in development environment first
3. Update user documentation if interface changes
4. Monitor for any compatibility issues

---

## Security Considerations

- Plugin uses secure HTTPS communication in Oracle environment
- No sensitive data stored in browser cache
- Plugin API handles authentication automatically
- Content Security Policy prevents malicious code execution

---

## Technical Support

For technical issues or custom modifications:
1. Check Oracle Fusion Field Service documentation
2. Review browser console for error messages
3. Verify plugin configuration matches requirements
4. Contact Oracle support for platform-specific issues

---

**Plugin Version**: 1.0.0  
**Last Updated**: August 21, 2025  
**Compatible with**: Oracle Fusion Field Service 21.A and later