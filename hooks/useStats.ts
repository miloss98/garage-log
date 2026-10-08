import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { Stats } from "@/types";

// Key starts with "cars": every place that already invalidates ["cars"]
// after a change (add/edit/delete record or car) refreshes the stats too,
// because React Query matches keys by prefix.
export function useStats(months = 12) {
  return useQuery({
    queryKey: ["cars", "stats", months],
    queryFn: () => apiFetch<Stats>(`/stats?months=${months}`),
  });
}
