import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  // Redirect logged-in users away from login/signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect unauthenticated users from protected pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Otherwise, allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
}
