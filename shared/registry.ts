export type NodeExecutor = (nodeData: any) => Promise<any>;

export const nodeRegistry: Record<string, NodeExecutor> = {
    'startNode': async (data) => {
        console.log("[Registry] Executing Start Node");
        return { status: "started", timestamp: Date.now() };
    },
    'apiNode': async (data) => {
        console.log("[Registry] Executing API Node", data);
        // Mock API call
        return { status: "success", data: "API response mock" };
    },
    'conditionNode': async (data) => {
        console.log("[Registry] Executing Condition Node");
        return { result: true };
    },
    'delayNode': async (data) => {
        console.log("[Registry] Executing Delay Node");
        return { delayed: true };
    },
    'logNode': async (data) => {
        console.log("[Registry] Logging:", data.label || data.id);
        return { logged: true };
    }
};

export const getExecutor = (nodeType: string): NodeExecutor => {
    const executor = nodeRegistry[nodeType];
    if (!executor) {
        throw new Error(`No executor found for node type: ${nodeType}`);
    }
    return executor;
};
