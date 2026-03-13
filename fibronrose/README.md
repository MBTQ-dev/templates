# FibronRose - Trust Dashboard

A comprehensive trust and transparency dashboard for tracking and improving trust metrics across the platform.

## Features

- **Trust Score Visualization**: Clear display of overall trust score
- **Detailed Metrics**: Breakdown of trust components (verification, activity, community rating, transparency)
- **Activity Timeline**: Recent trust-related activities and verifications
- **Actionable Improvements**: Suggestions for improving trust score
- **Progress Tracking**: Visual progress bars for each metric
- **Accessible Interface**: Full WCAG 2.1 AA compliance

## Usage

Open `index.html` in a web browser. The dashboard displays:

1. **Overall Trust Score**: A numerical score out of 100
2. **Trust Metrics**: Four key categories with progress bars
3. **Recent Activity**: Timeline of trust-related events
4. **Improvement Actions**: Buttons for actions that boost trust

### Trust Metrics

- **Verification** (95%): Email, phone, and ID verification status
- **Activity History** (82%): Consistent positive platform activity
- **Community Rating** (88%): Peer ratings and feedback
- **Transparency** (90%): Profile completeness and public information

### Improving Trust Score

Click on any improvement action to simulate starting that process:
- Verify Phone Number (+5 points)
- Connect Social Accounts (+3 points)
- Complete Profile (+4 points)
- Request References (+6 points)

## Customization

### Updating Trust Scores

Modify the `animateTrustScore()` function in `script.js`:

```javascript
animateTrustScore(trustScoreElement, 87); // Change 87 to your score
```

Update metric percentages in `index.html`:

```html
<div class="metric-fill" style="width: 95%;" 
     role="progressbar" aria-valuenow="95" 
     aria-valuemin="0" aria-valuemax="100"></div>
```

### Styling

Customize colors in `styles.css`:

```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --success-color: #28a745;
}
```

### Adding Actions

Add new action buttons to the actions grid in `index.html`:

```html
<button class="action-button" aria-label="Your action">
    <span class="action-icon" aria-hidden="true">🎯</span>
    <span>Your Action Name</span>
    <span class="action-boost">+X points</span>
</button>
```

## Integration

Replace the simulated data with real API calls:

```javascript
// Fetch trust data from your backend
async function loadTrustData() {
    const response = await fetch('/api/trust-score');
    const data = await response.json();
    updateDashboard(data);
}
```

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels and live regions
- Progress bars with proper ARIA attributes
- Keyboard navigation support
- Screen reader announcements for notifications
- Focus indicators
- Reduced motion support
- High contrast mode compatible

## Notifications

The dashboard includes a notification system for user feedback:
- Action confirmations
- Success/error messages
- Screen reader announcements

## Part of the Ecosystem

FibronRose is part of a larger accessible web ecosystem:
- **PinkFlow**: Accessibility query interface
- **PinkSync**: Graph API
- **DeafAuth**: Authentication system
- **FibronRose**: Trust dashboard (this component)
- **Agents**: AI agent status page
- **DAO**: Governance interface

## License

Open source - use and modify as needed for your projects.
