"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ServiceRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServiceRecordForm from "./ServiceRecordForm";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  X,
  Droplets,
  Wrench,
  Settings,
  CircleDot,
  ClipboardList,
} from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  oil_change: "Oil Change",
  small_service: "Small Service",
  big_service: "Big Service",
  tire_change: "Tire Change",
  registration: "Registration",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  oil_change: <Droplets size={16} className="text-amber-500" />,
  small_service: <Wrench size={16} className="text-blue-500" />,
  big_service: <Settings size={16} className="text-purple-500" />,
  tire_change: <CircleDot size={16} className="text-gray-500" />,
  registration: <ClipboardList size={16} className="text-green-500" />,
};
function getStatusBadge(nextServiceDate: string | null) {
  if (!nextServiceDate) return null;

  const today = new Date();
  const next = new Date(nextServiceDate);
  const daysUntil = Math.ceil(
    (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysUntil < 0)
    return (
      <Badge variant="destructive" className="pointer-events-none text-white">
        Overdue
      </Badge>
    );
  if (daysUntil <= 30)
    return (
      <Badge className="bg-orange-500 text-white hover:bg-orange-600 pointer-events-none">
        Due soon
      </Badge>
    );
  return (
    <Badge className="bg-green-600 text-white hover:bg-green-700 pointer-events-none">
      OK
    </Badge>
  );
}

function DeleteRecordButton({ recordId }: { recordId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("service_records")
      .delete()
      .eq("id", recordId);

    if (error) {
      toast.error("Failed to delete record");
      setLoading(false);
      return;
    }

    toast.success("Record deleted");
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive  hover:text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <Trash2 size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete service record?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ServiceRecordList({
  carId,
  serviceRecords,
}: {
  carId: string;
  serviceRecords: ServiceRecord[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(
    null,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Service Records</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingRecord(null);
          }}
        >
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
          <Wrench size={40} className="text-muted-foreground mx-auto mb-3" />
          <p>No service records yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {serviceRecords.map((record) => (
            <div key={record.id}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {SERVICE_ICONS[record.type]}
                      {SERVICE_LABELS[record.type] ?? record.type}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(record.next_service_date)}
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer "
                        onClick={() => {
                          setEditingRecord(
                            editingRecord?.id === record.id ? null : record,
                          );
                          setShowForm(false);
                        }}
                      >
                        {editingRecord?.id === record.id ? (
                          <X size={15} />
                        ) : (
                          <Pencil size={15} />
                        )}
                      </Button>
                      <DeleteRecordButton recordId={record.id} />
                    </div>
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
                        {new Date(
                          record.next_service_date,
                        ).toLocaleDateString()}
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

              {editingRecord?.id === record.id && (
                <div className="mt-2">
                  <ServiceRecordForm
                    carId={carId}
                    existingRecord={editingRecord}
                    onSuccess={() => setEditingRecord(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
