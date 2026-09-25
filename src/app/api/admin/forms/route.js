import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TABLE_MAP = {
  contact: "contact_inquiries",
  internship: "internship_applications",
  hire: "hiring_inquiries",
  "course-enroll": "course_registrations",
};

/**
 * GET /api/admin/forms?type={contact|internship|hire|course-enroll|all}
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";

    const supabase = await createClient();

    if (type === "all") {
      const [
        { data: contactData, error: cErr },
        { data: internshipData, error: iErr },
        { data: hireData, error: hErr },
        { data: courseData, error: crErr },
      ] = await Promise.all([
        supabase.from(TABLE_MAP.contact).select("*").order("created_at", { ascending: false }),
        supabase.from(TABLE_MAP.internship).select("*").order("created_at", { ascending: false }),
        supabase.from(TABLE_MAP.hire).select("*").order("created_at", { ascending: false }),
        supabase.from(TABLE_MAP["course-enroll"]).select("*").order("created_at", { ascending: false }),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          contact: contactData || [],
          internship: internshipData || [],
          hire: hireData || [],
          courseEnroll: courseData || [],
        },
        counts: {
          contact: (contactData || []).length,
          internship: (internshipData || []).length,
          hire: (hireData || []).length,
          courseEnroll: (courseData || []).length,
          total:
            (contactData || []).length +
            (internshipData || []).length +
            (hireData || []).length +
            (courseData || []).length,
        },
      });
    }

    const tableName = TABLE_MAP[type];
    if (!tableName) {
      return NextResponse.json(
        { success: false, message: `Invalid form type: "${type}"` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(`[Admin Forms API] Error fetching ${tableName}:`, error.message);
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("[Admin Forms API GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve form submissions." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/forms?type={type}&id={id}
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json(
        { success: false, message: "Both 'type' and 'id' parameters are required." },
        { status: 400 }
      );
    }

    const tableName = TABLE_MAP[type];
    if (!tableName) {
      return NextResponse.json(
        { success: false, message: `Invalid form type: "${type}"` },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`[Admin Forms API] Error deleting from ${tableName}:`, error.message);
      return NextResponse.json(
        { success: false, message: `Failed to delete record: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully.",
      deletedId: id,
      type,
    });
  } catch (error) {
    console.error("[Admin Forms API DELETE Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error deleting submission." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/forms { type, id, status }
 */
export async function PATCH(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { type, id, status } = body;

    if (!type || !id || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: type, id, status." },
        { status: 400 }
      );
    }

    const tableName = TABLE_MAP[type];
    if (!tableName) {
      return NextResponse.json(
        { success: false, message: `Invalid form type: "${type}"` },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from(tableName)
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`[Admin Forms API] Error updating ${tableName}:`, error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully.",
      data: data?.[0] || { id, status },
      id,
      status,
    });
  } catch (error) {
    console.error("[Admin Forms API PATCH Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error updating status." },
      { status: 500 }
    );
  }
}
