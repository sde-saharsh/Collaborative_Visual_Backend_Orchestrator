import { useState, useCallback, useRef, useEffect } from "react"
import type { Log, LogType } from "../types"

interface ConsoleProps {
  logs: Log[]
}

const logStyles: Record<LogType, string> = {
  info: "text-gray-400",
  success: "text-green-400",
  error: "text-red-400",
}

const Console = ({ logs }: ConsoleProps) => {
  const [height, setHeight] = useState(160)
  const isResizing = useRef(false)

  const startResizing = useCallback(() => {
    isResizing.current = true
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const stopResizing = useCallback(() => {
    isResizing.current = false
    document.body.style.cursor = 'default'
    document.body.style.userSelect = 'auto'
  }, [])

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return
    const newHeight = window.innerHeight - e.clientY
    if (newHeight >= 40 && newHeight <= 600) {
      setHeight(newHeight)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <div
      className="w-full border-t bg-[#1e1e1e] text-white flex flex-col relative"
      style={{ height: `${height}px` }}
    >
      <div
        className="h-1 w-full hover:bg-blue-500 cursor-row-resize absolute -top-0.5 z-20 transition-colors"
        onMouseDown={startResizing}
      />

      <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          Console
        </div>
        <div className="text-[10px] text-gray-600">
          {logs.length} messages
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 text-xs font-mono">
        {logs.length === 0 ? (
          <p className="text-gray-600 italic">No output recorded yet...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 border-b border-gray-900/50 pb-1 last:border-0 hover:bg-white/5 transition-colors">
              <span className="text-gray-700 shrink-0 select-none">
                {log.message.includes(']') ? log.message.split(']')[0] + ']' : ''}
              </span>
              <span className={logStyles[log.type]}>
                {log.message.includes(']') ? log.message.split(']')[1] : log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Console