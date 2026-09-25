import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Formats a raw timestamp or ISO string into localized date
 * @param {string|Date|number} rawDate
 * @returns {string|null}
 */
function formatDate(rawDate) {
  if (!rawDate) return null;
  try {
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return String(rawDate);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(rawDate);
  }
}

/**
 * Core certificate lookup service function querying Supabase PostgreSQL DB
 * @param {string} rawId
 * @returns {Promise<{ found: boolean, data?: object, message?: string, status: number }>}
 */
async function lookupCertificate(rawId) {
  if (!rawId || typeof rawId !== "string" || !rawId.trim()) {
    return {
      found: false,
      message: "Please provide a valid Certificate ID.",
      status: 400,
    };
  }

  const cleanId = rawId.trim();

  try {
    const supabase = createAdminClient();

    // Query Supabase PostgreSQL 'certificates' table (case-insensitive exact match)
    const { data: certDoc, error } = await supabase
      .from("certificates")
      .select("*")
      .ilike("certificate_number", cleanId)
      .maybeSingle();

    if (error) {
      console.error("[Supabase Certificate Lookup Error]:", error);
      return {
        found: false,
        message: "Database query failed while verifying certificate.",
        status: 500,
      };
    }

    if (!certDoc) {
      return {
        found: false,
        message: `No certificate record found matching "${cleanId}". Please check the ID and try again.`,
        status: 404,
      };
    }

    const formattedIssueDate = certDoc.issue_date || certDoc.created_at
      ? formatDate(certDoc.issue_date || certDoc.created_at)
      : "Verified Official";

    const formattedCompletionDate = certDoc.completion_date
      ? formatDate(certDoc.completion_date)
      : null;

    return {
      found: true,
      data: {
        certificateNumber: certDoc.certificate_number,
        studentName: certDoc.student_name,
        program: certDoc.program,
        collegeName: certDoc.college_name,
        collegeId: certDoc.college_id || "N/A",
        duration: certDoc.duration || "N/A",
        issueDate: formattedIssueDate,
        completionDate: formattedCompletionDate,
        status: certDoc.status || "VERIFIED_AUTHENTIC",
        issuer: "Campussutras Private Limited",
      },
      status: 200,
    };
  } catch (err) {
    console.error("[Certificate Lookup Exception]:", err);
    return {
      found: false,
      message: "An internal server error occurred while verifying the certificate.",
      status: 500,
    };
  }
}

// GET /api/verify-certificate?id=CSAI001
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await lookupCertificate(id);

    if (!result.found) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { success: true, data: result.data },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[API ERROR] verify-certificate GET:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while verifying the certificate.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/verify-certificate { certificateId: "CSAI001" }
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = body?.certificateId || body?.id;

    const result = await lookupCertificate(id);

    if (!result.found) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR] verify-certificate POST:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while verifying the certificate.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
