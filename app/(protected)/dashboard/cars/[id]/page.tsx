import { getCurrentUser, serverFetch } from "@/lib/api/server";
import type { Car, ServiceRecord } from "@/types";
import { FUEL_LABELS, SERVICE_LABELS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CarFront, Pencil } from "lucide-react";
import ServiceRecordList from "@/components/cars/ServiceRecordList";
import UpcomingServices from "@/components/cars/UpcomingServices";
import DeleteCarButton from "@/components/cars/DeleteCarButton";
import ServiceStatusBadge from "@/components/cars/ServiceStatusBadge";
import { formatCurrency, formatDate, formatMileage } from "@/lib/utils";
import { describeDue, getUpcomingServices } from "@/lib/service-status";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-lg font-semibold">{value}</p>
      {hint && (
        <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {hint}
        </div>
      )}
    </div>
  );
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // All requests run in parallel instead of one after the other.
  const [user, { car }, { serviceRecords }] = await Promise.all([
    getCurrentUser(),
    serverFetch<{ car: Car | null }>(`/cars/${id}`),
    serverFetch<{ serviceRecords: ServiceRecord[] }>(
      `/cars/${id}/service-records`,
    ),
  ]);

  if (!car) notFound();

  const currency = user?.currency ?? "EUR";
  const totalSpent = serviceRecords.reduce(
    (sum, r) => sum + Number(r.cost ?? 0),
    0,
  );
  // The API returns records newest first
  const lastService = serviceRecords[0];
  const nextDue = getUpcomingServices(car.mileage, serviceRecords)[0];

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/cars"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} /> My Cars
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild aria-label="Edit car">
            <Link href={`/dashboard/cars/${car.id}/edit`}>
              <Pencil size={16} />
            </Link>
          </Button>
          <DeleteCarButton carId={car.id} />
        </div>
      </div>

      {/* Hero: photo + identity + key numbers */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative aspect-16/10 bg-muted md:aspect-auto md:min-h-72">
          {car.image_url ? (
            <Image
              src={car.image_url}
              alt={`${car.name} - ${car.model ?? "car photo"}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <CarFront size={64} className="text-muted-foreground/50" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 p-5 md:p-7">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{car.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {[car.model, car.year, car.color].filter(Boolean).join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{FUEL_LABELS[car.fuel_type]}</Badge>
              {car.licence_plate && (
                <Badge variant="outline" className="font-mono tracking-wide">
                  {car.licence_plate}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-4">
            <Stat
              label="Mileage"
              value={car.mileage != null ? formatMileage(car.mileage) : "—"}
            />
            <Stat
              label="Total spent"
              value={formatCurrency(totalSpent, currency)}
              hint={`${serviceRecords.length} record${serviceRecords.length === 1 ? "" : "s"}`}
            />
            <Stat
              label="Last service"
              value={lastService ? formatDate(lastService.service_date) : "—"}
              hint={
                lastService &&
                (lastService.title ?? SERVICE_LABELS[lastService.type])
              }
            />
            <Stat
              label="Next due"
              value={
                nextDue
                  ? (nextDue.title ?? SERVICE_LABELS[nextDue.type])
                  : "Nothing"
              }
              hint={
                nextDue && (
                  <span className="flex flex-wrap items-center gap-x-1.5">
                    <ServiceStatusBadge
                      status={nextDue.status}
                      className="px-1.5 py-0 text-[10px]"
                    />
                    {describeDue(nextDue)}
                  </span>
                )
              }
            />
          </div>
        </div>
      </section>

      {/* History + upcoming (upcoming first on phones, sidebar on desktop) */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="lg:sticky lg:top-6 lg:order-last">
          <UpcomingServices
            carMileage={car.mileage}
            serviceRecords={serviceRecords}
          />
        </div>
        <ServiceRecordList
          carId={car.id}
          serviceRecords={serviceRecords}
          currency={currency}
          currentMileage={car.mileage}
        />
      </div>
    </div>
  );
}
