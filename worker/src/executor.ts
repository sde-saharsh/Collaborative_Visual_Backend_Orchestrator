import { getNodeFromMap } from '../../shared/execution.js';
import { getExecutor } from '../../shared/registry.js';

/**
 * Executes a single node by fetching its data and calling the registry.
 */
export const executeNode = async (workflowId: string, nodeId: string) => {
    // 1. Get node data
    const node = await getNodeFromMap(workflowId, nodeId);
    if (!node) {
        throw new Error(`Node ${nodeId} not found in workflow ${workflowId}`);
    }

    console.log(`[Executor] Executing node ${nodeId} of type ${node.type}`);

    // 2. Get executor from registry
    const executor = getExecutor(node.type);

    // 3. Run execution logic
    const result = await executor(node.data);

    return result;
};
