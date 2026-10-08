// These types mirror the JSON returned by garage-log-api (Prisma models).
// Dates arrive as ISO strings, e.g. "2025-03-14T00:00:00.000Z".

export type Currency = "EUR" | "USD" | "GBP" | "CHF" | "RSD";

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  currency: Currency;
  created_at: string;
  updated_at: string;
};

export type FuelType = "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";

export type Car = {
  id: string;
  user_id: string;
  name: string;
  model: string | null;
  year: number;
  color: string | null;
  fuel_type: FuelType;
  licence_plate: string | null;
  mileage: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceType =
  | "OIL_CHANGE"
  | "SMALL_SERVICE"
  | "BIG_SERVICE"
  | "TIRE_CHANGE"
  | "BRAKES"
  | "BATTERY"
  | "REPAIR"
  | "REGISTRATION"
  | "INSPECTION"
  | "INSURANCE"
  | "OTHER";

export type ServiceRecord = {
  id: string;
  car_id: string;
  type: ServiceType;
  title: string | null;
  service_date: string;
  mileage_at_service: number | null;
  next_service_date: string | null;
  next_service_mileage: number | null;
  // Prisma Decimal arrives as a string (e.g. "89.90") to keep exact precision
  cost: string | null;
  workshop: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CarWithRecords = Car & {
  service_records: ServiceRecord[];
};
