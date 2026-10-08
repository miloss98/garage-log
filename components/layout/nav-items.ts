import { CarFront, LayoutDashboard, Plus, UserRound } from "lucide-react";

// One list for the desktop sidebar and the mobile tab bar
export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/cars", label: "My Cars", icon: CarFront },
  { href: "/dashboard/cars/new", label: "Add car", icon: Plus },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
] as const;

// The most specific matching item wins, so /dashboard/cars/new highlights
// "Add car" (not "My Cars"), and /dashboard/cars/123 highlights "My Cars".
export function activeHref(pathname: string) {
  return NAV_ITEMS.map((item) => item.href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];
}
