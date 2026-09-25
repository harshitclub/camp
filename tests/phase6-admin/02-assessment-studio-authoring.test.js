/**
 * 02 - Admin Assessment Studio & Question Authoring Validator Unit Tests
 */

export function runAssessmentStudioAuthoringTests() {
  const results = {
    name: "Admin Assessment Studio & Question Authoring (/admin/assessments)",
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

  // 1. Slug Generator Function
  function generateSlug(title) {
    if (!title || typeof title !== "string") return "";
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  assert(
    generateSlug("React Native & Cross-Platform Mobile") === "react-native-cross-platform-mobile",
    "Slug Generator: 'React Native & Cross-Platform Mobile' -> 'react-native-cross-platform-mobile'"
  );
  assert(
    generateSlug("  AI, Machine Learning & LLMs! ") === "ai-machine-learning-llms",
    "Slug Generator: Strips special characters, punctuation, and leading/trailing dashes"
  );

  // 2. Assessment Payload Validator
  function validateAssessmentForm(form) {
    const errors = {};
    if (!form.title || !form.title.trim()) errors.title = "Title is required";
    if (!form.category_name && !form.category_id) errors.category = "Category is required";
    if (!Array.isArray(form.questions) || form.questions.length === 0) {
      errors.questions = "At least one question is required";
    } else {
      form.questions.forEach((q, idx) => {
        if (!q.question_text || !q.question_text.trim()) {
          errors[`q_${idx}_text`] = `Question #${idx + 1} prompt is missing`;
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          errors[`q_${idx}_options`] = `Question #${idx + 1} requires 4 options`;
        }
        if (typeof q.correct_option_index !== "number" || q.correct_option_index < 0 || q.correct_option_index > 3) {
          errors[`q_${idx}_correct`] = `Question #${idx + 1} requires valid correct option index (0-3)`;
        }
      });
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }

  const validTest = validateAssessmentForm({
    title: "Docker & Containerization Mastery",
    category_name: "Cloud & DevOps",
    questions: [
      {
        question_text: "What is the primary difference between a container and a VM?",
        options: [
          "Containers virtualize at the OS kernel level while VMs virtualize hardware",
          "Containers require hypervisor type 1 installations",
          "Containers cannot run Linux binaries",
          "Containers consume more memory than full virtual machines",
        ],
        correct_option_index: 0,
        explanation: "Containers share the host kernel and are lightweight isolated user spaces.",
      },
    ],
  });

  assert(validTest.valid === true, "Studio Validator: Valid assessment authoring form passes");

  const invalidTest = validateAssessmentForm({
    title: "",
    category_name: "Cloud",
    questions: [],
  });

  assert(
    invalidTest.valid === false && Boolean(invalidTest.errors.title) && Boolean(invalidTest.errors.questions),
    "Studio Validator: Rejects empty title and 0 questions"
  );

  return results;
}
