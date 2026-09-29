"use client";

import { useState, useEffect, useMemo } from "react";
import QRCode from "qrcode";
import styles from "./CampusDriveManager.module.css";
import {
  COMMON_COLLEGES,
  COMMON_COURSES,
  generateDriveCode,
  buildDriveUrl,
  exportDriveResultsToCSV,
} from "@/lib/driveUtils";
import { getAllAssessments } from "@/lib/adminService";
import {
  QrCode,
  FileSpreadsheet,
  Copy,
  Check,
  Download,
  Maximize2,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function CampusDriveManager() {
  const [activeTab, setActiveTab] = useState("generator");

  // Generator State
  const [collegeName, setCollegeName] = useState("Graphic Era University, Dehradun");
  const [courseName, setCourseName] = useState("B.Tech - Computer Science & Engineering (CSE)");
  const [selectedAssessmentSlug, setSelectedAssessmentSlug] = useState("");
  const [landingFlow, setLandingFlow] = useState("signup"); // "signup" (default: fast onboarding) | "assessment"
  const [driveCode, setDriveCode] = useState("");
  const [generatedQrUrl, setGeneratedQrUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showProjectorModal, setShowProjectorModal] = useState(false);

  // Assessment list for dropdown
  const [assessments, setAssessments] = useState([]);

  // Results & Export State
  const [attempts, setAttempts] = useState([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterAssessment, setFilterAssessment] = useState("all");
  const [searchStudent, setSearchStudent] = useState("");

  // Auto-generate drive code on college change if not manually edited
  useEffect(() => {
    setDriveCode(generateDriveCode(collegeName));
  }, [collegeName]);

  // Load assessments
  useEffect(() => {
    getAllAssessments()
      .then((res) => {
        setAssessments(res || []);
        if (res && res.length > 0) {
          setSelectedAssessmentSlug(res[0].slug || "");
        }
      })
      .catch(() => {});
  }, []);

  // Compute target URL
  const driveUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return buildDriveUrl({
      origin: window.location.origin,
      assessmentSlug: selectedAssessmentSlug,
      college: collegeName,
      course: courseName,
      driveCode: driveCode,
      targetFlow: landingFlow,
    });
  }, [collegeName, courseName, selectedAssessmentSlug, driveCode, landingFlow]);

  // Generate QR Code data URL whenever target URL changes
  useEffect(() => {
    if (!driveUrl) return;
    QRCode.toDataURL(driveUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#001e47",
        light: "#ffffff",
      },
    })
      .then((url) => setGeneratedQrUrl(url))
      .catch((err) => console.error("[CampusDriveManager] QR generation error:", err));
  }, [driveUrl]);

  // Fetch attempts for Results tab
  const loadAttempts = async () => {
    setIsLoadingAttempts(true);
    try {
      const res = await fetch("/api/admin/attempts");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAttempts(json.data);
      }
    } catch (e) {
      console.error("[CampusDriveManager] Attempts fetch error:", e);
    } finally {
      setIsLoadingAttempts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "results") {
      loadAttempts();
    }
  }, [activeTab]);

  // Copy link action
  const handleCopyLink = () => {
    if (!driveUrl) return;
    navigator.clipboard.writeText(driveUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Download QR Code PNG
  const handleDownloadQr = () => {
    if (!generatedQrUrl) return;
    const a = document.createElement("a");
    a.href = generatedQrUrl;
    a.download = `${driveCode}_QR_Code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Distinct colleges from actual attempts
  const availableColleges = useMemo(() => {
    const set = new Set();
    attempts.forEach((att) => {
      const session = att.student_answers?._campus_session;
      const c = session?.college || att.profiles?.college || att.college;
      if (c && c.trim()) set.add(c.trim());
    });
    return Array.from(set);
  }, [attempts]);

  // Filtered attempts for Results tab
  const filteredAttempts = useMemo(() => {
    return attempts.filter((att) => {
      const session = att.student_answers?._campus_session;
      const attCollege = session?.college || att.profiles?.college || att.college || "";
      const attAssessment = att.assessment_slug || att.assessment_id || "";
      const attName = att.user_name || att.profiles?.full_name || "";
      const attEmail = att.user_email || att.profiles?.email || "";

      const matchesCollege =
        filterCollege === "all" ||
        attCollege.toLowerCase().includes(filterCollege.toLowerCase());

      const matchesAssessment =
        filterAssessment === "all" ||
        attAssessment === filterAssessment;

      const q = searchStudent.toLowerCase().trim();
      const matchesSearch =
        !q ||
        attName.toLowerCase().includes(q) ||
        attEmail.toLowerCase().includes(q) ||
        attCollege.toLowerCase().includes(q);

      return matchesCollege && matchesAssessment && matchesSearch;
    });
  }, [attempts, filterCollege, filterAssessment, searchStudent]);

  // Results metrics
  const resultsMetrics = useMemo(() => {
    const total = filteredAttempts.length;
    if (total === 0) return { total: 0, passed: 0, passRate: 0, avgScore: 0 };
    const passed = filteredAttempts.filter((a) => a.is_passed).length;
    const passRate = Math.round((passed / total) * 100);
    const sumPct = filteredAttempts.reduce((acc, curr) => acc + (Number(curr.percentage) || 0), 0);
    const avgScore = Math.round((sumPct / total) * 10) / 10;
    return { total, passed, passRate, avgScore };
  }, [filteredAttempts]);

  // Handle Export to Excel (CSV)
  const handleExportExcel = () => {
    exportDriveResultsToCSV(filteredAttempts, {
      college: filterCollege !== "all" ? filterCollege : collegeName,
      course: courseName,
      driveCode: driveCode,
    });
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <div className={styles.badgeRow}>
            <div className={styles.pulseBadge}>
              <span className={styles.pulseDot}></span>
              <span>Campus Drive Engine</span>
            </div>
            <span style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>
              Zero Typo Automation • Instant Excel Export
            </span>
          </div>

          <h1 className={styles.title}>Campus Session QR &amp; College Reports</h1>
          <p className={styles.subtitle}>
            Conduct on-campus testing sessions with auto-tagged college and course metadata. Students scan the QR code to take assessments, and you can export 100% clean Excel reports in one click.
          </p>
        </div>
      </div>

      {/* 2. Tabs Navigation */}
      <div className={styles.tabsBar}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "generator" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("generator")}
        >
          <QrCode size={16} />
          <span>Generate QR Code &amp; Magic Link</span>
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "results" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("results")}
        >
          <FileSpreadsheet size={16} />
          <span>College Results &amp; Excel Exporter</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: GENERATOR & QR PREVIEW
          ===================================================================== */}
      {activeTab === "generator" && (
        <div className={styles.generatorGrid}>
          {/* Setup Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Session Parameters</h2>
              <p className={styles.formSubtitle}>
                Configure the college and curriculum for your auditorium or campus session.
              </p>
            </div>

            {/* College Name */}
            <div className={styles.inputGroup}>
              <label htmlFor="collegeName" className={styles.label}>
                College / University Name
              </label>
              <input
                id="collegeName"
                type="text"
                className={styles.textInput}
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Graphic Era University, Dehradun"
              />
              <div className={styles.suggestionsRow}>
                <span style={{ fontSize: "0.65rem", color: "#64748b" }}>Quick Suggestions:</span>
                {COMMON_COLLEGES.slice(0, 4).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => setCollegeName(c)}
                  >
                    {c.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Course / Stream */}
            <div className={styles.inputGroup}>
              <label htmlFor="courseName" className={styles.label}>
                Course / Branch &amp; Batch
              </label>
              <input
                id="courseName"
                type="text"
                className={styles.textInput}
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. B.Tech CSE (2026 Batch)"
              />
              <div className={styles.suggestionsRow}>
                <span style={{ fontSize: "0.65rem", color: "#64748b" }}>Quick Courses:</span>
                {COMMON_COURSES.slice(0, 3).map((cr) => (
                  <button
                    key={cr}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => setCourseName(cr)}
                  >
                    {cr.split("-")[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Assessment */}
            <div className={styles.inputGroup}>
              <label htmlFor="assessmentSlug" className={styles.label}>
                Target Assessment Module
              </label>
              <select
                id="assessmentSlug"
                className={styles.textInput}
                value={selectedAssessmentSlug}
                onChange={(e) => setSelectedAssessmentSlug(e.target.value)}
              >
                <option value="">-- All Assessments Catalog --</option>
                {assessments.map((a) => (
                  <option key={a.id || a.slug} value={a.slug}>
                    {a.title} ({a.duration_minutes || 30} mins • {a.passing_score || 60}% pass)
                  </option>
                ))}
              </select>
            </div>

            {/* Landing Destination Flow */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                QR Landing Destination
              </label>
              <div className={styles.flowToggleGroup}>
                <button
                  type="button"
                  className={`${styles.flowToggleBtn} ${landingFlow === "signup" ? styles.flowToggleBtnActive : ""}`}
                  onClick={() => setLandingFlow("signup")}
                >
                  <strong>⚡ Direct Student Signup (Recommended)</strong>
                  <span>Auto-fills college &amp; course; immediately launches test upon signup</span>
                </button>
                <button
                  type="button"
                  className={`${styles.flowToggleBtn} ${landingFlow === "assessment" ? styles.flowToggleBtnActive : ""}`}
                  onClick={() => setLandingFlow("assessment")}
                >
                  <strong>📄 Assessment Overview</strong>
                  <span>Lands on test details &amp; syllabus overview</span>
                </button>
              </div>
            </div>

            {/* Drive Session Code */}
            <div className={styles.inputGroup}>
              <label htmlFor="driveCode" className={styles.label}>
                Session Code
              </label>
              <input
                id="driveCode"
                type="text"
                className={styles.textInput}
                value={driveCode}
                onChange={(e) => setDriveCode(e.target.value.toUpperCase())}
                placeholder="e.g. GEU-2026"
              />
            </div>
          </div>

          {/* Live QR Output Card */}
          <div className={styles.qrPreviewCard}>
            <div className={styles.qrContainer}>
              {generatedQrUrl ? (
                <img
                  src={generatedQrUrl}
                  alt={`QR code for ${collegeName}`}
                  className={styles.qrImage}
                />
              ) : (
                <div className={styles.qrPlaceholder}>Generating QR Code...</div>
              )}
            </div>

            <div className={styles.qrMeta}>
              <span className={styles.qrCollegeName}>{collegeName}</span>
              <span className={styles.qrCourseName}>{courseName}</span>
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Session Code: <strong>{driveCode}</strong>
              </span>
            </div>

            {/* Link Box */}
            <div className={styles.urlBox}>
              <span className={styles.urlText} title={driveUrl}>
                {driveUrl}
              </span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopyLink}
                title="Copy direct session link to clipboard"
              >
                {isCopied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                <span>{isCopied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Actions */}
            <div className={styles.qrActionsRow}>
              <button
                type="button"
                className={styles.projectorBtn}
                onClick={() => setShowProjectorModal(true)}
                title="Open fullscreen QR display for auditorium projector screen"
              >
                <Maximize2 size={14} />
                <span>Projector Mode</span>
              </button>

              <button
                type="button"
                className={styles.downloadQrBtn}
                onClick={handleDownloadQr}
                title="Download QR code image (PNG) for slides or printouts"
              >
                <Download size={14} />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: RESULTS & EXCEL EXPORTER
          ===================================================================== */}
      {activeTab === "results" && (
        <div className={styles.resultsSection}>
          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterControls}>
              <select
                className={styles.filterSelect}
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
              >
                <option value="all">-- All Colleges &amp; Sessions --</option>
                {availableColleges.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filterAssessment}
                onChange={(e) => setFilterAssessment(e.target.value)}
              >
                <option value="all">-- All Assessments --</option>
                {assessments.map((a) => (
                  <option key={a.id || a.slug} value={a.slug}>
                    {a.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className={styles.filterSelect}
                placeholder="Search student or email..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={styles.exportExcelBtn}
              onClick={handleExportExcel}
              disabled={filteredAttempts.length === 0}
              title="Download clean, verified college results directly in Excel / CSV format"
            >
              <FileSpreadsheet size={16} />
              <span>Export College to Excel (CSV)</span>
            </button>
          </div>

          {/* College Stats Banner */}
          <div className={styles.statsBanner}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Students Evaluated</span>
              <span className={styles.statVal}>{resultsMetrics.total}</span>
              <span className={styles.statSub}>Total submissions</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Passed Candidates</span>
              <span className={styles.statVal}>{resultsMetrics.passed}</span>
              <span className={styles.statSub}>{resultsMetrics.passRate}% Passing rate</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Average Score</span>
              <span className={styles.statVal}>{resultsMetrics.avgScore}%</span>
              <span className={styles.statSub}>Cohort mean</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Active College Filter</span>
              <span className={styles.statVal} style={{ fontSize: "1.1rem" }}>
                {filterCollege === "all" ? "All Sessions" : filterCollege.split(",")[0]}
              </span>
              <span className={styles.statSub}>100% verified clean spellings</span>
            </div>
          </div>

          {/* Results Table */}
          <div className={styles.tableContainer}>
            {isLoadingAttempts ? (
              <div className={styles.emptyState}>Loading candidate submissions...</div>
            ) : filteredAttempts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No assessment attempts match the selected college or filter criteria.</p>
                <button
                  type="button"
                  className={styles.tabBtn}
                  onClick={loadAttempts}
                  style={{ border: "1px solid #cbd5e1", marginTop: "0.5rem" }}
                >
                  <RefreshCw size={13} />
                  <span>Refresh Attempts</span>
                </button>
              </div>
            ) : (
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>College / Institute</th>
                    <th>Course / Branch</th>
                    <th>Assessment</th>
                    <th>Score</th>
                    <th>Result</th>
                    <th>Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttempts.map((att, idx) => {
                    const session = att.student_answers?._campus_session;
                    const collegeDisp =
                      session?.college || att.profiles?.college || att.college || "Independent Student";
                    const courseDisp =
                      session?.course || att.profiles?.degree || att.course || "General";

                    return (
                      <tr key={att.id || idx}>
                        <td style={{ color: "#94a3b8" }}>{idx + 1}</td>
                        <td>
                          <div className={styles.studentMeta}>
                            <span className={styles.studentName}>
                              {att.user_name || att.profiles?.full_name || "Student"}
                            </span>
                            <span className={styles.studentEmail}>
                              {att.user_email || att.profiles?.email}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong style={{ color: "#002255" }}>{collegeDisp}</strong>
                        </td>
                        <td>{courseDisp}</td>
                        <td>
                          <strong>{att.assessment_title || att.assessment_id}</strong>
                        </td>
                        <td>
                          <span className={styles.scorePill}>
                            {att.score ?? 0} / {att.total_questions || att.total_answered || "N/A"} (
                            {att.percentage ?? 0}%)
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              att.is_passed ? styles.statusPassed : styles.statusFailed
                            }
                          >
                            {att.is_passed ? "PASSED" : "NEEDS IMPROVEMENT"}
                          </span>
                        </td>
                        <td style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          {att.submitted_at
                            ? new Date(att.submitted_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          PROJECTOR FULLSCREEN MODAL
          ===================================================================== */}
      {showProjectorModal && (
        <div className={styles.projectorModalOverlay}>
          <button
            type="button"
            className={styles.projectorCloseBtn}
            onClick={() => setShowProjectorModal(false)}
            aria-label="Exit projector mode"
            title="Exit Projector Mode (Esc)"
          >
            <X size={20} />
          </button>

          <div className={styles.projectorContent}>
            <img
              src="/media/logo.png"
              alt="CampusSutras"
              className={styles.projectorLogo}
            />

            <div>
              <h2 className={styles.projectorCollege}>{collegeName}</h2>
              <p className={styles.projectorCourse}>{courseName}</p>
            </div>

            <div className={styles.projectorQrWrap}>
              {generatedQrUrl && (
                <img
                  src={generatedQrUrl}
                  alt={`QR code for ${collegeName}`}
                  className={styles.projectorQrImg}
                />
              )}
            </div>

            <p className={styles.projectorInstruction}>
              {landingFlow === "signup"
                ? "Open your phone camera & scan this QR code to register and launch the assessment immediately."
                : "Open your phone camera & scan this QR code to view and start the assessment."}
            </p>

            <div className={styles.projectorUrl}>{driveUrl}</div>
          </div>
        </div>
      )}
    </div>
  );
}
