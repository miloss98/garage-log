"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NavbarUserMenu from "@/components/layout/NavbarUserMenu";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar({
  email,
  fullName,
}: {
  email: string | null;
  fullName?: string | null;
}) {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const isLoggedIn = !!email;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        {/* Left — Logo */}
        <Logo href="/" />

        {/* Right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-1 mr-2">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-1.5 rounded-md transition-all duration-150"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/cars"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-1.5 rounded-md transition-all duration-150"
                >
                  My Cars
                </Link>
              </div>

              {/* Mobile toggle */}
              <Button
                variant="outline"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </Button>

              <NavbarUserMenu email={email} fullName={fullName} />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                aria-label="Sign in to your account"
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                aria-label="Create a new account"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isLoggedIn && isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-5 py-3 flex flex-col gap-1 animate-fade-in">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-md hover:bg-accent transition-colors block w-full"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/cars"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-md hover:bg-accent transition-colors block w-full"
            onClick={closeMobileMenu}
          >
            My Cars
          </Link>
        </div>
      )}
    </nav>
  );
}
