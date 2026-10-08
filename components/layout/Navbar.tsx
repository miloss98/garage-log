import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NavbarUserMenu from "@/components/layout/NavbarUserMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

// Top bar for public pages (the app itself uses the sidebar / tab bar shell)
export default function Navbar({
  email,
  fullName,
}: {
  email: string | null;
  fullName?: string | null;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4 sm:px-5">
        <Logo href="/" />

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {email ? (
            <>
              <Button asChild size="sm" variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <NavbarUserMenu email={email} fullName={fullName} />
            </>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="ghost"
                // Very narrow phones: no room; the register page links to sign in
                className="text-muted-foreground hover:text-foreground max-[379px]:hidden"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
