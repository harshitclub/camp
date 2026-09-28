/**
 * Production-Grade CSV & Excel Parser Engine
 * 
 * Supports:
 * - RFC 4180 quotation handling (embedded commas, escaped double quotes "")
 * - Windows CRLF and Unix LF newlines
 * - Automatic UTF-8 BOM (\uFEFF) stripping
 * - Flexible column alias resolution (e.g. "Certificate ID", "cert_no", "Roll No")
 * - Direct transformation to normalized certificate records
 */

import { isNA } from "./validators.js";

/**
 * Maps raw header text to normalized schema field
 * @param {string} raw - Raw header cell text
 * @returns {string} Normalized field key
 */
export function mapHeader(raw) {
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

  // 2. College Name / Institute (Check BEFORE studentName to avoid collisions)
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

  // 4. College ID / Roll Number / Enrollment No
  if (
    h === "collegeid" ||
    h === "college_id" ||
    h === "rollnumber" ||
    h === "rollno" ||
    h === "roll_no" ||
    h === "enrollmentno" ||
    h === "studentid" ||
    h === "student_id" ||
    h === "regno" ||
    h === "registrationno"
  ) {
    return "collegeId";
  }

  // 5. Program / Course Track
  if (
    h === "program" ||
    h === "course" ||
    h === "programname" ||
    h === "coursename" ||
    h === "track" ||
    h === "domain" ||
    h === "bootcamp" ||
    h === "training"
  ) {
    return "program";
  }

  // 6. Duration
  if (
    h === "duration" ||
    h === "hours" ||
    h === "totalhours" ||
    h === "period" ||
    h === "courseduration" ||
    h === "durationhours"
  ) {
    return "duration";
  }

  // Secondary substring fallbacks (ordered strictly)
  if (h.includes("cert")) return "certificateNumber";
  if (h.includes("college") || h.includes("inst") || h.includes("univ")) {
    if (h.includes("id") || h.includes("roll")) return "collegeId";
    return "collegeName";
  }
  if (h.includes("roll")) return "collegeId";
  if (h.includes("student") || h.includes("candidate")) return "studentName";
  if (h === "name") return "studentName";
  if (h.includes("prog") || h.includes("track")) return "program";
  if (h.includes("dur") || h.includes("hour")) return "duration";

  return raw.trim();
}

/**
 * Parses raw CSV text into array of string row arrays
 * Handles quotes, commas, CRLF, and BOM.
 * 
 * @param {string} csvText - Raw CSV content
 * @returns {Array<string[]>} Parsed rows
 */
export function parseCsvToRows(csvText) {
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

  return rows;
}

/**
 * Parses raw CSV text into normalized certificate record objects
 * 
 * @param {string} csvText - Raw CSV text
 * @returns {Array<object>} Array of parsed record objects
 */
export function parseCsvToRecords(csvText) {
  const rows = parseCsvToRows(csvText);
  if (rows.length < 2) return [];

  const rawHeaders = rows[0];
  const normalizedHeaders = rawHeaders.map(mapHeader);

  const records = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    // Skip blank lines
    if (!row.some((cell) => cell.length > 0)) continue;

    const record = {};
    for (let c = 0; c < normalizedHeaders.length; c++) {
      const fieldKey = normalizedHeaders[c];
      const cellValue = row[c] !== undefined ? row[c] : "";
      record[fieldKey] = cellValue;
    }

    // Only include rows that have at least one meaningful credential attribute
    if (record.certificateNumber || record.studentName || record.program) {
      records.push({
        certificateNumber: record.certificateNumber ? record.certificateNumber.trim() : "",
        studentName: record.studentName ? record.studentName.trim() : "",
        program: record.program ? record.program.trim() : "",
        collegeName: isNA(record.collegeName) ? null : record.collegeName.trim(),
        collegeId: isNA(record.collegeId) ? null : record.collegeId.trim(),
        duration: isNA(record.duration) ? "50 Hrs." : record.duration.trim(),
      });
    }
  }

  return records;
}
