/**
 * 01 - Admin Command Center Dashboard Metrics Aggregator Unit Tests
 */

export function runDashboardMetricsTests() {
  const results = {
    name: "Admin Dashboard Metrics & Statistics Aggregator (/admin)",
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

  // Production metrics aggregation logic
  function aggregateAdminMetrics({ users = [], assessments = [], certificates = [], forms = {} }) {
    const totalUsers = users.length;
    const verifiedStudents = users.filter((u) => u.is_verified === true && u.user_type === "Student").length;
    const totalAssessments = assessments.length;
    const publishedAssessments = assessments.filter((a) => a.is_published !== false).length;
    const totalCertificates = certificates.length;
    const totalLeads =
      (forms.contact?.length || 0) +
      (forms.internship?.length || 0) +
      (forms.hire?.length || 0) +
      (forms.courseEnroll?.length || 0);

    return {
      totalUsers,
      verifiedStudents,
      totalAssessments,
      publishedAssessments,
      totalCertificates,
      totalLeads,
    };
  }

  const mockData = {
    users: [
      { id: "1", user_type: "Student", is_verified: true },
      { id: "2", user_type: "Student", is_verified: false },
      { id: "3", user_type: "Employee", is_verified: true },
    ],
    assessments: [
      { id: "a1", is_published: true },
      { id: "a2", is_published: true },
      { id: "a3", is_published: false },
    ],
    certificates: [
      { id: "c1", status: "VERIFIED_AUTHENTIC" },
      { id: "c2", status: "VERIFIED_AUTHENTIC" },
    ],
    forms: {
      contact: [1, 2],
      internship: [1],
      hire: [1, 2, 3],
      courseEnroll: [1],
    },
  };

  const metrics = aggregateAdminMetrics(mockData);

  assert(metrics.totalUsers === 3, "Metrics: Total users count is 3");
  assert(metrics.verifiedStudents === 1, "Metrics: Verified students count is 1 (excludes employees)");
  assert(metrics.totalAssessments === 3, "Metrics: Total assessments count is 3");
  assert(metrics.publishedAssessments === 2, "Metrics: Published assessments count is 2 (excludes drafts)");
  assert(metrics.totalCertificates === 2, "Metrics: Total certificates count is 2");
  assert(metrics.totalLeads === 7, "Metrics: Total leads aggregated across all desks is 7 (2+1+3+1)");

  return results;
}
