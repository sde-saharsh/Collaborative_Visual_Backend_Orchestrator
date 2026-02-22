import { Job } from 'bullmq';
import { JobData } from '../../../shared/types.js';
import { executeNode } from '../executor.js';
import { unlockChildren, storeNodeResult } from '../../../shared/execution.js';
import { workflowQueue } from '../index.js';

export const nodeProcessor = async (job: Job<JobData>) => {
    const { workflowId, nodeId } = job.data;
    console.log(`[Processor] Processing node ${nodeId} for workflow ${workflowId}`);

    try {
        // 1. Execute the node
        const result = await executeNode(workflowId, nodeId);

        // 2. Store the result
        await storeNodeResult(workflowId, nodeId, result);

        // 3. Notify orchestrator to unlock children
        await unlockChildren(workflowQueue, workflowId, nodeId);

        return result;
    } catch (error: any) {
        console.error(`[Processor] Error processing node ${nodeId}:`, error);
        throw error;
    }
};
