import { z } from "zod";

export const carSchema = z.object({
  name: z.string().min(1, "Car name is required"),
  model: z.string().optional(),
  year: z.coerce.number().min(1900).max(new Date().getFullYear()).optional(),
  color: z.string().optional(),
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid"]).optional(),
  license_plate: z.string().optional(),
  mileage: z.coerce.number().min(0).optional(),
});

export const serviceRecordSchema = z.object({
  type: z.enum([
    "oil_change",
    "small_service",
    "big_service",
    "tire_change",
    "registration",
  ]),
  service_date: z.string().min(1, "Service date is required"),
  next_service_date: z.string().optional(),
  mileage_at_service: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>;
export type ServiceRecordFormData = z.infer<typeof serviceRecordSchema>;
