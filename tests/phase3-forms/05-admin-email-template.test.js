/**
 * 05 - Admin Notification Email Template Generator & Security Sanitizer Tests
 */

// Production mailer helper mirrors
function escapeHtml(str) {
  if (!str) return "N/A";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateAdminEmailHtml({ type, data }) {
  const timestamp = data.timestamp || new Date().toLocaleString("en-IN");
  const ticketId = data.ticket_id || data.application_id || data.inquiry_id || data.registration_id || "N/A";
  const name = data.full_name || data.contact_name || "Prospective Lead";

  let detailRows = "";
  if (type === "contact") {
    detailRows = `
      <tr><td><strong>Ticket ID:</strong></td><td>${escapeHtml(ticketId)}</td></tr>
      <tr><td><strong>Full Name:</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><strong>Subject:</strong></td><td>${escapeHtml(data.subject)}</td></tr>
      <tr><td><strong>Message:</strong></td><td>${escapeHtml(data.message)}</td></tr>
    `;
  } else if (type === "hire") {
    detailRows = `
      <tr><td><strong>Company:</strong></td><td>${escapeHtml(data.company_name)}</td></tr>
      <tr><td><strong>Contact:</strong></td><td>${escapeHtml(data.contact_name)}</td></tr>
      <tr><td><strong>Work Email:</strong></td><td>${escapeHtml(data.work_email)}</td></tr>
      <tr><td><strong>Openings:</strong></td><td>${escapeHtml(data.openings_count)}</td></tr>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 4px;">
      <div style="background: #002255; color: #ffffff; padding: 16px 20px; font-weight: bold; font-size: 18px;">
        CampusSutras Lead Alert: ${escapeHtml(type.toUpperCase())}
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${detailRows}
          <tr><td><strong>Timestamp:</strong></td><td>${escapeHtml(timestamp)}</td></tr>
        </table>
      </div>
    </div>
  `;
}

export function runAdminEmailTemplateTests() {
  const results = {
    name: "Admin Notification Email Template & HTML Security Sanitizer",
    passed: 0,
    failed: 0,
    tests: [],
  };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. HTML Escaping / XSS Sanitization in Email Payload
  assert(
    escapeHtml("<script>alert('xss')</script>") === "&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;",
    "HTML Sanitizer: Escapes harmful HTML script tags (<script> -> &lt;script&gt;)"
  );

  assert(
    escapeHtml("Tom & Jerry") === "Tom &amp; Jerry",
    "HTML Sanitizer: Escapes ampersand (& -> &amp;)"
  );

  assert(
    escapeHtml('He said "Hello"') === "He said &quot;Hello&quot;",
    "HTML Sanitizer: Escapes double quotes"
  );

  // 2. Admin Contact Email HTML Generation
  const contactHtml = generateAdminEmailHtml({
    type: "contact",
    data: {
      ticket_id: "CS-INQ-889900",
      full_name: "Karan Johar <admin@test.com>",
      email: "karan@test.com",
      phone: "+91 9999988888",
      subject: "AI Bootcamp",
      message: "Please send syllabus <script>",
    },
  });

  assert(
    contactHtml.includes("CS-INQ-889900") &&
      contactHtml.includes("&lt;admin@test.com&gt;") &&
      contactHtml.includes("&lt;script&gt;") &&
      !contactHtml.includes("<script>"),
    "Admin Email Builder: Contact email embeds clean ticket ID & sanitizes user inputs",
    contactHtml
  );

  // 3. Admin Corporate Hire Email HTML Generation
  const hireHtml = generateAdminEmailHtml({
    type: "hire",
    data: {
      inquiry_id: "CS-HIRE-112233",
      company_name: "Google Cloud Partners",
      contact_name: "Sundar P.",
      work_email: "sundar@google.com",
      openings_count: "20 Hires",
    },
  });

  assert(
    hireHtml.includes("Google Cloud Partners") && hireHtml.includes("sundar@google.com"),
    "Admin Email Builder: Corporate hiring dossier embeds company & recruiter info"
  );

  return results;
}
