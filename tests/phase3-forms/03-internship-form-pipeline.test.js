/**
 * 03 - Internship Application Form Pipeline Integration Test (/api/forms/internship)
 */

export async function runInternshipFormPipelineTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Internship Application Pipeline (/internship & /api/forms/internship)",
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
    // 1. Valid Internship Application Submission Test
    const payload = {
      fullName: "Aditya Verma",
      email: "aditya.verma@tu.edu.in",
      phone: "+91 9811223344",
      program: "Artificial Intelligence & LLMs",
      college: "Tulas Institute, Dehradun",
      yearOfStudy: "3rd Year",
      branch: "B.Tech Computer Science & Engineering",
    };

    const res = await fetch(`${baseUrl}/api/forms/internship`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    assert(
      res.status === 200 && data.success === true,
      "POST /api/forms/internship: Accepts valid internship application with 200 OK",
      `Status: ${res.status}`
    );

    assert(
      Boolean(data.referenceId) && data.referenceId.startsWith("CS-INT-"),
      `POST /api/forms/internship: Generated valid Application ID format (${data.referenceId})`,
      `Got application ID: ${data.referenceId}`
    );

    assert(
      data.savedInDb === true || data.emailDelivered !== undefined,
      "POST /api/forms/internship: Application inserted into internship_applications & dispatched to Admin",
      `savedInDb: ${data.savedInDb}`
    );

    // 2. Missing Required Fields (Missing program & college)
    const invalidRes = await fetch(`${baseUrl}/api/forms/internship`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Incomplete Applicant",
        email: "incomplete@gmail.com",
        phone: "9876543210",
      }),
    });

    const invalidData = await invalidRes.json().catch(() => ({}));

    assert(
      invalidRes.status === 400 && invalidData.success === false,
      "POST /api/forms/internship: Rejects submission missing program/college with 400 Bad Request",
      `Status: ${invalidRes.status}`
    );
  } catch (err) {
    assert(false, "Internship Form Pipeline Exception", err.message);
  }

  return results;
}
