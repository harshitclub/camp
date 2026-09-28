/**
 * 04 - Form & Input Validation Logic Unit Tests
 */

import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUrl,
  isUuid,
  isNA,
} from "../../src/lib/validators.js";

export { validateEmail, validatePhone, validatePassword, validateUrl, isUuid, isNA };

export function runFormValidatorsTests() {
  const results = { name: "Form & Input Validators", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. Email Format Validator Tests
  assert(validateEmail("info@campussutras.com") === true, "Email: 'info@campussutras.com' is valid");
  assert(validateEmail("harshit.kumar+test@gmail.com") === true, "Email: 'harshit.kumar+test@gmail.com' with '+' is valid");
  assert(validateEmail("student@university.ac.in") === true, "Email: 'student@university.ac.in' multi-domain is valid");
  assert(validateEmail("invalid_email") === false, "Email: 'invalid_email' is rejected");
  assert(validateEmail("user@") === false, "Email: 'user@' is rejected");
  assert(validateEmail("@domain.com") === false, "Email: '@domain.com' is rejected");
  assert(validateEmail("user@domain") === false, "Email: 'user@domain' (missing TLD) is rejected");
  assert(validateEmail("user with spaces@gmail.com") === false, "Email: Space in address is rejected");
  assert(validateEmail("") === false, "Email: Empty string is rejected");

  // 2. Phone Number Validator Tests
  assert(validatePhone("9876543210") === true, "Phone: '9876543210' (10-digit) is valid");
  assert(validatePhone("+91 9876543210") === true, "Phone: '+91 9876543210' with country code is valid");
  assert(validatePhone("+91-98765-43210") === true, "Phone: '+91-98765-43210' with hyphens is valid");
  assert(validatePhone("(+1) 555-123-4567") === true, "Phone: '(+1) 555-123-4567' US format is valid");
  assert(validatePhone("12345") === false, "Phone: '12345' (too short) is rejected");
  assert(validatePhone("98765abcde") === false, "Phone: '98765abcde' containing letters is rejected");
  assert(validatePhone("") === false, "Phone: Empty string is rejected");

  // 3. Password Strength & Confirmation Tests
  assert(validatePassword("securePass123").valid === true, "Password: 'securePass123' passes strength rules");
  assert(validatePassword("12345").valid === false, "Password: '12345' (<6 chars) is rejected");
  assert(
    validatePassword("password123", "password123").valid === true,
    "Password Match: Matching confirm password passes"
  );
  assert(
    validatePassword("password123", "differentPass").valid === false,
    "Password Match: Non-matching confirm password fails"
  );

  // 4. Social & Profile URL Validators
  assert(
    validateUrl("https://github.com/harshit", "github") === true,
    "URL: 'https://github.com/harshit' is valid GitHub URL"
  );
  assert(
    validateUrl("https://linkedin.com/in/harshit-kumar", "linkedin") === true,
    "URL: 'https://linkedin.com/in/harshit-kumar' is valid LinkedIn URL"
  );
  assert(
    validateUrl("https://twitter.com/harshit", "github") === false,
    "URL: Non-GitHub domain rejected by GitHub validator"
  );

  return results;
}
