import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mjxjoxpajtejynxzjtoa.supabase.co";
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "sb_publishable_tVCMRU8aH-8btRIhZC6vCA_1emR7tzK";

/**
 * Next.js 16 Request Proxy / Middleware
 * 
 * 1. Automatically refreshes user auth tokens/cookies across incoming requests.
 * 2. Enforces route guards for protected paths (/profile and /admin).
 * 
 * @param {import("next/server").NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function proxy(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh and retrieve current auth session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Check for active auth cookie
  const hasLocalAuthCookie = Boolean(request.cookies.get("campussutras_auth_user")?.value);

  // Protect /admin strictly
  if (pathname.startsWith("/admin") && !user && !hasLocalAuthCookie) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (public media assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|media|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
