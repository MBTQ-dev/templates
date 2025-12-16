# Accessible Web Ecosystem

An accessible, adaptive web platform built entirely with HTML, CSS, and JavaScript. This ecosystem is designed with accessibility at its core, featuring components that are linkable, inspectable, forkable, and adaptive to different user needs.

## Overview

This platform is organized into specialized sub-directories, each serving a specific purpose in the ecosystem:

- **[pinkflow/](pinkflow/)**: Accessibility query interface
- **[pinksync/](pinksync/)**: Graph API visualization
- **[deafauth/](deafauth/)**: Login page (pure web, PASETO-based authentication)
- **[fibronrose/](fibronrose/)**: Trust dashboard
- **[agents/](agents/)**: AI agent status page
- **[dao/](dao/)**: Governance interface

## Components

### PinkFlow - Accessibility Query Interface

A search and query interface for discovering accessible components, patterns, and guidelines.

**Features:**
- Natural language search
- Category-based filtering
- Keyboard navigation
- Screen reader support
- Real-time results

[View Documentation →](pinkflow/README.md)

### PinkSync - Graph API

Visual interface for exploring and interacting with graph-based data through a RESTful API.

**Features:**
- Interactive API explorer
- Graph visualization
- JSON response viewer
- Export functionality
- Real-time data updates

[View Documentation →](pinksync/README.md)

### DeafAuth - Authentication System

A lightweight, modular Flask-based authentication system using PASETO tokens for secure, stateless authentication.

**Features:**
- User signup and login
- Email verification
- PASETO token authentication
- Protected routes
- SQLite/PostgreSQL support

[View Documentation →](deafauth/README.md)

### FibronRose - Trust Dashboard

A comprehensive trust and transparency dashboard for tracking and improving trust metrics.

**Features:**
- Trust score visualization
- Detailed metrics breakdown
- Activity timeline
- Actionable improvements
- Progress tracking

[View Documentation →](fibronrose/README.md)

### Agents - AI Agent Status

Real-time monitoring and management dashboard for AI agents in the ecosystem.

**Features:**
- System overview
- Agent status cards
- Live activity logs
- Performance metrics
- Agent management

[View Documentation →](agents/README.md)

### DAO - Governance Interface

Decentralized governance interface for community decision-making and proposal management.

**Features:**
- Governance statistics
- Active proposals
- Real-time voting
- Proposal creation
- Vote visualization

[View Documentation →](dao/README.md)

## Getting Started

Each component is standalone and can be used independently. To get started:

1. Navigate to the component directory you want to use
2. Open `index.html` in a web browser
3. For backend components (like DeafAuth), follow the specific setup instructions in their README

### Quick Start Example

```bash
# Open PinkFlow in your browser
cd pinkflow
open index.html  # or use your preferred browser

# For DeafAuth (requires Python)
cd deafauth
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## Architecture

### Frontend Components

All frontend components (PinkFlow, PinkSync, FibronRose, Agents, DAO) are built with:
- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Responsive design with CSS custom properties
- **Vanilla JavaScript**: No frameworks, pure ES6+

### Backend Components

DeafAuth is built with:
- **Python/Flask**: Lightweight web framework
- **SQLAlchemy**: Database ORM
- **PASETO**: Secure token authentication
- **SQLite/PostgreSQL**: Database options

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- ✅ Semantic HTML5 elements
- ✅ ARIA landmarks and labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Color contrast compliance
- ✅ Reduced motion support
- ✅ High contrast mode support

## Design Philosophy

### Linkable
Each component has a unique URL and can be linked directly from anywhere on the web.

### Inspectable
Built with standard web technologies that can be inspected, debugged, and understood using browser DevTools.

### Forkable
Open-source components that can be copied, modified, and adapted for your specific needs.

### Adaptive
Responsive designs that work across devices and adapt to user preferences (color scheme, motion, contrast).

## Customization

Each component includes:
- CSS custom properties for easy theming
- Sample data for demonstration
- Extensible JavaScript architecture
- Documented integration points

### Global Theming

You can create a global theme by using consistent CSS variables across components:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --text-color: #your-color;
    --background-color: #your-color;
}
```

## Integration

### API Integration

Replace sample data with real API calls:

```javascript
// Example: Fetch data from your backend
async function loadData() {
    const response = await fetch('https://your-api.com/data');
    const data = await response.json();
    renderData(data);
}
```

### Component Communication

Components can communicate via:
- URL parameters
- LocalStorage
- PostMessage API
- Shared backend APIs

## Browser Support

All components support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility compliance
5. Submit a pull request

## License

This ecosystem is open source and available for use in your projects. Modify and adapt as needed.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PASETO Specification](https://paseto.io/)

## Support

For questions, issues, or contributions, please open an issue in the repository or reach out to the maintainers.

---

**Built with accessibility, transparency, and community in mind.**
