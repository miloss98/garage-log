import { formatCurrency } from "@/lib/utils";
import type { Currency } from "@/types";

export type BreakdownRow = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  total: number;
  count?: number;
};

// Ranked horizontal bars: one colour, sorted largest first, every row
// labelled with its value, so colour never has to carry the meaning.
export default function BreakdownBars({
  rows,
  currency,
}: {
  rows: BreakdownRow[];
  currency: Currency;
}) {
  const max = Math.max(...rows.map((row) => row.total), 1);

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.key} className="text-sm">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              {row.icon}
              <span className="truncate">{row.label}</span>
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              <span className="font-medium text-foreground">
                {formatCurrency(row.total, currency)}
              </span>
              {row.count !== undefined && ` · ${row.count}×`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-(--chart-series)"
              style={{ width: `${Math.max((row.total / max) * 100, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
