import { Request, Response } from "express";
import { buildAdjacencyList, isDAG, getGraphStats } from "../utils/graphUtils.js";

export const executeGraph = (req: Request, res: Response) => {
    try {
        const { nodes, edges } = req.body;

        if (!nodes || !Array.isArray(nodes)) {
            return res.status(400).json({ error: "Invalid nodes data" });
        }

        console.log(`== Executing DAG Check == (Nodes: ${nodes.length}, Edges: ${edges?.length || 0})`);
        const adj = buildAdjacencyList(nodes, edges || []);

        console.log("Adjacency List:", adj);

        const validDAG = isDAG(adj);
        console.log("Is DAG Result:", validDAG);

        if (!validDAG) {
            return res.status(400).json({
                success: false,
                message: "Cycle detected! The graph must be a Directed Acyclic Graph (DAG)."
            });
        }

        const { incomingCount, outgoingCount, startNodes, endNodes } = getGraphStats(nodes, edges || []);
        console.log("Start Nodes:", startNodes);
        console.log("End Nodes:", endNodes);

        res.status(200).json({
            success: true,
            message: "Graph is a valid DAG. Execution potential confirmed.",
            nodeCount: nodes.length,
            edgeCount: edges?.length || 0,
            incomingCount,
            outgoingCount,
            startNodes,
            endNodes
        });
    } catch (error) {
        console.error("Execution error:", error);
        res.status(500).json({ error: "Internal server error -- error in graph controller" });
    }
};