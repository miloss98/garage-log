"use client";

import { useCars } from "@/hooks/useCars";
import CarCard from "./CarCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Car } from "lucide-react";

// Same shape as CarCard, so nothing jumps when the data arrives
function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default function CarList() {
  const { data: cars, isLoading, isError } = useCars();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">
          Failed to load cars. Please try again.
        </p>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-20">
        <Car size={48} className="text-muted-foreground mx-auto mb-4" />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
