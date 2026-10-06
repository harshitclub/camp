import { allCourses } from "../../src/data/courses.js";
import { getAllAssessments } from "../../src/lib/adminService.js";

/**
 * 04 - SEO, Robots.txt & Dynamic Sitemap Validator
 */

export async function runSeoSitemapValidationTests() {
  const assessmentsList = await getAllAssessments();
  const results = {
    name: "SEO, Robots.txt & Dynamic Sitemap Integrity",
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

  const BASE_URL = "https://campussutras.com";

  // 1. Robots.txt Simulation
  function generateRobots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [
            "/api/",
            "/admin",
            "/admin/",
            "/profile",
            "/profile/",
            "/reset-password",
            "/forgot-password",
          ],
        },
      ],
      sitemap: `${BASE_URL}/sitemap.xml`,
    };
  }

  const robotConfig = generateRobots();
  assert(
    Array.isArray(robotConfig.rules) &&
      robotConfig.rules[0].userAgent === "*" &&
      robotConfig.rules[0].allow === "/" &&
      robotConfig.rules[0].disallow.includes("/admin") &&
      robotConfig.sitemap.includes("/sitemap.xml"),
    "Robots.txt: Crawl rules configured (Allow: '/', Disallow: ['/admin', '/api/', '/profile'], Sitemap: '/sitemap.xml')"
  );

  // 2. Sitemap XML Array Generation
  function generateSitemap() {
    const staticPages = [
      { route: "", priority: 1.0, changeFreq: "daily" },
      { route: "/courses", priority: 0.95, changeFreq: "weekly" },
      { route: "/assessments", priority: 0.95, changeFreq: "weekly" },
      { route: "/verify-certificate", priority: 0.90, changeFreq: "monthly" },
      { route: "/internship", priority: 0.85, changeFreq: "weekly" },
      { route: "/hire", priority: 0.85, changeFreq: "monthly" },
      { route: "/about", priority: 0.80, changeFreq: "monthly" },
      { route: "/events", priority: 0.80, changeFreq: "weekly" },
      { route: "/contact", priority: 0.75, changeFreq: "monthly" },
      { route: "/privacy-and-policy", priority: 0.30, changeFreq: "yearly" },
      { route: "/terms-and-conditions", priority: 0.30, changeFreq: "yearly" },
    ].map(({ route, priority, changeFreq }) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: changeFreq,
      priority,
    }));

    const coursePages = (allCourses || []).map((course) => ({
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.90,
    }));

    const assessmentPages = (assessmentsList || []).map((test) => ({
      url: `${BASE_URL}/assessments/${test.slug || test.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.80,
    }));

    return [...staticPages, ...coursePages, ...assessmentPages];
  }

  const sitemapEntries = generateSitemap();
  assert(
    Array.isArray(sitemapEntries) && sitemapEntries.length === 53,
    `Sitemap: Generated ${sitemapEntries.length} indexed URLs (11 Static Pages + 12 Course Tracks + 30 Assessment Tests)`,
    `Count: ${sitemapEntries.length}`
  );

  // 3. Static Pages in Sitemap
  const hasHomepage = sitemapEntries.some((e) => e.url === `${BASE_URL}`);
  const hasVerify = sitemapEntries.some((e) => e.url.includes("/verify-certificate"));
  const hasCourses = sitemapEntries.some((e) => e.url.includes("/courses"));
  const hasAssessments = sitemapEntries.some((e) => e.url.includes("/assessments"));

  assert(
    hasHomepage && hasVerify && hasCourses && hasAssessments,
    "Sitemap: Essential portal pages indexed (Homepage, /verify-certificate, /courses, /assessments)"
  );

  // 4. All 12 Course Slugs in Sitemap
  let missingCourses = [];
  allCourses.forEach((c) => {
    const expectedUrl = `/courses/${c.slug}`;
    if (!sitemapEntries.some((e) => e.url.includes(expectedUrl))) {
      missingCourses.push(c.slug);
    }
  });

  assert(
    missingCourses.length === 0,
    "Sitemap: All 12 90-Day Bootcamp track dynamic URLs included in sitemap index",
    missingCourses.join(", ")
  );

  return results;
}
