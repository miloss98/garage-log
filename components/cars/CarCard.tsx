"use client";

import type { Car } from "@/types";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { formatMileage } from "@/lib/utils";
import Image from "next/image";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Card className="card-hover overflow-hidden p-0">
      {car.image_url ? (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={car.image_url}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            loading="eager"
            priority
          />
        </div>
      ) : (
        <div className="w-full h-44 bg-muted flex items-center justify-center">
          <span className="text-6xl">🚗</span>
        </div>
      )}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{car.name}</CardTitle>
          {car.fuel_type && (
            <Badge variant="secondary" className="capitalize">
              {car.fuel_type}
            </Badge>
          )}
        </div>
        <div className="space-y-1 text-sm text-muted-foreground pb-4">
          {car.model && (
            <p>
              Model:{" "}
              <span className="text-foreground font-medium">{car.model}</span>
            </p>
          )}
          {car.year && (
            <p>
              Year:{" "}
              <span className="text-foreground font-medium">{car.year}</span>
            </p>
          )}
          {car.license_plate && (
            <p>
              Plate:{" "}
              <span className="text-foreground font-medium">
                {car.license_plate}
              </span>
            </p>
          )}
          {car.mileage && (
            <p>
              Mileage:{" "}
              <span className="text-foreground font-medium">
                {formatMileage(car.mileage)}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button asChild className="w-full transition-all duration-200">
          <Link
            href={`/dashboard/cars/${car.id}`}
            className="flex items-center justify-center gap-2"
          >
            View Details <ArrowRight size={13} />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
