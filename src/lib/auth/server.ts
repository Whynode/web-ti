// Server-side authentication utilities
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_DEBUG = process.env.AUTH_DEBUG === "true";

function authDebug(step: string, details?: Record<string, unknown>) {
  if (!AUTH_DEBUG) return;
  console.info(`[auth:server] ${step}`, details ?? {});
}

/**
 * Validates admin session cookie
 * Throws 401 if invalid or missing
 */
export async function requireAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  authDebug("admin_session_checked", {
    hasAdminSessionCookie: Boolean(adminSession),
    cookieValueAccepted: adminSession?.value === "true",
  });

  if (!adminSession || adminSession.value !== "true") {
    authDebug("admin_session_rejected");
    throw new NextResponse(
      JSON.stringify({ error: "Unauthorized - Admin session required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return true;
}

/**
 * Check if request is authenticated (non-throwing version)
 */
export async function isAdminSession(): Promise<boolean> {
  try {
    await requireAdminSession();
    return true;
  } catch {
    return false;
  }
}

/**
 * Require admin for API route handlers
 * Usage: await requireAdmin() in try/catch
 */
export async function requireAdmin(): Promise<void> {
  await requireAdminSession();
}
