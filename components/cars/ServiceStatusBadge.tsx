import { Badge } from "@/components/ui/badge";
import type { ServiceStatus } from "@/lib/service-status";
import { cn } from "@/lib/utils";

const STYLES: Record<ServiceStatus, { label: string; className: string }> = {
  overdue: { label: "Overdue", className: "bg-red-600 text-white" },
  due_soon: { label: "Due soon", className: "bg-amber-500 text-white" },
  ok: { label: "OK", className: "bg-green-600 text-white" },
};

export default function ServiceStatusBadge({
  status,
  className,
}: {
  status: ServiceStatus;
  className?: string;
}) {
  const { label, className: statusClass } = STYLES[status];
  return (
    <Badge className={cn("pointer-events-none", statusClass, className)}>
      {label}
    </Badge>
  );
}
