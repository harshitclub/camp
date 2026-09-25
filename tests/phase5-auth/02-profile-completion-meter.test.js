/**
 * 02 - Profile Completion Meter Unit Tests (/profile)
 */

export function runProfileCompletionMeterTests() {
  const results = {
    name: "Profile Completion Progress Meter (/profile)",
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

  // Production calculation mirror from ProfileContainer.jsx
  function calculateCompletion(user, profile) {
    const fields = [
      Boolean(profile?.full_name || user?.user_metadata?.full_name),
      Boolean(user?.email),
      Boolean(profile?.user_type || user?.user_metadata?.user_type),
      Boolean(profile?.phone || user?.user_metadata?.phone),
      Boolean(profile?.college_name || profile?.company || user?.user_metadata?.college_name || user?.user_metadata?.company),
      Boolean(profile?.course || profile?.degree_branch || user?.user_metadata?.course || user?.user_metadata?.degree_branch),
      Boolean(profile?.github_url || user?.user_metadata?.github_url || profile?.linkedin_url || user?.user_metadata?.linkedin_url),
    ];
    const filledCount = fields.filter(Boolean).length;
    return Math.round((filledCount / fields.length) * 100);
  }

  // 1. 100% Complete Profile
  const fullProfile = calculateCompletion(
    { email: "harshit@campussutras.com" },
    {
      full_name: "Harshit Kumar",
      user_type: "Student",
      phone: "+91 9876543210",
      college_name: "Tulas Institute",
      course: "BCA 2026",
      github_url: "https://github.com/harshit",
      linkedin_url: "https://linkedin.com/in/harshit",
    }
  );
  assert(fullProfile === 100, "Completion Meter: All 7 fields filled evaluates to 100%");

  // 2. Partial Profile (4/7 fields = 57%)
  const partialProfile = calculateCompletion(
    { email: "student@campussutras.com" },
    {
      full_name: "Rohan Verma",
      user_type: "Student",
      phone: "9876543210",
      college_name: null,
      course: null,
      github_url: null,
      linkedin_url: null,
    }
  );
  assert(partialProfile === 57, "Completion Meter: 4/7 fields filled evaluates to 57%");

  // 3. Minimum Registration Profile (3/7 fields = 43%)
  const minProfile = calculateCompletion(
    { email: "newuser@gmail.com" },
    {
      full_name: "New User",
      user_type: "Student",
    }
  );
  assert(minProfile === 43, "Completion Meter: Minimum sign up (3/7 fields) evaluates to 43%");

  // 4. Empty Profile
  const emptyProfile = calculateCompletion(null, null);
  assert(emptyProfile === 0, "Completion Meter: Empty profile evaluates to 0%");

  return results;
}
