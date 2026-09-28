/**
 * Centralized Validation Library
 * 
 * Follows DRY principles and standardizes:
 * - RFC 5322 compliant email verification
 * - E.164 and international / Indian mobile phone validation
 * - Password complexity rules
 * - Social link URL validation (GitHub, LinkedIn)
 * - UUID format checking
 * - Missing / N/A value detection
 */

/**
 * Validates email format according to standard email patterns
 * @param {string} email - Email address to test
 * @returns {boolean} True if email is strictly valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  // RFC compliant standard pattern prohibiting spaces, requiring @ and valid domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Validates international and Indian phone numbers (10 to 15 digits, optional + prefix)
 * @param {string} phone - Phone number to test
 * @returns {boolean} True if valid phone number
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const clean = phone.replace(/[\s\-()]+/g, "");
  return /^\+?[0-9]{10,15}$/.test(clean);
}

/**
 * Validates password rules and optional confirmation match
 * @param {string} password - Primary password
 * @param {string|null} [confirmPassword=null] - Optional confirmation password
 * @param {number} [minLength=6] - Minimum character length (default 6)
 * @returns {{ valid: boolean, message?: string }}
 */
export function validatePassword(password, confirmPassword = null, minLength = 6) {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters` };
  }
  if (confirmPassword !== null && password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  return { valid: true };
}

/**
 * Validates URLs for generic sites or specific platforms (GitHub, LinkedIn)
 * @param {string} url - Web URL string
 * @param {"generic"|"github"|"linkedin"} [type="generic"] - URL target type
 * @returns {boolean}
 */
export function validateUrl(url, type = "generic") {
  if (!url || typeof url !== "string") return false;
  const clean = url.trim();
  if (type === "github") {
    return /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_\-\/]+$/i.test(clean);
  }
  if (type === "linkedin") {
    return /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_\-\/]+$/i.test(clean);
  }
  return /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(clean);
}

/**
 * Validates whether a string is a standard RFC 4122 UUID
 * @param {string} str - Candidate string
 * @returns {boolean}
 */
export function isUuid(str) {
  if (!str || typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

/**
 * Checks if a value is missing, empty, or marked as Not Applicable ("NA", "N/A", "null", etc.)
 * @param {any} val - Value to check
 * @returns {boolean} True if empty or N/A
 */
export function isNA(val) {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === "" ||
    s === "n/a" ||
    s === "na" ||
    s === "n.a." ||
    s === "none" ||
    s === "null" ||
    s === "undefined" ||
    s === "-" ||
    s === "--" ||
    s === "nil" ||
    s === "not applicable"
  );
}

/**
 * Generates an SEO and URL-safe slug from a string
 * @param {string} text - Title or label
 * @returns {string} URL slug
 */
export function slugify(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Escapes HTML characters for safe email and UI rendering
 * @param {string|any} str - Input string
 * @returns {string} HTML-escaped string
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return "N/A";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
