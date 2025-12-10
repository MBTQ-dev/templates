// Agents AI Status Dashboard JavaScript

/**
 * Initialize the agents dashboard
 */
document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.querySelector('.log-container');
    const restartButtons = document.querySelectorAll('.btn-primary');
    const viewLogsButtons = document.querySelectorAll('.btn-secondary');

    // Auto-scroll logs
    let autoScroll = true;

    logContainer.addEventListener('scroll', () => {
        const isAtBottom = logContainer.scrollHeight - logContainer.scrollTop === logContainer.clientHeight;
        autoScroll = isAtBottom;
    });

    // Simulate live log updates
    startLogSimulation();

    // Handle restart button clicks
    restartButtons.forEach(button => {
        button.addEventListener('click', handleRestart);
    });

    // Handle view logs button clicks
    viewLogsButtons.forEach(button => {
        button.addEventListener('click', handleViewLogs);
    });

    /**
     * Simulate live log updates
     */
    function startLogSimulation() {
        const logMessages = [
            { level: 'info', message: 'Agent heartbeat check completed' },
            { level: 'success', message: 'Task queue processed successfully' },
            { level: 'info', message: 'Performance metrics updated' },
            { level: 'warning', message: 'High memory usage detected' },
            { level: 'success', message: 'Cache cleared successfully' },
            { level: 'info', message: 'Configuration reloaded' }
        ];

        setInterval(() => {
            const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
            addLogEntry(randomMessage.level, randomMessage.message);
        }, 5000); // Add new log every 5 seconds
    }

    /**
     * Add a new log entry
     */
    function addLogEntry(level, message) {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        const isoString = now.toISOString();

        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <time datetime="${isoString}">${timeString}</time>
            <span class="log-level log-${level}">${level.toUpperCase()}</span>
            <span class="log-message">${message}</span>
        `;

        logContainer.appendChild(logEntry);

        // Keep only last 50 log entries
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 50) {
            entries[0].remove();
        }

        // Auto-scroll if enabled
        if (autoScroll) {
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    }

    /**
     * Handle restart button click
     */
    function handleRestart(event) {
        const button = event.currentTarget;
        const agentCard = button.closest('.agent-card');
        const agentName = agentCard.querySelector('h3').textContent;

        button.disabled = true;
        button.textContent = 'Restarting...';

        // Simulate restart process
        setTimeout(() => {
            addLogEntry('info', `${agentName} restart initiated`);
            
            setTimeout(() => {
                addLogEntry('success', `${agentName} restarted successfully`);
                button.disabled = false;
                button.textContent = 'Restart';
                showNotification(`${agentName} has been restarted`, 'success');
            }, 2000);
        }, 1000);
    }

    /**
     * Handle view logs button click
     */
    function handleViewLogs(event) {
        const button = event.currentTarget;
        const agentCard = button.closest('.agent-card');
        const agentName = agentCard.querySelector('h3').textContent;

        // Scroll to logs section
        const logsSection = document.querySelector('.logs-section');
        logsSection.scrollIntoView({ behavior: 'smooth' });

        // Filter logs for this agent (simulated)
        addLogEntry('info', `Viewing logs for ${agentName}`);
        showNotification(`Showing logs for ${agentName}`, 'info');
    }

    /**
     * Update agent metrics periodically
     */
    function updateMetrics() {
        const agentCards = document.querySelectorAll('.agent-card');
        
        agentCards.forEach(card => {
            const requestsElement = card.querySelector('.metric:nth-child(2) .metric-value');
            if (requestsElement) {
                const currentRequests = parseInt(requestsElement.textContent);
                const increment = Math.floor(Math.random() * 3);
                if (increment > 0) {
                    requestsElement.textContent = currentRequests + increment;
                }
            }
        });
    }

    // Update metrics every 10 seconds
    setInterval(updateMetrics, 10000);

    /**
     * Show notification
     */
    function showNotification(message, type = 'info') {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'status');

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 4000);
    }

    /**
     * Monitor system status
     */
    function checkSystemHealth() {
        const activeCount = document.querySelectorAll('.status-badge.status-active').length;
        const totalAgents = document.querySelectorAll('.agent-card').length;
        
        if (activeCount < totalAgents * 0.5) {
            addLogEntry('warning', 'System health degraded - less than 50% agents active');
        }
    }

    // Check system health every 30 seconds
    setInterval(checkSystemHealth, 30000);
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 350px;
    }

    .notification {
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: white;
        border: 2px solid #00bcd4;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 1;
        transition: opacity 0.3s ease;
        font-weight: 500;
    }

    .notification-success {
        border-color: #28a745;
        background: #d4edda;
    }

    .notification-info {
        border-color: #17a2b8;
        background: #d1ecf1;
    }

    @media (max-width: 768px) {
        .notification-container {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyles);
