import Link from "next/link";
import { Button } from "@/components/ui/button";
import CarList from "@/components/cars/CarList";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { CarsMetadata } from "@/lib/seo";

export const metadata: Metadata = CarsMetadata;

export default function CarsPage() {
  return (
    <div>
      <div className="flex md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Cars</h1>
          <p className="text-muted-foreground mt-1">
            Manage your vehicles and service records
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cars/new">
            <Plus size={16} /> Add Car
          </Link>
        </Button>
      </div>
      <CarList />
    </div>
  );
}
