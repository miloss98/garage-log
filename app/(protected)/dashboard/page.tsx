import { createClient } from "@/lib/supabase/server";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import type { Metadata } from "next";
import { DashBoardMetadata } from "@/lib/seo";

export const metadata: Metadata = DashBoardMetadata;

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  return <DashboardSummary userName={profile?.full_name ?? ""} />;
}
