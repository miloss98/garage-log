import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import ServiceStatusBadge from "./ServiceStatusBadge";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";
import { describeDue, getUpcomingServices } from "@/lib/service-status";
import { formatDate, formatMileage } from "@/lib/utils";
import type { ServiceRecord } from "@/types";

// Server component: the status is computed once on the server, so the
// "days left" text can't differ between server and browser render.
export default function UpcomingServices({
  carMileage,
  serviceRecords,
}: {
  carMileage: number | null;
  serviceRecords: ServiceRecord[];
}) {
  const upcoming = getUpcomingServices(carMileage, serviceRecords);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarClock size={18} /> Upcoming
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing scheduled. Add a next due date or mileage to a service
            record to get reminders here.
          </p>
        ) : (
          <ul className="divide-y">
            {upcoming.map((service) => (
              <li
                key={service.lastRecord.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-0.5 shrink-0">
                    {SERVICE_ICONS[service.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {service.title ?? SERVICE_LABELS[service.type]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {describeDue(service)}
                      {" · "}
                      {[
                        service.dueDate && formatDate(service.dueDate),
                        service.dueMileage != null &&
                          formatMileage(service.dueMileage),
                      ]
                        .filter(Boolean)
                        .join(" or ")}
                    </p>
                  </div>
                </div>
                <ServiceStatusBadge status={service.status} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
