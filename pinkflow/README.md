# PinkFlow - Accessibility Query Interface

An accessible, intuitive query interface for searching and discovering accessibility resources, components, patterns, and guidelines.

## Features

- **Accessible Design**: Built with WCAG 2.1 AA compliance in mind
- **Keyboard Navigation**: Full keyboard support with clear focus indicators
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Responsive Layout**: Works on all device sizes
- **Filter System**: Category-based filtering for precise results
- **Search Functionality**: Natural language search across all resources

## Usage

Simply open `index.html` in a web browser to use the interface. No build process or server required.

### Search

1. Enter your query in the search field
2. Press Enter or click the Search button
3. Results will appear below, filtered by your search terms

### Filters

Use the checkboxes in the Filters section to narrow results by category:
- Components
- Patterns
- Guidelines
- Tools

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and checkboxes
- **Arrow Up/Down**: Navigate through search results
- **Escape**: Clear focus (browser default)

## Accessibility Features

- Semantic HTML5 elements
- ARIA landmarks and labels
- High contrast mode support
- Reduced motion support
- Screen reader announcements for dynamic content
- Focus management
- Color contrast meeting WCAG AA standards

## Customization

### Adding Data

Edit `script.js` and modify the `sampleData` array to add your own resources:

```javascript
const sampleData = [
    {
        id: 1,
        title: 'Your Resource Title',
        description: 'Description of the resource',
        category: 'components' // or 'patterns', 'guidelines', 'tools'
    },
    // ... more items
];
```

### Styling

Modify `styles.css` to customize colors, spacing, and typography. The CSS uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #ff69b4;
    --secondary-color: #ff1493;
    /* ... more variables */
}
```

## Integration

PinkFlow can be integrated with backend APIs by modifying the `performQuery()` function in `script.js` to fetch data from your server instead of using the sample data.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 with polyfills (if needed)

## Part of the Ecosystem

PinkFlow is part of a larger accessible web ecosystem:
- **PinkFlow**: Accessibility query interface (this component)
- **PinkSync**: Graph API
- **DeafAuth**: Authentication system
- **FibronRose**: Trust dashboard
- **Agents**: AI agent status page
- **DAO**: Governance interface

## License

Open source - use and modify as needed for your projects.
