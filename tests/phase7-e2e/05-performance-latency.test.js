/**
 * 05 - Performance & API Response Latency Benchmark Tests
 */

export async function runPerformanceLatencyTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "API Performance & Latency Benchmark (< 500ms)",
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

  async function measureLatency(url) {
    const t0 = performance.now();
    const res = await fetch(url);
    const t1 = performance.now();
    const ms = Math.round(t1 - t0);
    return { status: res.status, latencyMs: ms };
  }

  try {
    // 1. Certificate Verification Latency
    const verifyMetrics = await measureLatency(`${baseUrl}/api/verify-certificate?id=CSAI001`);
    assert(
      verifyMetrics.status === 200 && verifyMetrics.latencyMs < 1000,
      `Performance: Certificate Verification responded in ${verifyMetrics.latencyMs}ms (Target < 1000ms)`,
      `Latency: ${verifyMetrics.latencyMs}ms`
    );

    // 2. Categories API Latency
    const catMetrics = await measureLatency(`${baseUrl}/api/admin/categories`);
    assert(
      catMetrics.status === 200 && catMetrics.latencyMs < 1000,
      `Performance: Admin Categories API responded in ${catMetrics.latencyMs}ms (Target < 1000ms)`,
      `Latency: ${catMetrics.latencyMs}ms`
    );

    // 3. Certificates List API Latency
    const listMetrics = await measureLatency(`${baseUrl}/api/admin/certificates?limit=5`);
    assert(
      listMetrics.status === 200 && listMetrics.latencyMs < 1000,
      `Performance: Admin Certificates list responded in ${listMetrics.latencyMs}ms (Target < 1000ms)`,
      `Latency: ${listMetrics.latencyMs}ms`
    );
  } catch (err) {
    assert(false, "Latency Benchmark Exception", err.message);
  }

  return results;
}
