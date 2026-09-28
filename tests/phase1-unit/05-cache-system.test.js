/**
 * 05 - MemoryCache & Profile Utilities Unit Tests
 */

import { memoryCache } from "../../src/lib/cache.js";
import {
  calculateCompletion,
  evaluateAdminStatus,
  getVerificationBadge,
  formatTranscripts,
} from "../../src/lib/profileUtils.js";

export async function runCacheAndProfileTests() {
  const results = { name: "MemoryCache & Profile Utilities", passed: 0, failed: 0, tests: [] };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. Basic In-Memory Set & Get
  memoryCache.clear();
  memoryCache.set("test_key_1", { hello: "world" }, 60);
  const val1 = memoryCache.get("test_key_1");
  assert(val1 && val1.hello === "world", "Cache: Set and retrieve immediate value");

  // 2. Cache Miss
  const valMissing = memoryCache.get("non_existent_key");
  assert(valMissing === null, "Cache: Non-existent key returns null");

  // 3. Cache Invalidation by Key
  memoryCache.invalidate("test_key_1");
  assert(memoryCache.get("test_key_1") === null, "Cache: Specific key invalidation deletes entry");

  // 4. Tag-based Invalidation
  memoryCache.set("cat:1", "Category 1", 60, ["categories"]);
  memoryCache.set("cat:2", "Category 2", 60, ["categories"]);
  memoryCache.set("user:1", "User 1", 60, ["users"]);

  assert(memoryCache.get("cat:1") === "Category 1", "Cache: Tagged entry 1 exists");
  assert(memoryCache.get("cat:2") === "Category 2", "Cache: Tagged entry 2 exists");
  assert(memoryCache.get("user:1") === "User 1", "Cache: Unrelated tagged entry exists");

  memoryCache.invalidateTag("categories");
  assert(memoryCache.get("cat:1") === null, "Cache: Tag invalidation removed cat:1");
  assert(memoryCache.get("cat:2") === null, "Cache: Tag invalidation removed cat:2");
  assert(memoryCache.get("user:1") === "User 1", "Cache: Unrelated user:1 remains preserved");

  // 5. Cache Wrap Producer Functionality
  let producerCalls = 0;
  const mockProducer = async () => {
    producerCalls++;
    return { count: 42 };
  };

  const wrapResult1 = await memoryCache.wrap("producer_key", mockProducer, 60, ["test"]);
  assert(wrapResult1?.count === 42 && producerCalls === 1, "Cache Wrap: Calls producer on first fetch");

  const wrapResult2 = await memoryCache.wrap("producer_key", mockProducer, 60, ["test"]);
  assert(wrapResult2?.count === 42 && producerCalls === 1, "Cache Wrap: Returns cached value without re-invoking producer");

  // 6. TTL Expiration Simulation
  memoryCache.set("short_lived", "expires_fast", 0.05); // 50ms TTL
  assert(memoryCache.get("short_lived") === "expires_fast", "Cache TTL: Available immediately");
  await new Promise((r) => setTimeout(r, 60));
  assert(memoryCache.get("short_lived") === null, "Cache TTL: Returns null after expiration time");

  // 7. Profile Completion Calculation
  const emptyCompletion = calculateCompletion(null, null);
  assert(emptyCompletion === 0, "Profile Completion: Empty profile evaluates to 0%");

  const fullUser = { email: "student@test.com" };
  const fullProfile = {
    full_name: "Rahul Sharma",
    user_type: "Student",
    phone: "9876543210",
    college_name: "IIT Delhi",
    course: "B.Tech CSE",
    github_url: "https://github.com/rahul",
  };
  const fullCompletion = calculateCompletion(fullUser, fullProfile);
  assert(fullCompletion === 100, `Profile Completion: All 7 fields complete evaluates to 100% (got ${fullCompletion}%)`);

  const partialProfile = {
    full_name: "Rahul Sharma",
    user_type: "Student",
  };
  const partialCompletion = calculateCompletion(fullUser, partialProfile);
  // 3 out of 7 fields = ~43%
  assert(partialCompletion >= 40 && partialCompletion <= 45, `Profile Completion: 3/7 fields evaluates to ~43% (got ${partialCompletion}%)`);

  // 8. Admin RBAC Evaluation
  assert(evaluateAdminStatus({ id: "1" }, { is_admin: true }) === true, "RBAC: Profile is_admin: true yields admin clearance");
  assert(evaluateAdminStatus({ id: "2", user_metadata: { is_admin: true } }, {}) === true, "RBAC: User metadata is_admin: true yields admin clearance");
  assert(evaluateAdminStatus({ id: "3" }, { is_admin: false }) === false, "RBAC: Non-admin evaluates to false");
  assert(evaluateAdminStatus(null, null) === false, "RBAC: Null user evaluates to false");

  // 9. Verification Badge
  const verifiedBadge = getVerificationBadge({ is_verified: true });
  assert(verifiedBadge.status === "VERIFIED_AUTHENTIC", "Badge: is_verified true returns VERIFIED_AUTHENTIC");
  const pendingBadge = getVerificationBadge({ is_verified: false });
  assert(pendingBadge.status === "PENDING", "Badge: is_verified false returns PENDING");

  // 10. Transcripts Formatter
  const rawAttempts = [
    { id: "a1", assessment_title: "React Quiz", percentage: 80, submitted_at: "2026-03-01T10:00:00Z" },
    { id: "a2", assessment_title: "Next.js Mastery", percentage: 40, submitted_at: "2026-03-10T12:00:00Z" },
  ];
  const formatted = formatTranscripts(rawAttempts);
  assert(formatted.length === 2, "Transcripts: Returns 2 formatted items");
  assert(formatted[0].assessmentTitle === "Next.js Mastery", "Transcripts: Sorted newest first");
  assert(formatted[0].scoreBadge === "NEEDS_IMPROVEMENT", "Transcripts: 40% maps to NEEDS_IMPROVEMENT");
  assert(formatted[1].scoreBadge === "PASSED", "Transcripts: 80% maps to PASSED");

  return results;
}
