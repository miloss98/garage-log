import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CarList from "@/components/cars/CarList";

export default async function CarsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

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

      <CarList cars={cars ?? []} />
    </div>
  );
}
