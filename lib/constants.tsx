import {
  Droplets,
  Wrench,
  Settings,
  CircleDot,
  ClipboardList,
  Disc3,
  BatteryCharging,
  Hammer,
  ClipboardCheck,
  ShieldCheck,
  CircleEllipsis,
} from "lucide-react";
import type { Currency, FuelType, ServiceType } from "@/types";

// The API uses uppercase enum values; these map them to display text.
export const SERVICE_LABELS: Record<ServiceType, string> = {
  OIL_CHANGE: "Oil Change",
  SMALL_SERVICE: "Small Service",
  BIG_SERVICE: "Big Service",
  TIRE_CHANGE: "Tire Change",
  BRAKES: "Brakes",
  BATTERY: "Battery",
  REPAIR: "Repair",
  REGISTRATION: "Registration",
  INSPECTION: "Technical Inspection",
  INSURANCE: "Insurance",
  OTHER: "Other",
};

export const SERVICE_ICONS: Record<ServiceType, React.ReactNode> = {
  OIL_CHANGE: <Droplets size={16} className="text-amber-500" />,
  SMALL_SERVICE: <Wrench size={16} className="text-blue-500" />,
  BIG_SERVICE: <Settings size={16} className="text-purple-500" />,
  TIRE_CHANGE: <CircleDot size={16} className="text-gray-500" />,
  BRAKES: <Disc3 size={16} className="text-red-500" />,
  BATTERY: <BatteryCharging size={16} className="text-yellow-500" />,
  REPAIR: <Hammer size={16} className="text-orange-500" />,
  REGISTRATION: <ClipboardList size={16} className="text-green-500" />,
  INSPECTION: <ClipboardCheck size={16} className="text-teal-500" />,
  INSURANCE: <ShieldCheck size={16} className="text-sky-500" />,
  OTHER: <CircleEllipsis size={16} className="text-gray-500" />,
};

// Groups for the type picker. The category is derived from the type,
// so it doesn't need its own database column.
export const SERVICE_CATEGORIES: { label: string; types: ServiceType[] }[] = [
  {
    label: "Maintenance",
    types: [
      "OIL_CHANGE",
      "SMALL_SERVICE",
      "BIG_SERVICE",
      "TIRE_CHANGE",
      "BRAKES",
      "BATTERY",
    ],
  },
  { label: "Repairs", types: ["REPAIR"] },
  { label: "Documents", types: ["REGISTRATION", "INSPECTION", "INSURANCE"] },
  { label: "Other", types: ["OTHER"] },
];

// These types have no fixed meaning, so the user must describe what was done
// (the API enforces the same rule).
export const TYPES_REQUIRING_TITLE: ServiceType[] = ["REPAIR", "OTHER"];

// Typical intervals, used to pre-fill the next service date/mileage.
// They are suggestions: the user can always change them.
export const SERVICE_INTERVALS: Partial<
  Record<ServiceType, { months?: number; km?: number }>
> = {
  OIL_CHANGE: { months: 12, km: 15000 },
  SMALL_SERVICE: { months: 12, km: 15000 },
  BIG_SERVICE: { months: 60, km: 90000 },
  TIRE_CHANGE: { months: 6 },
  BRAKES: { months: 24, km: 40000 },
  BATTERY: { months: 48 },
  REGISTRATION: { months: 12 },
  INSPECTION: { months: 12 },
  INSURANCE: { months: 12 },
};

export const FUEL_LABELS: Record<FuelType, string> = {
  PETROL: "Petrol",
  DIESEL: "Diesel",
  ELECTRIC: "Electric",
  HYBRID: "Hybrid",
};

export const CURRENCIES: Currency[] = ["EUR", "USD", "GBP", "CHF", "RSD"];
