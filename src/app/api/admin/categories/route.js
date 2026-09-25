import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/categories
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err) {
    console.error("[API ERROR] GET /api/admin/categories:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/categories
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.name?.trim()) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 });
    }

    const name = body.name.trim();
    const slug = body.slug?.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const description = body.description?.trim() || `${name} Assessments`;
    const color_code = body.color || body.color_code || "#0b57d0";

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug,
          name,
          description,
          color_code,
        },
        { onConflict: "slug" }
      )
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[API ERROR] POST /api/admin/categories:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
