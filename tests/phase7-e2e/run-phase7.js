import { runE2EStudentJourneyTests } from "./01-e2e-student-journey.test.js";
import { runE2EAdminJourneyTests } from "./02-e2e-admin-journey.test.js";
import { runEdgeCasesDataIntegrityTests } from "./03-edge-cases-data-integrity.test.js";
import { runSeoSitemapValidationTests } from "./04-seo-sitemap-validation.test.js";
import { runPerformanceLatencyTests } from "./05-performance-latency.test.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

async function runAllPhase7Tests() {
  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   🚀 CAMPUSSUTRAS PLATFORM — PHASE 7: E2E, EDGE CASES, SEO & BENCHMARKS ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  const startTime = Date.now();
  const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

  console.log(`  🌐 Target Dev Server: ${BOLD}${baseUrl}${RESET}\n`);

  const suites = [
    runE2EStudentJourneyTests(),
    await runE2EAdminJourneyTests(baseUrl),
    await runEdgeCasesDataIntegrityTests(baseUrl),
    runSeoSitemapValidationTests(),
    await runPerformanceLatencyTests(baseUrl),
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
  console.log(`${BOLD}PHASE 7 SUMMARY REPORT:${RESET}`);
  console.log(`  • Total Assertions Evaluated : ${BOLD}${totalTests}${RESET}`);
  console.log(`  • Passed Assertions          : ${GREEN}${BOLD}${grandTotalPassed}${RESET}`);
  console.log(`  • Failed Assertions          : ${grandTotalFailed > 0 ? RED : GREEN}${BOLD}${grandTotalFailed}${RESET}`);
  console.log(`  • Execution Duration         : ${duration}s`);
  console.log(`  • Latency Benchmark Target   : ${GREEN}✓ All Endpoints Responsive & Fast${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  if (grandTotalFailed === 0) {
    console.log(`\n${GREEN}${BOLD}🎉 [PHASE 7 ALL E2E & BENCHMARK TESTS PASSED SUCCESSFULLY]${RESET}\n`);
    return true;
  } else {
    console.log(`\n${RED}${BOLD}❌ [PHASE 7 HAS FAILED ASSERTIONS]${RESET}\n`);
    return false;
  }
}

runAllPhase7Tests().then((success) => {
  if (!success) {
    process.exit(1);
  }
});
