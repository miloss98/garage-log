"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  serviceRecordSchema,
  type ServiceRecordFormData,
} from "@/lib/validations/car.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ServiceRecordForm({
  carId,
  onSuccess,
}: {
  carId: string;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ServiceRecordFormData>({
    resolver: zodResolver(serviceRecordSchema),
    defaultValues: {
      service_date: "",
      next_service_date: "",
      notes: "",
      mileage_at_service: "",
    },
  });

  async function onSubmit(data: ServiceRecordFormData) {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("service_records").insert({
      car_id: carId,
      type: data.type,
      service_date: data.service_date,
      next_service_date: data.next_service_date || null,
      mileage_at_service: data.mileage_at_service
        ? parseInt(data.mileage_at_service)
        : null,
      notes: data.notes || null,
    });

    if (error) {
      toast.error("Failed to add service record");
      setLoading(false);
      return;
    }

    toast.success("Service record added!");
    router.refresh();
    onSuccess();
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oil_change">
                          🛢️ Oil Change
                        </SelectItem>
                        <SelectItem value="small_service">
                          🔧 Small Service
                        </SelectItem>
                        <SelectItem value="big_service">
                          ⚙️ Big Service
                        </SelectItem>
                        <SelectItem value="tire_change">
                          🔄 Tire Change
                        </SelectItem>
                        <SelectItem value="registration">
                          📋 Registration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mileage_at_service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage at Service (km)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} />
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
                    <FormLabel>Service Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <FormLabel>Next Service Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <Textarea
                      placeholder="Any additional notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Record"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
