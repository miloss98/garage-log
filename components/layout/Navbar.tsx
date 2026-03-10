"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import NavbarUserMenu from "./NavbarUserMenu";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/button";

export default function Navbar({ user }: { user: User }) {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-bold text-xl">
            🚗 Garage Log
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/cars"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              My Cars
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </Button>
          <NavbarUserMenu email={user.email ?? ""} />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="text-sm font-medium px-2 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/cars"
            className="text-sm font-medium px-2 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={closeMobileMenu}
          >
            My Cars
          </Link>
          <Link
            href="/dashboard/profile"
            className="text-sm font-medium px-2 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={closeMobileMenu}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
