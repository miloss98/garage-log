import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import LandingNavbar from "@/components/layout/LandingNavbar";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-muted text-muted-foreground text-sm px-4 py-1.5 rounded-full mb-6">
            Free · No credit card required
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Never miss a car service again
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Garage Log helps you track oil changes, services, tire changes and
            registration deadlines for all your vehicles — in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to your Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/register">Start tracking for free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: "🛢️",
              title: "Service History",
              desc: "Log every oil change, small and big service with dates and mileage.",
            },
            {
              icon: "📋",
              title: "Registration Tracking",
              desc: "Never miss a registration deadline with clear due date indicators.",
            },
            {
              icon: "🚗",
              title: "Multiple Vehicles",
              desc: "Manage all your cars in one place. Each with its own full history.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="text-center p-6 rounded-xl border bg-card"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Status indicators section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Always know what needs attention
          </h2>
          <p className="text-muted-foreground mb-10">
            Color-coded status indicators show you at a glance what&apos;s
            overdue, due soon, or all good.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              { label: "Overdue", color: "bg-red-500" },
              { label: "Due Soon", color: "bg-orange-500" },
              { label: "All Good", color: "bg-green-500" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${s.color}`} />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Create a free account and add your first car in minutes.
          </p>
          {user ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">Go to your Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link href="/register">Create free account</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Garage Log. Built with Next.js &
            Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
