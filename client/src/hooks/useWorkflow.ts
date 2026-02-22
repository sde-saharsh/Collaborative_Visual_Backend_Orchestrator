import { useCallback } from "react"
import { useNodesState, useEdgesState, addEdge, type Connection, type Node } from "reactflow"
import type { LogType } from "../types"

interface UseWorkflowProps {
    addLog: (message: string, type: LogType) => void
}

export const useWorkflow = ({ addLog }: UseWorkflowProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    )

    const addNode = useCallback((type: string, label: string) => {
        const newNode: Node = {
            id: crypto.randomUUID(),
            position: { x: 200, y: 200 },
            data: { label },
            type,
        }
        setNodes((nds) => [...nds, newNode])
    }, [setNodes])

    const onRun = useCallback(async () => {
        addLog("Starting execution check...", "info")

        // Find and log the starting and ending node IDs
        const startNode = nodes.find(node => node.type === "start")
        const endNode = nodes.find(node => node.type === "end")

        if (startNode) {
            addLog(`Starting Node ID: ${startNode.id}`, "info")
            console.log("Starting Node ID:", startNode.id)
        } else {
            addLog("No starting node found", "error")
        }

        if (endNode) {
            addLog(`Ending Node ID: ${endNode.id}`, "info")
            console.log("Ending Node ID:", endNode.id)
        } else {
            addLog("No ending node found", "error")
        }

        try {
            const response = await fetch("http://localhost:3000/api/graph/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nodes, edges }),
            })

            const data = await response.json()

            if (response.ok) {
                addLog(`Success: ${data.message}`, "success")
                addLog(`Stats: ${data.nodeCount} nodes, ${data.edgeCount} edges`, "info")
            } else {
                addLog(`Error: ${data.message || data.error}`, "error")
            }
        } catch (error) {
            addLog(`Network Error: Failed to connect to backend`, "error")
            console.error("Run error:", error)
        }
    }, [nodes, edges, addLog])

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        onRun,
    }
}
