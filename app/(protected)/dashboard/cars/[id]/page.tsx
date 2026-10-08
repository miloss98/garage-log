import { getCurrentUser, serverFetch } from "@/lib/api/server";
import type { Car, ServiceRecord } from "@/types";
import { FUEL_LABELS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil } from "lucide-react";
import ServiceRecordList from "@/components/cars/ServiceRecordList";
import UpcomingServices from "@/components/cars/UpcomingServices";
import DeleteCarButton from "@/components/cars/DeleteCarButton";
import { formatMileage } from "@/lib/utils";
import Image from "next/image";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Both requests run in parallel instead of one after the other.
  const [user, { car }, { serviceRecords }] = await Promise.all([
    getCurrentUser(),
    serverFetch<{ car: Car | null }>(`/cars/${id}`),
    serverFetch<{ serviceRecords: ServiceRecord[] }>(
      `/cars/${id}/service-records`,
    ),
  ]);

  if (!car) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          asChild
          aria-label="Back to My Cars"
        >
          <Link href="/dashboard/cars">
            <ArrowLeft size={16} />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild aria-label="Edit car">
            <Link href={`/dashboard/cars/${car.id}/edit`}>
              <Pencil size={16} />
            </Link>
          </Button>
          <DeleteCarButton carId={car.id} />
        </div>
      </div>

      {/* Car header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {car.image_url ? (
          <div className="relative w-full md:w-64 h-48">
            <Image
              src={car.image_url}
              alt={`${car.name} - ${car.model ?? "car photo"}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 256px"
              loading="eager"
              priority
            />
          </div>
        ) : (
          <div className="w-full md:w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-6xl">🚗</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{car.name}</h1>
            {car.fuel_type && (
              <Badge variant="secondary">{FUEL_LABELS[car.fuel_type]}</Badge>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
            {car.model && (
              <div>
                <span className="text-muted-foreground">Model</span>
                <p className="font-medium">{car.model}</p>
              </div>
            )}
            {car.year && (
              <div>
                <span className="text-muted-foreground">Year</span>
                <p className="font-medium">{car.year}</p>
              </div>
            )}
            {car.color && (
              <div>
                <span className="text-muted-foreground">Color</span>
                <p className="font-medium">{car.color}</p>
              </div>
            )}
            {car.licence_plate && (
              <div>
                <span className="text-muted-foreground">License Plate</span>
                <p className="font-medium">{car.licence_plate}</p>
              </div>
            )}
            {car.mileage && (
              <div>
                <span className="text-muted-foreground">Mileage</span>
                <p className="font-medium">{formatMileage(car.mileage)} </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpcomingServices
        carMileage={car.mileage}
        serviceRecords={serviceRecords}
      />

      <ServiceRecordList
        carId={car.id}
        serviceRecords={serviceRecords}
        currency={user?.currency ?? "EUR"}
        currentMileage={car.mileage}
      />
    </div>
  );
}
