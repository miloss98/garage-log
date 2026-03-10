"use client";

import { useDashboard, type CarWithRecords } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

function getServiceStatus(nextDate: string | null) {
  if (!nextDate) return null;
  const days = Math.ceil(
    (new Date(nextDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  if (days < 0)
    return { label: "Overdue", variant: "destructive" as const, days };
  if (days <= 30) return { label: "Due soon", color: "bg-orange-500", days };
  return { label: "OK", color: "bg-green-600", days };
}

const SERVICE_LABELS: Record<string, string> = {
  oil_change: "🛢️ Oil Change",
  small_service: "🔧 Small Service",
  big_service: "⚙️ Big Service",
  tire_change: "🔄 Tire Change",
  registration: "📋 Registration",
};

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertRow({
  car,
  record,
  days,
  isOverdue,
}: {
  car: CarWithRecords;
  record: { type: string; next_service_date: string | null };
  days: number;
  isOverdue: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-medium text-sm">{car.name}</p>
        <p className="text-xs text-muted-foreground">
          {SERVICE_LABELS[record.type] ?? record.type}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {isOverdue ? `${Math.abs(days)} days ago` : `in ${days} days`}
        </span>
        {isOverdue ? (
          <Badge variant="destructive">Overdue</Badge>
        ) : (
          <Badge className="bg-orange-500 hover:bg-orange-600">Due soon</Badge>
        )}
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/cars/${car.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}

export default function DashboardSummary({ userName }: { userName: string }) {
  const { data: cars, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const totalCars = cars?.length ?? 0;
  const allRecords =
    cars?.flatMap((car) => car.service_records.map((r) => ({ ...r, car }))) ??
    [];

  const alerts = allRecords
    .filter((r) => r.next_service_date)
    .map((r) => {
      const status = getServiceStatus(r.next_service_date);
      return { ...r, status };
    })
    .filter((r) => r.status && r.status.label !== "OK")
    .sort((a, b) => (a.status?.days ?? 0) - (b.status?.days ?? 0));

  const overdueCount = alerts.filter(
    (a) => a.status?.label === "Overdue",
  ).length;
  const dueSoonCount = alerts.filter(
    (a) => a.status?.label === "Due soon",
  ).length;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back{userName ? `, ${userName}` : ""} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your vehicles
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Vehicles"
          value={totalCars}
          icon={<Car size={32} />}
        />
        <StatCard
          label="Overdue Services"
          value={overdueCount}
          icon={<AlertCircle size={32} className="text-destructive" />}
        />
        <StatCard
          label="Due Soon"
          value={dueSoonCount}
          icon={<Clock size={32} className="text-amber-500" />}
        />
      </div>

      {/* Alerts */}
      {alerts.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Services Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.map((alert, i) => (
              <AlertRow
                key={i}
                car={alert.car}
                record={alert}
                days={alert.status?.days ?? 0}
                isOverdue={alert.status?.label === "Overdue"}
              />
            ))}
          </CardContent>
        </Card>
      ) : totalCars > 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
            <p className="font-medium">All services are up to date!</p>
            <p className="text-sm text-muted-foreground mt-1">
              No overdue or upcoming services in the next 30 days
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <Car size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-4">No cars added yet</p>
            <Button asChild>
              <Link href="/dashboard/cars/new">Add your first car</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
