import { Play, Save } from "lucide-react"

interface TopBarProps {
  onRun?: () => void;
}

const TopBar = ({ onRun }: TopBarProps) => {
  return (
    <div className="h-14 w-full border-b bg-white flex items-center justify-between px-6 shadow-sm">

      {/* Left Section */}
      <div className="text-lg font-semibold text-gray-800">
        Nexus Flow
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100 transition">
          <Save size={16} />
          Save
        </button>

        <button
          onClick={onRun}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          <Play size={16} />
          Run
        </button>
      </div>

    </div>
  )
}

export default TopBar