"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NavbarUserMenu from "@/components/layout/NavbarUserMenu";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/button";

export default function Navbar({ email }: { email: string | null }) {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const isLoggedIn = !!email;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#333333] bg-[#1a1a1a]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left — Logo */}
        <Logo href="/" dark />

        {/* Right */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-1 mr-2">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-[#9a9a9a] hover:text-[#f0f0f0] hover:hover:bg-[#2e2e2e] px-3 py-1.5 rounded-md transition-all duration-150"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/cars"
                  className="text-sm font-medium text-[#9a9a9a] hover:text-[#f0f0f0] hover:hover:bg-[#2e2e2e] px-3 py-1.5 rounded-md transition-all duration-150"
                >
                  My Cars
                </Link>
              </div>

              {/* Mobile toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-[#9a9a9a] hover:text-[#f0f0f0] hover:bg-[#2e2e2e]"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </Button>

              <NavbarUserMenu email={email} />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-[#9a9a9a] hover:text-[#f0f0f0] hover:bg-[#2e2e2e]"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
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
        <div className="md:hidden border-t border-[#333333] bg-[#1a1a1a] px-4 py-4 flex flex-col gap-1 animate-fade-in">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#9a9a9a] hover:text-[#f0f0f0] px-3 py-2 rounded-md hover:bg-[#2e2e2e] transition-colors"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/cars"
            className="text-sm font-medium text-[#9a9a9a] hover:text-[#f0f0f0]px-3 py-2 rounded-md hover:bg-[#2e2e2e] transition-colors"
            onClick={closeMobileMenu}
          >
            My Cars
          </Link>
        </div>
      )}
    </nav>
  );
}
