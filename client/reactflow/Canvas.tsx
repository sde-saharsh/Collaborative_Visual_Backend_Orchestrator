import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    type Edge,
    type Node,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange
} from "reactflow";
import { customNodeTypes } from "../src/components/nodes/CustomNodes";

import "reactflow/dist/style.css";

interface CanvasProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
}

const Canvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }: CanvasProps) => {
    return (
        <div className="w-full h-full bg-slate-50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={customNodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className="w-full h-full"
                deleteKeyCode={['Backspace', 'Delete']}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

export default Canvas;
