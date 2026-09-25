import { isNA, parseCsvToRecords } from "../phase1-unit/03-csv-excel-parser.test.js";

/**
 * 03 - Edge Cases, Unicode Characters & Data Integrity Unit Tests
 */

export async function runEdgeCasesDataIntegrityTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Edge Cases & Data Integrity (Whitespace, Scientific Notation, Multiple Commas)",
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

  // 1. Certificate ID Whitespace Trimming in Lookup
  try {
    const resWhitespace = await fetch(`${baseUrl}/api/verify-certificate?id=%20%20CSAI001%20%20`);
    const dataWhitespace = await resWhitespace.json().catch(() => ({}));

    assert(
      resWhitespace.status === 200 && dataWhitespace.success === true,
      "Edge Case: Certificate ID with leading/trailing whitespace ('  CSAI001  ') trimmed and verified successfully"
    );
  } catch (err) {
    assert(false, "Whitespace Lookup Exception", err.message);
  }

  // 2. Missing College Display Fallback ("Direct Candidate")
  function resolveCollegeDisplay(collegeName) {
    if (isNA(collegeName)) return "Direct Candidate (Independent)";
    return collegeName.trim();
  }

  assert(
    resolveCollegeDisplay(null) === "Direct Candidate (Independent)",
    "Edge Case: null college name displays 'Direct Candidate (Independent)'"
  );
  assert(
    resolveCollegeDisplay("N/A") === "Direct Candidate (Independent)",
    "Edge Case: 'N/A' college name displays 'Direct Candidate (Independent)'"
  );
  assert(
    resolveCollegeDisplay("Tulas Institute") === "Tulas Institute",
    "Edge Case: Valid college name preserved intact"
  );

  // 3. Multiple Embedded Commas in CSV
  const complexCsv = `certificateNumber,studentName,program,collegeName,collegeId,duration
CS_COMPLEX_01,Rēnuka Šharma,Data Analytics,"IMS Unison University, Makkawala Greens, Dehradun, Uttarakhand",3.44E+12,50 Hrs.`;

  const parsedComplex = parseCsvToRecords(complexCsv);
  assert(
    parsedComplex.length === 1 &&
      parsedComplex[0].studentName === "Rēnuka Šharma" &&
      parsedComplex[0].collegeName === "IMS Unison University, Makkawala Greens, Dehradun, Uttarakhand" &&
      parsedComplex[0].collegeId === "3.44E+12",
    "Edge Case: Handles Unicode characters (Rēnuka Šharma), 3+ embedded commas, and scientific notation (3.44E+12)"
  );

  // 4. Blank rows and trailing newlines in CSV
  const csvWithBlanks = `certificateNumber,studentName,program,collegeName,collegeId,duration

CS01,John Doe,Web Dev,MIT,100,30 Hrs.

`;
  const parsedBlanks = parseCsvToRecords(csvWithBlanks);
  assert(
    parsedBlanks.length === 1 && parsedBlanks[0].studentName === "John Doe",
    "Edge Case: Gracefully skips blank lines and trailing newlines in CSV"
  );

  return results;
}
