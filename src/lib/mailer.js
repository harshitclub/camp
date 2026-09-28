import nodemailer from "nodemailer";

/**
 * Singleton SMTP Transporter for Campussutras Mail Server
 */
let transporter = null;

function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST || "mail.campussutras.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "noreply@campussutras.com";
    const pass = process.env.SMTP_PASS;

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return transporter;
}

/**
 * Escape HTML characters to ensure safe rendering
 */
function escapeHtml(str) {
  if (!str) return "N/A";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Extract first name safely from full name
 */
function getFirstName(fullName) {
  if (!fullName) return "there";
  return fullName.trim().split(" ")[0] || fullName.trim();
}

/**
 * Theme tokens per form category
 * Uses Campussutras primary palette (#002255, #0b57d0, #059669, #d97706, #7c3aed)
 * with strict small radii (3px - 4px) as per design system
 */
const FORM_THEMES = {
  contact: {
    badge: "Contact Desk",
    badgeBg: "#e8f0fe",
    badgeColor: "#0b57d0",
    badgeBorder: "#bfdbfe",
    accentColor: "#0b57d0",
    accentLight: "#f0f5fc",
  },
  internship: {
    badge: "Internship 2026",
    badgeBg: "#d1fae5",
    badgeColor: "#059669",
    badgeBorder: "#a7f3d0",
    accentColor: "#059669",
    accentLight: "#ecfdf5",
  },
  hire: {
    badge: "Corporate Hiring",
    badgeBg: "#fef3c7",
    badgeColor: "#d97706",
    badgeBorder: "#fde68a",
    accentColor: "#d97706",
    accentLight: "#fffbeb",
  },
  "course-enroll": {
    badge: "Bootcamp Cohort",
    badgeBg: "#ede9fe",
    badgeColor: "#7c3aed",
    badgeBorder: "#ddd6fe",
    accentColor: "#7c3aed",
    accentLight: "#f5f3ff",
  },
};

/**
 * Base Email Layout Wrapper
 * Features:
 * - Brand top gradient accent bar (#002255 to #0b57d0)
 * - Strict small border-radius standard (4px card, 3px badges/chips, 4px buttons)
 * - Campussutras color accents (#002255 navy heading, #0b57d0 royal electric blue, #f0f5fc surface)
 * - Fully responsive table structure with 100% email client compatibility
 */
function wrapEmailTemplate({ title, type, badge, contentHtml, previewText = "" }) {
  const theme = FORM_THEMES[type] || FORM_THEMES.contact;
  const badgeLabel = badge || theme.badge;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  ${previewText ? `<div style="display: none; font-size: 1px; color: #f4f6f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${escapeHtml(previewText)}</div>` : ""}

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f9; padding: 32px 14px;">
    <tr>
      <td align="center">
        <!-- Main Card Container (Strict 4px Radius) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 34, 85, 0.05);">
          
          <!-- Top Brand Accent Bar (Campussutras Colors) -->
          <tr>
            <td style="background-color: #002255; background-image: linear-gradient(90deg, #002255 0%, #0b57d0 65%, ${theme.accentColor} 100%); height: 5px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- Top Brand Header -->
          <tr>
            <td style="padding: 22px 28px 18px 28px; border-bottom: 1px solid #edf2f7; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <span style="font-size: 17px; font-weight: 800; letter-spacing: -0.02em; color: #002255; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Campussutras<span style="color: #0b57d0;">.</span>
                    </span>
                    <span style="display: block; font-size: 11px; color: #64748b; margin-top: 1px; font-weight: 500;">Career &amp; Learning Gateway</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 4px 10px; background-color: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 3px; font-size: 11px; font-weight: 700; color: ${theme.badgeColor}; text-transform: uppercase; letter-spacing: 0.04em;">
                      ${escapeHtml(badgeLabel)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content Area -->
          <tr>
            <td style="padding: 28px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding: 20px 28px; background-color: #f8fafc; border-top: 1px solid #edf2f7; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #475569; line-height: 1.5;">
                <strong style="color: #002255;">Campussutras Private Limited</strong> • Transforming Careers &amp; Tech Talent
              </p>
              <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                Have any questions? Reply directly to this email or write to <a href="mailto:harshit@campussutras.com" style="color: #0b57d0; text-decoration: underline; font-weight: 500;">harshit@campussutras.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Key-Value Table Row (Crisp 4px Container with #002255 text & #f0f5fc surface)
 */
function renderTableRow(label, value, isCode = false) {
  return `
    <tr>
      <td style="padding: 10px 14px; border-bottom: 1px solid #edf2f7; background-color: #fbfcfe; color: #475569; font-size: 12px; font-weight: 600; width: 35%; text-transform: uppercase; letter-spacing: 0.03em;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 14px; border-bottom: 1px solid #edf2f7; color: #002255; font-size: 13px; font-weight: 600;">
        ${isCode ? `<code style="background-color: #e8f0fe; border: 1px solid #bfdbfe; color: #0b57d0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; padding: 2px 7px; border-radius: 3px; font-weight: 700;">${escapeHtml(value)}</code>` : escapeHtml(value)}
      </td>
    </tr>
  `;
}

/**
 * 24-Hour SLA Callout Box (Vibrant Campussutras Brand Colors with 4px Radius)
 */
function renderSlaNotice() {
  return `
    <div style="background-color: #f0f5fc; border-left: 4px solid #0b57d0; border-top: 1px solid #dbeafe; border-right: 1px solid #dbeafe; border-bottom: 1px solid #dbeafe; border-radius: 4px; padding: 14px 16px; margin: 20px 0 24px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="24" valign="top" style="padding-top: 2px;">
            <div style="width: 10px; height: 10px; background-color: #0b57d0; border-radius: 50%;"></div>
          </td>
          <td>
            <strong style="font-size: 13px; font-weight: 700; color: #002255; display: block; margin-bottom: 3px;">
              ⚡ Guaranteed Response Time: Within 24 Hours
            </strong>
            <span style="font-size: 12px; color: #334155; line-height: 1.5; display: block;">
              Our team has received your submission and is actively reviewing your details. An advisor will contact you within 24 hours.
            </span>
          </td>
        </tr>
      </table>
    </div>
  `;
}

/**
 * What Happens Next Steps (Crisp, Colorful Numbering)
 */
function renderNextSteps({ type }) {
  let step2Title = "Direct Outreach";
  let step2Desc = "We will connect with you via email or WhatsApp within 24 hours.";

  if (type === "internship") {
    step2Title = "Profile Screening";
    step2Desc = "Our internship coordinator reviews your academic track and project portfolio.";
  } else if (type === "hire") {
    step2Title = "Talent Consultation Call";
    step2Desc = "Our corporate relations manager connects to discuss tailored candidate batches and timelines.";
  } else if (type === "course-enroll") {
    step2Title = "Admissions Counseling";
    step2Desc = "Our course mentor shares syllabus details, batch timings, and onboarding steps.";
  }

  return `
    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #edf2f7;">
      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #002255; display: block; margin-bottom: 12px;">
        What Happens Next?
      </span>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="26" valign="top" style="color: #0b57d0; font-weight: 800; font-size: 13px;">1.</td>
          <td style="padding-bottom: 8px; font-size: 13px; color: #475569; line-height: 1.5;">
            <strong style="color: #002255;">Submission Logged</strong> — Your record is securely saved in our database.
          </td>
        </tr>
        <tr>
          <td width="26" valign="top" style="color: #0b57d0; font-weight: 800; font-size: 13px;">2.</td>
          <td style="padding-bottom: 8px; font-size: 13px; color: #475569; line-height: 1.5;">
            <strong style="color: #002255;">${step2Title}</strong> — ${step2Desc}
          </td>
        </tr>
        <tr>
          <td width="26" valign="top" style="color: #0b57d0; font-weight: 800; font-size: 13px;">3.</td>
          <td style="font-size: 13px; color: #475569; line-height: 1.5;">
            <strong style="color: #002255;">Next Steps &amp; Roadmap</strong> — Receive your onboarding schedule, access credentials, or talent roster.
          </td>
        </tr>
      </table>
    </div>
  `;
}

// ==============================================================================
// 1. ADMIN NOTIFICATION EMAIL DISPATCH (Sent to harshit@campussutras.com)
// ==============================================================================

export async function sendFormNotification({ type, data }) {
  const mailTransporter = getTransporter();
  const recipient = process.env.NOTIFICATION_EMAIL || "harshit@campussutras.com";
  const fromAddress = process.env.SMTP_FROM || `"Campussutras Portal" <${process.env.SMTP_USER || "noreply@campussutras.com"}>`;

  let subject = "";
  let badge = "";
  let title = "";
  let rowsHtml = "";
  let extraBox = "";
  let textFallback = "";

  switch (type) {
    case "contact": {
      const ref = data.ticket_id || data.ticketId;
      const name = data.full_name || data.fullName;
      subject = `Inquiry from ${name} (${ref})`;
      badge = "Contact Desk";
      title = "New Contact Desk Inquiry";

      rowsHtml = `
        ${renderTableRow("Reference ID", ref, true)}
        ${renderTableRow("Full Name", name)}
        ${renderTableRow("Email Address", data.email)}
        ${renderTableRow("Phone Number", data.phone)}
        ${renderTableRow("Subject Domain", data.subject)}
        ${renderTableRow("Submission Time", data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
      `;

      extraBox = `
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 14px 16px; margin-top: 16px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; display: block; margin-bottom: 6px;">
            Submitted Message
          </span>
          <p style="margin: 0; font-size: 13px; color: #002255; line-height: 1.6; white-space: pre-wrap; font-weight: 500;">${escapeHtml(data.message)}</p>
        </div>
      `;

      textFallback = `New Contact Inquiry\nRef: ${ref}\nName: ${name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\nMessage: ${data.message}`;
      break;
    }

    case "internship": {
      const ref = data.application_id || data.applicationId;
      const name = data.full_name || data.fullName;
      subject = `Internship application: ${name} (${data.program})`;
      badge = "Internship";
      title = "New Internship Application";

      rowsHtml = `
        ${renderTableRow("Application ID", ref, true)}
        ${renderTableRow("Applicant Name", name)}
        ${renderTableRow("Email Address", data.email)}
        ${renderTableRow("Phone Number", data.phone)}
        ${renderTableRow("Selected Program", data.program)}
        ${renderTableRow("College / Institute", data.college)}
        ${renderTableRow("Year of Study", data.year_of_study || data.yearOfStudy)}
        ${renderTableRow("Branch / Dept", data.branch || "General")}
        ${renderTableRow("Submission Time", data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
      `;

      textFallback = `New Internship Application\nRef: ${ref}\nName: ${name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProgram: ${data.program}\nCollege: ${data.college}`;
      break;
    }

    case "hire": {
      const ref = data.inquiry_id || data.inquiryId;
      const comp = data.company_name || data.companyName;
      subject = `Hiring requirement: ${comp} (${data.target_domain || data.targetDomain})`;
      badge = "Corporate Hiring";
      title = "New Corporate Talent Lead";

      rowsHtml = `
        ${renderTableRow("Inquiry ID", ref, true)}
        ${renderTableRow("Company Name", comp)}
        ${renderTableRow("Contact Person", data.contact_name || data.contactName)}
        ${renderTableRow("Work Email", data.work_email || data.workEmail)}
        ${renderTableRow("Phone / WhatsApp", data.phone)}
        ${renderTableRow("Target Domain", data.target_domain || data.targetDomain)}
        ${renderTableRow("Employment Type", data.employment_type || data.employmentType)}
        ${renderTableRow("Openings Count", data.openings_count || data.openingsCount || "N/A")}
        ${renderTableRow("Work Mode", data.work_mode || data.workMode || "N/A")}
        ${renderTableRow("Job Location", data.job_location || data.jobLocation || "N/A")}
        ${renderTableRow("CTC / Budget", data.compensation_range || data.compensationRange || "N/A")}
        ${renderTableRow("Company Website", data.company_website || data.companyWebsite || "N/A")}
      `;

      if (data.job_description || data.jobDescription) {
        extraBox = `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 14px 16px; margin-top: 16px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; display: block; margin-bottom: 6px;">
              Role Requirements & Scope
            </span>
            <p style="margin: 0; font-size: 13px; color: #002255; line-height: 1.6; white-space: pre-wrap; font-weight: 500;">${escapeHtml(data.job_description || data.jobDescription)}</p>
          </div>
        `;
      }

      textFallback = `New Hiring Inquiry\nRef: ${ref}\nCompany: ${comp}\nContact: ${data.contact_name || data.contactName}\nEmail: ${data.work_email || data.workEmail}\nPhone: ${data.phone}\nDomain: ${data.target_domain || data.targetDomain}`;
      break;
    }

    case "course-enroll": {
      const ref = data.registration_id || data.registrationId;
      const name = data.full_name || data.fullName;
      const course = data.course_title || data.courseTitle;
      subject = `Course registration: ${name} (${course})`;
      badge = "Bootcamp";
      title = "New Bootcamp Registration";

      rowsHtml = `
        ${renderTableRow("Registration ID", ref, true)}
        ${renderTableRow("Student Name", name)}
        ${renderTableRow("Email Address", data.email)}
        ${renderTableRow("Phone Number", data.phone)}
        ${renderTableRow("Course Track", course)}
        ${renderTableRow("College / Org", data.college_or_org || data.collegeOrOrg)}
        ${renderTableRow("Graduation Year", data.graduation_year || data.graduationYear || "N/A")}
        ${renderTableRow("Batch Slot", data.batch_preference || data.batchPreference || "N/A")}
      `;

      if (data.message) {
        extraBox = `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 14px 16px; margin-top: 16px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; display: block; margin-bottom: 6px;">
              Candidate Career Goals
            </span>
            <p style="margin: 0; font-size: 13px; color: #002255; line-height: 1.6; white-space: pre-wrap; font-weight: 500;">${escapeHtml(data.message)}</p>
          </div>
        `;
      }

      textFallback = `New Course Registration\nRef: ${ref}\nName: ${name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCourse: ${course}`;
      break;
    }

    default:
      throw new Error(`Unsupported notification type: "${type}"`);
  }

  const contentHtml = `
    <h1 style="font-size: 20px; font-weight: 700; color: #002255; letter-spacing: -0.02em; margin: 0 0 6px 0; line-height: 1.3;">
      ${escapeHtml(title)}
    </h1>
    <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0; line-height: 1.5;">
      A new lead has been submitted through the Campussutras website portal.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; background-color: #ffffff;">
      ${rowsHtml}
    </table>

    ${extraBox}

    <div style="margin-top: 24px; text-align: center;">
      <a href="https://campussutras.com/admin/forms" target="_blank" style="display: inline-block; background-color: #0b57d0; color: #ffffff; padding: 11px 22px; border-radius: 4px; font-size: 13px; font-weight: 600; text-decoration: none; box-shadow: 0 2px 6px rgba(11, 87, 208, 0.25);">
        Open in Admin Center &rarr;
      </a>
    </div>
  `;

  const html = wrapEmailTemplate({
    title,
    type,
    badge,
    contentHtml,
    previewText: `New submission received from ${data.full_name || data.contact_name || "Applicant"}.`,
  });

  const mailOptions = {
    from: fromAddress,
    to: recipient,
    subject,
    text: textFallback,
    html,
  };

  const info = await mailTransporter.sendMail(mailOptions);
  console.log(`[Mailer:Admin] Dispatched ${type} lead (${info?.messageId}) to ${recipient}`);
  return { success: true, messageId: info?.messageId };
}

// ==============================================================================
// 2. USER APPLICANT "THANK YOU" CONFIRMATION (Sent to Applicant Email)
// ==============================================================================

export async function sendUserConfirmation({ type, data }) {
  const mailTransporter = getTransporter();
  const applicantEmail = data.email || data.work_email || data.workEmail;

  if (!applicantEmail || !applicantEmail.includes("@")) {
    console.warn(`[Mailer:User] Skipping user confirmation: No valid email provided.`);
    return { success: false, reason: "No recipient email" };
  }

  const fromAddress = process.env.SMTP_FROM || `"Campussutras" <${process.env.SMTP_USER || "noreply@campussutras.com"}>`;
  const name = data.full_name || data.fullName || data.contact_name || data.contactName || "there";
  const firstName = getFirstName(name);

  let subject = "";
  let badge = "";
  let headline = "";
  let introMessage = "";
  let summaryRows = "";
  let textFallback = "";

  switch (type) {
    case "contact": {
      const ref = data.ticket_id || data.ticketId;
      subject = `We received your inquiry, ${firstName} - Campussutras`;
      badge = "Inquiry Logged";
      headline = `Hi ${escapeHtml(firstName)}, we've got your message!`;
      introMessage = `Thank you for contacting Campussutras. We have received your query regarding <strong style="color: #002255;">${escapeHtml(data.subject)}</strong> and our team is already reviewing it.`;

      summaryRows = `
        ${renderTableRow("Reference Ticket", ref, true)}
        ${renderTableRow("Inquiry Domain", data.subject)}
        ${renderTableRow("Submitted Email", data.email)}
      `;

      textFallback = `Hi ${firstName},\n\nThank you for contacting Campussutras! We have received your inquiry (Ref: ${ref}).\nOur response time is within 24 hours. Our team is reviewing your message and will reach out to you shortly.\n\nBest regards,\nCampussutras Team`;
      break;
    }

    case "internship": {
      const ref = data.application_id || data.applicationId;
      subject = `Application received: Summer Internship (${data.program})`;
      badge = "Application Logged";
      headline = `Application confirmed, ${escapeHtml(firstName)}!`;
      introMessage = `Thank you for applying to the <strong style="color: #059669;">${escapeHtml(data.program)}</strong> internship at Campussutras. Your profile has been logged into our candidate screening system.`;

      summaryRows = `
        ${renderTableRow("Application ID", ref, true)}
        ${renderTableRow("Program Track", data.program)}
        ${renderTableRow("College / Institute", data.college)}
        ${renderTableRow("Year of Study", data.year_of_study || data.yearOfStudy || "N/A")}
      `;

      textFallback = `Hi ${firstName},\n\nThank you for applying for the ${data.program} Internship at Campussutras! (Application ID: ${ref}).\nOur team reviews applications with a 24-hour turnaround time. You will hear back from our coordinator shortly.\n\nBest regards,\nCampussutras Admissions`;
      break;
    }

    case "hire": {
      const ref = data.inquiry_id || data.inquiryId;
      const comp = data.company_name || data.companyName;
      subject = `Thank you for contacting Campussutras - ${comp}`;
      badge = "Corporate Hiring";
      headline = `Thank you for partnering with Campussutras!`;
      introMessage = `We have received your corporate talent requirement for <strong style="color: #d97706;">${escapeHtml(comp)}</strong>. Our corporate partnerships lead is preparing a tailored candidate brief for you.`;

      summaryRows = `
        ${renderTableRow("Inquiry Reference", ref, true)}
        ${renderTableRow("Company Name", comp)}
        ${renderTableRow("Target Domain", data.target_domain || data.targetDomain)}
        ${renderTableRow("Target Openings", data.openings_count || data.openingsCount || "N/A")}
      `;

      textFallback = `Hello ${name},\n\nThank you for reaching out to Campussutras regarding hiring for ${comp}! (Ref: ${ref}).\nOur corporate team will connect with you within 24 hours to coordinate candidate profiles.\n\nBest regards,\nCampussutras Corporate Relations`;
      break;
    }

    case "course-enroll": {
      const ref = data.registration_id || data.registrationId;
      const course = data.course_title || data.courseTitle;
      subject = `Registration received: ${course} Bootcamp`;
      badge = "Registration Logged";
      headline = `Welcome aboard, ${escapeHtml(firstName)}!`;
      introMessage = `We're thrilled to have you join the <strong style="color: #7c3aed;">${escapeHtml(course)}</strong>. Your registration is now with our academic advisory team.`;

      summaryRows = `
        ${renderTableRow("Registration ID", ref, true)}
        ${renderTableRow("Bootcamp Track", course)}
        ${renderTableRow("Batch Slot", data.batch_preference || data.batchPreference || "Standard Cohort")}
        ${renderTableRow("College / Org", data.college_or_org || data.collegeOrOrg)}
      `;

      textFallback = `Hi ${firstName},\n\nThank you for registering for the ${course} Bootcamp at Campussutras! (Registration ID: ${ref}).\nOur team will contact you within 24 hours with your batch schedule and onboarding details.\n\nBest regards,\nCampussutras Academic Cell`;
      break;
    }

    default:
      throw new Error(`Unsupported confirmation type: "${type}"`);
  }

  const contentHtml = `
    <h1 style="font-size: 20px; font-weight: 700; color: #002255; letter-spacing: -0.02em; margin: 0 0 8px 0; line-height: 1.3;">
      ${headline}
    </h1>
    <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0; line-height: 1.6;">
      ${introMessage}
    </p>

    ${renderSlaNotice()}

    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #002255; display: block; margin-bottom: 10px;">
      Submission Summary
    </span>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; background-color: #ffffff; margin-bottom: 16px;">
      ${summaryRows}
    </table>

    ${renderNextSteps({ type })}

    <div style="margin-top: 28px; text-align: center;">
      <a href="https://campussutras.com" target="_blank" style="display: inline-block; background-color: #0b57d0; color: #ffffff; padding: 11px 24px; border-radius: 4px; font-size: 13px; font-weight: 600; text-decoration: none; box-shadow: 0 2px 6px rgba(11, 87, 208, 0.25);">
        Visit Campussutras Portal &rarr;
      </a>
    </div>
  `;

  const html = wrapEmailTemplate({
    title: subject,
    type,
    badge,
    contentHtml,
    previewText: `We have received your submission. Our team will get back to you within 24 hours.`,
  });

  const mailOptions = {
    from: fromAddress,
    to: applicantEmail,
    subject,
    text: textFallback,
    html,
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`[Mailer:User] Dispatched confirmation (${info?.messageId}) to ${applicantEmail}`);
    return { success: true, messageId: info?.messageId };
  } catch (err) {
    console.error(`[Mailer:User] Failed to send confirmation to ${applicantEmail}:`, err.message || err);
    return { success: false, error: err.message };
  }
}
