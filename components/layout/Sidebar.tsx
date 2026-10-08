"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { cn, getInitials } from "@/lib/utils";
import { NAV_ITEMS, activeHref } from "./nav-items";

// Desktop navigation (lg and up). On phones MobileTabBar takes over.
export default function Sidebar({
  email,
  fullName,
}: {
  email: string;
  fullName: string | null;
}) {
  const pathname = usePathname();
  const active = activeHref(pathname);
  const logout = useLogout();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center px-6">
        <Logo href="/dashboard" />
      </div>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active === href ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active === href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon size={18} className={active === href ? "text-link" : undefined} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {getInitials(fullName, email)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{fullName ?? "Driver"}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between px-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => logout()}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} /> Log out
          </Button>
        </div>
      </div>
    </aside>
  );
}
