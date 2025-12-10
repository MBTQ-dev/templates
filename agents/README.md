# Agents - AI Agent Status Dashboard

A real-time monitoring and management dashboard for AI agents in the ecosystem.

## Features

- **System Overview**: Quick stats on total, active, and idle agents
- **Agent Status Cards**: Detailed information for each agent
- **Live Activity Log**: Real-time log streaming with color-coded levels
- **Performance Metrics**: Uptime, request count, and response times
- **Agent Management**: Restart and view logs for individual agents
- **Auto-updating**: Metrics and logs update automatically

## Usage

Open `index.html` in a web browser. The dashboard displays:

1. **System Overview**: Total agents, active count, idle count, tasks completed
2. **Agent Status**: Individual cards for each AI agent
3. **Activity Log**: Real-time log entries with timestamps

### Agent Management

Each agent card includes:
- **Status Badge**: Active, Idle, or Offline indicator
- **Metrics**: Uptime percentage, request count, average response time
- **Actions**: 
  - "View Logs" - Filters log for specific agent
  - "Restart" - Simulates agent restart

### Log Levels

Logs are color-coded by severity:
- **INFO** (Blue): General information
- **SUCCESS** (Green): Successful operations
- **WARNING** (Yellow): Potential issues
- **ERROR** (Red): Critical errors

## Customization

### Adding Agents

Add new agent cards to `index.html`:

```html
<article class="agent-card" role="listitem">
    <div class="agent-header">
        <h3>Your Agent Name</h3>
        <span class="status-badge status-active" role="status">Active</span>
    </div>
    <p class="agent-description">Description of what the agent does</p>
    <div class="agent-metrics">
        <div class="metric">
            <span class="metric-label">Uptime:</span>
            <span class="metric-value">99.9%</span>
        </div>
        <!-- Add more metrics -->
    </div>
    <div class="agent-actions">
        <button class="btn-secondary">View Logs</button>
        <button class="btn-primary">Restart</button>
    </div>
</article>
```

### Updating Metrics

Modify the `updateMetrics()` function in `script.js` to fetch real data:

```javascript
async function updateMetrics() {
    const response = await fetch('/api/agents/metrics');
    const data = await response.json();
    updateDashboard(data);
}
```

### Log Integration

Connect to a real log stream:

```javascript
const eventSource = new EventSource('/api/logs/stream');
eventSource.onmessage = (event) => {
    const logData = JSON.parse(event.data);
    addLogEntry(logData.level, logData.message);
};
```

## Features in Detail

### Live Log Updates

- Logs update automatically every 5 seconds (simulated)
- Auto-scroll keeps latest logs in view
- Manual scroll disables auto-scroll
- Maximum 50 log entries displayed

### Agent Restart

- Click "Restart" to simulate agent restart
- Shows loading state during restart
- Adds log entries for restart events
- Displays success notification

### Responsive Design

- Mobile-friendly layout
- Touch-optimized controls
- Flexible grid adapts to screen size

## Accessibility Features

- Semantic HTML structure
- ARIA labels and live regions
- Keyboard navigation support
- Screen reader announcements
- Focus indicators
- High contrast support
- Color-coded status with text labels

## Integration

Replace simulated data with real API calls:

```javascript
// Fetch agent status
async function loadAgentStatus() {
    const response = await fetch('/api/agents/status');
    const agents = await response.json();
    renderAgents(agents);
}

// Restart agent
async function restartAgent(agentId) {
    const response = await fetch(`/api/agents/${agentId}/restart`, {
        method: 'POST'
    });
    return response.json();
}
```

## Part of the Ecosystem

Agents is part of a larger accessible web ecosystem:
- **PinkFlow**: Accessibility query interface
- **PinkSync**: Graph API
- **DeafAuth**: Authentication system
- **FibronRose**: Trust dashboard
- **Agents**: AI agent status page (this component)
- **DAO**: Governance interface

## License

Open source - use and modify as needed for your projects.
