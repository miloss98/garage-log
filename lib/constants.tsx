import {
  Droplets,
  Wrench,
  Settings,
  CircleDot,
  ClipboardList,
} from "lucide-react";

export const SERVICE_LABELS: Record<string, string> = {
  oil_change: "Oil Change",
  small_service: "Small Service",
  big_service: "Big Service",
  tire_change: "Tire Change",
  registration: "Registration",
};

export const SERVICE_ICONS: Record<string, React.ReactNode> = {
  oil_change: <Droplets size={16} className="text-amber-500" />,
  small_service: <Wrench size={16} className="text-blue-500" />,
  big_service: <Settings size={16} className="text-purple-500" />,
  tire_change: <CircleDot size={16} className="text-gray-500" />,
  registration: <ClipboardList size={16} className="text-green-500" />,
};
