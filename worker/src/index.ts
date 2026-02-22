import { Worker, Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { nodeProcessor } from './processors/nodeProcessor.js';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    maxRetriesPerRequest: null
});

export const workflowQueue = new Queue('workflow-queue', { connection });

const worker = new Worker('workflow-queue', nodeProcessor, {
    connection,
    concurrency: 5
});

worker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job?.id} failed: ${err.message}`);
});

console.log('[Worker] Started and listening for jobs...');
