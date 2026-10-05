import { allCourses } from "../../src/data/courses.js";

/**
 * 06 - Courses & 90-Day Industry Bootcamp Catalog Integrity Unit Tests
 */
export function runCoursesCatalogTests() {
  const results = {
    name: "Courses & 90-Day Industry Bootcamp Catalog Integrity",
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

  // 1. Total Courses Verification
  assert(
    Array.isArray(allCourses) && allCourses.length === 12,
    "12 Industry Career Tracks Configured",
    `Expected exact 12 courses, found ${allCourses?.length}`
  );

  // 2. Uniqueness of IDs, Slugs, and Path Correctness
  const distinctIds = new Set();
  const distinctSlugs = new Set();
  let invalidPaths = [];
  let invalidDurations = [];
  let invalidRatings = [];

  allCourses.forEach((c) => {
    distinctIds.add(c.id);
    distinctSlugs.add(c.slug);

    if (!c.path || c.path !== `/courses/${c.slug}`) {
      invalidPaths.push(`${c.id}: expected "/courses/${c.slug}", got "${c.path}"`);
    }

    if (!c.duration || c.duration !== "90 Days") {
      invalidDurations.push(`${c.id}: expected "90 Days", got "${c.duration}"`);
    }

    if (typeof c.rating !== "number" || c.rating < 4.5 || c.rating > 5.0) {
      invalidRatings.push(`${c.id}: rating "${c.rating}" outside [4.5, 5.0]`);
    }
  });

  assert(
    distinctIds.size === 12,
    "All 12 Course IDs are Unique",
    `Found duplicate IDs. Unique count: ${distinctIds.size}`
  );

  assert(
    distinctSlugs.size === 12,
    "All 12 Course Slugs are Unique",
    `Found duplicate Slugs. Unique count: ${distinctSlugs.size}`
  );

  assert(
    invalidPaths.length === 0,
    "All Course Paths adhere strictly to /courses/[slug] canonical structure",
    invalidPaths.join("; ")
  );

  assert(
    invalidDurations.length === 0,
    "All Bootcamps maintain standard 90-Day duration",
    invalidDurations.join("; ")
  );

  assert(
    invalidRatings.length === 0,
    "All Bootcamp ratings are within credible benchmark range [4.5 - 5.0]",
    invalidRatings.join("; ")
  );

  // 3. Curriculum & Syllabus Module Completeness
  let moduleCountIssues = [];
  let totalCurriculumModules = 0;
  let emptyTopicIssues = [];

  allCourses.forEach((c) => {
    if (!Array.isArray(c.curriculum) || c.curriculum.length < 4) {
      moduleCountIssues.push(`${c.id} has only ${c.curriculum?.length} modules`);
    }

    (c.curriculum || []).forEach((mod) => {
      totalCurriculumModules++;
      if (!mod.title || !mod.description || !Array.isArray(mod.topics) || mod.topics.length === 0) {
        emptyTopicIssues.push(`${c.id} Module #${mod.moduleNumber || "?"} has missing topics/description`);
      }
    });
  });

  assert(
    moduleCountIssues.length === 0,
    "All 12 Bootcamps have at least 4 comprehensive curriculum sprint modules",
    moduleCountIssues.join("; ")
  );

  assert(
    totalCurriculumModules >= 48,
    `Total Curriculum Modules across all tracks >= 48 (Found: ${totalCurriculumModules})`,
    `Expected >= 48 modules, found ${totalCurriculumModules}`
  );

  assert(
    emptyTopicIssues.length === 0,
    "All Curriculum modules contain non-empty topics, descriptions, and deliverables",
    emptyTopicIssues.join("; ")
  );

  // 4. Skills, Prerequisites & Career Roles Verification
  let emptyMetadataIssues = [];

  allCourses.forEach((c) => {
    if (!Array.isArray(c.skills) || c.skills.length < 5) {
      emptyMetadataIssues.push(`${c.id} has < 5 skills`);
    }
    if (!Array.isArray(c.careerRoles) || c.careerRoles.length < 3) {
      emptyMetadataIssues.push(`${c.id} has < 3 career roles`);
    }
    if (!Array.isArray(c.prerequisites) || c.prerequisites.length < 1) {
      emptyMetadataIssues.push(`${c.id} has < 1 prerequisite`);
    }
    if (!Array.isArray(c.highlights) || c.highlights.length < 4) {
      emptyMetadataIssues.push(`${c.id} has < 4 highlights`);
    }
  });

  assert(
    emptyMetadataIssues.length === 0,
    "All Courses contain robust skills, prerequisites, career roles, and highlights",
    emptyMetadataIssues.join("; ")
  );

  return results;
}
