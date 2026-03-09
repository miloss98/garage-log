import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import NavbarUserMenu from "./NavbarUserMenu";

export default function Navbar({ user }: { user: User }) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            🚗 Garage Log
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/cars"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              My Cars
            </Link>
          </div>
        </div>
        <NavbarUserMenu email={user.email ?? ""} />
      </div>
    </nav>
  );
}
