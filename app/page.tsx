import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/api/server";
import TryDemoButton from "@/components/auth/TryDemoButton";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { AppMetadata } from "@/lib/seo";

export const metadata: Metadata = AppMetadata;

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar email={user?.email ?? null} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-5 py-20 md:py-24 lg:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-link text-sm px-5 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free · No credit card required
            </div>

            <h1 className="animate-fade-up animation-delay-100 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent leading-tight">
              Never miss a car
              <br />
              service again
            </h1>

            <p className="animate-fade-up animation-delay-200 text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Garage Log helps you track oil changes, services, tire changes and
              registration deadlines for all your vehicles — in one place.
            </p>

            <div className="animate-fade-up animation-delay-300 flex items-center justify-center gap-4 flex-wrap">
              {user ? (
                <Button size="xl" asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-base"
                  >
                    Go to Dashboard <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="xl" asChild>
                    <Link
                      href="/register"
                      className="flex items-center gap-2 text-base"
                    >
                      Start for free <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <TryDemoButton className="h-12 px-8 text-base border-input bg-transparent text-foreground hover:bg-accent hover:text-foreground" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-5 py-10 md:py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to stay on top of maintenance
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple, focused tools that keep your vehicles running smoothly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "🛢️",
              title: "Service History",
              desc: "Log every oil change, small and big service with dates and mileage.",
              delay: "animation-delay-100",
            },
            {
              icon: "📋",
              title: "Registration Tracking",
              desc: "Never miss a registration deadline with clear due date indicators.",
              delay: "animation-delay-200",
            },
            {
              icon: "🚗",
              title: "Multiple Vehicles",
              desc: "Manage all your cars in one place. Each with its own full history.",
              delay: "animation-delay-300",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`animate-fade-up ${f.delay} group p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-input transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status section */}
      <section className="container mx-auto px-5 py-16">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/50 p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Always know what needs attention
          </h2>
          <p className="text-muted-foreground mb-10">
            Color-coded status indicators show you at a glance what&apos;s
            overdue, due soon, or all good.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { label: "Overdue", color: "bg-red-500", text: "text-red-400" },
              {
                label: "Due Soon",
                color: "bg-orange-500",
                text: "text-orange-400",
              },
              {
                label: "All Good",
                color: "bg-green-500",
                text: "text-green-400",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                <span className={`text-sm font-medium ${s.text}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-12 md:py-20 lg:py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Create a free account and add your first car in minutes.
          </p>
          {user ? (
            <Button size="xl" asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-base"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            </Button>
          ) : (
            <Button size="xl" asChild>
              <Link
                href="/register"
                className="flex items-center gap-2 text-base"
              >
                Create free account <ArrowRight size={16} />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-5 h-16 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GarageLog. Built with Next.js &
            Express.
          </p>
        </div>
      </footer>
    </div>
  );
}
