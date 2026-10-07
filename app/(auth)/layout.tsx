import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/api/server";

// Logged-in users visiting /login or /register go straight to the dashboard.
// This uses a real /auth/me check (not just "cookie exists"), so an expired
// cookie can't cause a /login <-> /dashboard redirect loop.
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return children;
}
