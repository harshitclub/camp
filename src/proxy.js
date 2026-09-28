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
 * Production Optimizations & Supabase Free Plan Protection:
 * 1. Skip Supabase Auth API calls for anonymous visitors browsing public routes
 *    (saves ~95% of egress bandwidth and auth API calls on the free tier).
 * 2. Instant zero-roundtrip redirection for unauthenticated requests targeting protected /admin routes.
 * 3. Token refresh and cookie maintenance strictly when active auth sessions/cookies exist.
 * 
 * @param {import("next/server").NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Retrieve incoming cookies
  const allCookies = request.cookies.getAll();
  const hasLocalAuthCookie = Boolean(request.cookies.get("campussutras_auth_user")?.value);
  const hasSupabaseCookie = allCookies.some((c) => c.name.startsWith("sb-"));
  const hasAnyAuth = hasLocalAuthCookie || hasSupabaseCookie;

  // 1. Strict zero-roundtrip protection for /admin routes
  if (pathname.startsWith("/admin") && !hasAnyAuth) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. Performance & Free Plan Guard: If public route and no auth cookies, pass through immediately
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/profile") && !hasAnyAuth) {
    return NextResponse.next({ request });
  }

  // 3. User has auth cookies or is accessing protected routes: verify session and refresh tokens
  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh and retrieve current auth session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Secondary route guard if user is requesting /admin but session expired
    if (pathname.startsWith("/admin") && !user && !hasLocalAuthCookie) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (err) {
    console.warn("[Proxy Middleware] Supabase session check notice:", err?.message || err);
    if (pathname.startsWith("/admin") && !hasLocalAuthCookie) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
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
