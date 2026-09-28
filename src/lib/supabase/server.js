import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mjxjoxpajtejynxzjtoa.supabase.co";
const supabaseKey = 
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "sb_publishable_tVCMRU8aH-8btRIhZC6vCA_1emR7tzK";

/**
 * Creates a server client for Server Components, Server Actions, and Route Handlers.
 * Connects to Next.js cookie jar for session maintenance.
 * 
 * @returns {Promise<import("@supabase/supabase-js").SupabaseClient>}
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if proxy/middleware refreshes user sessions.
        }
      },
    },
  });
}

/**
 * Singleton Admin server client instance cache.
 * Avoids spawning hundreds of individual HTTP connection pools on serverless functions,
 * drastically reducing memory usage and preventing connection pool exhaustion on Supabase Free Plan.
 */
let cachedAdminClient = null;

/**
 * Admin server client instance with disabled session persistence for pure API routes
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export function createAdminClient() {
  if (!cachedAdminClient) {
    cachedAdminClient = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return cachedAdminClient;
}

