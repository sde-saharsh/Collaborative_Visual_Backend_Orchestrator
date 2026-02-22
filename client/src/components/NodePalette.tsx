interface NodePaletteProps {
  addNode: (type: string, label: string) => void;
}

const NodePalette = ({ addNode }: NodePaletteProps) => {
  return (
    <div className="w-64 h-full border-r bg-white shadow-sm flex flex-col">

      {/* Header */}
      <div className="h-14 border-b flex items-center px-4 font-semibold text-gray-700">
        Nodes
      </div>

      {/* Node List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        <div onClick={() => addNode('start', 'Start Node')} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
          🟢 Start Node
        </div>

        <div onClick={() => addNode('end', 'End Node')} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
          🏁 End Node
        </div>

        <div onClick={() => addNode('api', 'API Node')} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
          🔵 API Node
        </div>

        <div onClick={() => addNode('condition', 'Condition')} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
          🟡 Condition Node
        </div>

        <div onClick={() => addNode('delay', 'Delay Node')} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
          🟣 Delay Node
        </div>

      </div>
    </div>
  )
}

export default NodePalette