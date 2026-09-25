import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mjxjoxpajtejynxzjtoa.supabase.co";
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "sb_publishable_tVCMRU8aH-8btRIhZC6vCA_1emR7tzK";

/**
 * Creates a browser client for client-side Supabase interactions
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export const supabase = createClient();
