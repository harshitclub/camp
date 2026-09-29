/**
 * CampusSutras Campus Drives & Session Management Utilities
 * Powers QR code generation, URL parameter tracking, and 1-click clean CSV/Excel exports.
 */

export const COMMON_COLLEGES = [
  "Graphic Era University, Dehradun",
  "Graphic Era Hill University, Dehradun",
  "Graphic Era Hill University, Bhimtal",
  "DIT University, Dehradun",
  "UPES, Dehradun",
  "Chandigarh University",
  "Lovely Professional University (LPU)",
  "Amity University",
  "Thapar Institute of Engineering & Technology",
  "Bennett University",
  "SRM Institute of Science and Technology",
  "Vellore Institute of Technology (VIT)",
  "Manipal University, Jaipur",
  "Chitkara University",
  "Galgotias University",
  "Sharda University",
];

export const COMMON_COURSES = [
  "B.Tech - Computer Science & Engineering (CSE)",
  "B.Tech - Information Technology (IT)",
  "B.Tech - Artificial Intelligence & Data Science",
  "B.Tech - Electronics & Communication (ECE)",
  "BCA - Bachelor of Computer Applications",
  "MCA - Master of Computer Applications",
  "B.Sc - Computer Science / IT",
  "M.Tech - Computer Science",
  "Diploma - Computer Science Engineering",
];

/**
 * Generate a clean, short session code from college name
 * e.g., "Graphic Era University" -> "GEU-2026"
 */
export function generateDriveCode(collegeName = "") {
  const currentYear = new Date().getFullYear();
  if (!collegeName.trim()) return `CAMPUS-${currentYear}`;

  const cleanWords = collegeName
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => !["of", "and", "the", "in", "at", "for"].includes(w.toLowerCase()));

  let initials = cleanWords
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 4)
    .join("");

  if (initials.length < 2) {
    initials = collegeName.slice(0, 3).toUpperCase();
  }

  return `${initials}-${currentYear}`;
}

/**
 * Build target drive landing URL with standardized parameters
 * @param {Object} options
 * @param {string} options.origin - Base URL origin (e.g. window.location.origin)
 * @param {string} options.assessmentSlug - Target assessment slug
 * @param {string} options.college - College or University name
 * @param {string} options.course - Course / stream / batch
 * @param {string} options.driveCode - Short session identifier
 * @param {string} options.targetFlow - "signup" (default: direct registration) or "assessment" (direct overview)
 */
export function buildDriveUrl({
  origin = "",
  assessmentSlug = "",
  college = "",
  course = "",
  driveCode = "",
  targetFlow = "signup",
}) {
  const base = origin || (typeof window !== "undefined" ? window.location.origin : "");
  const targetAssessment = assessmentSlug ? `/assessments/${assessmentSlug}` : "/assessments";

  const params = new URLSearchParams();
  if (driveCode) params.set("drive", driveCode.trim());
  if (college) params.set("college", college.trim());
  if (course) params.set("course", course.trim());

  if (targetFlow === "signup") {
    // Auditorium flow: Leads directly to signup with prefilled fields & return redirect
    params.set("redirect", targetAssessment);
    const queryString = params.toString();
    return `${base}/signup${queryString ? `?${queryString}` : ""}`;
  } else {
    // Direct overview flow: Lands directly on the assessment page
    const queryString = params.toString();
    return `${base}${targetAssessment}${queryString ? `?${queryString}` : ""}`;
  }
}

/**
 * Storage key for active session
 */
const DRIVE_STORAGE_KEY = "campussutras_active_drive";

/**
 * Save drive session in client browser storage
 */
export function saveActiveDriveSession(driveData) {
  if (typeof window === "undefined" || !driveData) return;
  try {
    const payload = {
      ...driveData,
      savedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify(payload));
    localStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("[driveUtils] Could not save drive session to storage:", e);
  }
}

/**
 * Retrieve active drive session from client storage
 */
export function getActiveDriveSession() {
  if (typeof window === "undefined") return null;
  try {
    const sessionStr = sessionStorage.getItem(DRIVE_STORAGE_KEY);
    if (sessionStr) return JSON.parse(sessionStr);

    const localStr = localStorage.getItem(DRIVE_STORAGE_KEY);
    if (localStr) return JSON.parse(localStr);
  } catch (e) {
    console.warn("[driveUtils] Could not read drive session:", e);
  }
  return null;
}

/**
 * Clear stored drive session
 */
export function clearActiveDriveSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(DRIVE_STORAGE_KEY);
    localStorage.removeItem(DRIVE_STORAGE_KEY);
  } catch (e) {}
}

/**
 * Export student assessment attempts for a specific college/drive to CSV
 */
export function exportDriveResultsToCSV(attempts = [], metadata = {}) {
  if (!attempts || attempts.length === 0) return false;

  const college = metadata.college || "Campus";
  const course = metadata.course || "All_Courses";
  const sessionCode = metadata.driveCode || "DRIVE";

  // CSV Headers
  const headers = [
    "Sl No",
    "Student Name",
    "Email Address",
    "Phone Number",
    "College / Institution",
    "Course / Branch",
    "Graduation Year",
    "Assessment Title",
    "Score Obtained",
    "Total Questions",
    "Percentage (%)",
    "Result Status",
    "Time Spent (Seconds)",
    "Date & Time Taken",
    "Drive Session Code",
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = attempts.map((att, idx) => {
    // Extract metadata from attempt if saved inside student_answers._campus_session
    const sessionMeta = att.student_answers?._campus_session || {};
    const effectiveCollege = sessionMeta.college || att.profiles?.college || att.college || college;
    const effectiveCourse = sessionMeta.course || att.profiles?.degree || att.course || course;
    const effectiveCode = sessionMeta.code || sessionCode;

    return [
      idx + 1,
      att.user_name || att.profiles?.full_name || "Student",
      att.user_email || att.profiles?.email || "",
      att.profiles?.phone || att.phone || "N/A",
      effectiveCollege,
      effectiveCourse,
      att.profiles?.graduation_year || "N/A",
      att.assessment_title || att.assessment_id || "Technical Assessment",
      att.score ?? 0,
      att.total_questions || att.total_answered || "N/A",
      `${att.percentage ?? 0}%`,
      att.is_passed ? "PASSED" : "NEEDS IMPROVEMENT",
      att.time_spent_seconds || "N/A",
      att.submitted_at ? new Date(att.submitted_at).toLocaleString("en-IN") : "N/A",
      effectiveCode,
    ]
      .map(escapeCSV)
      .join(",");
  });

  // UTF-8 BOM (\uFEFF) ensures Excel opens Hindi, special characters, and formatting cleanly without garbled text
  const csvContent = "\uFEFF" + [headers.map(escapeCSV).join(","), ...rows].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  const safeFilename = `${college.replace(/[^a-zA-Z0-9]/g, "_")}_${sessionCode}_Assessment_Results.csv`;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return true;
}
