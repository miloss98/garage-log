import { getCurrentUser } from "@/lib/api/server";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ExpensesSection from "@/components/dashboard/ExpensesSection";
import type { Metadata } from "next";
import { DashBoardMetadata } from "@/lib/seo";

export const metadata: Metadata = DashBoardMetadata;

export default async function DashboardPage() {
  // Already fetched by the protected layout; cache() reuses that result.
  const user = await getCurrentUser();

  return (
    <div className="space-y-10">
      <DashboardSummary userName={user?.full_name ?? ""} />
      <ExpensesSection currency={user?.currency ?? "EUR"} />
    </div>
  );
}
