# DAO - Governance Interface

A decentralized autonomous organization (DAO) governance interface for community decision-making and proposal management.

## Features

- **Governance Overview**: Statistics on members, proposals, and voting power
- **Active Proposals**: List of current proposals with voting status
- **Real-time Voting**: Cast votes for, against, or abstain on proposals
- **Proposal Creation**: Submit new proposals for community voting
- **Vote Visualization**: Progress bars showing voting percentages
- **Accessible Interface**: Full WCAG 2.1 AA compliance

## Usage

Open `index.html` in a web browser. The interface displays:

1. **Governance Stats**: Total members, active proposals, voting power, passed proposals
2. **Active Proposals**: Cards showing proposal details and voting options
3. **Create Proposal**: Form to submit new proposals

### Voting

Each proposal card includes:
- **Proposal Details**: Title, description, proposer, voting deadline
- **Current Results**: Visual progress bars for For/Against/Abstain votes
- **Voting Actions**: Three buttons to cast your vote

To vote:
1. Read the proposal details
2. Click one of the voting buttons: "Vote For", "Vote Against", or "Abstain"
3. Your vote is recorded and reflected in the results

### Creating Proposals

1. Scroll to the "Create New Proposal" section
2. Fill in the required fields:
   - Proposal Title
   - Description
   - Voting Duration
3. Click "Submit Proposal"

## Customization

### Adding Proposals

Add new proposal cards to `index.html`:

```html
<article class="proposal-card">
    <div class="proposal-header">
        <h3>Proposal #XX: Your Title</h3>
        <span class="status-badge status-active">Active</span>
    </div>
    <p class="proposal-description">Your description</p>
    <!-- Add meta, voting section, etc. -->
</article>
```

### Updating Vote Percentages

Modify the vote bars in the HTML:

```html
<div class="vote-fill" style="width: 67%;" 
     role="progressbar" aria-valuenow="67" 
     aria-valuemin="0" aria-valuemax="100"></div>
```

### Styling

Customize colors in `styles.css`:

```css
:root {
    --primary-color: #6f42c1;
    --secondary-color: #563d7c;
    --success-color: #28a745;
    --danger-color: #dc3545;
}
```

## Integration

Replace simulated data with real blockchain/API calls:

```javascript
// Submit vote to blockchain
async function submitVote(proposalId, voteType) {
    const response = await fetch('/api/dao/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId, voteType })
    });
    return response.json();
}

// Create new proposal
async function createProposal(proposalData) {
    const response = await fetch('/api/dao/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposalData)
    });
    return response.json();
}

// Fetch active proposals
async function loadProposals() {
    const response = await fetch('/api/dao/proposals?status=active');
    const proposals = await response.json();
    renderProposals(proposals);
}
```

## Features in Detail

### Vote Tracking

- Votes are counted and displayed in real-time
- Progress bars update automatically
- Percentages recalculate based on total votes
- Vote counts shown next to each option

### Proposal Lifecycle

1. **Created**: Proposal submitted by member
2. **Active**: Currently open for voting
3. **Passed**: Majority voted for
4. **Rejected**: Majority voted against
5. **Executed**: Changes implemented

### Accessibility Features

- Semantic HTML structure
- ARIA labels and live regions
- Progress bars with proper ARIA attributes
- Keyboard navigation support
- Screen reader announcements
- Focus indicators
- High contrast support
- Reduced motion support

## Notifications

The interface includes a notification system:
- Vote confirmations
- Proposal submission confirmations
- Success/error messages
- Screen reader announcements

## Security Considerations

For production use:
- Implement wallet connection for voting authentication
- Add signature verification for proposals
- Implement vote delegation
- Add proposal deposit requirements
- Include quorum thresholds
- Implement time-locks for execution

## Part of the Ecosystem

DAO is part of a larger accessible web ecosystem:
- **PinkFlow**: Accessibility query interface
- **PinkSync**: Graph API
- **DeafAuth**: Authentication system
- **FibronRose**: Trust dashboard
- **Agents**: AI agent status page
- **DAO**: Governance interface (this component)

## License

Open source - use and modify as needed for your projects.
