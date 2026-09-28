/**
 * Certificate Management & Identification Utilities
 * 
 * Provides centralized functions for:
 * - College & Course Acronym Extraction
 * - Sequential & Formatted Certificate ID Generation
 * - Certificate Data Normalization for Supabase DB
 * - Date Formatting with Indian Locale defaults
 */

import { isNA, isUuid } from "./validators.js";

/**
 * Automatically extracts acronym from words (e.g. "Tulas Institute" -> "TI", "Data Science" -> "DS")
 * Ignores common English stopwords.
 * 
 * @param {string} text - College name, course title, etc.
 * @returns {string} Uppercase acronym
 */
export function extractAcronym(text) {
  if (!text || typeof text !== "string") return "";
  const clean = text.trim();
  if (!clean) return "";

  const stopwords = new Set(["of", "and", "&", "the", "in", "for", "to", "at", "a", "an"]);
  const words = clean
    .split(/[\s\-_,]+/)
    .filter((w) => w.length > 0 && !stopwords.has(w.toLowerCase()));

  if (words.length === 0) return "";
  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words.map((w) => w[0]).join("").toUpperCase();
}

/**
 * Generates an array of sequential, formatted Certificate IDs
 * 
 * Format: CS + [ProgramCode] + [CollegeCode] + [CourseSegment] + [IssueYear] + [SequenceNumber]
 * Example: CSDATIBCA22601
 * 
 * @param {object} params
 * @param {string} [params.programCode=""]
 * @param {string} [params.collegeCode=""]
 * @param {string} [params.courseCode=""]
 * @param {string} [params.customCourseName=""]
 * @param {string} [params.courseYear=""]
 * @param {string} [params.issueYear=""]
 * @param {number} [params.startSeq=1]
 * @param {number} [params.count=1]
 * @param {number} [params.padding=3]
 * @param {string} [params.separator=""]
 * @returns {{ idList: string[], preview: string, totalCount: number }}
 */
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
} = {}) {
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

  idList.idList = idList;
  idList.preview = idList[0] || "";
  idList.totalCount = idList.length;

  return idList;
}

/**
 * Normalizes certificate payload keys for Supabase PostgreSQL
 * Ensures clean casing, proper dates, and null handling.
 * 
 * @param {object} input - Raw certificate payload
 * @returns {object|null} Sanitized record or null if required fields missing
 */
export function normalizeCertificate(input) {
  if (!input || typeof input !== "object") return null;

  const certificateNumber = (input.certificateNumber || input.certificate_number || "").toString().trim();
  const studentName = (input.studentName || input.student_name || "").toString().trim();
  const program = (input.program || "").toString().trim();
  const collegeName = (input.collegeName || input.college_name || "").toString().trim();
  const collegeId =
    input.collegeId !== undefined && input.collegeId !== null
      ? String(input.collegeId).trim()
      : input.college_id !== undefined && input.college_id !== null
      ? String(input.college_id).trim()
      : null;
  const duration = (input.duration || "").toString().trim() || null;
  const status = (input.status || "VERIFIED_AUTHENTIC").toString().trim();
  const issueDate = input.issueDate || input.issue_date || new Date().toISOString();
  const completionDate = input.completionDate || input.completion_date || null;

  if (!certificateNumber || !studentName || !program) {
    return null;
  }

  return {
    certificate_number: certificateNumber,
    student_name: studentName,
    program,
    college_name: isNA(collegeName) ? null : collegeName,
    college_id: isNA(collegeId) ? null : collegeId,
    duration: isNA(duration) ? null : duration,
    status,
    issue_date: issueDate,
    completion_date: completionDate,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Formats a raw timestamp or ISO string into localized date
 * @param {string|Date|number} rawDate
 * @param {string} [locale="en-IN"]
 * @returns {string|null}
 */
export function formatCertificateDate(rawDate, locale = "en-IN") {
  if (!rawDate) return null;
  try {
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return String(rawDate);
    return d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(rawDate);
  }
}
