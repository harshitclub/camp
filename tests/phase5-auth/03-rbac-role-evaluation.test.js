import {
  evaluateAdminStatus,
  getVerificationBadge,
} from "../../src/lib/profileUtils.js";

/**
 * 03 - Role-Based Access Control (RBAC) & Verification Status Unit Tests
 */

export function runRbacRoleEvaluationTests() {
  const results = {
    name: "Role-Based Access Control (RBAC) & Clearance Evaluation",
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

  // 1. Admin Clearance Evaluator
  assert(
    evaluateAdminStatus({ id: "1" }, { is_admin: true }) === true,
    "RBAC: User with profile.is_admin = true has Admin Clearance"
  );
  assert(
    evaluateAdminStatus({ id: "2" }, { is_admin: false, user_type: "Student" }) === false,
    "RBAC: Regular Student account is denied Admin Clearance"
  );
  assert(
    evaluateAdminStatus(null, null) === false,
    "RBAC: Unauthenticated guest is denied Admin Clearance"
  );

  // 2. Student Verification Badge Evaluator
  const verified = getVerificationBadge({ is_verified: true });
  assert(
    verified.status === "VERIFIED_AUTHENTIC" && verified.label === "Verified Authentic Student",
    "Verification Badge: is_verified = true yields 'Verified Authentic Student'"
  );

  const pending = getVerificationBadge({ is_verified: false });
  assert(
    pending.status === "PENDING" && pending.label === "Pending Verification",
    "Verification Badge: is_verified = false yields 'Pending Verification'"
  );

  return results;
}
