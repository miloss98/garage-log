import { NextResponse, type NextRequest } from "next/server";

// Fast, optimistic check: only looks at whether the cookie exists.
// The real JWT verification happens in the API on every request
// (an expired token gets a 401 and serverFetch redirects to /login).
export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("token");

  if (!hasToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
