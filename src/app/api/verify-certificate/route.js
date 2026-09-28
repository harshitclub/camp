import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { formatCertificateDate } from "@/lib/certificateUtils";
import { isNA } from "@/lib/validators";
import { memoryCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

/**
 * Core certificate lookup service function querying Supabase PostgreSQL DB
 * with in-memory caching to safeguard the Supabase free plan.
 * 
 * @param {string} rawId - Candidate Certificate ID
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
  const cacheKey = `cert_lookup:${cleanId.toUpperCase()}`;

  // Check in-memory cache first (prevents redundant hits on Supabase)
  const cachedResult = memoryCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

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
      const notFoundResult = {
        found: false,
        message: `No certificate record found matching "${cleanId}". Please check the ID and try again.`,
        status: 404,
      };
      // Cache 404 lookups for 15 seconds to deter brute-force scraping against Supabase
      memoryCache.set(cacheKey, notFoundResult, 15);
      return notFoundResult;
    }

    const formattedIssueDate = certDoc.issue_date || certDoc.created_at
      ? formatCertificateDate(certDoc.issue_date || certDoc.created_at)
      : "Verified Official";

    const formattedCompletionDate = certDoc.completion_date
      ? formatCertificateDate(certDoc.completion_date)
      : null;

    const successResult = {
      found: true,
      data: {
        certificateNumber: certDoc.certificate_number,
        studentName: certDoc.student_name,
        program: certDoc.program,
        collegeName: isNA(certDoc.college_name) ? null : certDoc.college_name,
        collegeId: isNA(certDoc.college_id) ? "N/A" : certDoc.college_id,
        duration: isNA(certDoc.duration) ? "N/A" : certDoc.duration,
        issueDate: formattedIssueDate,
        completionDate: formattedCompletionDate,
        status: certDoc.status || "VERIFIED_AUTHENTIC",
        issuer: "Campussutras Private Limited",
      },
      status: 200,
    };

    // Cache verified certificate for 60 seconds
    memoryCache.set(cacheKey, successResult, 60, ["certificates"]);
    return successResult;
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
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=180",
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
