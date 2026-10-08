"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/lib/api/client";
import { addMonthsToDateInput, toDateInputValue } from "@/lib/utils";
import {
  serviceRecordSchema,
  toServiceRecordPayload,
  type ServiceRecordFormData,
} from "@/lib/validations/car.schema";
import {
  SERVICE_CATEGORIES,
  SERVICE_ICONS,
  SERVICE_INTERVALS,
  SERVICE_LABELS,
  TYPES_REQUIRING_TITLE,
} from "@/lib/constants";
import type { Currency, ServiceRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Changing any of these re-suggests the next service date/mileage
const SUGGESTION_INPUTS = [
  "type",
  "service_date",
  "mileage_at_service",
] as const satisfies readonly (keyof ServiceRecordFormData)[];

const isSuggestionInput = (name: string) =>
  (SUGGESTION_INPUTS as readonly string[]).includes(name);

const toStr = (value: number | string | null | undefined) =>
  value != null ? String(value) : "";

export default function ServiceRecordForm({
  carId,
  currency,
  currentMileage,
  existingRecord,
  onSuccess,
}: {
  carId: string;
  currency: Currency;
  currentMileage: number | null;
  existingRecord?: ServiceRecord;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingRecord;

  const form = useForm<ServiceRecordFormData>({
    resolver: zodResolver(serviceRecordSchema),
    defaultValues: {
      type: existingRecord?.type,
      title: existingRecord?.title ?? "",
      service_date: toDateInputValue(existingRecord?.service_date),
      // A new record most likely happened at the car's current mileage
      mileage_at_service: toStr(
        isEditing ? existingRecord.mileage_at_service : currentMileage,
      ),
      next_service_date: toDateInputValue(existingRecord?.next_service_date),
      next_service_mileage: toStr(existingRecord?.next_service_mileage),
      cost: toStr(existingRecord?.cost),
      workshop: existingRecord?.workshop ?? "",
      notes: existingRecord?.notes ?? "",
    },
  });

  // Suggest the next service from the type's usual interval whenever the
  // type, date or mileage changes. subscribe() only fires on changes (not on
  // mount), so an edited record keeps its saved values.
  useEffect(() => {
    return form.subscribe({
      name: [...SUGGESTION_INPUTS],
      formState: { values: true },
      callback: ({ name, values }) => {
        // Form-level events (e.g. submit) have no field name: ignore them
        if (!name || !isSuggestionInput(name)) return;
        suggestNextService(values);
      },
    });

    function suggestNextService(values: ServiceRecordFormData) {
      const interval = values.type ? SERVICE_INTERVALS[values.type] : undefined;

      // "Dirty" = the user typed into it; never overwrite their own value
      if (!form.getFieldState("next_service_date").isDirty) {
        form.setValue(
          "next_service_date",
          interval?.months && values.service_date
            ? addMonthsToDateInput(values.service_date, interval.months)
            : "",
        );
      }

      if (!form.getFieldState("next_service_mileage").isDirty) {
        form.setValue(
          "next_service_mileage",
          interval?.km && values.mileage_at_service
            ? String(Number(values.mileage_at_service) + interval.km)
            : "",
        );
      }
    }
  }, [form]);

  const type = useWatch({ control: form.control, name: "type" });
  const interval = type ? SERVICE_INTERVALS[type] : undefined;
  const titleRequired = !!type && TYPES_REQUIRING_TITLE.includes(type);

  async function onSubmit(data: ServiceRecordFormData) {
    setLoading(true);
    // No car_id in the body: it's part of the URL (/cars/:carId/service-records).
    const payload = toServiceRecordPayload(data);
    const basePath = `/cars/${carId}/service-records`;

    try {
      if (isEditing) {
        await apiFetch(`${basePath}/${existingRecord.id}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        await apiFetch(basePath, { method: "POST", body: payload });
      }
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : isEditing
            ? "Failed to update record"
            : "Failed to add record",
      );
      setLoading(false);
      return;
    }

    // Records feed the dashboard alerts, which come from the ["cars"] query.
    queryClient.invalidateQueries({ queryKey: ["cars"] });
    toast.success(isEditing ? "Record updated!" : "Record added!");
    router.refresh();
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map((category) => (
                      <SelectGroup key={category.label}>
                        <SelectLabel>{category.label}</SelectLabel>
                        {category.types.map((serviceType) => (
                          <SelectItem key={serviceType} value={serviceType}>
                            {SERVICE_ICONS[serviceType]}
                            {SERVICE_LABELS[serviceType]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {titleRequired ? "What was done? *" : "Title"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      titleRequired
                        ? "e.g. Rust repair – rear arch"
                        : "e.g. Castrol 5W-30"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="cursor-pointer"
                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                    max={new Date().toISOString().split("T")[0]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mileage_at_service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="150000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="next_service_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next due date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="cursor-pointer"
                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                    {...field}
                  />
                </FormControl>
                {interval?.months && (
                  <FormDescription>
                    Suggested: every {interval.months} months
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="next_service_mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next due at (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="165000"
                    {...field}
                  />
                </FormControl>
                {interval?.km && (
                  <FormDescription>
                    Suggested: every {interval.km.toLocaleString()} km
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost ({currency})</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workshop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workshop</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Auto Servis Lim" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading
            ? isEditing
              ? "Saving..."
              : "Adding..."
            : isEditing
              ? "Save Changes"
              : "Save Record"}
        </Button>
      </form>
    </Form>
  );
}
