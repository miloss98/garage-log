"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "./ThemeToggle";
import NavbarUserMenu from "./NavbarUserMenu";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, activeHref } from "./nav-items";

// Phones/tablets (below lg): slim top bar + app-style bottom tab bar
export function MobileTopBar({
  email,
  fullName,
}: {
  email: string;
  fullName: string | null;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md lg:hidden">
      <Logo href="/dashboard" />
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <NavbarUserMenu email={email} fullName={fullName} />
      </div>
    </header>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const active = activeHref(pathname);

  return (
    <nav
      aria-label="Main"
      // Extra bottom padding for the iPhone home indicator
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = active === href;
          const isAdd = href === "/dashboard/cars/new";
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                  isActive ? "text-link" : "text-muted-foreground",
                )}
              >
                {/* Same-height slot for every icon keeps all labels on one line */}
                <span className="flex h-8 items-center justify-center">
                  {isAdd ? (
                    // The main action stands out, like a native app's centre button
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Icon size={18} />
                    </span>
                  ) : (
                    <Icon size={20} />
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
