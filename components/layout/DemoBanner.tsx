"use client";

import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

export default function DemoBanner() {
  const logout = useLogout();

  return (
    <div data-demo-banner className="border-b border-primary/20 bg-primary/10">
      <div className="flex flex-col gap-2 px-5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="flex items-center gap-2 text-foreground">
          <FlaskConical size={16} className="shrink-0" />
          You&apos;re exploring a demo garage. Changes are private and
          disappear after 24 hours.
        </p>
        {/* Leave the demo first: logged-in users are redirected away from /register */}
        <Button
          size="sm"
          onClick={() => logout("/register")}
          className="self-start sm:self-auto"
        >
          Create your own account
        </Button>
      </div>
    </div>
  );
}
