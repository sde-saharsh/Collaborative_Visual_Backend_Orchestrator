import { NodeData, EdgeData } from './types.js';

export interface GraphAnalysis {
    adjList: Record<string, string[]>;
    remainingDeps: Record<string, number>;
    topoOrder: string[];
    startNodes: string[];
    endNodes: string[];
    isDAG: boolean;
    nodeMap: Record<string, NodeData>;
}

export const analyzeGraph = (nodes: NodeData[], edges: EdgeData[]): GraphAnalysis => {
    const adjList: Record<string, string[]> = {};
    const remainingDeps: Record<string, number> = {};
    const nodeMap: Record<string, NodeData> = {};
    const incomingCount: Record<string, number> = {};
    const outgoingCount: Record<string, number> = {};

    nodes.forEach((node) => {
        adjList[node.id] = [];
        remainingDeps[node.id] = 0;
        incomingCount[node.id] = 0;
        outgoingCount[node.id] = 0;
        nodeMap[node.id] = node;
    });

    edges.forEach((edge) => {
        if (adjList[edge.source]) {
            adjList[edge.source].push(edge.target);
            remainingDeps[edge.target]++;
            incomingCount[edge.target]++;
            outgoingCount[edge.source]++;
        }
    });

    // Kahn's algorithm for topoOrder and DAG validation
    const topoOrder: string[] = [];
    const queue: string[] = [];
    const tempDeps = { ...remainingDeps };

    const startNodes: string[] = [];
    const endNodes: string[] = [];

    Object.entries(incomingCount).forEach(([id, count]) => {
        if (count === 0) {
            queue.push(id);
            startNodes.push(id);
        }
    });

    Object.entries(outgoingCount).forEach(([id, count]) => {
        if (count === 0) {
            endNodes.push(id);
        }
    });

    while (queue.length > 0) {
        const u = queue.shift()!;
        topoOrder.push(u);

        if (adjList[u]) {
            adjList[u].forEach((v) => {
                tempDeps[v]--;
                if (tempDeps[v] === 0) {
                    queue.push(v);
                }
            });
        }
    }

    const isDAG = topoOrder.length === nodes.length;

    return {
        adjList,
        remainingDeps,
        topoOrder,
        startNodes,
        endNodes,
        isDAG,
        nodeMap
    };
};
