"use client";

import { useCars } from "@/hooks/useCars";
import CarCard from "./CarCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Car } from "lucide-react";

function CarCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

export default function CarList() {
  const { data: cars, isLoading, isError } = useCars();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
