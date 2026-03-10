"use client";

import { useDashboard, type CarWithRecords } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Car,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const SERVICE_LABELS: Record<string, string> = {
  oil_change: "Oil Change",
  small_service: "Small Service",
  big_service: "Big Service",
  tire_change: "Tire Change",
  registration: "Registration",
};

function getServiceStatus(nextDate: string | null) {
  if (!nextDate) return null;
  const days = Math.ceil(
    (new Date(nextDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  if (days < 0) return { label: "Overdue", days };
  if (days <= 30) return { label: "Due soon", days };
  return { label: "OK", days };
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
                <Skeleton className="h-20 w-full" />
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
    .map((r) => ({ ...r, status: getServiceStatus(r.next_service_date) }))
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
        <h1 className="text-3xl font-bold mb-1">
          Welcome back{userName ? `, ${userName}` : ""} 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your vehicles
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l border-l-blue-500 shadow-[0_8px_12px_rgba(59,130,246,0.15)]">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Vehicles
                </p>
                <p className="text-4xl font-bold">{totalCars}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Car size={22} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l border-l-red-500 shadow-[0_8px_12px_rgba(239,68,68,0.15)]">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Overdue Services
                </p>
                <p className="text-4xl font-bold">{overdueCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle size={22} className="text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l border-l-amber-500 shadow-[0_8px_12px_rgba(245,158,11,0.15)]">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white mb-1">Due Soon</p>
                <p className="text-4xl font-bold">{dueSoonCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock size={22} className="text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 ? (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Services Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {alerts.map((alert, i) => {
              const isOverdue = alert.status?.label === "Overdue";
              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 first:pt-2"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isOverdue ? "bg-red-50" : "bg-amber-50"
                      }`}
                    >
                      <AlertCircle
                        size={18}
                        className={
                          isOverdue ? "text-red-500" : "text-amber-500"
                        }
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{alert.car.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {SERVICE_LABELS[alert.type] ?? alert.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {isOverdue
                        ? `${Math.abs(alert.status?.days ?? 0)} days overdue`
                        : alert.status?.days === 0
                          ? "Due today"
                          : `in ${alert.status?.days} days`}
                    </span>
                    {isOverdue ? (
                      <Badge
                        variant="destructive"
                        className="pointer-events-none"
                      >
                        Overdue
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500 text-white pointer-events-none">
                        Due soon
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={`/dashboard/cars/${alert.car.id}`}
                        className="flex items-center gap-1.5"
                      >
                        View <ArrowRight size={13} />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : totalCars > 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-14 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-green-500" />
            </div>
            <p className="font-semibold text-lg">
              All services are up to date!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              No overdue or upcoming services in the next 30 days
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="py-14 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Car size={28} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-lg mb-4">No cars added yet</p>
            <Button asChild>
              <Link
                href="/dashboard/cars/new"
                className="flex items-center gap-2"
              >
                Add your first car <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
