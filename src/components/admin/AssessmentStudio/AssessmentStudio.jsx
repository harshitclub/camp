"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./AssessmentStudio.module.css";
import { 
  getAllAssessments, 
  getAllCategories, 
  saveCustomCategory, 
  saveAssessment, 
  deleteAssessment 
} from "@/lib/adminService";
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Filter, 
  FolderPlus, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Save, 
  Layers, 
  Code2, 
  Brain, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react";
import { getPaginationRange } from "@/lib/pagination";

export default function AssessmentStudio() {
  const [assessments, setAssessments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Category Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#0b57d0",
    badgeBg: "#f0f5fc",
  });
  const [categorySaving, setCategorySaving] = useState(false);

  // Delete Assessment Modal State
  const [deletingAssessment, setDeletingAssessment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification Banner
  const [notificationMsg, setNotificationMsg] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [aList, cList] = await Promise.all([
        getAllAssessments(),
        getAllCategories(),
      ]);
      setAssessments(aList || []);
      setCategories(cList || []);
    } catch (e) {
      console.error("[AssessmentStudio] Load error:", e);
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
  }, [searchQuery, selectedCategory]);

  const showNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(""), 4000);
  };

  // Filtered Assessments
  const filteredAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const title = (a.title || "").toLowerCase();
      const desc = (a.description || "").toLowerCase();
      const cat = (a.category_name || "").toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || cat.includes(query);
      const matchesCategory = selectedCategory === "all" || a.category_id === selectedCategory || a.category_slug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [assessments, searchQuery, selectedCategory]);

  // Paginated Sliced List
  const totalPages = Math.ceil(filteredAssessments.length / pageSize) || 1;
  const paginatedAssessments = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredAssessments.slice(startIdx, startIdx + pageSize);
  }, [filteredAssessments, currentPage, pageSize]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredAssessments.length === 0) {
      showNotification("No assessment records to export.");
      return;
    }

    const headers = [
      "Assessment Title",
      "Slug / Identifier",
      "Category Name",
      "Category Slug",
      "Difficulty",
      "Question Target (N)",
      "Available Questions",
      "Duration (Mins)",
      "Passing Percentage (%)",
      "Status",
      "Description",
      "Created Date"
    ];

    const rows = filteredAssessments.map((a) => {
      const qCount = a.questions?.length || a.total_questions || 15;
      const isPublished = a.is_published !== false ? "Published" : "Draft";
      return [
        `"${(a.title || "").replace(/"/g, '""')}"`,
        `"${(a.slug || a.id || "").replace(/"/g, '""')}"`,
        `"${(a.category_name || "General").replace(/"/g, '""')}"`,
        `"${(a.category_slug || a.category_id || "").replace(/"/g, '""')}"`,
        `"${(a.difficulty || "Intermediate").replace(/"/g, '""')}"`,
        a.target_questions || 15,
        qCount,
        a.duration_minutes || 15,
        `${a.passing_percentage || 60}%`,
        `"${isPublished}"`,
        `"${(a.description || "").replace(/"/g, '""')}"`,
        `"${a.created_at ? new Date(a.created_at).toISOString().split("T")[0] : "N/A"}"`
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `campussutras_assessments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(`Exported ${filteredAssessments.length} assessments to CSV.`);
  };

  // Toggle Publish Status
  const handleTogglePublish = async (assessment) => {
    const updatedStatus = !assessment.is_published;
    try {
      await saveAssessment({ ...assessment, is_published: updatedStatus });
      setAssessments((prev) =>
        prev.map((item) => (item.id === assessment.id ? { ...item, is_published: updatedStatus } : item))
      );
      showNotification(`"${assessment.title}" status changed to ${updatedStatus ? "Published (Active)" : "Draft (Hidden)"}.`);
    } catch (err) {
      console.error("[AssessmentStudio] Publish toggle error:", err);
    }
  };

  // Delete Assessment
  const handleConfirmDeleteAssessment = async () => {
    if (!deletingAssessment) return;
    setIsDeleting(true);

    try {
      const targetIdentifier = deletingAssessment.id || deletingAssessment.slug;
      await deleteAssessment(targetIdentifier);
      setAssessments((prev) => 
        prev.filter((item) => item.id !== deletingAssessment.id && item.slug !== deletingAssessment.slug)
      );
      showNotification(`"${deletingAssessment.title}" was removed successfully.`);
      setDeletingAssessment(null);
    } catch (err) {
      console.error("[AssessmentStudio] Delete error:", err);
      showNotification(`Error removing "${deletingAssessment.title}".`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Save New Category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    setCategorySaving(true);
    const slug = newCategory.slug.trim() || newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    const catPayload = {
      id: `cat_${Date.now()}`,
      slug,
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
      color: newCategory.color,
      badgeBg: newCategory.badgeBg,
    };

    try {
      saveCustomCategory(catPayload);
      setCategories((prev) => [...prev, catPayload]);
      setShowCategoryModal(false);
      setNewCategory({ name: "", slug: "", description: "", color: "#0b57d0", badgeBg: "#f0f5fc" });
      showNotification(`Category "${catPayload.name}" created successfully!`);
    } catch (err) {
      console.error("[AssessmentStudio] Category creation error:", err);
    } finally {
      setCategorySaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Assessment Studio &amp; Category Manager</h1>
          <p className={styles.subtitle}>
            Design custom technical evaluations, set dynamic question targets ($N$), manage categories, and publish tests.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={filteredAssessments.length === 0}
            className={styles.exportBtn}
            title="Download assessment catalog in CSV format"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className={styles.secondaryBtn}
          >
            <FolderPlus size={16} />
            <span>New Category</span>
          </button>

          <Link href="/admin/assessments/new" className={styles.primaryBtn}>
            <PlusCircle size={16} />
            <span>Create Assessment</span>
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {notificationMsg && (
        <div className={styles.notification}>
          <CheckCircle2 size={16} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search assessments, topics, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className={styles.clearBtn}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.categoryPillsWrapper}>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`${styles.catFilterPill} ${selectedCategory === "all" ? styles.catPillActive : ""}`}
          >
            All ({assessments.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id || c.slug}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`${styles.catFilterPill} ${selectedCategory === c.slug ? styles.catPillActive : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.tableCard}>
        {isLoading ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <span>Loading assessment catalog...</span>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={36} color="#94a3b8" />
            <h3>No Assessments Found</h3>
            <p>No tests match your filter settings. Click above to create a new evaluation.</p>
            <Link href="/admin/assessments/new" className="btn btn-primary btn-sm">
              <PlusCircle size={15} />
              <span>Create First Assessment</span>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Assessment Title</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Questions ($N$)</th>
                    <th>Duration</th>
                    <th>Pass Mark</th>
                    <th>Status</th>
                    <th className={styles.actionsTh}>Studio Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAssessments.map((a) => {
                    const qCount = a.questions?.length || a.total_questions || 15;
                    const isPublished = a.is_published !== false;

                    return (
                      <tr key={a.id || a.slug} className={styles.tableRow}>
                        {/* Title & Description */}
                        <td>
                          <div className={styles.titleCell}>
                            <span className={styles.assessmentName}>{a.title}</span>
                            <span className={styles.slugTag}>/assessments/{a.slug || a.id}</span>
                          </div>
                        </td>

                        {/* Category */}
                        <td>
                          <span className={styles.categoryBadge}>{a.category_name || "General"}</span>
                        </td>

                        {/* Difficulty */}
                        <td>
                          <span className={`${styles.diffPill} ${styles[`diff_${(a.difficulty || "Intermediate").toLowerCase()}`] || styles.diff_intermediate}`}>
                            {a.difficulty || "Intermediate"}
                          </span>
                        </td>

                        {/* Total Questions */}
                        <td>
                          <span className={styles.qCountBadge}>
                            <strong>{qCount}</strong> Qs
                          </span>
                        </td>

                        {/* Duration */}
                        <td>
                          <div className={styles.metaCell}>
                            <Clock size={13} />
                            <span>{a.duration_minutes || 15} mins</span>
                          </div>
                        </td>

                        {/* Passing Criteria */}
                        <td>
                          <div className={styles.metaCell}>
                            <Award size={13} color="#059669" />
                            <span>{a.passing_percentage || 60}%</span>
                          </div>
                        </td>

                        {/* Publish / Draft Status */}
                        <td>
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(a)}
                            className={`${styles.statusToggleBtn} ${isPublished ? styles.statusPublished : styles.statusDraft}`}
                            title="Click to toggle status"
                          >
                            <span className={styles.statusDot}></span>
                            <span>{isPublished ? "Published" : "Draft"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className={styles.actionsCell}>
                            <Link
                              href={`/assessments/${a.slug || a.id}`}
                              target="_blank"
                              className={styles.actionBtn}
                              title="Preview Candidate Experience"
                            >
                              <Eye size={15} />
                            </Link>

                            <Link
                              href={`/admin/assessments/${a.id || a.slug}/edit`}
                              className={`${styles.actionBtn} ${styles.actionBtnEdit}`}
                              title="Edit Questions & Settings"
                            >
                              <Edit3 size={15} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeletingAssessment(a)}
                              className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                              title="Delete Assessment"
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
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationBar}>
              <div className={styles.paginationInfo}>
                Showing <strong>{Math.min((currentPage - 1) * pageSize + 1, filteredAssessments.length)}</strong>–<strong>{Math.min(currentPage * pageSize, filteredAssessments.length)}</strong> of <strong>{filteredAssessments.length}</strong> assessments
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

                  {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                    if (typeof item !== "number" || item === "...") {
                      return (
                        <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
                          &hellip;
                        </span>
                      );
                    }

                    const isPageActive = currentPage === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCurrentPage(item)}
                        className={`${styles.pageBtn} ${isPageActive ? styles.pageBtnActive : ""}`}
                        aria-current={isPageActive ? "page" : undefined}
                        aria-label={`Page ${item}`}
                      >
                        {item}
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

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Create New Assessment Category</h3>
                <p className={styles.modalSubtitle}>Organize technical modules by domain.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowCategoryModal(false)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>Category Name <span className={styles.reqStar}>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Cloud & DevOps Architecture"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>URL Slug</label>
                <input
                  type="text"
                  placeholder="e.g. cloud-devops (leave blank to auto-generate)"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the domain covered..."
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <div className={styles.colorRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>Badge Color</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className={styles.colorPicker}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={categorySaving || !newCategory.name.trim()}
                  className="btn btn-primary"
                >
                  <Save size={15} />
                  <span>{categorySaving ? "Creating..." : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Assessment Confirmation Modal */}
      {deletingAssessment && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModalCard}>
            <div className={styles.deleteModalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div className={styles.deleteIconWrap}>
                  <Trash2 size={18} />
                </div>
                <div>
                  <h3 className={styles.deleteModalTitle}>Delete Assessment</h3>
                  <p className={styles.deleteModalSubtitle}>This action cannot be undone.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setDeletingAssessment(null)}
                className={styles.modalCloseBtn}
                disabled={isDeleting}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.deleteModalBody}>
              <div className={styles.deleteDetailBox}>
                <div><strong>Title:</strong> {deletingAssessment.title}</div>
                <div><strong>Category:</strong> {deletingAssessment.category_name || "General"}</div>
                <div><strong>Questions:</strong> {deletingAssessment.questions?.length || deletingAssessment.total_questions || 15} questions</div>
                <div><strong>Duration:</strong> {deletingAssessment.duration_minutes || 15} mins ({deletingAssessment.passing_percentage || 60}% pass score)</div>
              </div>

              <div className={styles.deleteWarningBox}>
                ⚠️ Deleting this assessment will permanently remove it from the active catalog and candidate evaluations.
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setDeletingAssessment(null)}
                className="btn btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAssessment}
                className={styles.btnDanger}
                disabled={isDeleting}
              >
                <Trash2 size={14} />
                <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
