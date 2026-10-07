import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { CarWithRecords } from "@/types";

// GET /cars returns the user's cars (newest first) with their service records.
// The API reads the user from the cookie, so no user id is passed.
export async function fetchCars() {
  const { cars } = await apiFetch<{ cars: CarWithRecords[] }>("/cars");
  return cars;
}

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) =>
      apiFetch(`/cars/${carId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
