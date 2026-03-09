"use client";

import { useState } from "react";
import type { ServiceRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceRecordForm from "./ServiceRecordForm";

const SERVICE_LABELS: Record<string, string> = {
  oil_change: "🛢️ Oil Change",
  small_service: "🔧 Small Service",
  big_service: "⚙️ Big Service",
  tire_change: "🔄 Tire Change",
  registration: "📋 Registration",
};

function getStatusBadge(nextServiceDate: string | null) {
  if (!nextServiceDate) return null;

  const today = new Date();
  const next = new Date(nextServiceDate);
  const daysUntil = Math.ceil(
    (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysUntil < 0) return <Badge variant="destructive">Overdue</Badge>;
  if (daysUntil <= 30)
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600">Due soon</Badge>
    );
  return <Badge className="bg-green-600 hover:bg-green-700">OK</Badge>;
}

export default function ServiceRecordList({
  carId,
  serviceRecords,
}: {
  carId: string;
  serviceRecords: ServiceRecord[];
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Service Records</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Record"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ServiceRecordForm
            carId={carId}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {serviceRecords.length === 0 && !showForm ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🔧</p>
          <p>No service records yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {serviceRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {SERVICE_LABELS[record.type] ?? record.type}
                  </CardTitle>
                  {getStatusBadge(record.next_service_date)}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>
                  Service date:{" "}
                  <span className="text-foreground font-medium">
                    {new Date(record.service_date).toLocaleDateString()}
                  </span>
                </p>
                {record.next_service_date && (
                  <p>
                    Next service:{" "}
                    <span className="text-foreground font-medium">
                      {new Date(record.next_service_date).toLocaleDateString()}
                    </span>
                  </p>
                )}
                {record.mileage_at_service && (
                  <p>
                    Mileage at service:{" "}
                    <span className="text-foreground font-medium">
                      {record.mileage_at_service.toLocaleString()} km
                    </span>
                  </p>
                )}
                {record.notes && <p>Notes: {record.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
