/**
 * 04 - Admin User Directory Filtering & Management Unit Tests (/admin/users)
 */

export function runUserDirectoryManagementTests() {
  const results = {
    name: "Admin User Directory & Verification Management (/admin/users)",
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

  const sampleUsers = [
    {
      id: "u1",
      full_name: "Aman Gupta",
      email: "aman@tulas.edu.in",
      user_type: "Student",
      college_name: "Tulas Institute",
      is_verified: true,
      is_admin: false,
    },
    {
      id: "u2",
      full_name: "Pooja Verma",
      email: "pooja@gmail.com",
      user_type: "Student",
      college_name: "Graphic Era Hill University",
      is_verified: false,
      is_admin: false,
    },
    {
      id: "u3",
      full_name: "Rajesh Sharma",
      email: "rajesh@techcorp.com",
      user_type: "Employee",
      company: "TechCorp Labs",
      is_verified: true,
      is_admin: false,
    },
    {
      id: "u4",
      full_name: "System Administrator",
      email: "admin@campussutras.com",
      user_type: "Employee",
      is_verified: true,
      is_admin: true,
    },
  ];

  // User filter function
  function filterUsers(users, search, roleFilter, verificationFilter) {
    return users.filter((u) => {
      // 1. Role filter
      if (roleFilter === "admin" && !u.is_admin) return false;
      if (roleFilter && roleFilter !== "all" && roleFilter !== "admin" && u.user_type !== roleFilter) return false;

      // 2. Verification filter
      if (verificationFilter === "verified" && !u.is_verified) return false;
      if (verificationFilter === "pending" && u.is_verified) return false;

      // 3. Search query
      if (!search || !search.trim()) return true;
      const q = search.toLowerCase().trim();
      return (
        (u.full_name && u.full_name.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.college_name && u.college_name.toLowerCase().includes(q)) ||
        (u.company && u.company.toLowerCase().includes(q))
      );
    });
  }

  // 1. Search Query
  const tulasUsers = filterUsers(sampleUsers, "Tulas", "all", "all");
  assert(
    tulasUsers.length === 1 && tulasUsers[0].full_name === "Aman Gupta",
    "User Directory: Search query 'Tulas' returns Aman Gupta"
  );

  // 2. Role Filter: Students only
  const studentList = filterUsers(sampleUsers, "", "Student", "all");
  assert(
    studentList.length === 2 && studentList.every((u) => u.user_type === "Student"),
    "User Directory: Role filter 'Student' returns 2 students"
  );

  // 3. Verification Filter: Pending only
  const pendingList = filterUsers(sampleUsers, "", "all", "pending");
  assert(
    pendingList.length === 1 && pendingList[0].full_name === "Pooja Verma",
    "User Directory: Verification filter 'pending' returns Pooja Verma"
  );

  // 4. Role Filter: Admin only
  const adminList = filterUsers(sampleUsers, "", "admin", "all");
  assert(
    adminList.length === 1 && adminList[0].is_admin === true,
    "User Directory: Role filter 'admin' returns 1 administrator"
  );

  return results;
}
