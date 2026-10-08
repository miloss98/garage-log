import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/api/server";
import Navbar from "@/components/layout/Navbar";
import DemoBanner from "@/components/layout/DemoBanner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      <Navbar email={user.email} fullName={user.full_name} />
      {user.is_demo && <DemoBanner />}
      <main className="container mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
