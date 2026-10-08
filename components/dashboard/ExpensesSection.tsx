"use client";

import { useStats } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";
import MonthlySpendChart from "./MonthlySpendChart";
import BreakdownBars from "./BreakdownBars";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { Currency } from "@/types";

const MONTHS = 12;

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="py-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl md:text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

export default function ExpensesSection({ currency }: { currency: Currency }) {
  const { data: stats, isLoading, isError } = useStats(MONTHS);

  if (isLoading) return <Skeleton className="h-72 w-full" />;
  if (isError || !stats) {
    return (
      <p className="text-sm text-destructive">Failed to load expenses.</p>
    );
  }

  const header = (
    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
      <Wallet size={22} /> Expenses
    </h2>
  );

  if (stats.total === 0) {
    return (
      <section className="space-y-4">
        {header}
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No costs logged yet. Add a cost to a service record to see where
            your money goes.
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {header}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatTile
          label={`Last ${MONTHS} months`}
          value={formatCurrency(stats.period_total, currency)}
        />
        <StatTile
          label="Average per month"
          value={formatCurrency(stats.period_total / MONTHS, currency)}
        />
        <StatTile
          label="All time"
          value={formatCurrency(stats.total, currency)}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Spending per month</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <MonthlySpendChart data={stats.by_month} currency={currency} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">By service type</CardTitle>
          </CardHeader>
          <CardContent>
            <BreakdownBars
              currency={currency}
              rows={stats.by_type.map((row) => ({
                key: row.type,
                label: SERVICE_LABELS[row.type],
                icon: SERVICE_ICONS[row.type],
                total: row.total,
                count: row.count,
              }))}
            />
          </CardContent>
        </Card>

        {stats.by_car.length > 1 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">By car</CardTitle>
            </CardHeader>
            <CardContent>
              <BreakdownBars
                currency={currency}
                rows={stats.by_car.map((row) => ({
                  key: row.car_id,
                  label: row.name,
                  total: row.total,
                }))}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
