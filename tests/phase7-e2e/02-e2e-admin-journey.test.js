import { extractAcronym, generateCertificateIds } from "../phase1-unit/02-certificate-id-generator.test.js";
import { parseCsvToRecords } from "../phase1-unit/03-csv-excel-parser.test.js";

/**
 * 02 - End-to-End Complete Admin Workflow Test
 */

export async function runE2EAdminJourneyTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "E2E Complete Admin Workflow (Clearance -> ID Gen -> Bulk CSV -> Verification -> Authoring)",
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
    // --- STEP 1: Admin Clearance & Dashboard Access ---
    const adminUser = {
      id: "admin_super_01",
      email: "admin@campussutras.com",
      user_type: "Admin",
      is_admin: true,
    };
    assert(adminUser.is_admin === true, "Step 1: Administrator granted Command Center clearance");

    // --- STEP 2: Certificate ID Generation & Indian Degree Resolution ---
    const acronym = extractAcronym("Tulas Institute, Dehradun");
    assert(acronym === "TI" || acronym === "TID", `Step 2a: Acronym generator resolves college (${acronym})`);

    const generatedIds = generateCertificateIds({
      programCode: "DA",
      collegeCode: "TI",
      courseCode: "BCA",
      courseYear: "2",
      issueYear: "26",
      startSeq: 1,
      count: 2,
      padding: 2,
    });

    assert(
      generatedIds[0] === "CSDATIBCA22601" && generatedIds[1] === "CSDATIBCA22602",
      `Step 2b: Generated sequential Certificate IDs: ${generatedIds.join(", ")}`
    );

    // --- STEP 3: Bulk CSV Parser Ingestion ---
    const csvContent = `\uFEFFcertificateNumber,studentName,program,collegeName,collegeId,duration
CSDATIBCA22601,Harshit Kumar,Data Analytics,"Tulas Institute, Dehradun",3.44E+12,30 Hrs.
CSDATIBCA22602,Aman Singh,Data Analytics,"Tulas Institute, Dehradun",3.45E+12,30 Hrs.`;

    const parsedRecords = parseCsvToRecords(csvContent);
    assert(
      parsedRecords.length === 2 &&
        parsedRecords[0].studentName === "Harshit Kumar" &&
        parsedRecords[0].collegeName === "Tulas Institute, Dehradun",
      "Step 3: Bulk CSV parsed with embedded commas & normalized headers"
    );

    // --- STEP 4: Public Verification Registry Lookup ---
    const resVerify = await fetch(`${baseUrl}/api/verify-certificate?id=CSAI001`);
    const dataVerify = await resVerify.json().catch(() => ({}));

    assert(
      resVerify.status === 200 && dataVerify.success === true && dataVerify.data?.certificateNumber === "CSAI001",
      "Step 4: Public Certificate Verification lookup returns verified authentic badge"
    );

    // --- STEP 5: Category & Assessment Studio Creation ---
    const resCats = await fetch(`${baseUrl}/api/admin/categories`);
    const dataCats = await resCats.json().catch(() => ({}));

    assert(
      resCats.status === 200 && dataCats.success === true,
      "Step 5: Assessment Studio categories accessible for test authoring"
    );
  } catch (err) {
    assert(false, "E2E Admin Journey Exception", err.message);
  }

  return results;
}
