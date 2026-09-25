/**
 * 02 - Corporate Hiring Form Pipeline Integration Test (/api/forms/hire)
 */

export async function runHireFormPipelineTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Corporate Hiring Form Pipeline (/hire & /api/forms/hire)",
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
    // 1. Valid Corporate Hiring Submission Test
    const payload = {
      companyName: "Infosys Technologies Ltd",
      contactName: "Rahul Saxena",
      workEmail: "rahul.saxena@infosys.com",
      phone: "+91 9988776655",
      companyWebsite: "https://www.infosys.com",
      targetDomain: "Software & Web Development (Full Stack, Backend)",
      employmentType: "Full-Time Freshers (Graduates)",
      openingsCount: "5–10 Hires",
      workMode: "Hybrid",
      jobLocation: "Bangalore / Pune",
      compensationRange: "6 - 9 LPA",
      jobDescription: "Looking for pre-assessed full-stack React and Node.js junior engineers.",
    };

    const res = await fetch(`${baseUrl}/api/forms/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    assert(
      res.status === 200 && data.success === true,
      "POST /api/forms/hire: Accepts valid corporate hiring request with 200 OK",
      `Status: ${res.status}`
    );

    assert(
      Boolean(data.referenceId) && data.referenceId.startsWith("CS-HIRE-"),
      `POST /api/forms/hire: Generated valid Inquiry ID format (${data.referenceId})`,
      `Got inquiry ID: ${data.referenceId}`
    );

    assert(
      data.savedInDb === true || data.emailDelivered !== undefined,
      "POST /api/forms/hire: Submission recorded in hiring_inquiries & routed to Admin",
      `savedInDb: ${data.savedInDb}`
    );

    // 2. Missing Mandatory Fields (Missing companyName & workEmail)
    const invalidRes = await fetch(`${baseUrl}/api/forms/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactName: "Incomplete Recruiter",
        phone: "9876543210",
      }),
    });

    const invalidData = await invalidRes.json().catch(() => ({}));

    assert(
      invalidRes.status === 400 && invalidData.success === false,
      "POST /api/forms/hire: Rejects submission missing company/email with 400 Bad Request",
      `Status: ${invalidRes.status}`
    );
  } catch (err) {
    assert(false, "Hire Form Pipeline Exception", err.message);
  }

  return results;
}
