// DAO Governance Interface JavaScript

/**
 * Initialize the DAO interface
 */
document.addEventListener('DOMContentLoaded', () => {
    const proposalForm = document.getElementById('proposal-form');
    const voteButtons = document.querySelectorAll('.vote-btn');

    // Handle proposal form submission
    proposalForm.addEventListener('submit', handleProposalSubmit);

    // Handle vote button clicks
    voteButtons.forEach(button => {
        button.addEventListener('click', handleVote);
    });

    // Animate vote bars on load
    animateVoteBars();

    /**
     * Handle proposal form submission
     */
    function handleProposalSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const proposal = {
            title: formData.get('title'),
            description: formData.get('description'),
            duration: formData.get('duration')
        };

        // Simulate proposal submission
        showNotification('Proposal submitted successfully!', 'success');
        
        // Reset form
        event.target.reset();

        // In a real application, you would send this to a backend
        // Example: await fetch('/api/proposals', { method: 'POST', body: JSON.stringify(proposal) });
    }

    /**
     * Handle vote button clicks
     */
    function handleVote(event) {
        const button = event.currentTarget;
        const proposalCard = button.closest('.proposal-card');
        const proposalTitle = proposalCard.querySelector('h3').textContent;
        
        // Determine vote type
        let voteType;
        if (button.classList.contains('vote-for-btn')) {
            voteType = 'for';
        } else if (button.classList.contains('vote-against-btn')) {
            voteType = 'against';
        } else {
            voteType = 'abstain';
        }

        // Disable all voting buttons for this proposal
        const allButtons = proposalCard.querySelectorAll('.vote-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });

        // Simulate vote submission
        setTimeout(() => {
            showNotification(`Vote "${voteType}" recorded for: ${proposalTitle}`, 'success');
            
            // Update vote counts (simulated)
            updateVoteCounts(proposalCard, voteType);
            
            // Re-enable buttons after a delay
            setTimeout(() => {
                allButtons.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                });
            }, 2000);
        }, 500);

        // In a real application, send vote to backend
        // Example: await fetch('/api/vote', { method: 'POST', body: JSON.stringify({ proposalId, voteType }) });
    }

    /**
     * Update vote counts (simulated)
     */
    function updateVoteCounts(proposalCard, voteType) {
        const voteBars = proposalCard.querySelectorAll('.vote-bar');
        
        voteBars.forEach(bar => {
            const countElement = bar.querySelector('.vote-count');
            const fillElement = bar.querySelector('.vote-fill');
            const labelElement = bar.querySelector('.vote-label');
            
            if ((voteType === 'for' && bar.classList.contains('vote-for')) ||
                (voteType === 'against' && bar.classList.contains('vote-against')) ||
                (voteType === 'abstain' && bar.classList.contains('vote-abstain'))) {
                
                // Increment the count
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]);
                const newCount = currentCount + 1;
                countElement.textContent = `${newCount} votes`;
                
                // Recalculate percentages (simplified)
                const totalVotes = newCount;
                const currentWidth = parseInt(fillElement.style.width);
                const newWidth = Math.min(currentWidth + 1, 100);
                
                fillElement.style.width = `${newWidth}%`;
                fillElement.setAttribute('aria-valuenow', newWidth);
                
                // Update label
                const match = labelElement.textContent.match(/^(\w+) \((\d+)%\)$/);
                if (match) {
                    labelElement.textContent = `${match[1]} (${newWidth}%)`;
                }
            }
        });
    }

    /**
     * Animate vote bars on page load
     */
    function animateVoteBars() {
        const voteFills = document.querySelectorAll('.vote-fill');
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        voteFills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    }

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
     * Update voting deadline countdown
     */
    function updateCountdowns() {
        const timeElements = document.querySelectorAll('.proposal-meta time');
        
        timeElements.forEach(timeElement => {
            const deadline = new Date(timeElement.getAttribute('datetime'));
            const now = new Date();
            const diff = deadline - now;
            
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
                // Could add a countdown display here to show remaining time
                // e.g., update a countdown element with: `${days} days, ${hours} hours remaining`
            }
        });
    }

    // Update countdowns every hour
    setInterval(updateCountdowns, 3600000);
    updateCountdowns();

    /**
     * Keyboard navigation for proposal cards
     */
    const proposalCards = document.querySelectorAll('.proposal-card');
    proposalCards.forEach(card => {
        card.setAttribute('tabindex', '0');
    });
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
        border: 2px solid #6f42c1;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 1;
        transition: opacity 0.3s ease;
        font-weight: 500;
    }

    .notification-success {
        border-color: #28a745;
        background: #d4edda;
        color: #155724;
    }

    .notification-info {
        border-color: #17a2b8;
        background: #d1ecf1;
        color: #0c5460;
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
