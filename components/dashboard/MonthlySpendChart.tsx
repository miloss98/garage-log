"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import type { Currency, Stats } from "@/types";

type Month = Stats["by_month"][number];

function toDate(month: string) {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1));
}

// Axis: "May", or "Jan '26" on January / the first bar so the year is clear
// (plain "Jan 26" reads like a day of the month)
function axisLabel(month: string, withYear: boolean) {
  const short = toDate(month).toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  return withYear ? `${short} '${month.slice(2, 4)}` : short;
}

// Tooltip / table: "June 2026"
function fullLabel(month: string) {
  return toDate(month).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Round the axis max up to a "nice" number: 1, 2, 2.5 or 5 x 10^n
function niceMax(value: number) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude >= value)!;
  return step * magnitude;
}

export default function MonthlySpendChart({
  data,
  currency,
}: {
  data: Month[];
  currency: Currency;
}) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.total)));
  const activeMonth = active !== null ? data[active] : null;

  return (
    <div>
      <div className="flex gap-2">
        {/* Y axis: 0, half, max */}
        <div className="relative h-48 w-12 shrink-0 text-[11px] text-muted-foreground tabular-nums">
          {[1, 0.5, 0].map((f) => (
            <span
              key={f}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(1 - f) * 100}%` }}
            >
              {formatCurrency(max * f, currency, { compact: true })}
            </span>
          ))}
        </div>

        {/* Plot */}
        <div
          className="relative h-48 flex-1"
          onMouseLeave={() => setActive(null)}
        >
          {[0, 0.5, 1].map((f) => (
            <div
              key={f}
              className={cn(
                "absolute inset-x-0 border-t",
                f === 1 ? "border-muted-foreground/40" : "border-border/60",
              )}
              style={{ top: `${f * 100}%` }}
            />
          ))}

          <div className="absolute inset-0 flex">
            {data.map((month, i) => (
              // Full-height button: a hit target much bigger than the bar,
              // and focusable so the tooltip works with the keyboard too
              <button
                key={month.month}
                type="button"
                className="group relative flex h-full flex-1 items-end justify-center px-[1px] outline-none"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${fullLabel(month.month)}: ${formatCurrency(month.total, currency)}`}
              >
                <span
                  className={cn(
                    "w-full max-w-7 rounded-t-[4px] bg-(--chart-series) transition-opacity",
                    active !== null && active !== i && "opacity-50",
                    "group-focus-visible:ring-2 group-focus-visible:ring-ring",
                  )}
                  style={{ height: `${(month.total / max) * 100}%` }}
                />
              </button>
            ))}
          </div>

          {activeMonth && active !== null && (
            <div
              role="status"
              className="pointer-events-none absolute -top-2 z-10 rounded-md border bg-popover px-2.5 py-1.5 text-xs shadow-md whitespace-nowrap"
              style={{
                left: `${((active + 0.5) / data.length) * 100}%`,
                // Keep the tooltip inside the chart at the edges
                transform: `translate(${active < 2 ? "-15%" : active > data.length - 3 ? "-85%" : "-50%"}, -100%)`,
              }}
            >
              <p className="font-medium text-popover-foreground">
                {fullLabel(activeMonth.month)}
              </p>
              <p className="text-muted-foreground">
                {formatCurrency(activeMonth.total, currency)} ·{" "}
                {activeMonth.count} record{activeMonth.count === 1 ? "" : "s"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* X axis */}
      <div className="ml-14 mt-2 flex text-[11px] text-muted-foreground">
        {data.map((month, i) => (
          <span
            key={month.month}
            className={cn(
              "flex-1 text-center whitespace-nowrap",
              // Phones: every other label, so they don't collide
              i % 2 === 1 && data.length > 6 && "invisible sm:visible",
            )}
          >
            {axisLabel(month.month, i === 0 || month.month.endsWith("-01"))}
          </span>
        ))}
      </div>

      <details className="mt-3 text-xs text-muted-foreground">
        <summary className="cursor-pointer select-none">View as table</summary>
        <table className="mt-2 w-full tabular-nums">
          <thead>
            <tr className="text-left">
              <th className="py-1 font-medium">Month</th>
              <th className="py-1 text-right font-medium">Spent</th>
              <th className="py-1 text-right font-medium">Records</th>
            </tr>
          </thead>
          <tbody>
            {data.map((month) => (
              <tr key={month.month} className="border-t border-border/60">
                <td className="py-1">{fullLabel(month.month)}</td>
                <td className="py-1 text-right text-foreground">
                  {formatCurrency(month.total, currency)}
                </td>
                <td className="py-1 text-right">{month.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
