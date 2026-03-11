"use client";

import type { Car } from "@/types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { formatMileage } from "@/lib/utils";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Card className="card-hover overflow-hidden">
      {car.image_url ? (
        <img
          src={car.image_url}
          alt={car.name}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <span className="text-6xl">🚗</span>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{car.name}</CardTitle>
          {car.fuel_type && (
            <Badge variant="secondary" className="capitalize">
              {car.fuel_type}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
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
              {formatMileage(car.mileage)} km
            </span>
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full transition-all duration-200">
          <Link
            href={`/dashboard/cars/${car.id}`}
            className="flex items-center justify-center gap-2"
          >
            View Details <ArrowRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
