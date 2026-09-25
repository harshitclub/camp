import { runAuthValidationRulesTests } from "./01-auth-validation-rules.test.js";
import { runProfileCompletionMeterTests } from "./02-profile-completion-meter.test.js";
import { runRbacRoleEvaluationTests } from "./03-rbac-role-evaluation.test.js";
import { runRouteGuardMiddlewareTests } from "./04-route-guard-middleware.test.js";
import { runTranscriptsHistoryStructureTests } from "./05-transcripts-history-structure.test.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

async function runAllPhase5Tests() {
  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   🚀 CAMPUSSUTRAS PLATFORM — PHASE 5: AUTH & USER PROFILES TEST SUITE  ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  const startTime = Date.now();

  const suites = [
    runAuthValidationRulesTests(),
    runProfileCompletionMeterTests(),
    runRbacRoleEvaluationTests(),
    runRouteGuardMiddlewareTests(),
    runTranscriptsHistoryStructureTests(),
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
  console.log(`${BOLD}PHASE 5 SUMMARY REPORT:${RESET}`);
  console.log(`  • Total Assertions Evaluated : ${BOLD}${totalTests}${RESET}`);
  console.log(`  • Passed Assertions          : ${GREEN}${BOLD}${grandTotalPassed}${RESET}`);
  console.log(`  • Failed Assertions          : ${grandTotalFailed > 0 ? RED : GREEN}${BOLD}${grandTotalFailed}${RESET}`);
  console.log(`  • Execution Duration         : ${duration}s`);
  console.log(`  • Supabase API Requests Used : ${GREEN}0 (100% Offline in Local Memory)${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  if (grandTotalFailed === 0) {
    console.log(`\n${GREEN}${BOLD}🎉 [PHASE 5 ALL AUTH & PROFILES TESTS PASSED SUCCESSFULLY]${RESET}\n`);
    return true;
  } else {
    console.log(`\n${RED}${BOLD}❌ [PHASE 5 HAS FAILED ASSERTIONS]${RESET}\n`);
    return false;
  }
}

runAllPhase5Tests().then((success) => {
  if (!success) {
    process.exit(1);
  }
});
