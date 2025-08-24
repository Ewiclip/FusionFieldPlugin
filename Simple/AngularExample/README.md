# Angular OFS Plugin Example

This folder contains an Angular-based Oracle Fusion Field Service plugin that demonstrates how to use Angular's declarative templates and data binding for OFS plugin development.

## Files Included

- **`index.html`** - Main HTML file with Angular template syntax
- **`angular-plugin.js`** - Angular component and OFS integration logic
- **`plugin.css`** - Global styles for the plugin
- **`angular-component.css`** - Component-specific styles

## Key Features

### ✅ **Declarative Templates**
- Uses Angular's `*ngIf` for conditional rendering
- Uses `*ngFor` for dynamic field lists
- Uses `{{ }}` interpolation for data binding
- Uses `[ngClass]` for dynamic CSS classes

### ✅ **Enhanced UI**
- Loading states with spinner
- Status indicators
- Debug mode toggle
- Responsive design
- Modern styling

### ✅ **OFS Integration**
- Handles OFS handshake (ready → initEnd)
- Processes activity data from OFS
- Supports both single activity and activity list
- Proper error handling

## Deployment to OFS

### **Step 1: Upload Files**
Upload all files in this folder to your OFS plugin:
- `index.html`
- `angular-plugin.js`
- `plugin.css`
- `angular-component.css`

### **Step 2: Configure OFS**
In Oracle Fusion Field Service:
1. Go to **Setup** → **Field Service** → **Plugins**
2. Create or edit your plugin
3. Set the **Entry Point** to `index.html`
4. Add the required **Available Properties**:
   - `aid`
   - `appt_number`
   - `customer_number`
   - `astatus`
   - `resource_id`

### **Step 3: Test**
1. Navigate to an Activity in OFS
2. Launch your plugin
3. Verify the activity data displays correctly

## Comparison with Vanilla JS

| **Aspect** | **Vanilla JS** | **Angular** |
|------------|----------------|-------------|
| **Template Logic** | Manual DOM manipulation | Declarative templates |
| **Data Binding** | Manual updates | Automatic reactivity |
| **Conditional Rendering** | Manual show/hide | `*ngIf` directives |
| **Lists** | Manual loop creation | `*ngFor` directives |
| **Bundle Size** | ~50KB | ~150KB (with Angular) |
| **Loading Speed** | Fast | Slower (framework overhead) |
| **Development** | Direct edit/test | Edit → Test |
| **Maintainability** | Manual coordination | Self-documenting |

## When to Use Angular vs Vanilla JS

### **Use Angular for:**
- Complex plugins with multiple components
- Teams requiring type safety
- Applications with complex state management
- Projects needing advanced IDE features

### **Use Vanilla JS for:**
- Simple field display plugins
- Performance-critical applications
- Single developer projects
- Quick prototypes

## Notes

- This example uses Angular 17 with CDN links
- No build process required - deploy directly
- Includes all necessary Angular dependencies
- Compatible with OFS plugin architecture

## Troubleshooting

**Plugin not loading:**
- Check that all files are uploaded
- Verify `index.html` is set as entry point
- Check browser console for errors

**No data displayed:**
- Ensure Available Properties are configured in OFS
- Check that you're on an Activity page
- Use debug mode to see raw OFS payload

**Styling issues:**
- Verify both CSS files are uploaded
- Check for CSS conflicts with OFS
- Test in different browsers
