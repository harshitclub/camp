/**
 * 02 - Admin Certificates CRUD & Bulk Upload API Tests (/api/admin/certificates)
 */

export async function runAdminCertificatesApiTests(baseUrl = "http://localhost:3000") {
  const results = { name: "Admin Certificate Registry API (/api/admin/certificates)", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  const TEST_CERT_ID = "TEST_PHASE2_CERT_001";
  const TEST_BATCH_1 = "TEST_PHASE2_BATCH_001";
  const TEST_BATCH_2 = "TEST_PHASE2_BATCH_002";

  try {
    // 1. GET /api/admin/certificates (Fetch list & counts)
    const resGet = await fetch(`${baseUrl}/api/admin/certificates?limit=10`);
    const dataGet = await resGet.json().catch(() => ({}));

    assert(
      resGet.status === 200 && dataGet.success === true && Array.isArray(dataGet.data),
      "GET /api/admin/certificates: Returns 200 OK and array of certificates",
      `Status: ${resGet.status}, count: ${dataGet.count}`
    );

    // 2. Search filtering (?q=Harshit)
    const resSearch = await fetch(`${baseUrl}/api/admin/certificates?q=Harshit`);
    const dataSearch = await resSearch.json().catch(() => ({}));

    assert(
      resSearch.status === 200 &&
        dataSearch.success === true &&
        dataSearch.data.some((c) => c.studentName?.toLowerCase().includes("harshit")),
      "GET /api/admin/certificates?q=Harshit: Search query correctly filters records",
      `Found records: ${dataSearch.data?.length}`
    );

    // 3. POST Single Certificate (Create test certificate)
    const resCreate = await fetch(`${baseUrl}/api/admin/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificateNumber: TEST_CERT_ID,
        studentName: "Test Candidate Automation",
        program: "Automation Testing Bootcamp",
        collegeName: "Test Institute of Technology",
        collegeId: "TEST-9988",
        duration: "40 Hrs.",
        status: "VERIFIED_AUTHENTIC",
      }),
    });
    const dataCreate = await resCreate.json().catch(() => ({}));

    assert(
      resCreate.status === 200 && dataCreate.success === true,
      "POST /api/admin/certificates (Single): Upserts new certificate successfully",
      `Status: ${resCreate.status}, message: ${dataCreate.message}`
    );

    // 4. PUT Update Certificate (Update studentName)
    const resUpdate = await fetch(`${baseUrl}/api/admin/certificates`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificateNumber: TEST_CERT_ID,
        studentName: "Test Candidate Automation (Updated)",
        program: "Automation Testing Bootcamp",
        collegeName: "Test Institute of Technology",
        collegeId: "TEST-9988",
        duration: "45 Hrs.",
        status: "VERIFIED_AUTHENTIC",
      }),
    });
    const dataUpdate = await resUpdate.json().catch(() => ({}));

    assert(
      resUpdate.status === 200 && dataUpdate.success === true,
      "PUT /api/admin/certificates: Successfully updates existing certificate record",
      `Status: ${resUpdate.status}, message: ${dataUpdate.message}`
    );

    // 5. POST Bulk Upload in Batches
    const resBulk = await fetch(`${baseUrl}/api/admin/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificates: [
          {
            certificateNumber: TEST_BATCH_1,
            studentName: "Batch Student One",
            program: "Data Science Track",
            collegeName: "Test University",
            collegeId: "B-01",
            duration: "30 Hrs.",
          },
          {
            certificateNumber: TEST_BATCH_2,
            studentName: "Batch Student Two",
            program: "Cloud DevOps Track",
            collegeName: "Test University",
            collegeId: "B-02",
            duration: "30 Hrs.",
          },
        ],
      }),
    });
    const dataBulk = await resBulk.json().catch(() => ({}));

    assert(
      resBulk.status === 200 && dataBulk.success === true && dataBulk.processedCount === 2,
      "POST /api/admin/certificates (Bulk): Batch upsert handles multiple records seamlessly",
      `Status: ${resBulk.status}, processed: ${dataBulk.processedCount}`
    );

    // 6. Validation: Reject invalid single payload (missing program/student)
    const resInvalid = await fetch(`${baseUrl}/api/admin/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificateNumber: "INVALID_CERT",
        // missing studentName & program
      }),
    });
    const dataInvalid = await resInvalid.json().catch(() => ({}));

    assert(
      resInvalid.status === 400 && dataInvalid.success === false,
      "POST /api/admin/certificates: Rejects incomplete payload with 400 Bad Request",
      `Status: ${resInvalid.status}`
    );

    // 7. Cleanup (DELETE temporary test records from Supabase)
    const [del1, del2, del3] = await Promise.all([
      fetch(`${baseUrl}/api/admin/certificates?certificateNumber=${TEST_CERT_ID}`, { method: "DELETE" }),
      fetch(`${baseUrl}/api/admin/certificates?certificateNumber=${TEST_BATCH_1}`, { method: "DELETE" }),
      fetch(`${baseUrl}/api/admin/certificates?certificateNumber=${TEST_BATCH_2}`, { method: "DELETE" }),
    ]);

    const delData1 = await del1.json().catch(() => ({}));
    assert(
      del1.status === 200 && delData1.success === true,
      "DELETE /api/admin/certificates: Cleans up test records from database (Zero DB Clutter)",
      `Status: ${del1.status}`
    );
  } catch (err) {
    assert(false, "Admin Certificates API Exception", err.message);
  }

  return results;
}
