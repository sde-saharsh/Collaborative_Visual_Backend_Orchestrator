import { useState } from "react"
import { useReactFlow, useOnSelectionChange, type Node } from "reactflow"

const Inspector = () => {
  const { setNodes } = useReactFlow()
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  // Local state for the form
  const [label, setLabel] = useState("")
  const [condition, setCondition] = useState("")
  const [method, setMethod] = useState("GET")
  const [endpoint, setEndpoint] = useState("")
  const [delay, setDelay] = useState("")

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        const node = nodes[0]
        setSelectedNode(node)
        setLabel(node.data?.label || "")
        setCondition(node.data?.condition || "")
        setMethod(node.data?.method || "GET")
        setEndpoint(node.data?.endpoint || "")
        setDelay(node.data?.delay || "")
      } else {
        setSelectedNode(null)
      }
    },
  })

  // Update node in React Flow when "Save Changes" is clicked
  const handleSaveChanges = () => {
    if (!selectedNode) return

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const updatedData = { ...node.data, label };

          if (node.type === "condition") updatedData.condition = condition;
          if (node.type === "api") {
            updatedData.method = method;
            updatedData.endpoint = endpoint;
          }
          if (node.type === "delay") updatedData.delay = delay;

          return {
            ...node,
            data: updatedData,
          }
        }
        return node
      })
    )
  }

  return (
    <div className="w-80 h-full border-l bg-white shadow-sm flex flex-col">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-4 font-semibold text-gray-700">
        Inspector
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!selectedNode ? (
          <div className="text-sm text-gray-500 text-center mt-10">
            Select a node to inspect and edit its properties.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between">
              <span>{selectedNode.type} Node</span>
              <span>{selectedNode.id.split("-")[0]}</span>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1 font-medium">Node Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter node label"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {selectedNode.type === "api" && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-2 space-y-3">
                <label className="text-sm text-blue-800 flex items-center mb-1 font-medium gap-1">
                  <span>🌐</span> API Configuration
                </label>
                <div>
                  <label className="text-xs text-blue-700 block mb-1">HTTP Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-blue-700 block mb-1">Endpoint URL</label>
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="https://api.example.com/v1/users"
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              </div>
            )}

            {selectedNode.type === "condition" && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100 mb-2">
                <label className="text-sm text-yellow-800 flex items-center mb-1 font-medium gap-1">
                  <span>⚡</span> Condition Expression
                </label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. status === 'success'"
                  className="w-full border border-yellow-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
            )}

            {selectedNode.type === "delay" && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-2">
                <label className="text-sm text-purple-800 flex items-center mb-1 font-medium gap-1">
                  <span>⏱</span> Delay Duration (ms)
                </label>
                <input
                  type="number"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>
            )}

            <div className="pt-4 mt-2 border-t">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
              >
                Save Node Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inspector