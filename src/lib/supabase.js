/**
 * Supabase Client & Architecture Foundation
 * 
 * Centralized re-export and configuration constants for Supabase Auth,
 * PostgreSQL, and Assessment tracking.
 */

import { supabase, createClient } from "./supabase/client";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

/**
 * Returns the initialized Supabase browser client
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export function getSupabaseClient() {
  return supabase;
}

export { supabase, createClient };

/**
 * Assessment & Auth Contract Definitions (Used for Supabase schema and status tracking)
 */
export const ASSESSMENT_CONFIG = {
  STATUSES: {
    DRAFT: "draft",
    ACTIVE: "active",
    SUBMITTED: "submitted",
    EVALUATED: "evaluated",
  },
  TRACKS: [
    "full-stack-web-development",
    "python-programming",
    "java-programming",
    "data-science-ai",
    "data-analytics-powerbi",
    "flutter-mobile-app",
    "ui-ux-design",
    "generative-ai-engineering",
  ],
};

export default supabase;

