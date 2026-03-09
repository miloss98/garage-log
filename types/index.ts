export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Car = {
  id: string;
  user_id: string;
  name: string;
  model: string | null;
  year: number | null;
  color: string | null;
  fuel_type: string | null;
  license_plate: string | null;
  mileage: number | null;
  image_url: string | null;
  created_at: string;
};

export type ServiceType =
  | "oil_change"
  | "small_service"
  | "big_service"
  | "tire_change"
  | "registration";

export type ServiceRecord = {
  id: string;
  car_id: string;
  type: ServiceType;
  service_date: string;
  next_service_date: string | null;
  mileage_at_service: number | null;
  notes: string | null;
  created_at: string;
};
