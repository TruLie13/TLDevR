import { NextResponse } from "next/server";
import { AUTH_TOKEN_NAME } from "./lib/auth";

/**
 * Middleware for route protection
 * Checks for auth token cookie on protected routes
 */
export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get(AUTH_TOKEN_NAME)?.value;

  // Define protected routes
  const protectedPaths = ["/create", "/edit"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run middleware on these routes for performance
export const config = {
  matcher: ["/create/:path*", "/edit/:path*"],
};
