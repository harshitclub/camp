import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Helper to validate UUID format
 */
function isUuid(str) {
  if (!str || typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

/**
 * GET /api/admin/assessments?id={idOrSlug}
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrSlug = searchParams.get("id") || searchParams.get("slug");

    const supabase = createAdminClient();

    if (idOrSlug) {
      const cleanId = idOrSlug.trim();
      let query = supabase.from("assessments").select("*, questions(*)");

      if (isUuid(cleanId)) {
        query = query.or(`id.eq.${cleanId},slug.eq.${cleanId}`);
      } else {
        query = query.eq("slug", cleanId);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      }

      if (!data) {
        return NextResponse.json({ success: false, message: "Assessment not found" }, { status: 404 });
      }

      const sortedQuestions = (data.questions || []).sort(
        (a, b) => (a.question_number || 0) - (b.question_number || 0)
      );

      return NextResponse.json({
        success: true,
        data: {
          ...data,
          questions: sortedQuestions,
          total_questions: data.total_questions || sortedQuestions.length,
        },
      });
    }

    // Fetch all assessments
    const { data: allAsms, error } = await supabase
      .from("assessments")
      .select("*, questions(*)")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: allAsms || [],
    });
  } catch (err) {
    console.error("[API ERROR] GET /api/admin/assessments:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/assessments
 * Upserts an assessment and its questions, resolving category UUID
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const {
      title,
      category_id,
      category_slug,
      category_name,
      difficulty = "Intermediate",
      description = "",
      duration_minutes = 15,
      passing_percentage = 60,
      is_published = true,
      tags = [],
      questions = [],
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    const slug = body.slug?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const supabase = createAdminClient();

    // 1. Resolve Category UUID
    let resolvedCategoryUuid = null;
    let resolvedCategoryName = category_name || "General";

    // If category_id is already a valid UUID
    if (isUuid(category_id)) {
      resolvedCategoryUuid = category_id;
    } else {
      // Lookup category by slug or name
      const targetSlug = category_slug || category_id || slug;
      const { data: matchedCat } = await supabase
        .from("categories")
        .select("*")
        .or(`slug.eq.${targetSlug},name.ilike.${resolvedCategoryName}`)
        .maybeSingle();

      if (matchedCat?.id) {
        resolvedCategoryUuid = matchedCat.id;
        resolvedCategoryName = matchedCat.name || resolvedCategoryName;
      } else if (resolvedCategoryName) {
        // Create new category in Supabase
        const newCatSlug = targetSlug || resolvedCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const { data: createdCat } = await supabase
          .from("categories")
          .upsert({
            slug: newCatSlug,
            name: resolvedCategoryName,
            description: `${resolvedCategoryName} Assessments`,
            color_code: "#0b57d0",
          }, { onConflict: "slug" })
          .select()
          .maybeSingle();

        if (createdCat?.id) {
          resolvedCategoryUuid = createdCat.id;
        }
      }
    }

    // 2. Upsert Assessment
    const assessmentPayload = {
      slug,
      title: title.trim(),
      category_id: resolvedCategoryUuid,
      category_name: resolvedCategoryName,
      difficulty,
      tags: Array.isArray(tags) ? tags : [],
      description: description || "",
      total_questions: questions.length || Number(body.total_questions || 15),
      duration_minutes: Number(duration_minutes || 15),
      passing_percentage: Number(passing_percentage || 60),
      is_published: Boolean(is_published),
      updated_at: new Date().toISOString(),
    };

    if (body.id && isUuid(body.id)) {
      assessmentPayload.id = body.id;
    }

    const { data: savedAsm, error: asmErr } = await supabase
      .from("assessments")
      .upsert(assessmentPayload, { onConflict: "slug" })
      .select()
      .maybeSingle();

    if (asmErr) {
      console.error("[API ERROR] Error upserting assessment:", asmErr);
      return NextResponse.json({ success: false, message: asmErr.message }, { status: 400 });
    }

    const assessmentId = savedAsm?.id;

    // 3. Upsert / Sync Questions if assessmentId is valid
    let savedQuestionsCount = 0;
    if (assessmentId && Array.isArray(questions) && questions.length > 0) {
      // Clear existing questions for clean synchronization
      await supabase
        .from("questions")
        .delete()
        .eq("assessment_id", assessmentId);

      const questionsToInsert = questions.map((q, idx) => ({
        assessment_id: assessmentId,
        question_number: idx + 1,
        question_text: q.question_text || "",
        code_snippet: q.code_snippet || null,
        options: Array.isArray(q.options) ? q.options : ["", "", "", ""],
        correct_option_index: Number(q.correct_option_index || 0),
        explanation: q.explanation || "",
        topic: q.topic || null,
      }));

      const { data: insertedQs, error: qErr } = await supabase
        .from("questions")
        .insert(questionsToInsert)
        .select();

      if (qErr) {
        console.warn("[API WARN] Questions insert notice:", qErr.message);
      } else {
        savedQuestionsCount = insertedQs?.length || questionsToInsert.length;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Assessment "${title}" saved successfully.`,
      data: {
        ...savedAsm,
        questionsCount: savedQuestionsCount,
      },
    });
  } catch (err) {
    console.error("[API ERROR] POST /api/admin/assessments fatal:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/assessments?id={idOrSlug}
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrSlug = searchParams.get("id") || searchParams.get("slug");

    if (!idOrSlug) {
      return NextResponse.json({ success: false, message: "Assessment ID or Slug is required" }, { status: 400 });
    }

    const cleanId = idOrSlug.trim();
    const supabase = createAdminClient();

    let query = supabase.from("assessments").delete();
    if (isUuid(cleanId)) {
      query = query.or(`id.eq.${cleanId},slug.eq.${cleanId}`);
    } else {
      query = query.eq("slug", cleanId);
    }

    const { error } = await query;
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Assessment deleted successfully" });
  } catch (err) {
    console.error("[API ERROR] DELETE /api/admin/assessments fatal:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
