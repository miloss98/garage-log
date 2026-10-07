import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/hooks/useCars";

// Same request and cache key as useCars: the dashboard just needs
// the cars with their service records, which GET /cars already returns.
export function useDashboard() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
}
