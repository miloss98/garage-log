import { getCurrentUser, serverFetch } from "@/lib/api/server";
import type { Car } from "@/types";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CarEditForm from "@/components/cars/CarEditForm";
import { ArrowLeft } from "lucide-react";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, { car }] = await Promise.all([
    getCurrentUser(),
    serverFetch<{ car: Car | null }>(`/cars/${id}`),
  ]);

  if (!car) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/dashboard/cars/${id}`}>
            {" "}
            <ArrowLeft size={16} />{" "}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Car</h1>
        <p className="text-muted-foreground mt-1">
          Update your vehicle details
        </p>
      </div>
      <CarEditForm car={car} isDemo={user?.is_demo} />
    </div>
  );
}
