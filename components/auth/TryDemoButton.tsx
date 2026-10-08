"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { apiFetch, ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

// Creates a fresh, private demo account (pre-filled with cars and history)
// and logs the visitor straight in - no registration needed.
export default function TryDemoButton({
  className,
  size = "lg",
  variant = "outline",
}: {
  className?: string;
  size?: React.ComponentProps<typeof Button>["size"];
  variant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  async function startDemo() {
    setLoading(true);
    try {
      await apiFetch("/auth/demo", { method: "POST" });
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Couldn't start the demo",
      );
      setLoading(false);
      return;
    }

    queryClient.clear();
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={startDemo}
      disabled={loading}
      className={cn("gap-2", className)}
    >
      <PlayCircle size={16} />
      {loading ? "Preparing your demo garage..." : "Try the demo"}
    </Button>
  );
}
