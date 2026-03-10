import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import NavbarUserMenu from "./NavbarUserMenu";
import Logo from "../ui/Logo";

export default async function LandingNavbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo href="/" dark />
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <NavbarUserMenu email={user.email ?? ""} />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
