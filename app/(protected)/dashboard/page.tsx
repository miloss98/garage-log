import { getCurrentUser } from "@/lib/api/server";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import type { Metadata } from "next";
import { DashBoardMetadata } from "@/lib/seo";

export const metadata: Metadata = DashBoardMetadata;

export default async function DashboardPage() {
  // Already fetched by the protected layout; cache() reuses that result.
  const user = await getCurrentUser();

  return <DashboardSummary userName={user?.full_name ?? ""} />;
}
