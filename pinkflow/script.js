// PinkFlow Accessibility Query Interface JavaScript

/**
 * Sample data for demonstration
 */
const sampleData = [
    {
        id: 1,
        title: 'Button Component',
        description: 'Accessible button with proper ARIA labels and keyboard support',
        category: 'components'
    },
    {
        id: 2,
        title: 'Form Pattern',
        description: 'Accessible form pattern with validation and error messages',
        category: 'patterns'
    },
    {
        id: 3,
        title: 'Color Contrast Guidelines',
        description: 'WCAG 2.1 AA color contrast requirements for text and UI elements',
        category: 'guidelines'
    },
    {
        id: 4,
        title: 'Screen Reader Testing Tool',
        description: 'Automated tool for testing screen reader compatibility',
        category: 'tools'
    },
    {
        id: 5,
        title: 'Modal Dialog Pattern',
        description: 'Accessible modal dialog with focus management and keyboard navigation',
        category: 'patterns'
    },
    {
        id: 6,
        title: 'Navigation Menu Component',
        description: 'Accessible navigation menu with ARIA roles and keyboard support',
        category: 'components'
    }
];

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    const queryForm = document.getElementById('query-form');
    const queryInput = document.getElementById('query-input');
    const resultsContainer = document.getElementById('results-container');
    const filterCheckboxes = document.querySelectorAll('input[name="filter"]');

    // Handle form submission
    queryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performQuery();
    });

    // Handle filter changes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', performQuery);
    });

    /**
     * Perform query and display results
     */
    function performQuery() {
        const query = queryInput.value.trim().toLowerCase();
        const activeFilters = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Filter results based on query and active filters
        let results = sampleData.filter(item => {
            const matchesFilter = activeFilters.includes(item.category);
            const matchesQuery = query === '' || 
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);
            return matchesFilter && matchesQuery;
        });

        displayResults(results, query);
    }

    /**
     * HTML escape function to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Display results in the results container
     * @param {Array} results - Array of result items
     * @param {string} query - The search query
     */
    function displayResults(results, query) {
        if (results.length === 0) {
            const emptyState = document.createElement('p');
            emptyState.className = 'empty-state';
            emptyState.textContent = query ? `No results found for "${query}"` : 'No results match the selected filters';
            resultsContainer.innerHTML = '';
            resultsContainer.appendChild(emptyState);
            return;
        }

        const resultsHTML = results.map(item => `
            <article class="result-item" tabindex="0">
                <h3>${highlightText(escapeHtml(item.title), query)}</h3>
                <p>${highlightText(escapeHtml(item.description), query)}</p>
                <p class="category-tag">
                    <small><strong>Category:</strong> ${escapeHtml(item.category)}</small>
                </p>
            </article>
        `).join('');

        resultsContainer.innerHTML = resultsHTML;

        // Announce results to screen readers
        announceResults(results.length, query);
    }

    /**
     * Highlight matching text in results
     * @param {string} text - Text to highlight (should be HTML-escaped)
     * @param {string} query - Search query
     * @returns {string} HTML with highlighted text
     */
    function highlightText(text, query) {
        if (!query) return text;
        
        const escapedQuery = escapeHtml(query);
        const regex = new RegExp(`(${escapeRegex(escapedQuery)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Escape special characters in regex
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Announce results to screen readers
     * @param {number} count - Number of results
     * @param {string} query - Search query
     */
    function announceResults(count, query) {
        const announcement = query 
            ? `Found ${count} result${count !== 1 ? 's' : ''} for "${query}"`
            : `Showing ${count} result${count !== 1 ? 's' : ''}`;
        
        // Create a live region for announcements if it doesn't exist
        let liveRegion = document.getElementById('live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = announcement;
    }

    // Add keyboard navigation for result items
    document.addEventListener('keydown', (e) => {
        const resultItems = document.querySelectorAll('.result-item');
        const currentIndex = Array.from(resultItems).indexOf(document.activeElement);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = Math.min(currentIndex + 1, resultItems.length - 1);
                resultItems[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = Math.max(currentIndex - 1, 0);
                resultItems[nextIndex].focus();
                break;
        }
    });

    // Initial display with all results
    performQuery();
});
