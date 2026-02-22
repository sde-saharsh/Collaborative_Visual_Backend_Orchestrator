import { useState, useCallback } from "react"
import type { Log, LogType } from "../types"

export const useLogs = () => {
    const [logs, setLogs] = useState<Log[]>([])

    const addLog = useCallback((message: string, type: LogType = "info") => {
        setLogs((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                message: `[${new Date().toLocaleTimeString()}] ${message}`,
                type
            },
        ])
    }, [])

    const clearLogs = useCallback(() => {
        setLogs([])
    }, [])

    return { logs, addLog, clearLogs }
}
