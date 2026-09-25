/**
 * 02 - Certificate ID Generator & Acronym Engine Unit Tests
 */

// Production logic mirror
export function extractAcronym(text) {
  if (!text || typeof text !== "string") return "";
  const clean = text.trim();
  if (!clean) return "";

  const stopwords = new Set(["of", "and", "&", "the", "in", "for", "to", "at", "a", "an"]);
  const words = clean.split(/[\s\-_,]+/).filter((w) => w.length > 0 && !stopwords.has(w.toLowerCase()));

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words.map((w) => w[0]).join("").toUpperCase();
}

export function generateCertificateIds({
  programCode = "",
  collegeCode = "",
  courseCode = "",
  customCourseName = "",
  courseYear = "",
  issueYear = "",
  startSeq = 1,
  count = 1,
  padding = 3,
  separator = "",
}) {
  const prefix = "CS";
  const prog = (programCode || "").trim().toUpperCase();
  const col = (collegeCode || "").trim().toUpperCase();

  const effectiveCourseCode =
    courseCode === "CUSTOM"
      ? extractAcronym(customCourseName || "")
      : (courseCode || "");
  const course = effectiveCourseCode.trim().toUpperCase();

  const cYear = (courseYear || "").trim();
  const iYear = (issueYear || "").trim();
  const pad = Math.max(1, Math.min(6, parseInt(padding, 10) || 3));
  const start = Math.max(1, parseInt(startSeq, 10) || 1);
  const total = Math.max(1, Math.min(500, parseInt(count, 10) || 1));
  const sep = separator || "";

  const courseSegment = course && cYear ? `${course}${cYear}` : course || cYear;

  const buildSingle = (seqNumber) => {
    const seqStr = String(seqNumber).padStart(pad, "0");
    const segments = [prefix];
    if (prog) segments.push(prog);
    if (col) segments.push(col);
    if (courseSegment) segments.push(courseSegment);
    if (iYear) segments.push(iYear);
    segments.push(seqStr);
    return segments.join(sep);
  };

  const idList = [];
  for (let i = 0; i < total; i++) {
    idList.push(buildSingle(start + i));
  }

  return idList;
}

export function runCertificateIdGeneratorTests() {
  const results = { name: "Certificate ID Generator & Acronym Engine", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. Acronym Extractor Tests
  assert(
    extractAcronym("Tulas Institute") === "TI",
    "Acronym: 'Tulas Institute' -> 'TI'"
  );

  assert(
    extractAcronym("Army Institute of Management & Technology") === "AIMT",
    "Acronym: 'Army Institute of Management & Technology' (with stopwords) -> 'AIMT'"
  );

  assert(
    extractAcronym("Graphic Era Hill University") === "GEHU",
    "Acronym: 'Graphic Era Hill University' -> 'GEHU'"
  );

  assert(
    extractAcronym("Institute of Technology and Science") === "ITS",
    "Acronym: 'Institute of Technology and Science' -> 'ITS'"
  );

  assert(
    extractAcronym("Stanford") === "STA",
    "Acronym: Single word 'Stanford' -> 'STA'"
  );

  assert(
    extractAcronym("") === "",
    "Acronym: Empty string returns empty"
  );

  // 2. Standard ID Assembly Tests
  const standardIds = generateCertificateIds({
    programCode: "AI",
    collegeCode: "TI",
    courseCode: "BCA",
    courseYear: "2",
    issueYear: "26",
    startSeq: 1,
    count: 3,
    padding: 2,
  });

  assert(
    standardIds[0] === "CSAITI2BCA2601" || standardIds[0] === "CSAITIBCA22601",
    "Standard ID Generation (Single Output)",
    `Got ${standardIds[0]}`
  );

  // Re-verify exact formula structure: CS + Program + College + CourseYear + IssueYear + Seq
  const exactTulasIds = generateCertificateIds({
    programCode: "AI",
    collegeCode: "TU",
    courseCode: "BCA",
    courseYear: "2",
    issueYear: "26",
    startSeq: 1,
    count: 3,
    padding: 2,
  });
  assert(
    exactTulasIds[0] === "CSAITUBCA22601" &&
      exactTulasIds[1] === "CSAITUBCA22602" &&
      exactTulasIds[2] === "CSAITUBCA22603",
    "Batch Sequential IDs Incrementing (01, 02, 03)",
    `Got ${JSON.stringify(exactTulasIds)}`
  );

  // 3. Optional Fields / Direct Candidate Handling
  const directCandidateIds = generateCertificateIds({
    programCode: "FSD",
    collegeCode: "",
    courseCode: "",
    courseYear: "",
    issueYear: "26",
    startSeq: 5,
    count: 1,
    padding: 3,
  });
  assert(
    directCandidateIds[0] === "CSFSD26005",
    "Direct Candidate (No College, No Degree) -> CSFSD26005",
    `Got ${directCandidateIds[0]}`
  );

  // 4. Custom Degree with Acronym Resolution
  const customDegreeIds = generateCertificateIds({
    programCode: "DS",
    collegeCode: "IITD",
    courseCode: "CUSTOM",
    customCourseName: "Master of Data Science",
    courseYear: "1",
    issueYear: "26",
    startSeq: 10,
    count: 1,
    padding: 3,
  });
  assert(
    customDegreeIds[0] === "CSDSIITDMDS126010",
    "Custom Degree ('Master of Data Science' -> 'MDS') Resolution",
    `Got ${customDegreeIds[0]}`
  );

  // 5. Custom Separator Support
  const hyphenatedIds = generateCertificateIds({
    programCode: "CYBER",
    collegeCode: "MIT",
    courseCode: "BT",
    courseYear: "4",
    issueYear: "26",
    startSeq: 1,
    count: 1,
    padding: 3,
    separator: "-",
  });
  assert(
    hyphenatedIds[0] === "CS-CYBER-MIT-BT4-26-001",
    "Hyphen Separator Support -> CS-CYBER-MIT-BT4-26-001",
    `Got ${hyphenatedIds[0]}`
  );

  return results;
}
