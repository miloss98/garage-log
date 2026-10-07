import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { toApiError } from "./errors";
import type { User } from "@/types";

// Server components can't use the "/api" rewrite (there is no browser),
// so they call the API directly and forward the user's token cookie by hand.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path: string) {
  const token = (await cookies()).get("token")?.value;

  return fetch(`${API_URL}/api${path}`, {
    headers: token ? { Cookie: `token=${token}` } : {},
    cache: "no-store",
  });
}

// For protected pages: 401 sends the user to /login, 404 shows the not-found page.
export async function serverFetch<T>(path: string): Promise<T> {
  const res = await request(path);

  if (res.status === 401) redirect("/login");
  if (res.status === 404) notFound();
  if (!res.ok) throw await toApiError(res);

  return res.json() as Promise<T>;
}

// Returns null instead of redirecting, so public pages can use it too.
// cache() dedupes it: layout + page in the same render share one request.
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!(await cookies()).has("token")) return null;

  const res = await request("/auth/me");
  if (!res.ok) return null;

  return res.json();
});
