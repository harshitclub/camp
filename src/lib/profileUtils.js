/**
 * Profile & Transcripts Utility Library
 * 
 * Provides centralized functions for:
 * - Profile Completion Progress Meter (0% to 100%)
 * - Role-Based Access Control (RBAC) Clearance Evaluation
 * - Verification Status Badge Determination
 * - Transcripts History Formatting and Score Evaluation
 */

/**
 * Calculates profile completion percentage based on the 7 core profile fields
 * 
 * @param {object} user - Supabase Auth User object
 * @param {object} profile - Public Profile row object
 * @returns {number} Integer percentage between 0 and 100
 */
export function calculateCompletion(user, profile) {
  const fields = [
    Boolean(profile?.full_name || user?.user_metadata?.full_name),
    Boolean(user?.email),
    Boolean(profile?.user_type || user?.user_metadata?.user_type),
    Boolean(profile?.phone || user?.user_metadata?.phone),
    Boolean(
      profile?.college_name ||
      profile?.company ||
      user?.user_metadata?.college_name ||
      user?.user_metadata?.company
    ),
    Boolean(
      profile?.course ||
      profile?.degree_branch ||
      user?.user_metadata?.course ||
      user?.user_metadata?.degree_branch
    ),
    Boolean(
      profile?.github_url ||
      user?.user_metadata?.github_url ||
      profile?.linkedin_url ||
      user?.user_metadata?.linkedin_url
    ),
  ];

  const filledCount = fields.filter(Boolean).length;
  return Math.round((filledCount / fields.length) * 100);
}

/**
 * Evaluates whether a user holds administrator clearance
 * 
 * @param {object} user - Supabase Auth User object
 * @param {object} profile - Public Profile row object
 * @returns {boolean} True if admin
 */
export function evaluateAdminStatus(user, profile) {
  if (!user) return false;
  return Boolean(profile?.is_admin === true || user?.user_metadata?.is_admin === true);
}

/**
 * Returns verification badge styling and metadata
 * 
 * @param {object} profile - Profile object
 * @returns {{ status: string, label: string, badgeColor: string, badgeBg: string }}
 */
export function getVerificationBadge(profile) {
  if (profile?.is_verified === true) {
    return {
      status: "VERIFIED_AUTHENTIC",
      label: "Verified Authentic Student",
      badgeColor: "#059669",
      badgeBg: "#ecfdf5",
    };
  }
  return {
    status: "PENDING",
    label: "Pending Verification",
    badgeColor: "#d97706",
    badgeBg: "#fffbeb",
  };
}

/**
 * Formats raw database transcript records into unified scorecard entries
 * 
 * @param {Array<object>} records - Raw assessment attempt records
 * @returns {Array<object>} Formatted, sorted transcript records
 */
export function formatTranscripts(records) {
  if (!Array.isArray(records)) return [];

  return records
    .map((r) => {
      const score = Number(r.score_percentage || r.percentage || 0);
      const isPassed = r.passed !== undefined ? r.passed : (r.is_passed !== undefined ? r.is_passed : score >= 60);
      const dateVal = r.completed_at || r.submitted_at;
      const dateStr = dateVal
        ? new Date(dateVal).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Recent";

      return {
        id: r.id,
        assessmentTitle: r.assessment_title || r.title || "Technical Assessment",
        categoryName: r.category_name || "General",
        scorePercentage: `${score}%`,
        scoreBadge: isPassed ? "PASSED" : "NEEDS_IMPROVEMENT",
        formattedDate: dateStr,
        rawDate: new Date(dateVal || 0).getTime(),
      };
    })
    .sort((a, b) => b.rawDate - a.rawDate);
}
