import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Car, ServiceRecord } from "@/types";

export type CarWithRecords = Car & {
  service_records: ServiceRecord[];
};

export function useDashboard() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("cars")
        .select("*, service_records(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CarWithRecords[];
    },
  });
}
