import Link from "next/link";
import { cn } from "@/lib/utils";
import { Car } from "lucide-react";

export default function Logo({
  href = "/",
  dark = false,
  className,
}: {
  href?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="GarageLog home"
      className={cn("flex items-center gap-2.5 group", className)}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
          dark ? "bg-amber-500" : "bg-amber-500",
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
            "bg-amber-500",
          )}
        >
          <Car size={18} color="white" strokeWidth={2} />
        </div>
      </div>

      {/* Wordmark */}
      <span
        className={cn(
          "font-bold text-xl tracking-tight",
          dark ? "text-[#f0f0f0]" : "text-slate-900",
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Garage
        <span className={dark ? "text-amber-400" : "text-amber-500"}>Log</span>
      </span>
    </Link>
  );
}
