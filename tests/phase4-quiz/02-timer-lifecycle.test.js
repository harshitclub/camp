/**
 * 02 - Assessment Timer Lifecycle & Warning Thresholds Unit Tests
 */

export function runTimerLifecycleTests() {
  const results = {
    name: "Assessment Timer Lifecycle & Warning Thresholds",
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

  // 1. Initial Duration Computation
  function getInitialDuration(durationMinutes) {
    return (durationMinutes || 10) * 60;
  }

  assert(
    getInitialDuration(15) === 900,
    "Timer: 15 minutes correctly computes to 900 seconds"
  );
  assert(
    getInitialDuration(null) === 600,
    "Timer: Default duration fallback computes to 600 seconds (10 mins)"
  );

  // 2. Time Formatter
  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  assert(formatTime(900) === "15:00", "Formatter: 900s -> '15:00'");
  assert(formatTime(125) === "02:05", "Formatter: 125s -> '02:05'");
  assert(formatTime(59) === "00:59", "Formatter: 59s -> '00:59'");
  assert(formatTime(0) === "00:00", "Formatter: 0s -> '00:00'");

  // 3. Timer Color Warning State Evaluation
  function getTimerPhase(timeRemaining) {
    if (timeRemaining <= 0) return "EXPIRED";
    if (timeRemaining < 60) return "CRITICAL_RED";
    if (timeRemaining < 180) return "WARNING_AMBER";
    return "NORMAL_BLUE";
  }

  assert(
    getTimerPhase(500) === "NORMAL_BLUE",
    "Timer Phase: 500s remaining -> NORMAL_BLUE"
  );
  assert(
    getTimerPhase(120) === "WARNING_AMBER",
    "Timer Phase: 120s (< 3 mins) -> WARNING_AMBER"
  );
  assert(
    getTimerPhase(45) === "CRITICAL_RED",
    "Timer Phase: 45s (< 1 min) -> CRITICAL_RED"
  );
  assert(
    getTimerPhase(0) === "EXPIRED",
    "Timer Phase: 0s -> EXPIRED (Triggers Auto-Submission)"
  );

  // 4. Progress Bar Percentage Calculation
  function getProgressPercent(timeRemaining, initialSeconds) {
    if (initialSeconds <= 0) return 0;
    return Math.max(0, Math.min(100, (timeRemaining / initialSeconds) * 100));
  }

  assert(
    getProgressPercent(450, 900) === 50,
    "Progress Bar: 450s / 900s evaluates to 50%"
  );
  assert(
    getProgressPercent(0, 900) === 0,
    "Progress Bar: 0s / 900s evaluates to 0%"
  );

  return results;
}
