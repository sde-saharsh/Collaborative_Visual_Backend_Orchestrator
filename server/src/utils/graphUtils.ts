// Graph Utility Functions for DAG validation

interface Node {
    id: string;
    [key: string]: any;
}

interface Edge {
    source: string;
    target: string;
    [key: string]: any;
}

export const buildAdjacencyList = (nodes: Node[], edges: Edge[]): Map<string, string[]> => {
    const adj = new Map<string, string[]>();

    nodes.forEach(node => {
        if (node && node.id) {
            adj.set(node.id, []);
        }
    });

    edges.forEach(edge => {
        if (edge.source && edge.target) {
            if (adj.has(edge.source)) {
                adj.get(edge.source)!.push(edge.target);
            } else {
                adj.set(edge.source, [edge.target]);
            }

            if (!adj.has(edge.target)) {
                adj.set(edge.target, []);
            }
        }
    });

    return adj;
};

export const isDAG = (adjMap: Map<string, string[]>): boolean => {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const hasCycle = (nodeId: string): boolean => {
        visited.add(nodeId);
        recStack.add(nodeId);

        const neighbors = adjMap.get(nodeId) || [];
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                if (hasCycle(neighborId)) return true;
            } else if (recStack.has(neighborId)) {
                console.log(`[Cycle Detection] Cycle detected at node: ${nodeId} -> ${neighborId}`);
                return true;
            }
        }

        recStack.delete(nodeId);
        return false;
    };

    const allNodeIds = Array.from(adjMap.keys());
    for (const nodeId of allNodeIds) {
        if (!visited.has(nodeId)) {
            if (hasCycle(nodeId)) return false;
        }
    }

    return true;
};

export const getGraphStats = (nodes: Node[], edges: Edge[]) => {
    const incomingCount = new Map<string, number>();
    const outgoingCount = new Map<string, number>();

    nodes.forEach(node => {
        if (node && node.id) {
            incomingCount.set(node.id, 0);
            outgoingCount.set(node.id, 0);
        }
    });

    edges.forEach(edge => {
        if (edge.target) {
            if (!incomingCount.has(edge.target)) incomingCount.set(edge.target, 0);
            incomingCount.set(edge.target, incomingCount.get(edge.target)! + 1);
        }
        if (edge.source) {
            if (!outgoingCount.has(edge.source)) outgoingCount.set(edge.source, 0);
            outgoingCount.set(edge.source, outgoingCount.get(edge.source)! + 1);
        }

        // Ensure both source and target exist in both maps for consistency
        if (edge.source && !incomingCount.has(edge.source)) incomingCount.set(edge.source, 0);
        if (edge.target && !outgoingCount.has(edge.target)) outgoingCount.set(edge.target, 0);
    });

    const startNodes: string[] = [];
    const endNodes: string[] = [];

    incomingCount.forEach((count, nodeId) => {
        if (count === 0) startNodes.push(nodeId);
    });

    outgoingCount.forEach((count, nodeId) => {
        if (count === 0) endNodes.push(nodeId);
    });

    return {
        incomingCount: Object.fromEntries(incomingCount),
        outgoingCount: Object.fromEntries(outgoingCount),
        startNodes,
        endNodes
    };
};

