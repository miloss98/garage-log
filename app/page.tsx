import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f0f0f0]">
      <Navbar email={user?.email ?? null} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}

        <div className="relative container mx-auto px-4 py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-up inline-flex items-center gap-2 bg-amber-400/10 border border-amber-500/20 text-amber-400 text-sm px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Free · No credit card required
            </div>

            <h1 className="animate-fade-up animation-delay-100 text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight">
              Never miss a car
              <br />
              service again
            </h1>

            <p className="animate-fade-up animation-delay-200 text-xl text-[#9a9a9a] mb-10 leading-relaxed max-w-2xl mx-auto">
              Garage Log helps you track oil changes, services, tire changes and
              registration deadlines for all your vehicles — in one place.
            </p>

            <div className="animate-fade-up animation-delay-300 flex items-center justify-center gap-4 flex-wrap">
              {user ? (
                <Button size="lg" asChild className="h-12 px-8 text-base">
                  <Link href="/dashboard">Go to Dashboard →</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild className="h-12 px-8 text-base">
                    <Link href="/register">Start for free →</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="h-12 px-8 text-base border-[#3d3d3d] bg-transparent text-[#c0c0c0] hover:bg-[#333333] hover:text-[#f0f0f0]"
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">
            Everything you need to stay on top of maintenance
          </h2>
          <p className="text-[#9a9a9a] max-w-xl mx-auto">
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
              className={`animate-fade-up ${f.delay} group p-6 rounded-2xl border border-[#333333] bg-[#242424]/50 hover:bg-[#242424] hover:border-[#3d3d3d] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg text-[#f0f0f0] mb-2">
                {f.title}
              </h3>
              <p className="text-[#9a9a9a] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#333333] bg-[#242424]/50 p-12 text-center">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">
            Always know what needs attention
          </h2>
          <p className="text-[#9a9a9a] mb-10">
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
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#9a9a9a] mb-8">
            Create a free account and add your first car in minutes.
          </p>
          {user ? (
            <Button size="lg" asChild className="h-12 px-8">
              <Link href="/dashboard">Go to Dashboard →</Link>
            </Button>
          ) : (
            <Button size="lg" asChild className="h-12 px-8">
              <Link href="/register">Create free account →</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333333]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <p className="text-sm text-[#707070]">
            © {new Date().getFullYear()} GarageLog. Built with Next.js &
            Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
