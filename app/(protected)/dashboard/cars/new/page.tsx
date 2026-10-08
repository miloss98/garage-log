import CarForm from "@/components/cars/CarForm";
import { getCurrentUser } from "@/lib/api/server";

export default async function NewCarPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add a Car</h1>
        <p className="text-muted-foreground mt-1">
          Fill in your vehicle details
        </p>
      </div>
      <CarForm isDemo={user?.is_demo} />
    </div>
  );
}
