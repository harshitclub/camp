/**
 * 03 - Dynamic Question Palette Matrix & Navigation State Unit Tests
 */

export function runQuestionPaletteMatrixTests() {
  const results = {
    name: "Dynamic Question Palette Matrix & Navigation State",
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

  // 1. Question Matrix Pill State Evaluator
  function getPillState(qIdx, currentIdx, answers, flagged) {
    if (qIdx === currentIdx) return "CURRENT";
    if (flagged[qIdx]) return "FLAGGED";
    if (answers[qIdx] !== undefined) return "ANSWERED";
    return "UNANSWERED";
  }

  const mockAnswers = { 0: 1, 1: 3, 4: 2 };
  const mockFlagged = { 2: true };
  const currentQ = 1;

  assert(
    getPillState(0, currentQ, mockAnswers, mockFlagged) === "ANSWERED",
    "Pill State: Q#1 (Answered, Not current) -> ANSWERED (🟢)"
  );
  assert(
    getPillState(1, currentQ, mockAnswers, mockFlagged) === "CURRENT",
    "Pill State: Q#2 (Currently active question) -> CURRENT (🔵)"
  );
  assert(
    getPillState(2, currentQ, mockAnswers, mockFlagged) === "FLAGGED",
    "Pill State: Q#3 (Marked for review) -> FLAGGED (🟣)"
  );
  assert(
    getPillState(3, currentQ, mockAnswers, mockFlagged) === "UNANSWERED",
    "Pill State: Q#4 (Not visited/answered) -> UNANSWERED (⚪)"
  );

  // 2. Submission Metrics Aggregator
  function getSubmissionMetrics(totalQuestions, answers, flagged) {
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = totalQuestions - answeredCount;
    const flaggedCount = Object.values(flagged).filter(Boolean).length;
    return { totalQuestions, answeredCount, unansweredCount, flaggedCount };
  }

  const metrics = getSubmissionMetrics(15, { 0: 1, 1: 2, 2: 0, 3: 3 }, { 2: true, 5: true });
  assert(
    metrics.answeredCount === 4 &&
      metrics.unansweredCount === 11 &&
      metrics.flaggedCount === 2,
    "Submission Metrics: 4 answered, 11 unanswered, 2 flagged out of 15 questions"
  );

  // 3. Navigation Index Clamp
  function navigate(current, delta, total) {
    return Math.max(0, Math.min(total - 1, current + delta));
  }

  assert(navigate(0, -1, 15) === 0, "Navigation: Cannot go below index 0");
  assert(navigate(14, 1, 15) === 14, "Navigation: Cannot exceed index total-1");
  assert(navigate(5, 1, 15) === 6, "Navigation: Next increments index (5 -> 6)");
  assert(navigate(5, -1, 15) === 4, "Navigation: Prev decrements index (5 -> 4)");

  return results;
}
