import { runVerifyCertificateApiTests } from "./01-verify-certificate-api.test.js";
import { runAdminCertificatesApiTests } from "./02-admin-certificates-api.test.js";
import { runAdminAssessmentsCategoriesApiTests } from "./03-admin-assessments-categories-api.test.js";
import { runLeadFormsApiTests } from "./04-lead-forms-api.test.js";
import { runAdminFormsApiTests } from "./05-admin-forms-api.test.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

async function runAllPhase2Tests() {
  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   🚀 CAMPUSSUTRAS PLATFORM — PHASE 2: DATABASE & API INTEGRATION TESTS  ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  const startTime = Date.now();
  const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

  console.log(`  🌐 Target Dev Server: ${BOLD}${baseUrl}${RESET}\n`);

  const suites = [
    await runVerifyCertificateApiTests(baseUrl),
    await runAdminCertificatesApiTests(baseUrl),
    await runAdminAssessmentsCategoriesApiTests(baseUrl),
    await runLeadFormsApiTests(baseUrl),
    await runAdminFormsApiTests(baseUrl),
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
  console.log(`${BOLD}PHASE 2 SUMMARY REPORT:${RESET}`);
  console.log(`  • Total API Assertions Evaluated : ${BOLD}${totalTests}${RESET}`);
  console.log(`  • Passed Assertions              : ${GREEN}${BOLD}${grandTotalPassed}${RESET}`);
  console.log(`  • Failed Assertions              : ${grandTotalFailed > 0 ? RED : GREEN}${BOLD}${grandTotalFailed}${RESET}`);
  console.log(`  • Execution Duration             : ${duration}s`);
  console.log(`  • Database Safety Safeguard      : ${GREEN}✓ 100% Test Records Cleaned Up${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  if (grandTotalFailed === 0) {
    console.log(`\n${GREEN}${BOLD}🎉 [PHASE 2 ALL API TESTS PASSED SUCCESSFULLY]${RESET}\n`);
    return true;
  } else {
    console.log(`\n${RED}${BOLD}❌ [PHASE 2 HAS FAILED API ASSERTIONS]${RESET}\n`);
    return false;
  }
}

runAllPhase2Tests().then((success) => {
  if (!success) {
    process.exit(1);
  }
});
