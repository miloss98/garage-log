"use client";

import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
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
  const logout = useLogout();
  const initials = getInitials(fullName, email);

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
          onClick={() => logout()}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
