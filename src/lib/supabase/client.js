import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mjxjoxpajtejynxzjtoa.supabase.co";
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "sb_publishable_tVCMRU8aH-8btRIhZC6vCA_1emR7tzK";

/**
 * Singleton Browser Client Reference
 * Safeguards Supabase Free Plan by preventing multiple WebSocket/realtime connections
 * and duplicate client instantiations on the frontend.
 */
let clientInstance = null;

/**
 * Creates or retrieves the singleton browser client
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export function createClient() {
  if (typeof window === "undefined") {
    // During SSR, return a fresh client per render pass
    return createBrowserClient(supabaseUrl, supabaseKey);
  }

  // In the browser, maintain a strict singleton
  if (!clientInstance) {
    clientInstance = createBrowserClient(supabaseUrl, supabaseKey);
  }
  return clientInstance;
}

export const supabase = createClient();
