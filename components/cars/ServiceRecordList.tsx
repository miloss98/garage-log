"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { Currency, ServiceRecord } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SheetDialogContent from "@/components/ui/SheetDialogContent";
import ServiceRecordForm from "./ServiceRecordForm";
import { toast } from "sonner";
import {
  Building2,
  CalendarClock,
  Gauge,
  Pencil,
  Plus,
  Trash2,
  Wallet,
  Wrench,
} from "lucide-react";
import { SERVICE_LABELS, SERVICE_ICONS } from "@/lib/constants";
import { formatCurrency, formatDate, formatMileage } from "@/lib/utils";

function DeleteRecordButton({
  carId,
  recordId,
}: {
  carId: string;
  recordId: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await apiFetch(`/cars/${carId}/service-records/${recordId}`, {
        method: "DELETE",
      });
    } catch {
      toast.error("Failed to delete record");
      setLoading(false);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["cars"] });
    toast.success("Record deleted");
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete service record"
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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

// Small "icon + value" fact under a timeline entry
function Fact({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon size={14} className="text-muted-foreground" />
      {children}
    </span>
  );
}

type FormState =
  { mode: "add" } | { mode: "edit"; record: ServiceRecord } | null;

export default function ServiceRecordList({
  carId,
  serviceRecords,
  currency,
  currentMileage,
}: {
  carId: string;
  serviceRecords: ServiceRecord[];
  currency: Currency;
  currentMileage: number | null;
}) {
  // One dialog for both adding and editing (a bottom sheet on phones)
  const [formState, setFormState] = useState<FormState>(null);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Service history</h2>
        <Button className="gap-2" onClick={() => setFormState({ mode: "add" })}>
          <Plus size={16} /> Add record
        </Button>
      </div>

      {serviceRecords.length === 0 ? (
        <div className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">
          <Wrench size={36} className="mx-auto mb-3" />
          <p>No service records yet. Add your first one!</p>
        </div>
      ) : (
        // Timeline: a vertical line with the service icon as each entry's marker
        <ol className="relative ml-4 border-l border-border">
          {serviceRecords.map((record) => {
            const nextDue = [
              record.next_service_date && formatDate(record.next_service_date),
              record.next_service_mileage != null &&
                formatMileage(record.next_service_mileage),
            ]
              .filter(Boolean)
              .join(" or ");

            return (
              <li key={record.id} className="relative pb-6 pl-8 last:pb-0">
                <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                  {SERVICE_ICONS[record.type]}
                </span>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(record.service_date)}
                      </p>
                      <h3 className="font-semibold leading-snug">
                        {SERVICE_LABELS[record.type]}
                        {record.title && (
                          <span className="font-normal text-muted-foreground">
                            {" "}
                            · {record.title}
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="-mr-2 -mt-1 flex shrink-0 items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit service record"
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => setFormState({ mode: "edit", record })}
                      >
                        <Pencil size={15} />
                      </Button>
                      <DeleteRecordButton carId={carId} recordId={record.id} />
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {record.mileage_at_service != null && (
                      <Fact icon={Gauge}>
                        {formatMileage(record.mileage_at_service)}
                      </Fact>
                    )}
                    {record.cost != null && (
                      <Fact icon={Wallet}>
                        {formatCurrency(record.cost, currency)}
                      </Fact>
                    )}
                    {record.workshop && (
                      <Fact icon={Building2}>{record.workshop}</Fact>
                    )}
                    {nextDue && (
                      <Fact icon={CalendarClock}>
                        <span className="text-muted-foreground">Next:</span>{" "}
                        {nextDue}
                      </Fact>
                    )}
                  </div>

                  {record.notes && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {record.notes}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <Dialog
        open={formState !== null}
        onOpenChange={(open) => !open && setFormState(null)}
      >
        <SheetDialogContent>
          <DialogHeader>
            <DialogTitle>
              {formState?.mode === "edit"
                ? "Edit record"
                : "Add service record"}
            </DialogTitle>
            <DialogDescription>
              Next due date and mileage are suggested from the service type.
            </DialogDescription>
          </DialogHeader>
          {formState && (
            <ServiceRecordForm
              // Remount per record so the form starts from that record's values
              key={formState.mode === "edit" ? formState.record.id : "new"}
              carId={carId}
              currency={currency}
              currentMileage={currentMileage}
              existingRecord={
                formState.mode === "edit" ? formState.record : undefined
              }
              onSuccess={() => setFormState(null)}
            />
          )}
        </SheetDialogContent>
      </Dialog>
    </section>
  );
}
