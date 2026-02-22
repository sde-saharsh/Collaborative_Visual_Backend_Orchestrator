import { Redis } from 'ioredis';
import { JobData } from './types.js';
import { Queue } from 'bullmq';

const getRedisClient = () => new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    maxRetriesPerRequest: null
});

const redis = getRedisClient();

/**
 * Enqueues a node for execution.
 */
export const enqueueNode = async (queue: Queue, workflowId: string, nodeId: string) => {
    console.log(`[Execution] Enqueueing node ${nodeId} for workflow ${workflowId}`);
    await queue.add('node-execution', { workflowId, nodeId } as JobData, {
        removeOnComplete: true,
        removeOnFail: false
    });
};

/**
 * Initializes the dependency counts in Redis.
 */
export const initializeWorkflowState = async (workflowId: string, remainingDeps: Record<string, number>) => {
    const depsKey = `workflow:${workflowId}:deps`;
    const depsData: Record<string, string> = {};
    Object.entries(remainingDeps).forEach(([nodeId, count]) => {
        depsData[nodeId] = count.toString();
    });

    if (Object.keys(depsData).length > 0) {
        await redis.hset(depsKey, depsData);
    }
};

/**
 * Decrements children dependencies and enqueues those that reach 0.
 */
export const unlockChildren = async (queue: Queue, workflowId: string, nodeId: string) => {
    const depsKey = `workflow:${workflowId}:deps`;
    const adjKey = `workflow:${workflowId}:adj`;

    const adjListData = await redis.get(adjKey);
    if (!adjListData) return;

    const adjList: Record<string, string[]> = JSON.parse(adjListData);
    const children = adjList[nodeId] || [];

    for (const childId of children) {
        const remaining = await redis.hincrby(depsKey, childId, -1);
        if (remaining === 0) {
            await enqueueNode(queue, workflowId, childId);
        }
    }
};

/**
 * Stores the adjacency list for a workflow.
 */
export const storeAdjList = async (workflowId: string, adjList: Record<string, string[]>) => {
    const adjKey = `workflow:${workflowId}:adj`;
    await redis.set(adjKey, JSON.stringify(adjList));
};

/**
 * Stores the node metadata map.
 */
export const storeNodeMap = async (workflowId: string, nodeMap: Record<string, any>) => {
    const mapKey = `workflow:${workflowId}:nodes`;
    await redis.set(mapKey, JSON.stringify(nodeMap));
};

/**
 * Retrieves a node from the stored map.
 */
export const getNodeFromMap = async (workflowId: string, nodeId: string): Promise<any | null> => {
    const mapKey = `workflow:${workflowId}:nodes`;
    const data = await redis.get(mapKey);
    if (!data) return null;
    const nodeMap = JSON.parse(data);
    return nodeMap[nodeId] || null;
};

/**
 * Stores the final result of a node execution.
 */
export const storeNodeResult = async (workflowId: string, nodeId: string, result: any) => {
    const resultsKey = `workflow:${workflowId}:results`;
    await redis.hset(resultsKey, nodeId, JSON.stringify({
        nodeId,
        result,
        timestamp: Date.now()
    }));
};
