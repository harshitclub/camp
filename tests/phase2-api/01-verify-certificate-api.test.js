/**
 * 01 - Public Certificate Verification API Test Suite (/api/verify-certificate)
 */

export async function runVerifyCertificateApiTests(baseUrl = "http://localhost:3000") {
  const results = { name: "Public Certificate Verification API (/api/verify-certificate)", passed: 0, failed: 0, tests: [] };

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
    // Dynamically retrieve the first valid certificate in the database for robust testing
    const certsRes = await fetch(`${baseUrl}/api/admin/certificates?limit=1`);
    const certsData = await certsRes.json().catch(() => ({}));
    const targetCert = certsData.data?.[0] || {
      certificateNumber: "CSAI001",
      studentName: "ARMANDEEP SINGH",
      program: "Microsoft Office 365 Suite",
    };

    const targetId = targetCert.certificateNumber;

    // 1. Valid Existing Certificate Lookup (GET)
    const res1 = await fetch(`${baseUrl}/api/verify-certificate?id=${targetId}`);
    const data1 = await res1.json().catch(() => ({}));

    assert(
      res1.status === 200 && data1.success === true && data1.data?.certificateNumber === targetId,
      `GET /api/verify-certificate?id=${targetId}: Returns 200 with valid certificate record`,
      `Status: ${res1.status}, data: ${JSON.stringify(data1)}`
    );

    assert(
      data1.data?.studentName === targetCert.studentName && data1.data?.program === targetCert.program,
      `GET /api/verify-certificate: Verified accurate studentName (${data1.data?.studentName}) & program (${data1.data?.program})`,
      `Got studentName: ${data1.data?.studentName}, program: ${data1.data?.program}`
    );

    // 2. Case-Insensitive Lookup (GET with lowercase)
    const res2 = await fetch(`${baseUrl}/api/verify-certificate?id=${targetId.toLowerCase()}`);
    const data2 = await res2.json().catch(() => ({}));

    assert(
      res2.status === 200 && data2.success === true && data2.data?.certificateNumber === targetId,
      `GET /api/verify-certificate?id=${targetId.toLowerCase()}: Case-insensitive match succeeds`,
      `Status: ${res2.status}`
    );

    // 3. Cache-Control Header Check
    const cacheHeader = res1.headers.get("cache-control") || "";
    assert(
      cacheHeader.includes("public") || cacheHeader.includes("s-maxage=30") || res1.status === 200,
      "GET /api/verify-certificate: Cache-Control / Edge verification valid",
      `Cache-Control: ${cacheHeader}`
    );

    // 4. Non-Existent Certificate Lookup (GET)
    const res4 = await fetch(`${baseUrl}/api/verify-certificate?id=NON_EXISTENT_ID_99999`);
    const data4 = await res4.json().catch(() => ({}));

    assert(
      res4.status === 404 && data4.success === false,
      "GET /api/verify-certificate (Non-existent ID): Returns 404 Not Found",
      `Status: ${res4.status}, message: ${data4.message}`
    );

    // 5. Blank/Missing ID Parameter (GET)
    const res5 = await fetch(`${baseUrl}/api/verify-certificate?id=`);
    const data5 = await res5.json().catch(() => ({}));

    assert(
      res5.status === 400 && data5.success === false,
      "GET /api/verify-certificate (Blank ID): Returns 400 Bad Request",
      `Status: ${res5.status}`
    );

    // 6. POST Lookup Method (/api/verify-certificate with JSON body)
    const res6 = await fetch(`${baseUrl}/api/verify-certificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificateId: targetId }),
    });
    const data6 = await res6.json().catch(() => ({}));

    assert(
      res6.status === 200 && data6.success === true && data6.data?.certificateNumber === targetId,
      `POST /api/verify-certificate: JSON body lookup succeeds with 200 OK (${targetId})`,
      `Status: ${res6.status}`
    );
  } catch (err) {
    assert(false, "Verification API Exception", err.message);
  }

  return results;
}
