import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    Pending: { color: "bg-yellow-100 text-yellow-800", label: "Pendiente" },
    "In Review": { color: "bg-blue-100 text-blue-800", label: "En Revisión" },
    Approved: { color: "bg-green-100 text-green-800", label: "Aprobado" },
    Rejected: { color: "bg-red-100 text-red-800", label: "Rechazado" },
    Active: { color: "bg-green-100 text-green-800", label: "Activa" },
    Closed: { color: "bg-gray-100 text-gray-800", label: "Cerrada" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    color: "bg-gray-100 text-gray-800",
    label: status,
  };

  return <Badge className={config.color}>{config.label}</Badge>;
}