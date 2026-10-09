import Link from "next/link";
import { cn } from "@/lib/utils";

// The mark: a "G" whose crossbar is a gauge needle (Garage + instrument).
// The gradient is CSS, not an SVG <linearGradient>: SVG gradients need ids,
// and if the first logo on a page is hidden (e.g. the sidebar on phones)
// Chrome can fail to paint the others.
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[25%] bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] shadow-sm shadow-blue-900/20",
        className,
      )}
    >
      <svg viewBox="0 0 64 64" className="size-full" fill="none">
        <path
          d="M46.72 23.5A17 17 0 1 0 46.72 40.5"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M32 32H46.5" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="32" cy="32" r="4.2" fill="#fff" />
      </svg>
    </span>
  );
}

// Mark + wordmark. Text colours come from theme tokens (light/dark aware).
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
      className={cn("group flex items-center gap-2.5", className)}
    >
      <LogoMark className="transition-transform duration-200 group-hover:scale-105" />
      <span
        className="text-xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Garage<span className="text-link">Log</span>
      </span>
    </Link>
  );
}
