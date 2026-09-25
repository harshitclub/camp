/**
 * 04 - Scorecard Solutions Review & Explanation Filter Tests (/assessments/[id]/result)
 */

export function runScorecardSolutionsReviewTests() {
  const results = {
    name: "Scorecard Solutions Review & Explanation Filtering",
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

  const sampleQuestions = [
    { id: 1, correct_option_index: 0, explanation: "Exp 1" },
    { id: 2, correct_option_index: 1, explanation: "Exp 2" },
    { id: 3, correct_option_index: 2, explanation: "Exp 3" },
    { id: 4, correct_option_index: 3, explanation: "Exp 4" },
    { id: 5, correct_option_index: 1, explanation: "Exp 5" },
  ];

  const userAnswers = {
    0: 0, // Correct
    1: 1, // Correct
    2: 99, // Incorrect
    3: 3, // Correct
    4: 0, // Incorrect
  };

  function filterSolutions(questions, answers, filterState) {
    return questions.filter((q, idx) => {
      const userSelected = answers[idx];
      const isCorrect = userSelected === q.correct_option_index;
      if (filterState === "correct") return isCorrect;
      if (filterState === "incorrect") return !isCorrect;
      return true;
    });
  }

  // 1. Filter: "all"
  const allList = filterSolutions(sampleQuestions, userAnswers, "all");
  assert(allList.length === 5, "Solutions Filter: 'all' returns all 5 questions");

  // 2. Filter: "correct"
  const correctList = filterSolutions(sampleQuestions, userAnswers, "correct");
  assert(
    correctList.length === 3 && correctList.map((q) => q.id).join(",") === "1,2,4",
    "Solutions Filter: 'correct' returns exactly the 3 correct questions (#1, #2, #4)"
  );

  // 3. Filter: "incorrect"
  const incorrectList = filterSolutions(sampleQuestions, userAnswers, "incorrect");
  assert(
    incorrectList.length === 2 && incorrectList.map((q) => q.id).join(",") === "3,5",
    "Solutions Filter: 'incorrect' returns exactly the 2 missed questions (#3, #5)"
  );

  // 4. Accuracy Percentage Computation
  const correctCount = sampleQuestions.filter((q, idx) => userAnswers[idx] === q.correct_option_index).length;
  const percentage = Math.round((correctCount / sampleQuestions.length) * 100);

  assert(
    correctCount === 3 && percentage === 60,
    "Accuracy Calculation: 3/5 evaluates to 60.0%"
  );

  return results;
}
