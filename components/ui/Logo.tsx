import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className={cn("flex items-center gap-2.5 group", className)}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
          dark ? "bg-blue-500" : "bg-blue-600",
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 11L6.5 6.5H17.5L19 11"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="11"
            width="18"
            height="7"
            rx="2"
            stroke="white"
            strokeWidth="1.75"
          />
          <circle cx="7.5" cy="18" r="2" fill="white" />
          <circle cx="16.5" cy="18" r="2" fill="white" />
          <path
            d="M3 14H21"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span
        className={cn(
          "font-bold text-xl tracking-tight",
          dark ? "text-slate-100" : "text-slate-900",
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Garage
        <span className={dark ? "text-blue-400" : "text-blue-600"}>Log</span>
      </span>
    </Link>
  );
}
