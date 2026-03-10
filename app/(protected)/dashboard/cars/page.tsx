import Link from "next/link";
import { Button } from "@/components/ui/button";
import CarList from "@/components/cars/CarList";

export default function CarsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Cars</h1>
          <p className="text-muted-foreground mt-1">
            Manage your vehicles and service records
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cars/new">+ Add Car</Link>
        </Button>
      </div>
      <CarList />
    </div>
  );
}
