import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Normalizes certificate payload keys for Supabase PostgreSQL
 */
function normalizeCertificate(input) {
  if (!input || typeof input !== "object") return null;

  const certificateNumber = (input.certificateNumber || input.certificate_number || "").toString().trim();
  const studentName = (input.studentName || input.student_name || "").toString().trim();
  const program = (input.program || "").toString().trim();
  const collegeName = (input.collegeName || input.college_name || "").toString().trim();
  const collegeId = input.collegeId !== undefined && input.collegeId !== null
    ? String(input.collegeId).trim()
    : input.college_id !== undefined && input.college_id !== null
    ? String(input.college_id).trim()
    : null;
  const duration = (input.duration || "").toString().trim() || null;
  const status = (input.status || "VERIFIED_AUTHENTIC").toString().trim();
  const issueDate = input.issueDate || input.issue_date || new Date().toISOString();
  const completionDate = input.completionDate || input.completion_date || null;

  if (!certificateNumber || !studentName || !program) {
    return null;
  }

  return {
    certificate_number: certificateNumber,
    student_name: studentName,
    program,
    college_name: collegeName || null,
    college_id: collegeId,
    duration,
    status,
    issue_date: issueDate,
    completion_date: completionDate,
    updated_at: new Date().toISOString(),
  };
}

// GET /api/admin/certificates - Fetch certificates list from Supabase
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const program = searchParams.get("program") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1000", 10);
    const offset = (page - 1) * limit;

    const supabase = createAdminClient();

    let certQuery = supabase
      .from("certificates")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (query.trim()) {
      const q = query.trim();
      certQuery = certQuery.or(
        `certificate_number.ilike.%${q}%,student_name.ilike.%${q}%,college_name.ilike.%${q}%,program.ilike.%${q}%`
      );
    }

    if (program.trim() && program !== "all") {
      certQuery = certQuery.ilike("program", `%${program.trim()}%`);
    }

    certQuery = certQuery.range(offset, offset + limit - 1);

    const { data, count, error } = await certQuery;

    if (error) {
      console.error("[API ERROR] Supabase certificates fetch error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to fetch certificates" },
        { status: 500 }
      );
    }

    const mappedData = (data || []).map((item) => ({
      id: item.id,
      certificateNumber: item.certificate_number,
      studentName: item.student_name,
      collegeId: item.college_id,
      program: item.program,
      duration: item.duration,
      collegeName: item.college_name,
      issueDate: item.issue_date,
      completionDate: item.completion_date,
      status: item.status || "VERIFIED_AUTHENTIC",
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return NextResponse.json({
      success: true,
      data: mappedData,
      count: count ?? mappedData.length,
      source: "supabase",
    });
  } catch (error) {
    console.error("[API ERROR] admin/certificates GET:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST /api/admin/certificates - Add single certificate OR Bulk upload
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supabase = createAdminClient();

    // Check if bulk upload
    if (Array.isArray(body.certificates) || Array.isArray(body)) {
      const rawList = Array.isArray(body.certificates) ? body.certificates : body;
      const validRecords = [];
      const errors = [];

      rawList.forEach((item, idx) => {
        const normalized = normalizeCertificate(item);
        if (normalized) {
          validRecords.push(normalized);
        } else {
          errors.push(`Row ${idx + 1}: Missing studentName, certificateNumber, or program.`);
        }
      });

      if (validRecords.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "No valid certificate records found in bulk payload.",
            errors,
          },
          { status: 400 }
        );
      }

      // Upsert in chunks of 50
      const BATCH_SIZE = 50;
      let insertedCount = 0;

      for (let i = 0; i < validRecords.length; i += BATCH_SIZE) {
        const chunk = validRecords.slice(i, i + BATCH_SIZE);
        const { data, error } = await supabase
          .from("certificates")
          .upsert(chunk, { onConflict: "certificate_number" })
          .select();

        if (error) {
          throw new Error(`Bulk upsert failed at batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
        }
        insertedCount += data?.length || chunk.length;
      }

      return NextResponse.json({
        success: true,
        message: `Successfully processed and synced ${insertedCount} certificate records to Supabase.`,
        processedCount: insertedCount,
        warningCount: errors.length,
        errors: errors.slice(0, 10),
      });
    }

    // Single certificate upload
    const normalized = normalizeCertificate(body);
    if (!normalized) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid Student Name, Certificate Number, and Program.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("certificates")
      .upsert(normalized, { onConflict: "certificate_number" })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Certificate ${normalized.certificate_number} saved successfully to Supabase.`,
      data: {
        id: data.id,
        certificateNumber: data.certificate_number,
        studentName: data.student_name,
        collegeId: data.college_id,
        program: data.program,
        duration: data.duration,
        collegeName: data.college_name,
        issueDate: data.issue_date,
        completionDate: data.completion_date,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("[API ERROR] admin/certificates POST:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save certificate record" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/certificates - Update existing certificate
export async function PUT(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supabase = createAdminClient();

    const id = body.id;
    const certNumber = body.certificateNumber || body.certificate_number;

    if (!id && !certNumber) {
      return NextResponse.json(
        { success: false, message: "Missing certificate ID or certificate number." },
        { status: 400 }
      );
    }

    const normalized = normalizeCertificate(body);
    if (!normalized) {
      return NextResponse.json(
        { success: false, message: "Invalid certificate update payload." },
        { status: 400 }
      );
    }

    let updateQuery = supabase.from("certificates").update(normalized);

    if (id) {
      updateQuery = updateQuery.eq("id", id);
    } else {
      updateQuery = updateQuery.eq("certificate_number", certNumber);
    }

    const { data, error } = await updateQuery.select().maybeSingle();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Certificate updated successfully.",
      data,
    });
  } catch (error) {
    console.error("[API ERROR] admin/certificates PUT:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update certificate" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/certificates - Delete a certificate
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const certNumber = searchParams.get("certificateNumber") || searchParams.get("certificate_number");

    if (!id && !certNumber) {
      return NextResponse.json(
        { success: false, message: "Missing certificate identifier to delete." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    let deleteQuery = supabase.from("certificates").delete();

    if (id) {
      deleteQuery = deleteQuery.eq("id", id);
    } else {
      deleteQuery = deleteQuery.eq("certificate_number", certNumber);
    }

    const { error } = await deleteQuery;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Certificate record removed successfully.`,
    });
  } catch (error) {
    console.error("[API ERROR] admin/certificates DELETE:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
