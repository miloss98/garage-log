import type { CarWithRecords } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { CarFront, ChevronRight, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatMileage } from "@/lib/utils";
import { FUEL_LABELS, SERVICE_LABELS } from "@/lib/constants";
import { describeDue, getUpcomingServices } from "@/lib/service-status";
import ServiceStatusBadge from "./ServiceStatusBadge";

// The whole card is one link: a bigger tap target than a button inside it
export default function CarCard({ car }: { car: CarWithRecords }) {
  // Most urgent item comes first
  const next = getUpcomingServices(car.mileage, car.service_records)[0];
  const needsAttention = next && next.status !== "ok";

  return (
    <Link
      href={`/dashboard/cars/${car.id}`}
      className="card-hover group block overflow-hidden rounded-2xl border border-border bg-card outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-16/10 bg-muted">
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={`${car.name} - ${car.model ?? "car photo"}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <CarFront size={48} className="text-muted-foreground/50" />
          </div>
        )}
        {needsAttention && (
          <ServiceStatusBadge
            status={next.status}
            className="absolute top-3 left-3 shadow"
          />
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">{car.name}</h2>
            <p className="truncate text-sm text-muted-foreground">
              {[car.model, car.year].filter(Boolean).join(" · ")}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {FUEL_LABELS[car.fuel_type]}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-sm">
          <span className="min-w-0 truncate text-muted-foreground">
            {next ? (
              <>
                <span className="text-foreground">
                  {next.title ?? SERVICE_LABELS[next.type]}
                </span>{" "}
                · {describeDue(next)}
              </>
            ) : car.mileage != null ? (
              <span className="inline-flex items-center gap-1.5">
                <Gauge size={14} /> {formatMileage(car.mileage)}
              </span>
            ) : (
              "No reminders set"
            )}
          </span>
          <ChevronRight
            size={16}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
