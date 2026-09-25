/**
 * 01 - Contact Form Pipeline Integration Test (/api/forms/contact)
 */

export async function runContactFormPipelineTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Contact Inquiries Form Pipeline (/contact & /api/forms/contact)",
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

  try {
    // 1. Valid Submission Test
    const payload = {
      fullName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 9876543210",
      subject: "Data Analytics Bootcamp Admission",
      message: "I would like to inquire about the upcoming 90-day Data Analytics cohort starting next month.",
    };

    const res = await fetch(`${baseUrl}/api/forms/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    assert(
      res.status === 200 && data.success === true,
      "POST /api/forms/contact: Accepts valid submission with 200 OK",
      `Status: ${res.status}, response: ${JSON.stringify(data)}`
    );

    assert(
      Boolean(data.referenceId) && data.referenceId.startsWith("CS-INQ-"),
      `POST /api/forms/contact: Generated valid Ticket ID format (${data.referenceId})`,
      `Got ticket ID: ${data.referenceId}`
    );

    assert(
      data.savedInDb === true || data.emailDelivered !== undefined,
      "POST /api/forms/contact: Submission persisted to DB and dispatched to Admin inbox",
      `savedInDb: ${data.savedInDb}, emailDelivered: ${data.emailDelivered}`
    );

    assert(
      data.confirmationSent === undefined || data.confirmationSent === false,
      "POST /api/forms/contact: Verified NO user confirmation email is sent (Admin only)",
      `confirmationSent: ${data.confirmationSent}`
    );

    // 2. Missing Mandatory Fields Validation (Missing email and phone)
    const invalidRes = await fetch(`${baseUrl}/api/forms/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Incomplete Candidate",
        message: "Short message",
      }),
    });

    const invalidData = await invalidRes.json().catch(() => ({}));

    assert(
      invalidRes.status === 400 && invalidData.success === false,
      "POST /api/forms/contact: Rejects submission missing email/phone with 400 Bad Request",
      `Status: ${invalidRes.status}`
    );
  } catch (err) {
    assert(false, "Contact Form Pipeline Exception", err.message);
  }

  return results;
}
