"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceStatusBadge from "@/components/cars/ServiceStatusBadge";
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
import { SERVICE_LABELS } from "@/lib/constants";
import { describeDue, getUpcomingServices } from "@/lib/service-status";

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

  // Only the latest record of each kind per car counts (see service-status.ts)
  const alerts = (cars ?? [])
    .flatMap((car) =>
      getUpcomingServices(car.mileage, car.service_records).map(
        (service) => ({ ...service, car }),
      ),
    )
    .filter((service) => service.status !== "ok")
    .sort(
      (a, b) =>
        Number(b.status === "overdue") - Number(a.status === "overdue") ||
        (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity),
    );

  const overdueCount = alerts.filter((a) => a.status === "overdue").length;
  const dueSoonCount = alerts.filter((a) => a.status === "due_soon").length;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          Welcome back, <br className="md:hidden" />
          <span className="text-amber-500">
            {userName ? `${userName}` : ""}
          </span>{" "}
          👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your vehicles
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l border-l-blue-500 shadow-[0_8px_12px_rgba(59,130,246,0.15)]">
          <CardContent className="py-0 md:py-6">
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
          <CardContent className="py-0 md:py-6">
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
          <CardContent className="py-0 md:py-6">
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
            {alerts.map((alert) => {
              const isOverdue = alert.status === "overdue";
              return (
                <div
                  key={`${alert.car.id}-${alert.lastRecord.id}`}
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
                        {alert.title ?? SERVICE_LABELS[alert.type]} ·{" "}
                        {describeDue(alert)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ServiceStatusBadge status={alert.status} />
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
                        <span className="md:flex hidden">View</span>{" "}
                        <ArrowRight size={16} />
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
