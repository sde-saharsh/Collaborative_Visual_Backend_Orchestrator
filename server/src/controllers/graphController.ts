import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { analyzeGraph } from "../../../shared/graph.js";
import { workflowQueue } from "../execution/queue.js";
import { initializeWorkflowState, enqueueNode, storeAdjList, storeNodeMap } from "../../../shared/execution.js";

export const executeGraph = async (req: Request, res: Response) => {
    try {
        const { nodes, edges } = req.body;

        if (!nodes || !Array.isArray(nodes)) {
            return res.status(400).json({ error: "Invalid nodes data" });
        }

        console.log(`== Initializing Workflow Execution == (Nodes: ${nodes.length}, Edges: ${edges?.length || 0})`);

        // 1. Analyze the graph
        const analysis = analyzeGraph(nodes, edges || []);

        console.log("Is DAG Result:", analysis.isDAG);

        if (!analysis.isDAG) {
            return res.status(400).json({
                success: false,
                message: "Cycle detected! The graph must be a Directed Acyclic Graph (DAG)."
            });
        }

        // 2. Generate workflow ID
        const workflowId = uuidv4();

        // 3. Store shared state in Redis
        await storeAdjList(workflowId, analysis.adjList);
        await storeNodeMap(workflowId, analysis.nodeMap);
        await initializeWorkflowState(workflowId, analysis.remainingDeps);

        // 4. Enqueue initial (start) nodes
        console.log(`Starting workflow ${workflowId} with ${analysis.startNodes.length} start nodes`);
        for (const nodeId of analysis.startNodes) {
            await enqueueNode(workflowQueue, workflowId, nodeId);
        }

        res.status(200).json({
            success: true,
            message: "Workflow execution started successfully.",
            workflowId,
            nodeCount: nodes.length,
            edgeCount: edges?.length || 0,
            startNodes: analysis.startNodes
        });
    } catch (error) {
        console.error("Execution error:", error);
        res.status(500).json({ error: "Internal server error during workflow execution" });
    }
};