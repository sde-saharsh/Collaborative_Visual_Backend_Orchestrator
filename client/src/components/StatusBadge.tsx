type Status = "idle" | "running" | "success" | "error"

interface StatusBadgeProps {
  status: Status
}

const statusStyles: Record<Status, string> = {
  idle: "bg-gray-100 text-gray-600",
  running: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  error: "bg-red-100 text-red-600",
}

const statusLabels: Record<Status, string> = {
  idle: "Idle",
  running: "Running",
  success: "Success",
  error: "Error",
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}

export default StatusBadge