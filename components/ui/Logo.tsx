import Link from "next/link";
import { cn } from "@/lib/utils";
import { Car } from "lucide-react";

// Colours come from theme tokens, so the logo adapts to light/dark mode
export default function Logo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="GarageLog home"
      className={cn("flex items-center gap-2.5 group", className)}
    >
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Car size={18} className="text-primary-foreground" strokeWidth={2} />
      </div>

      <span
        className="font-bold text-xl tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Garage<span className="text-link">Log</span>
      </span>
    </Link>
  );
}
