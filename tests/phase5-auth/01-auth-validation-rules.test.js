/**
 * 01 - Authentication & Signup Validation Rules Test Suite
 */

export function runAuthValidationRulesTests() {
  const results = {
    name: "Authentication & Signup Validation Rules",
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

  // 1. Signup Form Payload Validator
  function validateSignupPayload({ fullName, email, password, confirmPassword, userType }) {
    const errors = {};
    if (!fullName || !fullName.trim()) errors.fullName = "Full name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Valid email is required";
    if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!userType) errors.userType = "User type is required";
    return { valid: Object.keys(errors).length === 0, errors };
  }

  const validSignup = validateSignupPayload({
    fullName: "Harshit Kumar",
    email: "harshit@campussutras.com",
    password: "StrongPassword123",
    confirmPassword: "StrongPassword123",
    userType: "Student",
  });
  assert(validSignup.valid === true, "Signup Validator: Valid registration payload passes");

  const mismatchPassword = validateSignupPayload({
    fullName: "Harshit Kumar",
    email: "harshit@campussutras.com",
    password: "Password123",
    confirmPassword: "DifferentPassword456",
    userType: "Student",
  });
  assert(
    mismatchPassword.valid === false && Boolean(mismatchPassword.errors.confirmPassword),
    "Signup Validator: Rejects non-matching confirm password"
  );

  const shortPassword = validateSignupPayload({
    fullName: "Harshit Kumar",
    email: "harshit@campussutras.com",
    password: "123",
    confirmPassword: "123",
    userType: "Student",
  });
  assert(
    shortPassword.valid === false && Boolean(shortPassword.errors.password),
    "Signup Validator: Rejects password shorter than 6 characters"
  );

  // 2. User Metadata Construction for Supabase
  function buildSupabaseUserMetadata({ fullName, userType, collegeName, company, course, phone }) {
    return {
      full_name: fullName.trim(),
      user_type: userType || "Student",
      college_name: collegeName ? collegeName.trim() : null,
      company: company ? company.trim() : null,
      course: course ? course.trim() : null,
      phone: phone ? phone.trim() : null,
      is_admin: false,
      is_verified: false,
    };
  }

  const studentMeta = buildSupabaseUserMetadata({
    fullName: "Aryan Singh",
    userType: "Student",
    collegeName: "Tulas Institute",
    course: "BCA 3rd Year",
    phone: "9876543210",
  });

  assert(
    studentMeta.full_name === "Aryan Singh" &&
      studentMeta.user_type === "Student" &&
      studentMeta.college_name === "Tulas Institute" &&
      studentMeta.is_admin === false,
    "Metadata Builder: Correctly structures student profile metadata"
  );

  const employeeMeta = buildSupabaseUserMetadata({
    fullName: "Vikram Malhotra",
    userType: "Working Professional",
    company: "Tata Consultancy Services",
    course: "B.Tech CSE Passout",
    phone: "9811223344",
  });

  assert(
    employeeMeta.full_name === "Vikram Malhotra" &&
      employeeMeta.user_type === "Working Professional" &&
      employeeMeta.company === "Tata Consultancy Services",
    "Metadata Builder: Correctly structures working professional profile metadata"
  );

  return results;
}
