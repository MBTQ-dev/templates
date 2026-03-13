# PinkSync - Graph API

A visual interface for exploring and interacting with graph-based data through a RESTful API.

## Features

- **Interactive API Explorer**: Select and execute different API endpoints
- **Graph Visualization**: Visual representation of nodes and relationships
- **JSON Response Viewer**: Pretty-printed JSON output with syntax highlighting
- **Export Functionality**: Copy or download API responses
- **Accessible Interface**: Full keyboard navigation and screen reader support

## Usage

Open `index.html` in a web browser to start using PinkSync. No build process or server required for the demo.

### API Endpoints

The interface demonstrates the following endpoints:

1. **GET /nodes** - Retrieve all nodes in the graph
2. **GET /edges** - Retrieve all edges (connections) in the graph
3. **GET /graph** - Retrieve the complete graph structure
4. **POST /query** - Execute custom graph queries

### Visualizing Data

1. Select an endpoint from the dropdown
2. Click "Execute Request"
3. View the visualization and JSON response

### Exporting Data

- Click "Copy JSON" to copy the response to your clipboard
- Click "Download JSON" to save the response as a file

## Graph Structure

The sample graph demonstrates a simple data model:

- **Nodes**: Entities in the graph (users, resources, groups)
- **Edges**: Relationships between nodes (access, ownership, membership)

## Customization

### Adding Real API Integration

Replace the simulated `executeRequest()` function in `script.js` with actual API calls:

```javascript
async function executeRequest(endpoint) {
    const response = await fetch(`https://your-api.com/${endpoint}`);
    const data = await response.json();
    displayData(data);
    visualizeGraph(data);
}
```

### Styling the Visualization

Modify the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #9370db;
    --secondary-color: #8a2be2;
    /* ... more variables */
}
```

### Custom Visualization

The `visualizeGraph()` function can be replaced with a more sophisticated library like D3.js or vis.js for advanced graph layouts and interactions.

## Response Format

All API responses follow this structure:

```json
{
    "status": "success",
    "data": { ... },
    "timestamp": "2024-01-01T00:00:00Z"
}
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader announcements
- Focus indicators
- High contrast support

## Part of the Ecosystem

PinkSync is part of a larger accessible web ecosystem:
- **PinkFlow**: Accessibility query interface
- **PinkSync**: Graph API (this component)
- **DeafAuth**: Authentication system
- **FibronRose**: Trust dashboard
- **Agents**: AI agent status page
- **DAO**: Governance interface

## License

Open source - use and modify as needed for your projects.
