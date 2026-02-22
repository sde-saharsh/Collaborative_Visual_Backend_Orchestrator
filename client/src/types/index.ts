export type LogType = "info" | "success" | "error"

export interface Log {
    id: string
    message: string
    type: LogType
}

export interface NodeData {
    label: string
}
