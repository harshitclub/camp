/**
 * 03 - CSV & Excel Parser Engine Unit Tests
 */

// Production logic mirror
export function isNA(val) {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === "" ||
    s === "n/a" ||
    s === "na" ||
    s === "null" ||
    s === "none" ||
    s === "undefined" ||
    s === "-" ||
    s === "--" ||
    s === "nil" ||
    s === "not applicable"
  );
}

export function parseCsvToRecords(csvText) {
  if (!csvText || !csvText.trim()) return [];

  const rows = [];
  let currentRow = [];
  let currentField = "";
  let insideQuotes = false;

  // Strip UTF-8 BOM if present
  const text = csvText.replace(/^\uFEFF/, "");

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = "";
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') i++; // CRLF
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];

  const mapHeader = (raw) => {
    if (!raw) return "";
    const h = raw.toLowerCase().trim().replace(/[\s_\-\/\\]+/g, "");

    // 1. Certificate ID / Number
    if (
      h === "certificatenumber" ||
      h === "certificate_number" ||
      h === "certificateid" ||
      h === "certid" ||
      h === "certno" ||
      h === "certnumber" ||
      h === "id"
    ) {
      return "certificateNumber";
    }

    // 2. College Name / Institute (Check BEFORE studentName to avoid collision)
    if (
      h === "collegename" ||
      h === "college_name" ||
      h === "college" ||
      h === "institutename" ||
      h === "institute" ||
      h === "universityname" ||
      h === "university" ||
      h === "schoolname"
    ) {
      return "collegeName";
    }

    // 3. Student Name / Candidate Name / Full Name
    if (
      h === "studentname" ||
      h === "student_name" ||
      h === "name" ||
      h === "student" ||
      h === "candidatename" ||
      h === "candidate" ||
      h === "fullname" ||
      h === "full_name"
    ) {
      return "studentName";
    }

    // 4. College ID / Roll Number
    if (
      h === "collegeid" ||
      h === "college_id" ||
      h === "rollno" ||
      h === "rollnumber" ||
      h === "studentid" ||
      h === "enrollmentno" ||
      h === "regno"
    ) {
      return "collegeId";
    }

    // 5. Program / Course / Domain
    if (
      h === "program" ||
      h === "programname" ||
      h === "course" ||
      h === "coursename" ||
      h === "track" ||
      h === "domain"
    ) {
      return "program";
    }

    // 6. Duration
    if (
      h === "duration" ||
      h === "hours" ||
      h === "period" ||
      h === "time"
    ) {
      return "duration";
    }

    return h;
  };

  const headers = rows[0].map(mapHeader);

  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((h, idx) => {
      if (h) record[h] = row[idx] !== undefined ? row[idx] : "";
    });
    return record;
  });
}

export function runCsvExcelParserTests() {
  const results = { name: "CSV & Excel Parser Engine", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. isNA Missing Value Checker Tests
  assert(isNA(null) === true, "isNA: null is recognized as NA");
  assert(isNA(undefined) === true, "isNA: undefined is recognized as NA");
  assert(isNA("") === true, "isNA: empty string is recognized as NA");
  assert(isNA("   ") === true, "isNA: whitespace string is recognized as NA");
  assert(isNA("N/A") === true, "isNA: 'N/A' is recognized as NA");
  assert(isNA("na") === true, "isNA: 'na' is recognized as NA");
  assert(isNA("null") === true, "isNA: 'null' is recognized as NA");
  assert(isNA("None") === true, "isNA: 'None' is recognized as NA");
  assert(isNA("-") === true, "isNA: '-' is recognized as NA");
  assert(isNA("Tulas Institute") === false, "isNA: Valid college name is NOT NA");
  assert(isNA("Harshit Kumar") === false, "isNA: Valid student name is NOT NA");

  // 2. CSV Parser with Commas Inside Quotes
  const csvWithCommas = `certificateNumber,studentName,program,collegeName,collegeId,duration
CSTUBCA22601,Harshit Kumar,Data Analytics,"Tulas Institute, Dehradun",3.44E+12,30 Hrs.
CSTUBCA22602,Aman Singh,Full Stack Web Development,"Graphic Era Hill University, Bhimtal",GEHU-9871,50 Hrs.`;

  const parsedRecords = parseCsvToRecords(csvWithCommas);

  assert(
    parsedRecords.length === 2,
    "CSV Parser: Parsed 2 rows correctly",
    `Got ${parsedRecords.length}`
  );

  assert(
    parsedRecords[0]?.studentName === "Harshit Kumar",
    "CSV Parser: Student Name correctly parsed (Harshit Kumar)",
    `Got ${parsedRecords[0]?.studentName}`
  );

  assert(
    parsedRecords[0]?.collegeName === "Tulas Institute, Dehradun",
    "CSV Parser: College Name with embedded comma parsed intact",
    `Got ${parsedRecords[0]?.collegeName}`
  );

  assert(
    parsedRecords[0]?.certificateNumber === "CSTUBCA22601",
    "CSV Parser: Certificate Number parsed (CSTUBCA22601)",
    `Got ${parsedRecords[0]?.certificateNumber}`
  );

  assert(
    parsedRecords[0]?.collegeId === "3.44E+12",
    "CSV Parser: Scientific notation ID preserved as string",
    `Got ${parsedRecords[0]?.collegeId}`
  );

  // 3. UTF-8 BOM Windows Excel Header Support
  const csvWithBom = `\uFEFFcertificate_number,candidate_name,course,university,roll_no,hours
CS001,Priya Sharma,AI & ML,IIT Roorkee,101,40 Hrs.`;

  const parsedBom = parseCsvToRecords(csvWithBom);

  assert(
    parsedBom[0]?.certificateNumber === "CS001" &&
      parsedBom[0]?.studentName === "Priya Sharma" &&
      parsedBom[0]?.program === "AI & ML" &&
      parsedBom[0]?.collegeName === "IIT Roorkee" &&
      parsedBom[0]?.collegeId === "101" &&
      parsedBom[0]?.duration === "40 Hrs.",
    "CSV Parser: UTF-8 BOM and Human-friendly Column Aliases (candidate_name, university, roll_no, hours)",
    `Got ${JSON.stringify(parsedBom[0])}`
  );

  // 4. Header Collision Prevention (college_name containing 'name' does NOT match studentName)
  const csvHeaderTest = `college_name,student_name,certificate_number,program
Tulas Institute,Rohan Verma,CS999,Web Dev`;

  const parsedCollision = parseCsvToRecords(csvHeaderTest);
  assert(
    parsedCollision[0]?.collegeName === "Tulas Institute" &&
      parsedCollision[0]?.studentName === "Rohan Verma",
    "CSV Parser: No header collision between 'college_name' and 'student_name'",
    `Got college: "${parsedCollision[0]?.collegeName}", student: "${parsedCollision[0]?.studentName}"`
  );

  return results;
}
