"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";

const AuthContext = createContext({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full student/member profile from 'profiles' table with graceful fallback & auto-sync
  const fetchProfile = useCallback(async (userId, currentUser = null) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    const isEmailConfirmed = Boolean(
      currentUser?.email_confirmed_at || 
      currentUser?.confirmed_at || 
      currentUser?.user_metadata?.is_verified
    );

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (data) {
        const merged = { 
          ...data, 
          email: currentUser?.email || data?.email || null,
          is_verified: Boolean(data.is_verified) 
        };
        setProfile(merged);
        return merged;
      }

      // If no profile found in DB or if table is empty, construct fallback from user metadata
      const meta = currentUser?.user_metadata || {};
      const fallbackProfile = {
        id: userId,
        email: currentUser?.email || meta.email || null,
        full_name: meta.full_name || meta.name || currentUser?.email?.split("@")[0] || "User",
        user_type: meta.user_type || "Student",
        phone: meta.phone || null,
        college_name: meta.college_name || null,
        company: meta.company || null,
        position: meta.position || null,
        course: meta.course || meta.degree_branch || meta.degree || null,
        year: meta.year || meta.graduation_year || null,
        github_url: meta.github_url || null,
        linkedin_url: meta.linkedin_url || null,
        is_admin: Boolean(meta.is_admin),
        is_verified: Boolean(meta.is_verified),
      };

      // Attempt to upsert the missing profile row in the background
      try {
        const { data: createdProfile } = await supabase
          .from("profiles")
          .upsert(fallbackProfile)
          .select()
          .maybeSingle();
        
        if (createdProfile) {
          const merged = { 
            ...createdProfile, 
            email: currentUser?.email || createdProfile.email || null,
            is_verified: Boolean(createdProfile.is_verified) 
          };
          setProfile(merged);
          return merged;
        }
      } catch (upsertErr) {
        // Silently proceed with fallback profile
      }

      setProfile(fallbackProfile);
      return fallbackProfile;
    } catch (err) {
      const meta = currentUser?.user_metadata || {};
      const fallbackProfile = {
        id: userId,
        email: currentUser?.email || meta.email || null,
        full_name: meta.full_name || currentUser?.email?.split("@")[0] || "User",
        user_type: meta.user_type || "Student",
        phone: meta.phone || null,
        college_name: meta.college_name || null,
        company: meta.company || null,
        position: meta.position || null,
        course: meta.course || meta.degree_branch || null,
        year: meta.year || meta.graduation_year || null,
        github_url: meta.github_url || null,
        linkedin_url: meta.linkedin_url || null,
        is_admin: Boolean(meta.is_admin),
        is_verified: Boolean(meta.is_verified),
      };
      setProfile(fallbackProfile);
      return fallbackProfile;
    }


  }, []);

  // Initialize session and listen for auth state changes
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          setUser(session.user);
          if (typeof document !== "undefined") {
            document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
          }
          await fetchProfile(session.user.id, session.user);
        } else if (mounted) {
          // Check local session fallback for unconfirmed accounts
          let localUser = null;
          if (typeof window !== "undefined") {
            try {
              const raw = localStorage.getItem("campussutras_active_user");
              if (raw) localUser = JSON.parse(raw);
            } catch (e) {}
          }

          if (localUser && localUser.id) {
            setUser(localUser);
            if (typeof document !== "undefined") {
              document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
            }
            await fetchProfile(localUser.id, localUser);
          } else {
            setUser(null);
            setProfile(null);
            if (typeof document !== "undefined") {
              document.cookie = "campussutras_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
          }
        }
      } catch (err) {
        console.warn("[AuthContext] Auth initialization notice:", err?.message || err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            if (typeof document !== "undefined") {
              document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
            }
            await fetchProfile(session.user.id, session.user);
          } else if (event === "SIGNED_OUT") {
            if (typeof window !== "undefined") {
              localStorage.removeItem("campussutras_active_user");
              document.cookie = "campussutras_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            setUser(null);
            setProfile(null);
          }
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  // Log in with email & password (with graceful handling for unconfirmed emails)
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        setUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("campussutras_active_user", JSON.stringify(data.user));
          document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
        }
        const userProfile = await fetchProfile(data.user.id, data.user);
        return { user: data.user, profile: userProfile };
      }

      return data;
    } catch (err) {
      const msg = err?.message || "";
      // If error is due to unconfirmed email, seamlessly allow the user into their account
      if (msg.toLowerCase().includes("email not confirmed") || msg.toLowerCase().includes("unconfirmed")) {
        console.info("[AuthContext] Allowing unconfirmed member access.");
        let dbProfile = null;
        try {
          const { data: pData } = await supabase
            .from("profiles")
            .select("*")
            .ilike("email", email.trim())
            .maybeSingle();
          if (pData) dbProfile = pData;
        } catch (dbErr) {}

        if (!dbProfile && typeof window !== "undefined") {
          try {
            const adminUsers = JSON.parse(localStorage.getItem("campussutras_admin_users") || "[]");
            dbProfile = adminUsers.find((u) => u.email?.toLowerCase() === email.trim().toLowerCase());
          } catch (e) {}
        }

        const fallbackUser = {
          id: dbProfile?.id || `usr_${Date.now()}`,
          email: email.trim(),
          user_metadata: {
            email: email.trim(),
            full_name: dbProfile?.full_name || email.trim().split("@")[0],
            user_type: dbProfile?.user_type || "Student",
            phone: dbProfile?.phone || null,
            college_name: dbProfile?.college_name || null,
            company: dbProfile?.company || null,
            course: dbProfile?.course || null,
            year: dbProfile?.year || null,
            position: dbProfile?.position || null,
            is_verified: false,
          },
          email_confirmed_at: null,
          confirmed_at: null,
          created_at: dbProfile?.created_at || new Date().toISOString(),
        };

        setUser(fallbackUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("campussutras_active_user", JSON.stringify(fallbackUser));
          document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
        }
        const userProfile = await fetchProfile(fallbackUser.id, fallbackUser);
        return { user: fallbackUser, profile: userProfile };
      }

      throw err;
    }
  };

  // Sign up a new user (Student, Employee / Working Professional, etc.)
  const signup = async ({
    email,
    password,
    fullName,
    userType = "Student",
    phone = null,
    collegeName = null,
    company = null,
    course = null,
    year = null,
    position = null,
  }) => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/profile`,
        data: {
          email,
          full_name: fullName,
          user_type: userType,
          phone,
          college_name: collegeName,
          company,
          position,
          course,
          year,
          is_verified: false,
        },
      },
    });

    if (error) {
      throw error;
    }

    const activeUser = data?.user || {
      id: `usr_${Date.now()}`,
      email,
      user_metadata: {
        email,
        full_name: fullName,
        user_type: userType,
        phone,
        college_name: collegeName,
        company,
        position,
        course,
        year,
        is_verified: false,
      },
      email_confirmed_at: null,
      created_at: new Date().toISOString(),
    };

    setUser(activeUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("campussutras_active_user", JSON.stringify(activeUser));
      document.cookie = "campussutras_auth_user=true; path=/; max-age=604800; SameSite=Lax";
    }

    const newUserData = {
      id: activeUser.id,
      email,
      full_name: fullName,
      user_type: userType,
      phone,
      college_name: collegeName,
      company,
      position,
      course,
      year,
      is_admin: false,
      is_verified: Boolean(data?.user?.email_confirmed_at || data?.user?.confirmed_at),
      created_at: new Date().toISOString(),
    };

    // 1. Persist to Supabase profiles
    try {
      await supabase.from("profiles").upsert(newUserData);
    } catch (profileErr) {
      // Silently proceed
    }

    // 2. Also register in local admin users list
    if (typeof window !== "undefined") {
      try {
        const existingAdminUsers = JSON.parse(localStorage.getItem("campussutras_admin_users") || "[]");
        const updatedUsers = [
          newUserData,
          ...existingAdminUsers.filter((u) => u.id !== newUserData.id && u.email !== newUserData.email),
        ];
        localStorage.setItem("campussutras_admin_users", JSON.stringify(updatedUsers));
      } catch (storageErr) {}
    }

    await fetchProfile(activeUser.id, activeUser);
    return data;
  };

  // Log out current user
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("campussutras_active_user");
      document.cookie = "campussutras_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setUser(null);
    setProfile(null);
  };

  // Send password reset email
  const resetPassword = async (email) => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Update password for authenticated user
  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Update member profile info with graceful schema fallback
  const updateProfile = async (updatedFields) => {
    if (!user?.id) throw new Error("No authenticated user.");

    const payload = {};
    Object.entries(updatedFields).forEach(([k, v]) => {
      if (v !== undefined) payload[k] = v;
    });

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .maybeSingle();

      if (error) {
        // If a column is missing in Postgres schema cache, retry with core fields
        if (error.message?.includes("column") || error.code === "PGRST204") {
          const corePayload = {
            full_name: payload.full_name,
            user_type: payload.user_type,
            phone: payload.phone,
            college_name: payload.college_name,
            company: payload.company,
            course: payload.course || payload.degree_branch,
            updated_at: new Date().toISOString(),
          };

          const { data: retryData, error: retryError } = await supabase
            .from("profiles")
            .update(corePayload)
            .eq("id", user.id)
            .select()
            .maybeSingle();

          if (retryError) throw retryError;

          // Save complete payload into auth user_metadata
          try {
            await supabase.auth.updateUser({
              data: { ...payload },
            });
          } catch (mErr) {
            // Ignore metadata save error
          }

          const combined = { ...(profile || {}), ...payload, ...(retryData || {}) };
          setProfile(combined);
          return combined;
        }
        throw error;
      }

      // Sync user metadata
      try {
        await supabase.auth.updateUser({
          data: { ...payload },
        });
      } catch (mErr) {
        // Ignore metadata save error
      }

      setProfile(data);
      return data;
    } catch (err) {
      console.error("[AuthContext] updateProfile error:", err);
      throw err;
    }
  };


  // Resend email verification link
  const resendVerificationEmail = async (customEmail = null) => {
    const targetEmail = customEmail || user?.email;
    if (!targetEmail) {
      throw new Error("No email address found to send verification link.");
    }

    const siteUrl = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: targetEmail,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/profile`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Manually refresh profile and session directly against Supabase server
  const refreshProfile = async () => {
    try {
      const { data: { user: latestUser } } = await supabase.auth.getUser();
      if (latestUser) {
        setUser(latestUser);
        const p = await fetchProfile(latestUser.id, latestUser);
        return { user: latestUser, profile: p };
      }
    } catch (err) {
      console.warn("[AuthContext] refreshProfile error:", err);
    }
    return null;
  };

  // isVerified directly reflects the administrator-managed is_verified status on profile
  const isVerified = Boolean(profile?.is_verified);
  const isAdmin = Boolean(profile?.is_admin || user?.user_metadata?.is_admin);


  const value = {
    user,
    profile,
    isAdmin,
    isVerified,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
