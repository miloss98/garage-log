import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BellRing,
  CarFront,
  ChartColumn,
  FlaskConical,
  History,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/api/server";
import TryDemoButton from "@/components/auth/TryDemoButton";
import Navbar from "@/components/layout/Navbar";
import Logo from "@/components/ui/Logo";
import { AppMetadata } from "@/lib/seo";

export const metadata: Metadata = AppMetadata;

const FEATURES = [
  {
    icon: BellRing,
    title: "Reminders by date or mileage",
    desc: "Oil every 12 months or 15,000 km, whichever comes first. Overdue and due-soon items surface on their own.",
  },
  {
    icon: History,
    title: "Complete service history",
    desc: "Every oil change, repair and inspection on a timeline, with mileage, cost and the workshop that did it.",
  },
  {
    icon: ChartColumn,
    title: "Know what your cars cost",
    desc: "Spending per month, per car and per service type, in your own currency.",
  },
  {
    icon: CarFront,
    title: "All your vehicles",
    desc: "The daily driver, the family car and the weekend toy - each with its own history and reminders.",
  },
  {
    icon: Smartphone,
    title: "Made for your phone",
    desc: "An app-style layout with a bottom tab bar, plus light and dark mode that follows your device.",
  },
  {
    icon: FlaskConical,
    title: "Try it in one click",
    desc: "Open a private demo garage with real-looking data. No sign-up, gone after 24 hours.",
  },
];

// Shows the light or dark screenshot to match the visitor's theme
function ThemedScreenshot({
  name,
  alt,
  width,
  height,
  sizes,
  priority = false,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={`/screenshots/${name}-light.png`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="block dark:hidden"
      />
      <Image
        src={`/screenshots/${name}-dark.png`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="hidden dark:block"
      />
    </>
  );
}

export default async function LandingPage() {
  const user = await getCurrentUser();

  const primaryCta = user ? (
    <Button size="xl" asChild>
      <Link href="/dashboard" className="gap-2 text-base">
        Go to dashboard <ArrowRight size={16} />
      </Link>
    </Button>
  ) : (
    <Button size="xl" asChild>
      <Link href="/register" className="gap-2 text-base">
        Start for free <ArrowRight size={16} />
      </Link>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar email={user?.email ?? null} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft blue glow behind the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative container mx-auto px-5 pt-16 pb-12 md:pt-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Free · No credit card · Works on your phone
            </div>

            <h1 className="animate-fade-up animation-delay-100 mb-6 text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
              Every service, repair and deadline.{" "}
              <span className="text-link">One garage log.</span>
            </h1>

            <p className="animate-fade-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              GarageLog tracks maintenance for all your cars, reminds you before
              anything is due - by date or by mileage - and shows exactly what
              your cars cost.
            </p>

            <div className="animate-fade-up animation-delay-300 flex flex-wrap items-center justify-center gap-3">
              {primaryCta}
              {!user && <TryDemoButton className="h-12 px-8 text-base" />}
            </div>
          </div>

          {/* Phones: phone screenshot (a desktop screenshot is unreadable that small) */}
          <div className="animate-fade-up animation-delay-400 mx-auto mt-12 w-full max-w-[280px] sm:hidden">
            <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-card shadow-2xl">
              <ThemedScreenshot
                name="mobile-car"
                alt="GarageLog car page on a phone"
                width={780}
                height={1688}
                sizes="280px"
                priority
              />
            </div>
          </div>

          {/* Larger screens: product screenshot in a browser frame */}
          <div className="animate-fade-up animation-delay-400 mx-auto mt-16 hidden max-w-6xl sm:block">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/10">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-3 truncate rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                  garage-log.vercel.app/dashboard
                </span>
              </div>
              <ThemedScreenshot
                name="dashboard"
                alt="GarageLog dashboard with service reminders and expenses"
                width={1440}
                height={900}
                sizes="(max-width: 1200px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-5 py-20 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything your car&apos;s paperwork never told you
          </h2>
          <p className="text-muted-foreground">
            Focused tools that keep every vehicle on schedule.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-link">
                <Icon size={20} />
              </div>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
          <div className="max-w-lg">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Feels like an app on your phone
            </h2>
            <p className="mb-6 text-muted-foreground">
              Log a service right at the workshop. Forms open as bottom sheets,
              the next due date and mileage are suggested for you, and your
              car&apos;s mileage updates itself.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Status for every car: overdue, due soon or OK",
                "Suggested intervals for oil, services, tyres and documents",
                "Light and dark mode that follows your device",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Phone frame (on phones the hero already shows it) */}
          <div className="mx-auto hidden w-full max-w-[300px] sm:block">
            <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-card shadow-2xl">
              <ThemedScreenshot
                name="mobile-car"
                alt="GarageLog car page on a phone"
                width={780}
                height={1688}
                sizes="300px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 py-20 text-center md:py-28">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to never miss a service?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Create a free account, or look around a demo garage first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primaryCta}
            {!user && <TryDemoButton className="h-12 px-8 text-base" />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <Logo />
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p className="text-center">
            Built with Next.js, Express, Prisma &amp; PostgreSQL
          </p>
          <div className="flex items-center gap-4">
            {/* Swagger UI, served by the API through the /api proxy */}
            <a href="/api/docs" className="hover:text-foreground">
              API docs
            </a>
            <a
              href="https://github.com/miloss98/garage-log"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Frontend code
            </a>
            <a
              href="https://github.com/miloss98/garage-log-api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              API code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
