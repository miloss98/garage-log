"use client";

import type { Car } from "@/types";
import CarCard from "./CarCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CarList({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🚗</p>
        <h2 className="text-xl font-semibold mb-2">No cars yet</h2>
        <p className="text-muted-foreground mb-6">
          Add your first car to start tracking maintenance
        </p>
        <Button asChild>
          <Link href="/dashboard/cars/new">Add your first car</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
