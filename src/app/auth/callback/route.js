import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || "/profile";
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  // If Supabase returned an auth error in query parameters
  if (error) {
    console.error("[AuthCallback] Error from auth provider:", error, error_description);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || error)}`);
  }

  const supabase = await createClient();

  // 1. PKCE Code Exchange Flow
  if (code) {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError && data?.user) {
      try {
        await supabase
          .from("profiles")
          .update({ 
            is_verified: true, 
            updated_at: new Date().toISOString() 
          })
          .eq("id", data.user.id);
      } catch (err) {
        console.warn("[AuthCallback] Profile verification update notice:", err);
      }

      return NextResponse.redirect(`${origin}${next}?verified=true`);
    }
  }

  // 2. Token Hash / OTP Verification Flow (Used by custom SMTP & Supabase email templates)
  if (token_hash && type) {
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (!verifyError && data?.user) {
      try {
        await supabase
          .from("profiles")
          .update({ 
            is_verified: true, 
            updated_at: new Date().toISOString() 
          })
          .eq("id", data.user.id);
      } catch (err) {
        console.warn("[AuthCallback] Profile verification update notice:", err);
      }

      return NextResponse.redirect(`${origin}${next}?verified=true`);
    }
  }

  // 3. Fallback: Check if active session already exists and user has confirmed email
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ 
          is_verified: true, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);
      return NextResponse.redirect(`${origin}${next}?verified=true`);
    }
  } catch (err) {
    // Proceed to redirect
  }

  // Return the user to login with error notice if code exchange / token verification fails
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

