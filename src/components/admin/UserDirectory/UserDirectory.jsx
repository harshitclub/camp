"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./UserDirectory.module.css";
import { 
  getAllUsers, 
  updateUserByAdmin, 
  getAllAttempts 
} from "@/lib/adminService";
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  Edit3, 
  Award, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  Building2,
  GraduationCap,
  Phone,
  Mail,
  UserCheck,
  UserX,
  FileText,
  BookOpen,
  Globe,
  Link2,
  RotateCw,
  Download,
  FileSpreadsheet,
  ChevronDown
} from "lucide-react";

export default function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "verified", "pending"
  const [personaFilter, setPersonaFilter] = useState("all"); // "all", "Student", "Employee", "Working Professional"

  // Pagination State (Display 10 users per page)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Export State
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Modals state
  const [editingUser, setEditingUser] = useState(null);
  const [auditUser, setAuditUser] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [uList, aList] = await Promise.all([
        getAllUsers(),
        getAllAttempts(),
      ]);
      setUsers(uList || []);
      setAttempts(aList || []);
    } catch (e) {
      console.error("[UserDirectory] Error loading users:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, personaFilter]);

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const name = (u.full_name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const college = (u.college_name || "").toLowerCase();
      const company = (u.company || "").toLowerCase();
      const course = (u.course || u.degree_branch || "").toLowerCase();
      const phone = (u.phone || "").toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch = !query || name.includes(query) || email.includes(query) || college.includes(query) || company.includes(query) || course.includes(query) || phone.includes(query);

      let matchesStatus = true;
      if (statusFilter === "verified") matchesStatus = Boolean(u.is_verified);
      if (statusFilter === "pending") matchesStatus = !u.is_verified;

      let matchesPersona = true;
      if (personaFilter !== "all") {
        if (personaFilter === "Employee") {
          matchesPersona = u.user_type === "Employee" || u.user_type === "Working Professional";
        } else {
          matchesPersona = u.user_type === personaFilter;
        }
      }

      return matchesSearch && matchesStatus && matchesPersona;
    });
  }, [users, searchQuery, statusFilter, personaFilter]);

  // Paginated Users List
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIdx, startIdx + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Quick Toggle Verification
  const handleToggleVerification = async (userToToggle) => {
    const newStatus = !userToToggle.is_verified;
    try {
      await updateUserByAdmin(userToToggle.id, { is_verified: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === userToToggle.id ? { ...u, is_verified: newStatus } : u))
      );
      showNotification(`Verification status for ${userToToggle.full_name} updated to ${newStatus ? "Verified" : "Pending"}.`);
    } catch (err) {
      console.error("[UserDirectory] Toggle verification error:", err);
    }
  };

  // Export Users in CSV or XLS
  const handleExportUsers = (format = "csv") => {
    setShowExportMenu(false);
    if (filteredUsers.length === 0) {
      showNotification("No member records to export.");
      return;
    }

    const exportData = filteredUsers.map((u) => {
      const userAtts = getUserAttempts(u);
      const isVerified = u.is_verified ? "Verified Authentic" : "Pending Verification";
      const role = u.is_admin ? "Administrator" : "Standard Member";
      const affiliation = (u.user_type === "Employee" || u.user_type === "Working Professional") 
        ? (u.company || "Company not specified") 
        : (u.college_name || "College not specified");
      const regDate = u.created_at ? new Date(u.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

      return {
        name: u.full_name || "Anonymous",
        email: u.email || "N/A",
        phone: u.phone || "N/A",
        userType: u.user_type || "Student",
        affiliation,
        course: u.course || u.degree_branch || "General",
        verification: isVerified,
        role,
        testsTaken: userAtts.length,
        github: u.github_url || "N/A",
        linkedin: u.linkedin_url || "N/A",
        registeredAt: regDate
      };
    });

    const timestamp = new Date().toISOString().slice(0, 10);

    if (format === "xls") {
      const tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"></head>
        <body>
          <table border="1">
            <thead>
              <tr style="background-color: #002255; color: #ffffff; font-weight: bold;">
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th>College / Company</th>
                <th>Course / Specialization</th>
                <th>Verification Status</th>
                <th>Clearance Role</th>
                <th>Tests Completed</th>
                <th>GitHub Profile</th>
                <th>LinkedIn Profile</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              ${exportData.map(d => `
                <tr>
                  <td>${d.name}</td>
                  <td>${d.email}</td>
                  <td>${d.phone}</td>
                  <td>${d.userType}</td>
                  <td>${d.affiliation}</td>
                  <td>${d.course}</td>
                  <td>${d.verification}</td>
                  <td>${d.role}</td>
                  <td>${d.testsTaken}</td>
                  <td>${d.github}</td>
                  <td>${d.linkedin}</td>
                  <td>${d.registeredAt}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;
      const blob = new Blob([tableHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `campussutras_users_${timestamp}.xls`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification(`Exported ${filteredUsers.length} members to Excel (.xls).`);
    } else {
      const headers = [
        "Full Name",
        "Email Address",
        "Phone Number",
        "User Type",
        "College / Company",
        "Course / Specialization",
        "Verification Status",
        "Clearance Role",
        "Tests Completed",
        "GitHub Profile",
        "LinkedIn Profile",
        "Registration Date"
      ];

      const rows = exportData.map(d => [
        `"${d.name.replace(/"/g, '""')}"`,
        `"${d.email.replace(/"/g, '""')}"`,
        `"${d.phone.replace(/"/g, '""')}"`,
        `"${d.userType.replace(/"/g, '""')}"`,
        `"${d.affiliation.replace(/"/g, '""')}"`,
        `"${d.course.replace(/"/g, '""')}"`,
        `"${d.verification.replace(/"/g, '""')}"`,
        `"${d.role.replace(/"/g, '""')}"`,
        d.testsTaken,
        `"${d.github.replace(/"/g, '""')}"`,
        `"${d.linkedin.replace(/"/g, '""')}"`,
        `"${d.registeredAt.replace(/"/g, '""')}"`
      ].join(","));

      const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `campussutras_users_${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification(`Exported ${filteredUsers.length} members to CSV.`);
    }
  };

  // Save Edit Profile Modal
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSaving(true);

    try {
      await updateUserByAdmin(editingUser.id, editingUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...editingUser } : u))
      );
      setEditingUser(null);
      showNotification(`Profile for ${editingUser.full_name} updated successfully.`);
    } catch (err) {
      console.error("[UserDirectory] Update profile error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const showNotification = (msg) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  // Get Attempts for a specific user (robust matching by user.id or user.email)
  const getUserAttempts = (targetUser) => {
    if (!targetUser) return [];
    const targetId = typeof targetUser === "object" ? targetUser.id : targetUser;
    const targetEmail = typeof targetUser === "object" ? targetUser.email : null;

    return attempts.filter((a) => {
      if (!a) return false;
      const aUserId = String(a.user_id || "").toLowerCase();
      const aUserEmail = String(a.user_email || a.email || "").toLowerCase();
      
      const matchId = targetId && aUserId === String(targetId).toLowerCase();
      const matchEmail = targetEmail && (
        aUserEmail === String(targetEmail).toLowerCase() || 
        aUserId === String(targetEmail).toLowerCase()
      );
      return Boolean(matchId || matchEmail);
    });
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>User &amp; Student Directory</h1>
          <p className={styles.subtitle}>
            Audit registered members, inspect verification credentials, and review individual assessment transcripts.
          </p>
        </div>

        <div className={styles.statBadges}>
          <div className={styles.statBadge}>
            <Users size={15} />
            <span><strong>{users.length}</strong> Total Members</span>
          </div>
          <div className={styles.statBadge}>
            <ShieldCheck size={15} color="#059669" />
            <span><strong>{users.filter(u => u.is_verified).length}</strong> Verified</span>
          </div>

          {/* Export Dropdown */}
          <div className={styles.exportContainer}>
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={filteredUsers.length === 0}
              className={styles.exportBtn}
              title="Export members directory"
            >
              <Download size={14} />
              <span>Export Users</span>
              <ChevronDown size={13} />
            </button>

            {showExportMenu && (
              <div className={styles.exportMenu}>
                <button
                  type="button"
                  onClick={() => handleExportUsers("csv")}
                  className={styles.exportMenuItem}
                >
                  <FileText size={14} color="#0b57d0" />
                  <span>Export CSV (.csv)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportUsers("xls")}
                  className={styles.exportMenuItem}
                >
                  <FileSpreadsheet size={14} color="#15803d" />
                  <span>Export Excel (.xls)</span>
                </button>
              </div>
            )}
          </div>

          <button 
            type="button" 
            onClick={loadData} 
            className={styles.refreshBtn}
            title="Refresh User Directory from Database"
            disabled={isLoading}
          >
            <RotateCw size={14} style={{ animation: isLoading ? "spin 0.8s linear infinite" : "none" }} />
            <span>{isLoading ? "Syncing..." : "Sync Directory"}</span>
          </button>
        </div>
      </div>


      {/* Action Notification */}
      {actionSuccessMsg && (
        <div className={styles.notification}>
          <CheckCircle2 size={16} />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Controls Bar: Search & Filters */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, email, college, company, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery("")}
              className={styles.clearSearchBtn}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.selectWrapper}>
            <Filter size={14} className={styles.selectIcon} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.selectFilter}
            >
              <option value="all">All Verification Status</option>
              <option value="verified">Verified Authentic</option>
              <option value="pending">Verification Pending</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select
              value={personaFilter}
              onChange={(e) => setPersonaFilter(e.target.value)}
              className={styles.selectFilter}
            >
              <option value="all">All User Types</option>
              <option value="Student">Students Only</option>
              <option value="Employee">Employees / Professionals</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Directory Table Card */}
      <div className={styles.tableCard}>
        {isLoading ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <span>Loading user directory...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <Users size={36} className={styles.emptyIcon} />
            <h3>No Members Found</h3>
            <p>No user records matched your filter criteria.</p>
            <button 
              type="button" 
              onClick={() => { setSearchQuery(""); setStatusFilter("all"); setPersonaFilter("all"); }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Member Info</th>
                    <th>User Type</th>
                    <th>College / Company</th>
                    <th>Course</th>
                    <th>Verification</th>
                    <th>Transcripts</th>
                    <th className={styles.actionsTh}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((u) => {
                    const userAtts = getUserAttempts(u);
                    const isVerified = Boolean(u.is_verified);
                    const isAdmin = Boolean(u.is_admin);
                    const isEmployee = u.user_type === "Employee" || u.user_type === "Working Professional";
                    const affiliation = isEmployee ? (u.company || "Company not specified") : (u.college_name || "College not specified");
                    const courseName = u.course || u.degree_branch || "General";

                    return (
                      <tr key={u.id} className={styles.tableRow}>
                        {/* Name & Email */}
                        <td>
                          <div className={styles.userMainCell}>
                            <div className={styles.avatarPill}>
                              {(u.full_name || "U").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className={styles.userNameRow}>
                                <span className={styles.userName}>{u.full_name || "Anonymous User"}</span>
                                {isAdmin && <span className={styles.adminTag}>Admin</span>}
                              </div>
                              <span className={styles.userEmail}>{u.email || "No email"}</span>
                              {u.phone && <span className={styles.userPhone}>{u.phone}</span>}
                            </div>
                          </div>
                        </td>

                        {/* User Type / Persona */}
                        <td>
                          <span className={`${styles.personaPill} ${styles[`persona_${(u.user_type || "Student").replace(/\s+/g, "_")}`] || styles.persona_Student}`}>
                            {u.user_type || "Student"}
                          </span>
                        </td>

                        {/* College or Company */}
                        <td>
                          <div className={styles.collegeCell}>
                            <span className={styles.collegeName}>{affiliation}</span>
                            <span className={styles.affiliationType}>{isEmployee ? "Company" : "Institution"}</span>
                          </div>
                        </td>

                        {/* Course */}
                        <td>
                          <div className={styles.branchCell}>
                            <span className={styles.courseText}>{courseName}</span>
                          </div>
                        </td>

                        {/* Verification Status */}
                        <td>
                          {isVerified ? (
                            <span className={styles.verifiedBadge}>
                              <ShieldCheck size={13} />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className={styles.pendingBadge}>
                              <ShieldAlert size={13} />
                              <span>Pending</span>
                            </span>
                          )}
                        </td>

                        {/* Transcripts Taken Count */}
                        <td>
                          <button
                            type="button"
                            onClick={() => setAuditUser(u)}
                            className={styles.transcriptsBtn}
                            title="View Test Attempts Audit"
                          >
                            <Award size={14} />
                            <span>{userAtts.length} Test{userAtts.length === 1 ? "" : "s"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className={styles.actionsCell}>
                            <button
                              type="button"
                              onClick={() => handleToggleVerification(u)}
                              className={`${styles.iconActionBtn} ${isVerified ? styles.btnRevoke : styles.btnVerify}`}
                              title={isVerified ? "Revoke Verification" : "Mark as Verified"}
                            >
                              {isVerified ? <UserX size={15} /> : <UserCheck size={15} />}
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingUser({ ...u, course: u.course || u.degree_branch || "" })}
                              className={`${styles.iconActionBtn} ${styles.btnEdit}`}
                              title="Edit Member Profile"
                            >
                              <Edit3 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationBar}>
              <div className={styles.paginationInfo}>
                Showing <strong>{Math.min((currentPage - 1) * pageSize + 1, filteredUsers.length)}</strong>–<strong>{Math.min(currentPage * pageSize, filteredUsers.length)}</strong> of <strong>{filteredUsers.length}</strong> members
              </div>

              {totalPages > 1 && (
                <div className={styles.paginationControls}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={styles.pageBtn}
                    title="Previous Page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (
                      totalPages > 7 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      Math.abs(pageNum - currentPage) > 2
                    ) {
                      if (pageNum === 2 || pageNum === totalPages - 1) {
                        return <span key={pageNum} className={styles.pageEllipsis}>...</span>;
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`${styles.pageBtn} ${currentPage === pageNum ? styles.pageBtnActive : ""}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={styles.pageBtn}
                    title="Next Page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal 1: Edit User Profile Modal */}
      {editingUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Edit Member Profile</h3>
                <p className={styles.modalSubtitle}>Update profile details and administrative permissions.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setEditingUser(null)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className={styles.modalForm}>
              <div className={styles.formGrid}>
                {/* Full Name */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>Full Name <span className={styles.reqStar}>*</span></label>
                  <input
                    type="text"
                    value={editingUser.full_name || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                    className={styles.formInput}
                    required
                  />
                </div>

                {/* User Type */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>User Type</label>
                  <select
                    value={editingUser.user_type || "Student"}
                    onChange={(e) => setEditingUser({ ...editingUser, user_type: e.target.value })}
                    className={styles.formSelect}
                  >
                    <option value="Student">Student (College / University)</option>
                    <option value="Employee">Employee (Corporate / Industry)</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Job Seeker">Job Seeker / Fresher</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>Phone Number</label>
                  <input
                    type="text"
                    value={editingUser.phone || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={styles.formInput}
                  />
                </div>

                {/* Conditional College or Company */}
                {(editingUser.user_type === "Employee" || editingUser.user_type === "Working Professional") ? (
                  <div className={styles.inputGroup}>
                    <label className={styles.formLabel}>Company / Organization</label>
                    <input
                      type="text"
                      value={editingUser.company || ""}
                      onChange={(e) => setEditingUser({ ...editingUser, company: e.target.value })}
                      placeholder="e.g. Google, Infosys, Tech Corp"
                      className={styles.formInput}
                    />
                  </div>
                ) : (
                  <div className={styles.inputGroup}>
                    <label className={styles.formLabel}>College / University Name</label>
                    <input
                      type="text"
                      value={editingUser.college_name || ""}
                      onChange={(e) => setEditingUser({ ...editingUser, college_name: e.target.value })}
                      placeholder="e.g. IIT Delhi, DTU"
                      className={styles.formInput}
                    />
                  </div>
                )}

                {/* Course */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>Course / Specialization</label>
                  <input
                    type="text"
                    value={editingUser.course || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, course: e.target.value })}
                    placeholder="e.g. B.Tech Computer Science, Full Stack Web Dev"
                    className={styles.formInput}
                  />
                </div>

                {/* GitHub */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>GitHub URL</label>
                  <input
                    type="url"
                    value={editingUser.github_url || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, github_url: e.target.value })}
                    placeholder="https://github.com/username"
                    className={styles.formInput}
                  />
                </div>

                {/* LinkedIn */}
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>LinkedIn URL</label>
                  <input
                    type="url"
                    value={editingUser.linkedin_url || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Checkbox Toggles */}
              <div className={styles.togglesBox}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingUser.is_verified)}
                    onChange={(e) => setEditingUser({ ...editingUser, is_verified: e.target.checked })}
                  />
                  <span>Mark as <strong>Verified Authentic Member</strong></span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingUser.is_admin)}
                    onChange={(e) => setEditingUser({ ...editingUser, is_admin: e.target.checked })}
                  />
                  <span>Grant <strong>Administrator Clearance</strong></span>
                </label>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary"
                >
                  <Save size={15} />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Student Assessment Audit Modal */}
      {auditUser && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalCard} ${styles.auditModalCard}`}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Assessment History Audit</h3>
                <p className={styles.modalSubtitle}>
                  Evaluation transcripts for <strong>{auditUser.full_name}</strong> ({auditUser.email || auditUser.id})
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setAuditUser(null)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.auditBody}>
              {getUserAttempts(auditUser).length === 0 ? (
                <div className={styles.emptyAuditBox}>
                  <Award size={36} color="#94a3b8" />
                  <h4>No Assessments Taken Yet</h4>
                  <p>This member has not completed any technical evaluations in the portal.</p>
                </div>
              ) : (
                <div className={styles.auditTableWrapper}>
                  <table className={styles.auditTable}>
                    <thead>
                      <tr>
                        <th>Assessment Module</th>
                        <th>Category</th>
                        <th>Score &amp; Accuracy</th>
                        <th>Status</th>
                        <th>Submitted Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUserAttempts(auditUser).map((att, i) => (
                        <tr key={att.id || i}>
                          <td>
                            <strong>{att.assessment_title || att.title || "Technical Assessment"}</strong>
                          </td>
                          <td>
                            <span className={styles.catBadge}>{att.category_name || "General"}</span>
                          </td>
                          <td>
                            <div className={styles.scoreRow}>
                              <span>{att.score || 0}/{att.total_questions || 15}</span>
                              <span className={styles.scorePct}>({att.percentage || 0}%)</span>
                            </div>
                          </td>
                          <td>
                            {att.is_passed ? (
                              <span className={styles.verifiedBadge}>
                                <CheckCircle2 size={12} />
                                <span>Passed</span>
                              </span>
                            ) : (
                              <span className={styles.pendingBadge}>
                                <AlertCircle size={12} />
                                <span>Failed</span>
                              </span>
                            )}
                          </td>
                          <td className={styles.dateCell}>
                            {att.submitted_at 
                              ? new Date(att.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                              : "Recent"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setAuditUser(null)}
                className="btn btn-secondary"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
