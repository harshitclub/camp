import { formatTranscripts } from "../../src/lib/profileUtils.js";

/**
 * 05 - Assessment Transcripts History Formatting Unit Tests (/profile)
 */

export function runTranscriptsHistoryStructureTests() {
  const results = {
    name: "Assessment Transcripts History Formatting (/profile)",
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

  const rawSubmissions = [
    {
      id: "sub_1",
      assessment_title: "Generative AI & LLMs",
      category_name: "AI & ML",
      score_percentage: 85,
      passed: true,
      completed_at: "2026-09-20T10:00:00Z",
    },
    {
      id: "sub_2",
      assessment_title: "Full Stack Microservices",
      category_name: "Software Dev",
      score_percentage: 95,
      passed: true,
      completed_at: "2026-09-24T14:30:00Z",
    },
    {
      id: "sub_3",
      assessment_title: "Cloud DevOps Architecture",
      category_name: "Cloud",
      score_percentage: 45,
      passed: false,
      completed_at: "2026-09-15T08:00:00Z",
    },
  ];

  const formatted = formatTranscripts(rawSubmissions);

  // 1. Chronological Sorting (Newest First)
  assert(
    formatted[0].id === "sub_2" && formatted[1].id === "sub_1" && formatted[2].id === "sub_3",
    "Transcripts: Chronologically sorted with newest attempt first (#2 -> #1 -> #3)"
  );

  // 2. Score Badge Mapping
  assert(
    formatted[0].scoreBadge === "PASSED" && formatted[2].scoreBadge === "NEEDS_IMPROVEMENT",
    "Transcripts: Correctly assigns 'PASSED' (95%) and 'NEEDS_IMPROVEMENT' (45%) badges"
  );

  // 3. Date Formatting
  assert(
    formatted[0].formattedDate.includes("2026"),
    "Transcripts: Formats ISO date into localized display string"
  );

  return results;
}
