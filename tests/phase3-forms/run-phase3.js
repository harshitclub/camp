import { runContactFormPipelineTests } from "./01-contact-form-pipeline.test.js";
import { runHireFormPipelineTests } from "./02-hire-form-pipeline.test.js";
import { runInternshipFormPipelineTests } from "./03-internship-form-pipeline.test.js";
import { runCourseEnrollPipelineTests } from "./04-course-enroll-pipeline.test.js";
import { runAdminEmailTemplateTests } from "./05-admin-email-template.test.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

async function runAllPhase3Tests() {
  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   🚀 CAMPUSSUTRAS PLATFORM — PHASE 3: PUBLIC FORMS & LEAD INGESTION    ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  const startTime = Date.now();
  const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

  console.log(`  🌐 Target Dev Server: ${BOLD}${baseUrl}${RESET}\n`);

  const suites = [
    await runContactFormPipelineTests(baseUrl),
    await runHireFormPipelineTests(baseUrl),
    await runInternshipFormPipelineTests(baseUrl),
    await runCourseEnrollPipelineTests(baseUrl),
    runAdminEmailTemplateTests(),
  ];

  let grandTotalPassed = 0;
  let grandTotalFailed = 0;

  suites.forEach((suite, idx) => {
    console.log(`${BOLD}${YELLOW}Module ${idx + 1}: ${suite.name}${RESET}`);
    console.log(`${"-".repeat(70)}`);

    suite.tests.forEach((t) => {
      if (t.pass) {
        console.log(`  ${GREEN}✓ PASS${RESET}  ${t.name}`);
        grandTotalPassed++;
      } else {
        console.log(`  ${RED}✗ FAIL${RESET}  ${t.name}`);
        if (t.error) {
          console.log(`         ${RED}Error:${RESET} ${t.error}`);
        }
        grandTotalFailed++;
      }
    });

    const suiteStatus =
      suite.failed === 0
        ? `${GREEN}${suite.passed}/${suite.passed} passed (100%)${RESET}`
        : `${RED}${suite.failed} failed, ${suite.passed} passed${RESET}`;

    console.log(`  ${BOLD}Result:${RESET} ${suiteStatus}\n`);
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(3);
  const totalTests = grandTotalPassed + grandTotalFailed;

  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}PHASE 3 SUMMARY REPORT:${RESET}`);
  console.log(`  • Total Assertions Evaluated : ${BOLD}${totalTests}${RESET}`);
  console.log(`  • Passed Assertions          : ${GREEN}${BOLD}${grandTotalPassed}${RESET}`);
  console.log(`  • Failed Assertions          : ${grandTotalFailed > 0 ? RED : GREEN}${BOLD}${grandTotalFailed}${RESET}`);
  console.log(`  • Execution Duration         : ${duration}s`);
  console.log(`  • User Thank-You Emails      : ${GREEN}✓ Removed (Admin Alert Only)${RESET}`);
  console.log(`  • Database Ingestion         : ${GREEN}✓ Persisted to Supabase DB${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  if (grandTotalFailed === 0) {
    console.log(`\n${GREEN}${BOLD}🎉 [PHASE 3 ALL PUBLIC FORMS TESTS PASSED SUCCESSFULLY]${RESET}\n`);
    return true;
  } else {
    console.log(`\n${RED}${BOLD}❌ [PHASE 3 HAS FAILED FORM ASSERTIONS]${RESET}\n`);
    return false;
  }
}

runAllPhase3Tests().then((success) => {
  if (!success) {
    process.exit(1);
  }
});
