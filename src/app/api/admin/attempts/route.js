import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/attempts
 * Fetches all student assessment attempts across all users
 */
export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("assessment_attempts")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("[Admin Attempts API] Error fetching attempts:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to fetch attempts" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: (data || []).length,
    });
  } catch (error) {
    console.error("[Admin Attempts API GET Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve attempts" },
      { status: 500 }
    );
  }
}
