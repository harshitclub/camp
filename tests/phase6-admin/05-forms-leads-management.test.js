/**
 * 05 - Admin Forms Desk Submissions Management Unit Tests (/admin/forms)
 */

export function runFormsLeadsManagementTests() {
  const results = {
    name: "Admin Forms Desk Submissions Management (/admin/forms)",
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

  // Lead status badge theme token resolver
  function getLeadStatusBadge(status) {
    const s = (status || "new").toLowerCase();
    switch (s) {
      case "new":
        return { label: "New Lead", color: "#0b57d0", bg: "#e8f0fe" };
      case "reviewed":
        return { label: "Under Review", color: "#d97706", bg: "#fef3c7" };
      case "contacted":
        return { label: "Contacted", color: "#059669", bg: "#d1fae5" };
      case "pending":
        return { label: "Pending", color: "#64748b", bg: "#f1f5f9" };
      default:
        return { label: status, color: "#64748b", bg: "#f1f5f9" };
    }
  }

  assert(
    getLeadStatusBadge("new").label === "New Lead" && getLeadStatusBadge("new").color === "#0b57d0",
    "Forms Desk: 'new' status resolves to Blue 'New Lead' badge"
  );

  assert(
    getLeadStatusBadge("contacted").label === "Contacted" && getLeadStatusBadge("contacted").color === "#059669",
    "Forms Desk: 'contacted' status resolves to Green 'Contacted' badge"
  );

  assert(
    getLeadStatusBadge("reviewed").label === "Under Review" && getLeadStatusBadge("reviewed").color === "#d97706",
    "Forms Desk: 'reviewed' status resolves to Amber 'Under Review' badge"
  );

  // Search filter across submissions
  const sampleLeads = [
    { id: "1", full_name: "Anita Roy", email: "anita@gmail.com", subject: "Admissions" },
    { id: "2", full_name: "Deepak Joshi", email: "deepak@tech.com", company_name: "Tech Solutions" },
  ];

  function searchLeads(leads, query) {
    if (!query || !query.trim()) return leads;
    const q = query.toLowerCase().trim();
    return leads.filter(
      (l) =>
        (l.full_name && l.full_name.toLowerCase().includes(q)) ||
        (l.contact_name && l.contact_name.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.work_email && l.work_email.toLowerCase().includes(q)) ||
        (l.company_name && l.company_name.toLowerCase().includes(q)) ||
        (l.subject && l.subject.toLowerCase().includes(q))
    );
  }

  const anitaMatches = searchLeads(sampleLeads, "Anita");
  assert(
    anitaMatches.length === 1 && anitaMatches[0].full_name === "Anita Roy",
    "Forms Desk: Search query 'Anita' finds matching lead"
  );

  return results;
}
