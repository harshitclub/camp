"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./FormSubmissions.module.css";
import { 
  getAllFormSubmissions, 
  deleteFormSubmission,
  updateFormSubmissionStatus
} from "@/lib/adminService";
import { 
  Inbox, 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from "lucide-react";

const STATUS_CONFIG = {
  contact: [
    { value: "new", label: "New", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
    { value: "contacted", label: "Contacted", color: "#7e22ce", bg: "#f3e8ff", border: "#d8b4fe" },
    { value: "in_progress", label: "In Progress", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
    { value: "resolved", label: "Resolved", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { value: "closed", label: "Closed", color: "#475569", bg: "#f1f5f9", border: "#cbd5e1" },
  ],
  internship: [
    { value: "pending", label: "Pending", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
    { value: "under_review", label: "Under Review", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
    { value: "shortlisted", label: "Shortlisted", color: "#7e22ce", bg: "#f3e8ff", border: "#d8b4fe" },
    { value: "accepted", label: "Accepted", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { value: "rejected", label: "Rejected", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  ],
  hire: [
    { value: "new", label: "New Lead", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
    { value: "contacted", label: "Contacted", color: "#7e22ce", bg: "#f3e8ff", border: "#d8b4fe" },
    { value: "in_discussion", label: "In Discussion", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
    { value: "partnered", label: "Partnered", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { value: "closed", label: "Closed", color: "#475569", bg: "#f1f5f9", border: "#cbd5e1" },
  ],
  "course-enroll": [
    { value: "pending", label: "Pending", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
    { value: "contacted", label: "Contacted", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
    { value: "confirmed", label: "Confirmed", color: "#7e22ce", bg: "#f3e8ff", border: "#d8b4fe" },
    { value: "enrolled", label: "Enrolled", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { value: "cancelled", label: "Cancelled", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  ],
};

function getStatusStyle(type, statusVal) {
  const norm = (statusVal || "").toLowerCase().trim();
  const options = STATUS_CONFIG[type] || STATUS_CONFIG.contact;
  const match = options.find((o) => o.value === norm);
  if (match) return match;

  if (["resolved", "accepted", "enrolled", "partnered", "confirmed"].includes(norm)) {
    return { label: norm, color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" };
  }
  if (["rejected", "cancelled"].includes(norm)) {
    return { label: norm, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  }
  if (["under_review", "shortlisted", "contacted", "in_discussion"].includes(norm)) {
    return { label: norm, color: "#7e22ce", bg: "#f3e8ff", border: "#d8b4fe" };
  }
  if (["pending", "in_progress"].includes(norm)) {
    return { label: norm, color: "#b45309", bg: "#fffbeb", border: "#fde68a" };
  }
  return { label: norm || "New", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" };
}

export default function FormSubmissions() {
  const [data, setData] = useState({
    contact: [],
    internship: [],
    hire: [],
    courseEnroll: [],
  });
  const [counts, setCounts] = useState({
    contact: 0,
    internship: 0,
    hire: 0,
    courseEnroll: 0,
    total: 0,
  });
  const [activeTab, setActiveTab] = useState("contact");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [alert, setAlert] = useState(null);

  // Auto-clear alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllFormSubmissions();
      if (result?.success && result?.data) {
        setData(result.data);
        if (result.counts) {
          setCounts(result.counts);
        }
      }
    } catch (err) {
      console.error("[FormSubmissions] Error loading data:", err);
      setAlert({ type: "error", text: "Failed to load form submissions. Please refresh." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Current active list
  const currentList = useMemo(() => {
    switch (activeTab) {
      case "contact":
        return data.contact || [];
      case "internship":
        return data.internship || [];
      case "hire":
        return data.hire || [];
      case "course-enroll":
        return data.courseEnroll || [];
      default:
        return [];
    }
  }, [activeTab, data]);

  // Filtered list based on search
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return currentList;
    const q = searchQuery.toLowerCase().trim();

    return currentList.filter((item) => {
      const name = (item.full_name || item.contact_name || "").toLowerCase();
      const email = (item.email || item.work_email || "").toLowerCase();
      const phone = (item.phone || "").toLowerCase();
      const comp = (item.company_name || item.college || item.college_or_org || "").toLowerCase();
      const ref = (item.ticket_id || item.application_id || item.inquiry_id || item.registration_id || "").toLowerCase();
      const extra = (item.subject || item.program || item.course_title || item.target_domain || "").toLowerCase();

      return name.includes(q) || email.includes(q) || phone.includes(q) || comp.includes(q) || ref.includes(q) || extra.includes(q);
    });
  }, [currentList, searchQuery]);

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);

    try {
      const ok = await deleteFormSubmission(deletingItem.type, deletingItem.id);
      if (ok) {
        // Update local state immediately
        const keyMap = {
          contact: "contact",
          internship: "internship",
          hire: "hire",
          "course-enroll": "courseEnroll",
        };
        const stateKey = keyMap[deletingItem.type];

        setData((prev) => ({
          ...prev,
          [stateKey]: (prev[stateKey] || []).filter((it) => it.id !== deletingItem.id),
        }));

        setCounts((prev) => ({
          ...prev,
          [stateKey]: Math.max(0, (prev[stateKey] || 1) - 1),
          total: Math.max(0, prev.total - 1),
        }));

        setAlert({
          type: "success",
          text: `Submission (${deletingItem.ref}) deleted successfully.`,
        });

        if (selectedItem?.id === deletingItem.id) {
          setSelectedItem(null);
        }
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (err) {
      console.error("[FormSubmissions] Delete error:", err);
      setAlert({
        type: "error",
        text: "Error deleting submission. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setDeletingItem(null);
    }
  };

  // Handle Dynamic Status Update
  const handleStatusChange = async (type, id, newStatus) => {
    setUpdatingId(id);
    const keyMap = {
      contact: "contact",
      internship: "internship",
      hire: "hire",
      "course-enroll": "courseEnroll",
    };
    const stateKey = keyMap[type] || type;

    // Optimistically update React state so UI reacts instantly
    const prevData = { ...data };
    setData((prev) => ({
      ...prev,
      [stateKey]: (prev[stateKey] || []).map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    }));

    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      const updated = await updateFormSubmissionStatus(type, id, newStatus);
      if (updated) {
        setAlert({
          type: "success",
          text: `Status updated to "${newStatus.replace("_", " ").toUpperCase()}".`,
        });
      } else {
        // Rollback on failure
        setData(prevData);
        setAlert({
          type: "error",
          text: "Could not update status. Please ensure Supabase UPDATE policy is applied.",
        });
      }
    } catch (err) {
      console.error("[FormSubmissions] Status update error:", err);
      setData(prevData);
      setAlert({
        type: "error",
        text: "Error updating status. Please try again.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Export current filtered table to CSV
  const handleExportCSV = () => {
    if (filteredList.length === 0) return;

    const headers = Object.keys(filteredList[0]).filter((k) => k !== "id");
    const csvRows = [];
    csvRows.push(headers.join(","));

    filteredList.forEach((row) => {
      const values = headers.map((header) => {
        const val = row[header] ?? "";
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `campussutras_${activeTab}_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(isoString);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div>
          <div className={styles.headerTag}>
            <Sparkles size={13} />
            <span>CAMPUSSUTRAS LEADS & INQUIRIES</span>
          </div>
          <h1 className={styles.pageTitle}>Form Submissions Management</h1>
          <p className={styles.pageSubtitle}>
            Inspect student registrations, corporate recruitment demands, and general inquiries saved in your Supabase database.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button 
            type="button" 
            onClick={loadData} 
            disabled={isLoading}
            className={styles.actionBtn}
            title="Reload from Supabase"
          >
            <RefreshCw size={15} className={isLoading ? "spin" : ""} />
            <span>Refresh</span>
          </button>

          <button 
            type="button" 
            onClick={handleExportCSV} 
            disabled={filteredList.length === 0}
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            title="Download CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {alert && (
        <div className={`${styles.alertBanner} ${alert.type === "success" ? styles.alertSuccess : styles.alertError}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {alert.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{alert.text}</span>
          </div>
          <button type="button" onClick={() => setAlert(null)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
            <X size={15} />
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className={styles.metricsGrid}>
        <div 
          className={`${styles.metricCard} ${activeTab === "contact" ? styles.metricCardActive : ""}`}
          onClick={() => { setActiveTab("contact"); setSearchQuery(""); }}
        >
          <div className={styles.metricIconWrap} style={{ background: "#e0edff", color: "#0b57d0" }}>
            <MessageSquare size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricCount}>{counts.contact || data.contact?.length || 0}</span>
            <span className={styles.metricLabel}>Contact Inquiries</span>
          </div>
        </div>

        <div 
          className={`${styles.metricCard} ${activeTab === "internship" ? styles.metricCardActive : ""}`}
          onClick={() => { setActiveTab("internship"); setSearchQuery(""); }}
        >
          <div className={styles.metricIconWrap} style={{ background: "#dcfce7", color: "#15803d" }}>
            <GraduationCap size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricCount}>{counts.internship || data.internship?.length || 0}</span>
            <span className={styles.metricLabel}>Internship Applications</span>
          </div>
        </div>

        <div 
          className={`${styles.metricCard} ${activeTab === "hire" ? styles.metricCardActive : ""}`}
          onClick={() => { setActiveTab("hire"); setSearchQuery(""); }}
        >
          <div className={styles.metricIconWrap} style={{ background: "#fef3c7", color: "#b45309" }}>
            <Briefcase size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricCount}>{counts.hire || data.hire?.length || 0}</span>
            <span className={styles.metricLabel}>Corporate Hiring</span>
          </div>
        </div>

        <div 
          className={`${styles.metricCard} ${activeTab === "course-enroll" ? styles.metricCardActive : ""}`}
          onClick={() => { setActiveTab("course-enroll"); setSearchQuery(""); }}
        >
          <div className={styles.metricIconWrap} style={{ background: "#f3e8ff", color: "#7e22ce" }}>
            <BookOpen size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricCount}>{counts.courseEnroll || data.courseEnroll?.length || 0}</span>
            <span className={styles.metricLabel}>Course Registrations</span>
          </div>
        </div>
      </div>

      {/* Main Table Workspace */}
      <div className={styles.workspace}>
        {/* Tab Navigation */}
        <div className={styles.tabBar}>
          <button 
            type="button" 
            className={`${styles.tabBtn} ${activeTab === "contact" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("contact"); setSearchQuery(""); }}
          >
            <MessageSquare size={16} />
            <span>Contact Desk</span>
            <span className={styles.tabPill}>{counts.contact || data.contact?.length || 0}</span>
          </button>

          <button 
            type="button" 
            className={`${styles.tabBtn} ${activeTab === "internship" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("internship"); setSearchQuery(""); }}
          >
            <GraduationCap size={16} />
            <span>Internship Applications</span>
            <span className={styles.tabPill}>{counts.internship || data.internship?.length || 0}</span>
          </button>

          <button 
            type="button" 
            className={`${styles.tabBtn} ${activeTab === "hire" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("hire"); setSearchQuery(""); }}
          >
            <Briefcase size={16} />
            <span>Corporate Hiring Leads</span>
            <span className={styles.tabPill}>{counts.hire || data.hire?.length || 0}</span>
          </button>

          <button 
            type="button" 
            className={`${styles.tabBtn} ${activeTab === "course-enroll" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("course-enroll"); setSearchQuery(""); }}
          >
            <BookOpen size={16} />
            <span>Bootcamp Registrations</span>
            <span className={styles.tabPill}>{counts.courseEnroll || data.courseEnroll?.length || 0}</span>
          </button>
        </div>

        {/* Toolbar with search */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab} leads by name, email, phone, reference ID...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.toolbarMeta}>
            <span>Showing <strong>{filteredList.length}</strong> of <strong>{currentList.length}</strong> submissions</span>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className={styles.tableWrap}>
          {filteredList.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Inbox size={28} />
              </div>
              <h3 className={styles.emptyTitle}>No Submissions Found</h3>
              <p className={styles.emptyDesc}>
                {searchQuery ? `No results match your search query "${searchQuery}".` : `No ${activeTab} submissions have been received yet.`}
              </p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Contact Details</th>
                  {activeTab === "contact" && <th>Subject / Query</th>}
                  {activeTab === "internship" && <th>Program &amp; Academic</th>}
                  {activeTab === "hire" && <th>Company &amp; Openings</th>}
                  {activeTab === "course-enroll" && <th>Selected Bootcamp</th>}
                  <th>Submission Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item) => {
                  const refCode = item.ticket_id || item.application_id || item.inquiry_id || item.registration_id || "REF-ID";
                  const name = item.full_name || item.contact_name || "Applicant";
                  const email = item.email || item.work_email || "N/A";
                  const phone = item.phone || "N/A";

                  return (
                    <tr key={item.id || refCode}>
                      <td>
                        <span className={styles.refCode}>{refCode}</span>
                      </td>

                      <td>
                        <span className={styles.contactName}>{name}</span>
                        <span className={styles.contactSub}>
                          <Mail size={12} /> {email}
                        </span>
                        <span className={styles.contactSub}>
                          <Phone size={12} /> {phone}
                        </span>
                      </td>

                      {/* Tab 1: Contact Details */}
                      {activeTab === "contact" && (
                        <td>
                          <strong style={{ color: "#091e42", fontSize: "0.85rem", display: "block" }}>
                            {item.subject || "Admission Inquiry"}
                          </strong>
                          <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                            {item.message?.length > 60 ? `${item.message.slice(0, 60)}...` : item.message}
                          </span>
                        </td>
                      )}

                      {/* Tab 2: Internship Details */}
                      {activeTab === "internship" && (
                        <td>
                          <strong style={{ color: "#15803d", fontSize: "0.85rem", display: "block" }}>
                            {item.program}
                          </strong>
                          <span style={{ color: "#475569", fontSize: "0.8rem", display: "block" }}>
                            {item.college}
                          </span>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                            {item.year_of_study} • {item.branch || "General"}
                          </span>
                        </td>
                      )}

                      {/* Tab 3: Corporate Hiring Details */}
                      {activeTab === "hire" && (
                        <td>
                          <strong style={{ color: "#091e42", fontSize: "0.85rem", display: "block" }}>
                            {item.company_name}
                          </strong>
                          <span style={{ color: "#b45309", fontSize: "0.8rem", display: "block" }}>
                            {item.target_domain} ({item.openings_count || "Hires"})
                          </span>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                            {item.employment_type} • {item.work_mode || "Location"}
                          </span>
                        </td>
                      )}

                      {/* Tab 4: Course Registration Details */}
                      {activeTab === "course-enroll" && (
                        <td>
                          <strong style={{ color: "#7e22ce", fontSize: "0.85rem", display: "block" }}>
                            {item.course_title}
                          </strong>
                          <span style={{ color: "#475569", fontSize: "0.8rem", display: "block" }}>
                            {item.college_or_org} ({item.graduation_year || "2026"})
                          </span>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                            Slot: {item.batch_preference}
                          </span>
                        </td>
                      )}

                      <td>
                        <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          {formatDate(item.created_at)}
                        </span>
                      </td>

                      <td>
                        {(() => {
                          const statusStyle = getStatusStyle(activeTab, item.status);
                          const options = STATUS_CONFIG[activeTab] || STATUS_CONFIG.contact;
                          const currentVal = (item.status || options[0].value).toLowerCase();

                          return (
                            <div className={styles.statusSelectWrap}>
                              <select
                                value={currentVal}
                                onChange={(e) => handleStatusChange(activeTab, item.id, e.target.value)}
                                disabled={updatingId === item.id}
                                className={styles.statusSelect}
                                style={{
                                  color: statusStyle.color,
                                  backgroundColor: statusStyle.bg,
                                  borderColor: statusStyle.border,
                                }}
                                title="Click to change status"
                              >
                                {options.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              {updatingId === item.id && (
                                <span className={styles.statusSpinner} title="Updating in Supabase..." />
                              )}
                            </div>
                          );
                        })()}
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className={styles.actionGroup} style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedItem({ ...item, _tab: activeTab })}
                            className={styles.iconBtn}
                            title="Inspect full details"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingItem({ id: item.id, type: activeTab, ref: refCode, name })}
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                            title="Delete this submission"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 1. VIEW SUBMISSION DETAILS MODAL                                    */}
      {/* ------------------------------------------------------------------- */}
      {selectedItem && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <Eye size={18} color="#0b57d0" />
                <span>Submission Details</span>
                <span className={styles.refCode}>
                  {selectedItem.ticket_id || selectedItem.application_id || selectedItem.inquiry_id || selectedItem.registration_id}
                </span>
              </div>
              <button type="button" onClick={() => setSelectedItem(null)} className={styles.closeBtn}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Full Name / Contact</span>
                  <span className={styles.detailVal}>
                    {selectedItem.full_name || selectedItem.contact_name}
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email Address</span>
                  <span className={styles.detailVal}>
                    <a href={`mailto:${selectedItem.email || selectedItem.work_email}`} style={{ color: "#0b57d0" }}>
                      {selectedItem.email || selectedItem.work_email}
                    </a>
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Phone / WhatsApp</span>
                  <span className={styles.detailVal}>
                    <a href={`tel:${selectedItem.phone}`} style={{ color: "#0b57d0" }}>
                      {selectedItem.phone}
                    </a>
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Submission Timestamp</span>
                  <span className={styles.detailVal}>{formatDate(selectedItem.created_at)}</span>
                </div>

                {/* Interactive Status Changer in Modal */}
                {(() => {
                  const modalTab = selectedItem._tab || activeTab;
                  const modalOptions = STATUS_CONFIG[modalTab] || STATUS_CONFIG.contact;
                  const modalStyle = getStatusStyle(modalTab, selectedItem.status);
                  const currentModalVal = (selectedItem.status || modalOptions[0].value).toLowerCase();

                  return (
                    <div
                      className={styles.detailItem}
                      style={{
                        gridColumn: "1 / -1",
                        background: "#f8fafc",
                        padding: "0.85rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <span className={styles.detailLabel} style={{ marginBottom: "2px" }}>Submission Workflow Status</span>
                        <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          Change this lead's lifecycle status in database:
                        </span>
                      </div>

                      <div className={styles.statusSelectWrap}>
                        <select
                          value={currentModalVal}
                          onChange={(e) => handleStatusChange(modalTab, selectedItem.id, e.target.value)}
                          disabled={updatingId === selectedItem.id}
                          className={styles.statusSelect}
                          style={{
                            color: modalStyle.color,
                            backgroundColor: modalStyle.bg,
                            borderColor: modalStyle.border,
                            fontSize: "12px",
                            padding: "6px 26px 6px 10px",
                          }}
                          title="Click to update status"
                        >
                          {modalOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {updatingId === selectedItem.id && (
                          <span className={styles.statusSpinner} title="Updating in Supabase..." />
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Specific Tab Attributes */}
                {selectedItem.subject && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Subject Domain</span>
                    <span className={styles.detailVal}>{selectedItem.subject}</span>
                  </div>
                )}

                {selectedItem.program && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Internship Program</span>
                    <span className={styles.detailVal} style={{ color: "#15803d" }}>
                      {selectedItem.program}
                    </span>
                  </div>
                )}

                {selectedItem.college && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>College / University</span>
                    <span className={styles.detailVal}>{selectedItem.college}</span>
                  </div>
                )}

                {selectedItem.year_of_study && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Year of Study</span>
                    <span className={styles.detailVal}>{selectedItem.year_of_study} ({selectedItem.branch || "General"})</span>
                  </div>
                )}

                {selectedItem.company_name && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Company Name</span>
                    <span className={styles.detailVal}>{selectedItem.company_name}</span>
                  </div>
                )}

                {selectedItem.company_website && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Company Website</span>
                    <span className={styles.detailVal}>
                      <a href={selectedItem.company_website} target="_blank" rel="noreferrer" style={{ color: "#0b57d0" }}>
                        {selectedItem.company_website}
                      </a>
                    </span>
                  </div>
                )}

                {selectedItem.target_domain && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Hiring Domain</span>
                    <span className={styles.detailVal}>{selectedItem.target_domain}</span>
                  </div>
                )}

                {selectedItem.openings_count && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Target Openings</span>
                    <span className={styles.detailVal}>{selectedItem.openings_count} ({selectedItem.employment_type})</span>
                  </div>
                )}

                {selectedItem.compensation_range && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Offered CTC / Budget</span>
                    <span className={styles.detailVal}>{selectedItem.compensation_range}</span>
                  </div>
                )}

                {selectedItem.course_title && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Course Track</span>
                    <span className={styles.detailVal} style={{ color: "#7e22ce" }}>{selectedItem.course_title}</span>
                  </div>
                )}

                {selectedItem.batch_preference && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Batch Slot</span>
                    <span className={styles.detailVal}>{selectedItem.batch_preference}</span>
                  </div>
                )}
              </div>

              {/* Message or Job Description */}
              {(selectedItem.message || selectedItem.job_description) && (
                <div className={styles.messageBox}>
                  <span className={styles.messageBoxTitle}>
                    {selectedItem.job_description ? "Role & Skill Requirements" : "Message / Query"}
                  </span>
                  <p className={styles.messageBoxContent}>
                    {selectedItem.message || selectedItem.job_description}
                  </p>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => {
                  setDeletingItem({
                    id: selectedItem.id,
                    type: selectedItem._tab || activeTab,
                    ref: selectedItem.ticket_id || selectedItem.application_id || selectedItem.inquiry_id || selectedItem.registration_id,
                    name: selectedItem.full_name || selectedItem.contact_name,
                  });
                }}
                className={`${styles.actionBtn} ${styles.iconBtnDanger}`}
                style={{ color: "#dc2626" }}
              >
                <Trash2 size={16} />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="btn btn-secondary"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 2. PERMANENT DELETE CONFIRMATION DIALOG                             */}
      {/* ------------------------------------------------------------------- */}
      {deletingItem && (
        <div className={styles.modalBackdrop} onClick={() => !isDeleting && setDeletingItem(null)}>
          <div className={`${styles.modalCard} ${styles.deleteDialog}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}>
              <Trash2 size={26} />
            </div>

            <h3 className={styles.deleteDialogTitle}>Delete Submission?</h3>
            <p className={styles.deleteDialogDesc}>
              Are you sure you want to permanently delete the submission for <strong>{deletingItem.name}</strong> (<code>{deletingItem.ref}</code>)?
              This action will remove the record from your Supabase database and cannot be undone.
            </p>

            <div className={styles.deleteActions}>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingItem(null)}
                className="btn btn-secondary"
                style={{ padding: "0.6rem 1.25rem" }}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="btn btn-primary"
                style={{ background: "#dc2626", borderColor: "#dc2626", padding: "0.6rem 1.25rem" }}
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
