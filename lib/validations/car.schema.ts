import { z } from "zod";

export const carSchema = z.object({
  name: z.string().min(1, "Car name is required"),
  model: z.string().optional(),
  year: z.string().min(1, "Year is required"),
  color: z.string().optional(),
  fuel_type: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
  licence_plate: z.string().optional(),
  mileage: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>;

// Form inputs are strings; the API wants numbers, and null for "empty".
// fuel_type is left undefined when unset so the API default (PETROL) applies.
export function toCarPayload(data: CarFormData, image_url: string | null) {
  return {
    name: data.name,
    year: parseInt(data.year),
    model: data.model || null,
    color: data.color || null,
    licence_plate: data.licence_plate || null,
    mileage: data.mileage ? parseInt(data.mileage) : null,
    fuel_type: data.fuel_type,
    image_url,
  };
}

export const serviceRecordSchema = z.object({
  type: z.enum([
    "OIL_CHANGE",
    "SMALL_SERVICE",
    "BIG_SERVICE",
    "TIRE_CHANGE",
    "REGISTRATION",
  ]),
  service_date: z
    .string()
    .min(1, "Service date is required")
    .refine(
      (date) => new Date(date) <= new Date(),
      "Service date cannot be in the future",
    ),
  next_service_date: z
    .string()
    .refine(
      (date) => !date || new Date(date) >= new Date(),
      "Next service date cannot be in the past",
    )
    .optional(),
  mileage_at_service: z.string().optional(),
  notes: z.string().optional(),
});

export type ServiceRecordFormData = z.infer<typeof serviceRecordSchema>;
