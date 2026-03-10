"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import NavbarUserMenu from "./NavbarUserMenu";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/button";

export default function Navbar({ user }: { user: User }) {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="font-bold text-xl flex items-center gap-2"
          >
            <span className="text-2xl">🚗</span>
            <span>Garage Log</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-1.5 rounded-md transition-all duration-150"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/cars"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-1.5 rounded-md transition-all duration-150"
              onClick={closeMobileMenu}
            >
              My Cars
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
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

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-1 animate-fade-in">
          <Link
            href="/dashboard"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent transition-colors"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/cars"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent transition-colors"
            onClick={closeMobileMenu}
          >
            My Cars
          </Link>
        </div>
      )}
    </nav>
  );
}
