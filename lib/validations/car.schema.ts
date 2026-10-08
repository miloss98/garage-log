import { z } from "zod";
import { SERVICE_LABELS, TYPES_REQUIRING_TITLE } from "@/lib/constants";
import type { ServiceType } from "@/types";

const MAX_YEAR = new Date().getFullYear() + 1;

export const carSchema = z.object({
  name: z.string().trim().min(1, "Car name is required").max(50),
  model: z.string().max(50).optional(),
  year: z
    .string()
    .min(1, "Year is required")
    .refine((year) => {
      const value = Number(year);
      return Number.isInteger(value) && value >= 1900 && value <= MAX_YEAR;
    }, `Year must be between 1900 and ${MAX_YEAR}`),
  color: z.string().max(30).optional(),
  fuel_type: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
  licence_plate: z.string().max(20).optional(),
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

const serviceTypes = Object.keys(SERVICE_LABELS) as [
  ServiceType,
  ...ServiceType[],
];

// Same rules as the API, so users see errors before the request is sent
export const serviceRecordSchema = z
  .object({
    type: z.enum(serviceTypes, "Choose a service type"),
    title: z.string().max(100).optional(),
    service_date: z
      .string()
      .min(1, "Service date is required")
      .refine(
        (date) => new Date(date) <= new Date(),
        "Service date cannot be in the future",
      ),
    mileage_at_service: z.string().optional(),
    // Only compared to the service date (not today), so old history
    // with a next date in the past can still be added and edited.
    next_service_date: z.string().optional(),
    next_service_mileage: z.string().optional(),
    cost: z.string().optional(),
    workshop: z.string().max(100).optional(),
    notes: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (TYPES_REQUIRING_TITLE.includes(data.type) && !data.title?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Describe what was done",
      });
    }

    if (data.next_service_date && data.next_service_date <= data.service_date) {
      ctx.addIssue({
        code: "custom",
        path: ["next_service_date"],
        message: "Must be after the service date",
      });
    }

    if (
      data.next_service_mileage &&
      data.mileage_at_service &&
      Number(data.next_service_mileage) <= Number(data.mileage_at_service)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["next_service_mileage"],
        message: "Must be higher than the mileage at service",
      });
    }

    if (data.cost && !(Number(data.cost) >= 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["cost"],
        message: "Enter a valid amount",
      });
    }
  });

export type ServiceRecordFormData = z.infer<typeof serviceRecordSchema>;

const toInt = (value?: string) => (value ? parseInt(value) : null);

export function toServiceRecordPayload(data: ServiceRecordFormData) {
  return {
    type: data.type,
    title: data.title?.trim() || null,
    service_date: data.service_date,
    mileage_at_service: toInt(data.mileage_at_service),
    next_service_date: data.next_service_date || null,
    next_service_mileage: toInt(data.next_service_mileage),
    cost: data.cost ? Number(data.cost) : null,
    workshop: data.workshop?.trim() || null,
    notes: data.notes?.trim() || null,
  };
}
