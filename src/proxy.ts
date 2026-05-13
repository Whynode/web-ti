import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_DEBUG = process.env.AUTH_DEBUG === "true";

function authDebug(step: string, details?: Record<string, unknown>) {
  if (!AUTH_DEBUG) return;
  console.info(`[auth:proxy] ${step}`, details ?? {});
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Dynamically construct CSP using environment variables
  const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || "";
  const supabaseDomain = supabaseProjectId ? `https://${supabaseProjectId}.supabase.co` : "";

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app https://vercel.live",
    "style-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://randomuser.me" + (supabaseDomain ? ` ${supabaseDomain}` : ""),
    "connect-src 'self'" + (supabaseDomain ? ` ${supabaseDomain}` : "") + " https://*.vercel.app https://vercel.live",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const securityHeaders = {
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security":
      "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": cspDirectives,
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");
    authDebug("admin_route_checked", {
      pathname,
      hasAdminSessionCookie: Boolean(adminSession),
      cookieValueAccepted: adminSession?.value === "true",
    });

    if (!adminSession || adminSession.value !== "true") {
      const loginUrl = new URL("/login", request.url);
      authDebug("redirect_to_login", { pathname });
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login" || pathname === "/login/") {
    const adminSession = request.cookies.get("admin_session");
    authDebug("login_route_checked", {
      pathname,
      hasAdminSessionCookie: Boolean(adminSession),
      cookieValueAccepted: adminSession?.value === "true",
    });

    if (adminSession && adminSession.value === "true") {
      const adminUrl = new URL("/admin", request.url);
      authDebug("redirect_to_admin", { pathname });
      return NextResponse.redirect(adminUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
