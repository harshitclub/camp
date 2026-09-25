import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendFormNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/**
 * Supported Form Types
 */
const VALID_FORM_TYPES = ["contact", "internship", "hire", "course-enroll"];

export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const type = resolvedParams?.type;

    if (!type || !VALID_FORM_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, message: `Invalid form endpoint: "${type}"` },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    let insertResult = null;
    let notificationPayload = {};
    let recordIdentifier = "";

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // --------------------------------------------------------------------------
    // 1. CONTACT INQUIRY
    // --------------------------------------------------------------------------
    if (type === "contact") {
      const fullName = (body.fullName || body.full_name || "").trim();
      const email = (body.email || "").trim();
      const phone = (body.phone || "").trim();
      const subject = (body.subject || "Bootcamp Admission").trim();
      const message = (body.message || "").trim();
      const ticketId = body.ticketId || body.ticket_id || `CS-INQ-${Date.now().toString().slice(-6)}`;

      if (!fullName || !email || !phone || !message) {
        return NextResponse.json(
          { success: false, message: "Missing required contact fields (Name, Email, Phone, Message)." },
          { status: 400 }
        );
      }

      const rowData = {
        ticket_id: ticketId,
        full_name: fullName,
        email,
        phone,
        subject,
        message,
        status: "new",
        created_at: new Date().toISOString(),
      };

      recordIdentifier = ticketId;
      notificationPayload = { ...rowData, timestamp };

      // Attempt Supabase insert
      try {
        const { error } = await supabase
          .from("contact_inquiries")
          .insert(rowData);

        if (error) {
          console.warn("[Forms API] Supabase contact_inquiries insert notice:", error.message);
        } else {
          insertResult = true;
        }
      } catch (dbErr) {
        console.warn("[Forms API] Supabase contact db error:", dbErr.message);
      }
    }

    // --------------------------------------------------------------------------
    // 2. INTERNSHIP APPLICATION
    // --------------------------------------------------------------------------
    else if (type === "internship") {
      const fullName = (body.fullName || body.full_name || "").trim();
      const email = (body.email || "").trim();
      const phone = (body.phone || "").trim();
      const program = (body.program || "").trim();
      const college = (body.college || "").trim();
      const yearOfStudy = (body.yearOfStudy || body.year_of_study || "").trim();
      const branch = (body.branch || "").trim();
      const applicationId = body.applicationId || body.application_id || `CS-INT-${Date.now().toString().slice(-6)}`;

      if (!fullName || !email || !phone || !program || !college) {
        return NextResponse.json(
          { success: false, message: "Missing required internship fields (Name, Email, Phone, Program, College)." },
          { status: 400 }
        );
      }

      const rowData = {
        application_id: applicationId,
        full_name: fullName,
        email,
        phone,
        program,
        college,
        year_of_study: yearOfStudy,
        branch,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      recordIdentifier = applicationId;
      notificationPayload = { ...rowData, timestamp };

      // Attempt Supabase insert
      try {
        const { error } = await supabase
          .from("internship_applications")
          .insert(rowData);

        if (error) {
          console.warn("[Forms API] Supabase internship_applications insert notice:", error.message);
        } else {
          insertResult = true;
        }
      } catch (dbErr) {
        console.warn("[Forms API] Supabase internship db error:", dbErr.message);
      }
    }

    // --------------------------------------------------------------------------
    // 3. CORPORATE HIRING INQUIRY
    // --------------------------------------------------------------------------
    else if (type === "hire") {
      const companyName = (body.companyName || body.company_name || "").trim();
      const contactName = (body.contactName || body.contact_name || "").trim();
      const workEmail = (body.workEmail || body.work_email || "").trim();
      const phone = (body.phone || "").trim();
      const companyWebsite = (body.companyWebsite || body.company_website || "").trim();
      const targetDomain = (body.targetDomain || body.target_domain || "").trim();
      const employmentType = (body.employmentType || body.employment_type || "").trim();
      const openingsCount = (body.openingsCount || body.openings_count || "").trim();
      const workMode = (body.workMode || body.work_mode || "").trim();
      const jobLocation = (body.jobLocation || body.job_location || "").trim();
      const compensationRange = (body.compensationRange || body.compensation_range || "").trim();
      const jobDescription = (body.jobDescription || body.job_description || "").trim();
      const inquiryId = body.inquiryId || body.inquiry_id || `CS-HIRE-${Date.now().toString().slice(-6)}`;

      if (!companyName || !contactName || !workEmail || !phone) {
        return NextResponse.json(
          { success: false, message: "Missing required hiring fields (Company, Contact Name, Email, Phone)." },
          { status: 400 }
        );
      }

      const rowData = {
        inquiry_id: inquiryId,
        company_name: companyName,
        contact_name: contactName,
        work_email: workEmail,
        phone,
        company_website: companyWebsite,
        target_domain: targetDomain,
        employment_type: employmentType,
        openings_count: openingsCount,
        work_mode: workMode,
        job_location: jobLocation,
        compensation_range: compensationRange,
        job_description: jobDescription,
        status: "new",
        created_at: new Date().toISOString(),
      };

      recordIdentifier = inquiryId;
      notificationPayload = { ...rowData, timestamp };

      // Attempt Supabase insert
      try {
        const { error } = await supabase
          .from("hiring_inquiries")
          .insert(rowData);

        if (error) {
          console.warn("[Forms API] Supabase hiring_inquiries insert notice:", error.message);
        } else {
          insertResult = true;
        }
      } catch (dbErr) {
        console.warn("[Forms API] Supabase hiring db error:", dbErr.message);
      }
    }

    // --------------------------------------------------------------------------
    // 4. COURSE REGISTRATION
    // --------------------------------------------------------------------------
    else if (type === "course-enroll") {
      const fullName = (body.fullName || body.full_name || "").trim();
      const email = (body.email || "").trim();
      const phone = (body.phone || "").trim();
      const courseId = (body.courseId || body.course_id || "bootcamp").trim();
      const courseTitle = (body.courseTitle || body.course_title || "Campussutras Bootcamp").trim();
      const collegeOrOrg = (body.collegeOrOrg || body.college_or_org || "").trim();
      const graduationYear = (body.graduationYear || body.graduation_year || "").trim();
      const batchPreference = (body.batchPreference || body.batch_preference || "").trim();
      const message = (body.message || "").trim();
      const registrationId = body.registrationId || body.registration_id || `CS-REG-${Date.now().toString().slice(-6)}`;

      if (!fullName || !email || !phone || !collegeOrOrg) {
        return NextResponse.json(
          { success: false, message: "Missing required registration fields (Name, Email, Phone, College/Organization)." },
          { status: 400 }
        );
      }

      const rowData = {
        registration_id: registrationId,
        full_name: fullName,
        email,
        phone,
        course_id: courseId,
        course_title: courseTitle,
        college_or_org: collegeOrOrg,
        graduation_year: graduationYear,
        batch_preference: batchPreference,
        message,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      recordIdentifier = registrationId;
      notificationPayload = { ...rowData, timestamp };

      // Attempt Supabase insert
      try {
        const { error } = await supabase
          .from("course_registrations")
          .insert(rowData);

        if (error) {
          console.warn("[Forms API] Supabase course_registrations insert notice:", error.message);
        } else {
          insertResult = true;
        }
      } catch (dbErr) {
        console.warn("[Forms API] Supabase course_registrations db error:", dbErr.message);
      }
    }

    // --------------------------------------------------------------------------
    // 5. DISPATCH EMAIL TO ADMIN INBOX VIA NODEMAILER
    // --------------------------------------------------------------------------
    let adminEmailSent = false;

    try {
      const adminResult = await sendFormNotification({
        type,
        data: notificationPayload,
      });
      adminEmailSent = Boolean(adminResult?.success);
    } catch (mailError) {
      console.error("[Forms API] Admin notification email dispatch error:", mailError.message || mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your submission has been received successfully. We will get back to you within 24 hours.",
        referenceId: recordIdentifier,
        emailDelivered: adminEmailSent,
        savedInDb: Boolean(insertResult),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Forms API Fatal Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your submission. Please try again.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
