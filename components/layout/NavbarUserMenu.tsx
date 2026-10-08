"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";

export default function NavbarUserMenu({
  email,
  fullName,
}: {
  email: string;
  fullName?: string | null;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initials = getInitials(fullName, email);
  async function handleLogout() {
    // Even if the request fails (e.g. token already expired), still leave.
    await apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    // Drop cached cars so the next user on this browser can't see them.
    queryClient.clear();
    router.push("/login");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 bg-background border-border"
      >
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-foreground truncate">{email}</p>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          asChild
          className="text-foreground hover:text-foreground cursor-pointer focus:bg-accent"
        >
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          className="text-destructive cursor-pointer focus:bg-accent focus:text-destructive"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
