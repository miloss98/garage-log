"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api/client";

export default function DemoBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Leave the demo first: logged-in users are redirected away from /register
  async function createRealAccount() {
    await apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    queryClient.clear();
    router.push("/register");
    router.refresh();
  }

  return (
    <div className="border-b border-amber-500/20 bg-amber-500/10">
      <div className="container mx-auto flex flex-col gap-2 px-5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-amber-200">
          <FlaskConical size={16} className="shrink-0" />
          You&apos;re exploring a demo garage. Changes are private and
          disappear after 24 hours.
        </p>
        <Button
          size="sm"
          onClick={createRealAccount}
          className="self-start sm:self-auto"
        >
          Create your own account
        </Button>
      </div>
    </div>
  );
}
