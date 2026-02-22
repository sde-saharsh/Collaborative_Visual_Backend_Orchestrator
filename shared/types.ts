export interface NodeData {
    id: string;
    type: string;
    data?: any;
}

export interface EdgeData {
    source: string;
    target: string;
}

export interface WorkflowData {
    nodes: NodeData[];
    edges: EdgeData[];
}

export interface JobData {
    workflowId: string;
    nodeId: string;
}

export interface NodeResult {
    nodeId: string;
    status: 'success' | 'failed';
    result?: any;
    error?: string;
    timestamp: number;
}
