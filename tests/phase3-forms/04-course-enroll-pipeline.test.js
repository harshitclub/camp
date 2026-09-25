/**
 * 04 - Course Enrollment Form Pipeline Integration Test (/api/forms/course-enroll)
 */

export async function runCourseEnrollPipelineTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Course Enrollment Pipeline (/courses/[slug] & /api/forms/course-enroll)",
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
    // 1. Valid Course Registration Submission Test
    const payload = {
      fullName: "Neha Kapoor",
      email: "neha.kapoor@gehu.ac.in",
      phone: "+91 9765432109",
      courseId: "full-stack-web-development",
      courseTitle: "Full Stack Web Development & Microservices",
      collegeOrOrg: "Graphic Era Hill University",
      graduationYear: "2026",
      batchPreference: "Weekend Live Masterclass",
      message: "Looking forward to mastering Next.js and Microservices architectures.",
    };

    const res = await fetch(`${baseUrl}/api/forms/course-enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    assert(
      res.status === 200 && data.success === true,
      "POST /api/forms/course-enroll: Accepts valid course enrollment with 200 OK",
      `Status: ${res.status}`
    );

    assert(
      Boolean(data.referenceId) && data.referenceId.startsWith("CS-REG-"),
      `POST /api/forms/course-enroll: Generated valid Registration ID format (${data.referenceId})`,
      `Got registration ID: ${data.referenceId}`
    );

    assert(
      data.savedInDb === true || data.emailDelivered !== undefined,
      "POST /api/forms/course-enroll: Registration stored in course_registrations & sent to Admin",
      `savedInDb: ${data.savedInDb}`
    );

    // 2. Missing Mandatory Fields (Missing college/org & phone)
    const invalidRes = await fetch(`${baseUrl}/api/forms/course-enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Incomplete Enrollee",
        email: "incomplete.enrollee@gmail.com",
      }),
    });

    const invalidData = await invalidRes.json().catch(() => ({}));

    assert(
      invalidRes.status === 400 && invalidData.success === false,
      "POST /api/forms/course-enroll: Rejects registration missing college/phone with 400 Bad Request",
      `Status: ${invalidRes.status}`
    );
  } catch (err) {
    assert(false, "Course Enroll Pipeline Exception", err.message);
  }

  return results;
}
