// PinkSync Graph API JavaScript

/**
 * Sample graph data
 */
const sampleGraphData = {
    nodes: [
        { id: 1, label: 'User A', type: 'user' },
        { id: 2, label: 'User B', type: 'user' },
        { id: 3, label: 'Resource 1', type: 'resource' },
        { id: 4, label: 'Resource 2', type: 'resource' },
        { id: 5, label: 'Group', type: 'group' }
    ],
    edges: [
        { from: 1, to: 3, type: 'access' },
        { from: 2, to: 3, type: 'access' },
        { from: 1, to: 4, type: 'owns' },
        { from: 2, to: 5, type: 'member' },
        { from: 5, to: 4, type: 'access' }
    ]
};

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    const executeBtn = document.getElementById('execute-btn');
    const endpointSelect = document.getElementById('endpoint-select');
    const dataOutput = document.getElementById('data-output');
    const graphContainer = document.getElementById('graph-container');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');

    let currentData = null;

    // Execute API request
    executeBtn.addEventListener('click', async () => {
        const endpoint = endpointSelect.value;
        await executeRequest(endpoint);
    });

    // Copy JSON to clipboard
    copyBtn.addEventListener('click', () => {
        if (!currentData) return;
        
        const jsonString = JSON.stringify(currentData, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy JSON';
            }, 2000);
        });
    });

    // Download JSON
    downloadBtn.addEventListener('click', () => {
        if (!currentData) return;
        
        const jsonString = JSON.stringify(currentData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pinksync-${endpointSelect.value}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    /**
     * Execute API request (simulated)
     */
    async function executeRequest(endpoint) {
        // Show loading state
        executeBtn.textContent = 'Loading...';
        executeBtn.disabled = true;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let responseData;
        
        switch(endpoint) {
            case 'nodes':
                responseData = {
                    status: 'success',
                    data: { nodes: sampleGraphData.nodes },
                    count: sampleGraphData.nodes.length,
                    timestamp: new Date().toISOString()
                };
                break;
            case 'edges':
                responseData = {
                    status: 'success',
                    data: { edges: sampleGraphData.edges },
                    count: sampleGraphData.edges.length,
                    timestamp: new Date().toISOString()
                };
                break;
            case 'graph':
                responseData = {
                    status: 'success',
                    data: sampleGraphData,
                    timestamp: new Date().toISOString()
                };
                break;
            case 'query':
                responseData = {
                    status: 'success',
                    data: {
                        query: 'SELECT * FROM nodes WHERE type = "user"',
                        results: sampleGraphData.nodes.filter(n => n.type === 'user')
                    },
                    timestamp: new Date().toISOString()
                };
                break;
        }

        currentData = responseData;
        displayData(responseData);
        visualizeGraph(sampleGraphData);

        // Reset button
        executeBtn.textContent = 'Execute Request';
        executeBtn.disabled = false;
    }

    /**
     * Display JSON data
     */
    function displayData(data) {
        const codeElement = dataOutput.querySelector('code');
        codeElement.textContent = JSON.stringify(data, null, 2);
    }

    /**
     * Visualize graph data
     */
    function visualizeGraph(graphData) {
        // Clear existing visualization
        graphContainer.innerHTML = '';

        const containerWidth = graphContainer.clientWidth;
        const containerHeight = 400;
        
        // Position nodes in a circle
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const radius = Math.min(containerWidth, containerHeight) / 3;

        const nodePositions = {};
        
        graphData.nodes.forEach((node, index) => {
            const angle = (index / graphData.nodes.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            nodePositions[node.id] = { x, y };
            
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.textContent = node.id;
            nodeElement.title = node.label;
            nodeElement.style.left = `${x - 30}px`;
            nodeElement.style.top = `${y - 30}px`;
            nodeElement.setAttribute('role', 'button');
            nodeElement.setAttribute('aria-label', `${node.label}, ${node.type}`);
            nodeElement.tabIndex = 0;
            
            graphContainer.appendChild(nodeElement);
        });

        // Draw edges
        graphData.edges.forEach(edge => {
            const from = nodePositions[edge.from];
            const to = nodePositions[edge.to];
            
            if (from && to) {
                const edgeElement = document.createElement('div');
                edgeElement.className = 'edge';
                
                const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
                const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
                
                edgeElement.style.width = `${length}px`;
                edgeElement.style.left = `${from.x}px`;
                edgeElement.style.top = `${from.y}px`;
                edgeElement.style.transform = `rotate(${angle}deg)`;
                edgeElement.setAttribute('aria-hidden', 'true');
                
                graphContainer.appendChild(edgeElement);
            }
        });
    }
});
