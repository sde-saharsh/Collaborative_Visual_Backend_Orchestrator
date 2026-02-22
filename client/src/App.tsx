import { ReactFlowProvider } from "reactflow"
import Canvas from "../reactflow/Canvas.tsx"
import Inspector from "./components/Inspector.tsx"
import NodePalette from "./components/NodePalette.tsx"
import StatusBadge from "./components/StatusBadge.tsx"
import TopBar from "./components/TopBar.tsx"
import Console from "./components/Console.tsx"
import MainLayout from "./components/layout/MainLayout.tsx"

import { useWorkflow } from "./hooks/useWorkflow"
import { useLogs } from "./hooks/useLogs"

const App = () => {
  const { logs, addLog } = useLogs()
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    onRun,
  } = useWorkflow({ addLog })

  return (
    <ReactFlowProvider>
      <MainLayout
        topBar={<TopBar onRun={onRun} />}
        sidebar={<NodePalette addNode={addNode} />}
        inspector={<Inspector />}
      >
        {/* Main Canvas Area */}
        <div className="flex-1 relative h-full">
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />

          <div className="absolute top-4 right-4 z-10 shadow-sm rounded-full">
            <StatusBadge status="idle" />
          </div>
        </div>

        {/* Console Log Area */}
        <Console logs={logs} />
      </MainLayout>
    </ReactFlowProvider>
  )
}

export default App