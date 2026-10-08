import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/api/server";
import Sidebar from "@/components/layout/Sidebar";
import { MobileTabBar, MobileTopBar } from "@/components/layout/MobileNav";
import DemoBanner from "@/components/layout/DemoBanner";

// App shell: sidebar on desktop (lg+), top bar + bottom tab bar on phones
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background lg:pl-64">
      <Sidebar email={user.email} fullName={user.full_name} />
      <MobileTopBar email={user.email} fullName={user.full_name} />
      {user.is_demo && <DemoBanner />}
      {/* Bottom padding keeps content clear of the mobile tab bar */}
      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12">
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
}
