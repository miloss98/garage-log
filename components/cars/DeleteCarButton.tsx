"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteCar } from "@/hooks/useCars";
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
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function DeleteCarButton({ carId }: { carId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate: deleteCar, isPending: loading } = useDeleteCar();

  function handleDelete() {
    deleteCar(carId, {
      onError: () => toast.error("Failed to delete car"),
      onSuccess: () => {
        toast.success("Car deleted");
        setOpen(false);
        router.push("/dashboard/cars");
        router.refresh();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
          aria-label="Delete car"
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete this car and all its service records.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            aria-label="Cancel car deletion"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="cursor-pointer"
            aria-label="Confirm car deletion"
          >
            {loading ? "Deleting..." : "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
