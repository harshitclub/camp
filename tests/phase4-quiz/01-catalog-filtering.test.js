import { getAllAssessments, getAllCategories } from "../../src/lib/adminService.js";

/**
 * 01 - Assessment Hub Catalog & Filtering Test Suite (/assessments)
 */

export async function runCatalogFilteringTests() {
  const assessmentCategories = await getAllCategories();
  const assessmentsList = await getAllAssessments();

  const results = {
    name: "Assessment Hub Catalog & Filtering (/assessments)",
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

  // 1. Total Assessment Catalog Integrity
  assert(
    Array.isArray(assessmentsList) && assessmentsList.length === 30,
    "Catalog: Exact 30 Curated Assessments loaded",
    `Count: ${assessmentsList?.length}`
  );

  // 2. Category Filter Matching Function
  function filterByCategory(catSlug) {
    if (!catSlug || catSlug === "all") return assessmentsList;
    return assessmentsList.filter((a) => a.category_slug === catSlug || a.category_id === catSlug);
  }

  const aiTests = filterByCategory("ai-data");
  assert(
    aiTests.length === 6,
    "Category Filter: 'AI, ML & Python' category returns exactly 6 assessments",
    `Found: ${aiTests.length}`
  );

  const webTests = filterByCategory("web-software");
  assert(
    webTests.length === 6,
    "Category Filter: 'Software & Mobile Dev' returns exactly 6 assessments",
    `Found: ${webTests.length}`
  );

  const cloudTests = filterByCategory("data-cloud");
  assert(
    cloudTests.length === 6,
    "Category Filter: 'Data, Cloud & Security' returns exactly 6 assessments",
    `Found: ${cloudTests.length}`
  );

  const bizTests = filterByCategory("business-management");
  assert(
    bizTests.length === 6,
    "Category Filter: 'Business & Management' returns exactly 6 assessments",
    `Found: ${bizTests.length}`
  );

  const growthTests = filterByCategory("growth-career");
  assert(
    growthTests.length === 6,
    "Category Filter: 'Marketing, Design & Career' returns exactly 6 assessments",
    `Found: ${growthTests.length}`
  );

  // 3. Search Query Filter Function
  function searchAssessments(query, catSlug = "all") {
    let list = filterByCategory(catSlug);
    if (!query || !query.trim()) return list;
    const q = query.toLowerCase().trim();
    return list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  const reactSearchResults = searchAssessments("React");
  assert(
    reactSearchResults.length > 0 &&
      reactSearchResults.some((a) => a.title.toLowerCase().includes("react") || a.tags?.includes("React")),
    "Search Query: Keyword 'React' matches relevant React assessment",
    `Matches: ${reactSearchResults.map((a) => a.title).join(", ")}`
  );

  const llmSearchResults = searchAssessments("LLMs", "ai-data");
  assert(
    llmSearchResults.length > 0,
    "Search Query: Tag 'LLMs' inside 'ai-data' category matches Generative AI assessment",
    `Matches: ${llmSearchResults.map((a) => a.title).join(", ")}`
  );

  const nonExistentSearch = searchAssessments("random_xyz_query_999");
  assert(
    nonExistentSearch.length === 0,
    "Search Query: Non-matching keyword returns empty array cleanly without crashing"
  );

  return results;
}
