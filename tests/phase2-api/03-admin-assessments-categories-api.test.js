/**
 * 03 - Admin Assessments & Categories CRUD API Tests (/api/admin/assessments & /api/admin/categories)
 */

export async function runAdminAssessmentsCategoriesApiTests(baseUrl = "http://localhost:3000") {
  const results = {
    name: "Admin Assessments & Category Management APIs",
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

  const TEST_CAT_SLUG = "test-automation-pillar";
  const TEST_ASM_SLUG = "test-phase2-sample-quiz";

  try {
    // 1. GET /api/admin/categories
    const resCats = await fetch(`${baseUrl}/api/admin/categories`);
    const dataCats = await resCats.json().catch(() => ({}));

    assert(
      resCats.status === 200 && dataCats.success === true && Array.isArray(dataCats.data),
      "GET /api/admin/categories: Returns 200 OK with list of categories",
      `Status: ${resCats.status}, categories: ${dataCats.data?.length}`
    );

    // 2. POST /api/admin/categories (Create/Upsert Test Category)
    const resCreateCat = await fetch(`${baseUrl}/api/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Automation Pillar",
        slug: TEST_CAT_SLUG,
        description: "Automated test category for validation",
        color: "#10b981",
      }),
    });
    const dataCreateCat = await resCreateCat.json().catch(() => ({}));

    assert(
      resCreateCat.status === 200 && dataCreateCat.success === true,
      "POST /api/admin/categories: Creates or updates category on the fly",
      `Status: ${resCreateCat.status}`
    );

    // 3. GET /api/admin/assessments
    const resAsms = await fetch(`${baseUrl}/api/admin/assessments`);
    const dataAsms = await resAsms.json().catch(() => ({}));

    assert(
      resAsms.status === 200 && dataAsms.success === true && Array.isArray(dataAsms.data),
      "GET /api/admin/assessments: Returns 200 OK with assessments array",
      `Status: ${resAsms.status}`
    );

    // 4. POST /api/admin/assessments (Author & Upsert Test Assessment with Questions)
    const resCreateAsm = await fetch(`${baseUrl}/api/admin/assessments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Phase 2 Automation Quiz",
        slug: TEST_ASM_SLUG,
        category_slug: TEST_CAT_SLUG,
        category_name: "Test Automation Pillar",
        difficulty: "Beginner",
        duration_minutes: 10,
        passing_percentage: 60,
        is_published: true,
        tags: ["Testing", "Jest", "CI/CD"],
        questions: [
          {
            question_text: "What does Unit Testing primarily focus on?",
            options: [
              "Testing complete user journeys across multiple servers",
              "Testing individual isolated components, functions, or modules",
              "Testing database network throughput under heavy load",
              "Testing visual CSS margins across browser versions",
            ],
            correct_option_index: 1,
            explanation: "Unit tests isolate the smallest testable parts of an application (functions, pure methods) to verify logic.",
            topic: "Fundamentals",
          },
          {
            question_text: "Which of the following is true about idempotent operations?",
            options: [
              "They produce different results each time they are executed",
              "They can be called multiple times without changing the result beyond the initial application",
              "They only work in NoSQL databases",
              "They require continuous internet connection",
            ],
            correct_option_index: 1,
            explanation: "Idempotency means repeated identical requests have the exact same effect as a single request.",
            topic: "Architecture",
          },
        ],
      }),
    });
    const dataCreateAsm = await resCreateAsm.json().catch(() => ({}));

    assert(
      resCreateAsm.status === 200 && dataCreateAsm.success === true,
      "POST /api/admin/assessments: Upserts assessment & syncs child questions",
      `Status: ${resCreateAsm.status}, message: ${dataCreateAsm.message}`
    );

    // 5. GET /api/admin/assessments?slug={slug} (Lookup single created assessment)
    const resGetSingle = await fetch(`${baseUrl}/api/admin/assessments?slug=${TEST_ASM_SLUG}`);
    const dataGetSingle = await resGetSingle.json().catch(() => ({}));

    assert(
      resGetSingle.status === 200 &&
        dataGetSingle.success === true &&
        dataGetSingle.data?.slug === TEST_ASM_SLUG &&
        Array.isArray(dataGetSingle.data?.questions) &&
        dataGetSingle.data?.questions.length === 2,
      "GET /api/admin/assessments?slug={slug}: Returns assessment with synchronized questions",
      `Status: ${resGetSingle.status}, questions count: ${dataGetSingle.data?.questions?.length}`
    );

    // 6. DELETE /api/admin/assessments?slug={slug} (Clean up test assessment)
    const resDeleteAsm = await fetch(`${baseUrl}/api/admin/assessments?slug=${TEST_ASM_SLUG}`, {
      method: "DELETE",
    });
    const dataDeleteAsm = await resDeleteAsm.json().catch(() => ({}));

    assert(
      resDeleteAsm.status === 200 && dataDeleteAsm.success === true,
      "DELETE /api/admin/assessments: Deletes test assessment and cascades questions",
      `Status: ${resDeleteAsm.status}`
    );
  } catch (err) {
    assert(false, "Admin Assessments API Exception", err.message);
  }

  return results;
}
