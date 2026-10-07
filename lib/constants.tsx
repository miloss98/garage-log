import {
  Droplets,
  Wrench,
  Settings,
  CircleDot,
  ClipboardList,
} from "lucide-react";
import type { FuelType, ServiceType } from "@/types";

// The API uses uppercase enum values; these map them to display text.
export const SERVICE_LABELS: Record<ServiceType, string> = {
  OIL_CHANGE: "Oil Change",
  SMALL_SERVICE: "Small Service",
  BIG_SERVICE: "Big Service",
  TIRE_CHANGE: "Tire Change",
  REGISTRATION: "Registration",
};

export const SERVICE_ICONS: Record<ServiceType, React.ReactNode> = {
  OIL_CHANGE: <Droplets size={16} className="text-amber-500" />,
  SMALL_SERVICE: <Wrench size={16} className="text-blue-500" />,
  BIG_SERVICE: <Settings size={16} className="text-purple-500" />,
  TIRE_CHANGE: <CircleDot size={16} className="text-gray-500" />,
  REGISTRATION: <ClipboardList size={16} className="text-green-500" />,
};

export const FUEL_LABELS: Record<FuelType, string> = {
  PETROL: "Petrol",
  DIESEL: "Diesel",
  ELECTRIC: "Electric",
  HYBRID: "Hybrid",
};
