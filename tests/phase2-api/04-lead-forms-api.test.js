/**
 * 04 - Public Lead Forms Ingestion API Tests (/api/forms/[type])
 */

export async function runLeadFormsApiTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Public Lead Forms Ingestion API (/api/forms/[type])",
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
    // 1. Contact Inquiry Form (/api/forms/contact)
    const resContact = await fetch(`${baseUrl}/api/forms/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User Automation",
        email: "test.automation@campussutras.com",
        phone: "+91 9876543210",
        subject: "Bootcamp Inquiry Automation",
        message: "This is an automated test inquiry verifying contact form backend pipeline.",
      }),
    });
    const dataContact = await resContact.json().catch(() => ({}));

    assert(
      resContact.status === 200 && dataContact.success === true && Boolean(dataContact.referenceId),
      "POST /api/forms/contact: Successfully ingests contact inquiry with reference ticket ID",
      `Status: ${resContact.status}, ticketId: ${dataContact.referenceId}`
    );

    // 2. Internship Application Form (/api/forms/internship)
    const resIntern = await fetch(`${baseUrl}/api/forms/internship`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Intern Test Candidate",
        email: "intern.test@campussutras.com",
        phone: "+91 9876543211",
        program: "Full Stack Web Development",
        college: "Test Engineering College",
        yearOfStudy: "3rd Year",
        branch: "Computer Science",
      }),
    });
    const dataIntern = await resIntern.json().catch(() => ({}));

    assert(
      resIntern.status === 200 && dataIntern.success === true && Boolean(dataIntern.referenceId),
      "POST /api/forms/internship: Successfully ingests internship application",
      `Status: ${resIntern.status}, refId: ${dataIntern.referenceId}`
    );

    // 3. Corporate Hiring Form (/api/forms/hire)
    const resHire = await fetch(`${baseUrl}/api/forms/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: "TechCorp Global Labs",
        contactName: "Alex Mercer",
        workEmail: "alex@techcorpglobal.com",
        phone: "+91 9876543212",
        targetDomain: "Software & Web Development",
        employmentType: "Full-Time Freshers",
        openingsCount: "3–5 Hires",
        workMode: "Hybrid",
      }),
    });
    const dataHire = await resHire.json().catch(() => ({}));

    assert(
      resHire.status === 200 && dataHire.success === true && Boolean(dataHire.referenceId),
      "POST /api/forms/hire: Successfully ingests corporate hiring requirement",
      `Status: ${resHire.status}, refId: ${dataHire.referenceId}`
    );

    // 4. Course Enrollment Form (/api/forms/course-enroll)
    const resEnroll = await fetch(`${baseUrl}/api/forms/course-enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Enrollment Candidate",
        email: "enroll.test@campussutras.com",
        phone: "+91 9876543213",
        courseId: "full-stack-web-development",
        courseTitle: "Full Stack Web Development Bootcamp",
        collegeOrOrg: "Test University",
        graduationYear: "2026",
        batchPreference: "Weekend Live Batch",
      }),
    });
    const dataEnroll = await resEnroll.json().catch(() => ({}));

    assert(
      resEnroll.status === 200 && dataEnroll.success === true && Boolean(dataEnroll.referenceId),
      "POST /api/forms/course-enroll: Successfully ingests course registration",
      `Status: ${resEnroll.status}, refId: ${dataEnroll.referenceId}`
    );

    // 5. Invalid Endpoint Type Rejection
    const resInvalid = await fetch(`${baseUrl}/api/forms/unsupported-form-type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: "data" }),
    });
    const dataInvalid = await resInvalid.json().catch(() => ({}));

    assert(
      resInvalid.status === 400 && dataInvalid.success === false,
      "POST /api/forms/invalid: Rejects unsupported form endpoint with 400 Bad Request",
      `Status: ${resInvalid.status}`
    );
  } catch (err) {
    assert(false, "Lead Forms API Exception", err.message);
  }

  return results;
}
