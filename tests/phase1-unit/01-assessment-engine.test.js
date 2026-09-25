import { assessmentsList, assessmentCategories } from "../../src/data/assessmentsData.js";

/**
 * 01 - Assessment Engine & Catalog Integrity Unit Tests
 */
export function runAssessmentEngineTests() {
  const results = { name: "Assessment Engine & Catalog Integrity", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. Catalog Count & Pillars Verification
  assert(
    Array.isArray(assessmentCategories) && assessmentCategories.length >= 6,
    "Categories Catalog Verification",
    `Expected at least 6 category definitions, got ${assessmentCategories?.length}`
  );

  assert(
    Array.isArray(assessmentsList) && assessmentsList.length === 30,
    "Assessments Count Verification (Exact 30 Curated Assessments)",
    `Expected 30 assessments, found ${assessmentsList?.length}`
  );

  // 2. Question Bank & Data Schema Verification
  let totalQuestionsCount = 0;
  let invalidQuestions = [];
  let distinctAssessmentIds = new Set();
  let distinctSlugs = new Set();

  assessmentsList.forEach((assessment, aIdx) => {
    if (!assessment.id || distinctAssessmentIds.has(assessment.id)) {
      invalidQuestions.push(`Assessment #${aIdx + 1} has duplicate or missing id: "${assessment.id}"`);
    }
    distinctAssessmentIds.add(assessment.id);

    if (!assessment.slug || distinctSlugs.has(assessment.slug)) {
      invalidQuestions.push(`Assessment #${aIdx + 1} has duplicate or missing slug: "${assessment.slug}"`);
    }
    distinctSlugs.add(assessment.slug);

    if (!assessment.title || typeof assessment.title !== "string" || !assessment.title.trim()) {
      invalidQuestions.push(`Assessment "${assessment.id}" has invalid title`);
    }

    if (!Array.isArray(assessment.questions) || assessment.questions.length !== 15) {
      invalidQuestions.push(
        `Assessment "${assessment.title}" (${assessment.id}) expected 15 questions, got ${assessment.questions?.length}`
      );
    }

    (assessment.questions || []).forEach((q, qIdx) => {
      totalQuestionsCount++;
      const qPrefix = `Assessment "${assessment.title}" Q#${qIdx + 1}`;

      if (!q.question_text || typeof q.question_text !== "string" || !q.question_text.trim()) {
        invalidQuestions.push(`${qPrefix}: Empty question text`);
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        invalidQuestions.push(`${qPrefix}: Expected 4 options, got ${q.options?.length}`);
      } else {
        q.options.forEach((opt, oIdx) => {
          if (!opt || typeof opt !== "string" || !opt.trim()) {
            invalidQuestions.push(`${qPrefix} Option #${oIdx + 1}: Empty option text`);
          }
        });
      }

      if (typeof q.correct_option_index !== "number" || q.correct_option_index < 0 || q.correct_option_index > 3) {
        invalidQuestions.push(`${qPrefix}: Invalid correct_option_index: ${q.correct_option_index}`);
      }

      if (!q.explanation || typeof q.explanation !== "string" || !q.explanation.trim()) {
        invalidQuestions.push(`${qPrefix}: Missing explanation`);
      }

      if (!q.topic || typeof q.topic !== "string" || !q.topic.trim()) {
        invalidQuestions.push(`${qPrefix}: Missing topic classification`);
      }
    });
  });

  assert(
    invalidQuestions.length === 0,
    "All 450 Assessment Questions Data Schema Integrity",
    invalidQuestions.slice(0, 5).join(" | ")
  );

  assert(
    totalQuestionsCount === 450,
    "Exact Total Questions Count (450 Questions across 30 Assessments)",
    `Expected 450 questions, counted ${totalQuestionsCount}`
  );

  // 3. Scoring & Percentage Math Function Test
  function calculateScore(answers, questions) {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] !== undefined && answers[idx] === q.correct_option_index) {
        correctCount++;
      }
    });
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return { correctCount, total, percentage };
  }

  const sampleQuestions = [
    { correct_option_index: 1, topic: "React" },
    { correct_option_index: 2, topic: "React" },
    { correct_option_index: 0, topic: "Node.js" },
    { correct_option_index: 3, topic: "Node.js" },
    { correct_option_index: 2, topic: "SQL" },
  ];

  // Perfect score
  const perfect = calculateScore([1, 2, 0, 3, 2], sampleQuestions);
  assert(perfect.correctCount === 5 && perfect.percentage === 100, "Scoring: Perfect Score (100%)");

  // Partial score (3 out of 5 = 60%)
  const partial = calculateScore([1, 2, 99, 3, 0], sampleQuestions);
  assert(partial.correctCount === 3 && partial.percentage === 60, "Scoring: Partial Score (60%)");

  // Zero score
  const zero = calculateScore([0, 0, 1, 1, 1], sampleQuestions);
  assert(zero.correctCount === 0 && zero.percentage === 0, "Scoring: Zero Score (0%)");

  // 4. Passing Threshold Evaluator
  function isPassed(percentage, passingThreshold = 60) {
    return percentage >= passingThreshold;
  }

  assert(isPassed(60, 60) === true, "Passing Threshold: Exactly at 60% passes");
  assert(isPassed(59.9, 60) === false, "Passing Threshold: 59.9% fails");
  assert(isPassed(75, 70) === true, "Passing Threshold: 75% passes 70% threshold");
  assert(isPassed(69, 70) === false, "Passing Threshold: 69% fails 70% threshold");

  // 5. Timer & Duration Formatting
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  assert(formatTime(900) === "15:00", "Timer Formatter: 900 seconds -> 15:00");
  assert(formatTime(65) === "01:05", "Timer Formatter: 65 seconds -> 01:05");
  assert(formatTime(0) === "00:00", "Timer Formatter: 0 seconds -> 00:00");

  // 6. Topic Performance Aggregator
  function aggregateTopicAnalytics(answers, questions) {
    const map = {};
    questions.forEach((q, idx) => {
      const topic = q.topic || "General";
      if (!map[topic]) map[topic] = { correct: 0, total: 0 };
      map[topic].total++;
      if (answers[idx] === q.correct_option_index) {
        map[topic].correct++;
      }
    });
    return map;
  }

  const topicResults = aggregateTopicAnalytics([1, 2, 99, 3, 2], sampleQuestions);
  assert(
    topicResults["React"].correct === 2 &&
      topicResults["React"].total === 2 &&
      topicResults["Node.js"].correct === 1 &&
      topicResults["Node.js"].total === 2 &&
      topicResults["SQL"].correct === 1 &&
      topicResults["SQL"].total === 1,
    "Topic Analytics Engine Breakdown"
  );

  return results;
}
