import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Currency } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(
  fullName?: string | null,
  fallback?: string,
): string {
  if (fullName) {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return (fallback ?? "??").slice(0, 2).toUpperCase();
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString()} km`;
}

// The API stores dates as UTC midnight ("2025-03-14T00:00:00.000Z").
// Formatting in UTC keeps the day from shifting in timezones behind UTC.
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2025-03-14" + 12 months -> "2026-03-14" (in UTC, like the stored dates)
export function addMonthsToDateInput(date: string, months: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}

// Intl knows each currency's symbol and decimals: 1234.5 EUR -> "€1,234.50"
export function formatCurrency(amount: number | string, currency: Currency) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(
    Number(amount),
  );
}

// "2025-03-14T00:00:00.000Z" -> "2025-03-14", the format <input type="date"> expects.
export function toDateInputValue(date: string | null | undefined): string {
  return date ? date.slice(0, 10) : "";
}
