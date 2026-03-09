import { z } from "zod";

export const carSchema = z.object({
  name: z.string().min(1, "Car name is required"),
  model: z.string().optional(),
  year: z.string().optional(),
  color: z.string().optional(),
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid"]).optional(),
  license_plate: z.string().optional(),
  mileage: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>;
