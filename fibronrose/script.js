// FibronRose Trust Dashboard JavaScript

/**
 * Initialize the trust dashboard
 */
document.addEventListener('DOMContentLoaded', () => {
    const trustScoreElement = document.getElementById('trust-score');
    const actionButtons = document.querySelectorAll('.action-button');

    // Animate trust score on load
    animateTrustScore(trustScoreElement, 87);

    // Handle action button clicks
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionClick);
    });

    /**
     * Animate trust score counting up
     */
    function animateTrustScore(element, targetScore) {
        let currentScore = 0;
        const duration = 1500; // 1.5 seconds
        const increment = targetScore / (duration / 16); // 60fps

        const animate = () => {
            currentScore += increment;
            if (currentScore < targetScore) {
                element.textContent = Math.floor(currentScore);
                requestAnimationFrame(animate);
            } else {
                element.textContent = targetScore;
            }
        };

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = targetScore;
        } else {
            animate();
        }
    }

    /**
     * Handle action button clicks
     */
    function handleActionClick(event) {
        const button = event.currentTarget;
        const actionText = button.querySelector('span:nth-child(2)').textContent;
        const boostText = button.querySelector('.action-boost').textContent;

        // Create a notification
        showNotification(`Action started: ${actionText}. Potential boost: ${boostText}`);

        // Simulate action processing
        button.disabled = true;
        button.style.opacity = '0.6';
        
        setTimeout(() => {
            button.disabled = false;
            button.style.opacity = '1';
            showNotification(`${actionText} completed successfully!`, 'success');
        }, 2000);
    }

    /**
     * Show a notification message
     */
    function showNotification(message, type = 'info') {
        // Check if notification container exists, create if not
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'status');

        container.appendChild(notification);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 4000);
    }

    /**
     * Add keyboard navigation for metric cards
     */
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could expand to show more details
                const heading = card.querySelector('h3').textContent;
                showNotification(`Viewing details for: ${heading}`);
            }
        });
    });

    /**
     * Animate progress bars on scroll (if in viewport)
     */
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.metric-fill');
                if (fill && !fill.classList.contains('animated')) {
                    fill.classList.add('animated');
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                }
            }
        });
    }, observerOptions);

    metricCards.forEach(card => observer.observe(card));
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
        border: 2px solid #ff6b9d;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 1;
        transition: opacity 0.3s ease;
        font-weight: 500;
    }

    .notification-success {
        border-color: #28a745;
        background: #d4edda;
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
