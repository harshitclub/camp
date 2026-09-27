import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function isUuid(str) {
  if (!str || typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

/**
 * GET /api/admin/users
 * Fetches all registered user profiles from Supabase (bypasses RLS using Service Role)
 */
export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Admin Users API] Error fetching profiles:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to fetch users" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: (data || []).length,
    });
  } catch (error) {
    console.error("[Admin Users API GET Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve users" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/users
 * Updates a user profile in Supabase
 */
export async function PATCH(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing user ID." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updateFields,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("[Admin Users API] Error updating profile:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("[Admin Users API PATCH Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users?id={userId}
 * Permanently deletes user from both public.profiles and auth.users, plus associated attempts
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing user ID parameter." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Fetch user to check details and email
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("id, email, is_admin")
      .eq("id", id)
      .maybeSingle();

    // 2. Delete related assessment attempts
    try {
      await supabase.from("assessment_attempts").delete().eq("user_id", id);
      if (userProfile?.email) {
        await supabase.from("assessment_attempts").delete().eq("user_email", userProfile.email);
      }
    } catch (attErr) {
      console.warn("[Admin Users API] Notice deleting user attempts:", attErr);
    }

    // 3. Delete from public.profiles
    const { error: profileDeleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (profileDeleteError) {
      console.error("[Admin Users API] Error deleting profile:", profileDeleteError);
    }

    // 4. Delete from Supabase Auth (auth.users)
    if (isUuid(id)) {
      try {
        await supabase.auth.admin.deleteUser(id);
      } catch (authDeleteErr) {
        console.warn("[Admin Users API] Auth delete notice:", authDeleteErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "User account, profile, and test records deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    console.error("[Admin Users API DELETE Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete user." },
      { status: 500 }
    );
  }
}
