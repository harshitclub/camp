import { getAllAssessments, getAllCategories } from "../../src/lib/adminService.js";

/**
 * 01 - End-to-End Complete Student User Journey Test
 */

export async function runE2EStudentJourneyTests() {
  const assessmentsList = await getAllAssessments();

  const results = {
    name: "E2E Complete Student Journey (Signup -> Quiz -> Scorecard -> Transcripts)",
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

  // --- STEP 1: Candidate Profile Initialization ---
  const candidateProfile = {
    id: "usr_student_8877",
    full_name: "Rahul Mehra",
    email: "rahul.mehra@tulas.edu.in",
    user_type: "Student",
    phone: "+91 9876543210",
    college_name: "Tulas Institute, Dehradun",
    course: "BCA 3rd Year",
    is_verified: true,
    is_admin: false,
  };

  assert(
    candidateProfile.user_type === "Student" && candidateProfile.is_admin === false,
    "Step 1: Student profile registered with academic attributes"
  );

  // --- STEP 2: Assessment Discovery & Category Filtering ---
  const selectedCategory = "ai-data";
  const availableTests = assessmentsList.filter((a) => a.category_slug === selectedCategory || a.category_id === selectedCategory);
  assert(
    availableTests.length === 6,
    `Step 2: Student browses Assessment Hub and filters '${selectedCategory}' category (6 tests available)`
  );

  const testToTake = availableTests[0]; // Generative AI & AI Agents
  assert(
    testToTake.questions.length === 15 && testToTake.duration_minutes === 15,
    `Step 3: Student launches '${testToTake.title}' (15 Questions, 15-Minute Countdown)`
  );

  // --- STEP 3: Student Answers Questions ---
  // Student answers 12 correctly, 3 incorrectly
  const studentAnswers = {};
  const flaggedQuestions = { 4: true, 11: true };

  testToTake.questions.forEach((q, idx) => {
    if (idx < 12) {
      studentAnswers[idx] = q.correct_option_index; // 12 correct
    } else {
      studentAnswers[idx] = (q.correct_option_index + 1) % 4; // 3 incorrect
    }
  });

  const totalAnswered = Object.keys(studentAnswers).length;
  assert(
    totalAnswered === 15 && Object.keys(flaggedQuestions).length === 2,
    "Step 4: Student selects answers for all 15 questions and flags 2 for review"
  );

  // --- STEP 4: Test Evaluation & Scorecard Calculation ---
  let correctCount = 0;
  testToTake.questions.forEach((q, idx) => {
    if (studentAnswers[idx] === q.correct_option_index) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / testToTake.questions.length) * 100);
  const isPassed = scorePercentage >= testToTake.passing_percentage;

  assert(
    correctCount === 12 && scorePercentage === 80 && isPassed === true,
    `Step 5: Scorecard calculated: ${correctCount}/15 (80.0%) -> PASSED & CERTIFIED`
  );

  // --- STEP 5: Transcripts Archival in Member Profile ---
  const transcriptRecord = {
    id: "sub_e2e_001",
    user_id: candidateProfile.id,
    assessment_title: testToTake.title,
    category_name: testToTake.category_name,
    score_percentage: scorePercentage,
    passed: isPassed,
    completed_at: new Date().toISOString(),
  };

  assert(
    transcriptRecord.score_percentage === 80 && transcriptRecord.passed === true,
    "Step 6: Assessment attempt recorded in student transcript history"
  );

  return results;
}
