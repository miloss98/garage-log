import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CarEditForm from "@/components/cars/CarEditForm";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (!car) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/dashboard/cars/${id}`}>← Back to Car</Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Car</h1>
        <p className="text-muted-foreground mt-1">
          Update your vehicle details
        </p>
      </div>
      <CarEditForm car={car} />
    </div>
  );
}
