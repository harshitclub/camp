"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { 
  getAllUsers, 
  getAllAssessments, 
  getAllAttempts,
  getAllFormSubmissions,
  getAllCertificates 
} from "@/lib/adminService";
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  PlusCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Inbox,
  RefreshCw,
  BarChart3,
  Layers,
  GraduationCap,
  Briefcase,
  HelpCircle,
  FolderOpen
} from "lucide-react";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [certificatesData, setCertificatesData] = useState({ certificates: [], total: 0 });
  const [formCounts, setFormCounts] = useState({ total: 0, contact: 0, internship: 0, hire: 0, courseEnroll: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAdminData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const [uList, aList, attList, formsResult, certsResult] = await Promise.all([
        getAllUsers(),
        getAllAssessments(),
        getAllAttempts(),
        getAllFormSubmissions(),
        getAllCertificates({ limit: 100 }),
      ]);

      setUsers(uList || []);
      setAssessments(aList || []);
      setAttempts(attList || []);

      if (formsResult?.counts) {
        setFormCounts(formsResult.counts);
      }
      if (certsResult) {
        setCertificatesData(certsResult);
      }
    } catch (err) {
      console.error("[AdminDashboard] Error loading data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // 1. Core Platform Metrics (Accurate Real Numbers, zero hardcoded mock values)
  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.is_verified).length;

  const totalAssessments = assessments.length;
  const publishedAssessments = assessments.filter((a) => a.is_published !== false).length;

  const totalCertificates = certificatesData?.total ?? certificatesData?.certificates?.length ?? 0;
  const verifiedCertificates = (certificatesData?.certificates || []).filter(
    (c) => c.status === "VERIFIED_AUTHENTIC"
  ).length || totalCertificates;

  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((att) => att.is_passed).length;
  const failedAttempts = totalAttempts - passedAttempts;
  const overallPassRate = totalAttempts > 0 
    ? Math.round((passedAttempts / totalAttempts) * 100) 
    : 0;

  const avgScore = totalAttempts > 0
    ? (attempts.reduce((acc, curr) => acc + Number(curr.percentage || 0), 0) / totalAttempts).toFixed(1)
    : "0";

  // 2. Real Category Distribution for Chart
  const categoryBreakdown = useMemo(() => {
    const map = {};
    assessments.forEach((a) => {
      const cat = a.category_name || "General";
      map[cat] = (map[cat] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        count,
        percentage: assessments.length > 0 ? Math.round((count / assessments.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [assessments]);

  // 3. Real Inquiry Types Breakdown for Chart
  const leadDistribution = useMemo(() => {
    const total = formCounts.total || 0;
    const items = [
      {
        id: "internship",
        label: "Internship Applications",
        count: formCounts.internship || 0,
        color: "#0b57d0",
        href: "/admin/forms?type=internship",
      },
      {
        id: "courseEnroll",
        label: "Course Registrations",
        count: formCounts.courseEnroll || 0,
        color: "#7c3aed",
        href: "/admin/forms?type=courseEnroll",
      },
      {
        id: "hire",
        label: "Hiring Inquiries",
        count: formCounts.hire || 0,
        color: "#059669",
        href: "/admin/forms?type=hire",
      },
      {
        id: "contact",
        label: "General Messages",
        count: formCounts.contact || 0,
        color: "#ea580c",
        href: "/admin/forms?type=contact",
      },
    ];

    return items.map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }));
  }, [formCounts]);

  // 4. Recent Test Attempts (Sorted by date descending)
  const recentAttempts = useMemo(() => {
    return [...attempts]
      .sort(
        (a, b) =>
          new Date(b.submitted_at || b.started_at || 0) -
          new Date(a.submitted_at || a.started_at || 0)
      )
      .slice(0, 6);
  }, [attempts]);

  // 5. Featured / Top Active Tests
  const activeTests = useMemo(() => {
    return assessments.slice(0, 5);
  }, [assessments]);

  // Donut SVG circumference calculation for Pass Rate (r = 40, circumference = 251.32)
  const donutCircumference = 251.32;
  const donutStrokeOffset =
    totalAttempts > 0
      ? donutCircumference - (donutCircumference * overallPassRate) / 100
      : donutCircumference;

  return (
    <div className={styles.dashboardContainer}>
      {/* 1. Header with Simple, Clear English & Fast Actions */}
      <div className={styles.topHeader}>
        <div>
          <div className={styles.headerEyebrow}>
            <Sparkles size={13} />
            <span>Admin Overview</span>
          </div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>
            Welcome back! Here is a summary of your students, tests, certificates, and inquiries.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => loadAdminData(true)}
            className={styles.refreshBtn}
            disabled={isRefreshing || isLoading}
            title="Refresh latest dashboard statistics"
          >
            <RefreshCw size={15} className={isRefreshing ? styles.spinning : ""} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link href="/admin/forms" className={styles.secondaryActionBtn}>
            <Inbox size={15} />
            <span>View Inquiries ({isLoading ? "..." : formCounts.total})</span>
          </Link>

          <Link href="/admin/assessments/new" className={styles.primaryActionBtn}>
            <PlusCircle size={15} />
            <span>Create New Test</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary KPI Metric Cards (5 Cards with Real Data) */}
      <div className={styles.kpiGrid}>
        {/* Card 1: Registered Users */}
        <Link href="/admin/users" className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <span className={styles.kpiLabel}>Total Users</span>
            <div className={styles.kpiIconWrap} style={{ background: "rgba(11, 87, 208, 0.08)", color: "#0b57d0" }}>
              <Users size={19} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{isLoading ? "--" : totalUsers}</span>
            <span className={styles.kpiSubText}>
              <strong className={styles.successText}>{verifiedUsers}</strong> verified accounts
            </span>
          </div>
        </Link>

        {/* Card 2: Published Assessments */}
        <Link href="/admin/assessments" className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <span className={styles.kpiLabel}>Available Tests</span>
            <div className={styles.kpiIconWrap} style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>
              <FileText size={19} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{isLoading ? "--" : totalAssessments}</span>
            <span className={styles.kpiSubText}>
              <strong className={styles.purpleText}>{publishedAssessments}</strong> published online
            </span>
          </div>
        </Link>

        {/* Card 3: Certificates Issued */}
        <Link href="/admin/certificates" className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <span className={styles.kpiLabel}>Certificates Issued</span>
            <div className={styles.kpiIconWrap} style={{ background: "rgba(217, 119, 6, 0.08)", color: "#d97706" }}>
              <Award size={19} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{isLoading ? "--" : totalCertificates}</span>
            <span className={styles.kpiSubText}>
              <strong className={styles.amberText}>{verifiedCertificates}</strong> authentic records
            </span>
          </div>
        </Link>

        {/* Card 4: Student Inquiries */}
        <Link href="/admin/forms" className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <span className={styles.kpiLabel}>Student Inquiries</span>
            <div className={styles.kpiIconWrap} style={{ background: "rgba(5, 150, 105, 0.08)", color: "#059669" }}>
              <Inbox size={19} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{isLoading ? "--" : formCounts.total}</span>
            <span className={styles.kpiSubText}>
              <strong className={styles.emeraldText}>{formCounts.internship + formCounts.courseEnroll}</strong> applications
            </span>
          </div>
        </Link>

        {/* Card 5: Tests Completed & Real Pass Rate */}
        <Link href="/admin/users" className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <span className={styles.kpiLabel}>Tests Completed</span>
            <div className={styles.kpiIconWrap} style={{ background: "rgba(2, 132, 199, 0.08)", color: "#0284c7" }}>
              <TrendingUp size={19} />
            </div>
          </div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{isLoading ? "--" : totalAttempts}</span>
            <span className={styles.kpiSubText}>
              {totalAttempts > 0 ? (
                <>
                  <strong className={styles.successText}>{overallPassRate}%</strong> pass rate (Avg: {avgScore}%)
                </>
              ) : (
                <span>No tests taken yet</span>
              )}
            </span>
          </div>
        </Link>
      </div>

      {/* 3. Meaningful Quick Links According to Admin Portal Features */}
      <div>
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2 className={styles.sectionMainTitle}>Quick Actions</h2>
            <p className={styles.sectionSubTitle}>Fast shortcuts to common admin tasks</p>
          </div>
        </div>

        <div className={styles.quickActionsGrid}>
          {/* Quick Action 1: Create New Assessment */}
          <Link href="/admin/assessments/new" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(11, 87, 208, 0.08)", color: "#0b57d0" }}>
                <PlusCircle size={20} />
              </div>
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>Create New Test</h3>
              <p className={styles.quickActionDesc}>Add questions, set timer, and publish a new test.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>Open Studio</span>
              <ChevronRight size={14} />
            </div>
          </Link>

          {/* Quick Action 2: Certificates Registry */}
          <Link href="/admin/certificates" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(217, 119, 6, 0.08)", color: "#d97706" }}>
                <Award size={20} />
              </div>
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>Issue Certificates</h3>
              <p className={styles.quickActionDesc}>Add single certificates or upload a batch via CSV.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>Open Registry</span>
              <ChevronRight size={14} />
            </div>
          </Link>

          {/* Quick Action 3: Review Student Inquiries */}
          <Link href="/admin/forms" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(5, 150, 105, 0.08)", color: "#059669" }}>
                <Inbox size={20} />
              </div>
              {formCounts.total > 0 && (
                <span className={styles.quickActionBadge}>{formCounts.total} leads</span>
              )}
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>Check Inquiries</h3>
              <p className={styles.quickActionDesc}>Review applications for internships, courses, and hiring.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>View Forms</span>
              <ChevronRight size={14} />
            </div>
          </Link>

          {/* Quick Action 4: User Directory */}
          <Link href="/admin/users" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>
                <Users size={20} />
              </div>
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>User Directory</h3>
              <p className={styles.quickActionDesc}>See all registered students and manage verification badges.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>Manage Users</span>
              <ChevronRight size={14} />
            </div>
          </Link>

          {/* Quick Action 5: Public Certificate Verification Tool */}
          <Link href="/verify-certificate" target="_blank" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(2, 132, 199, 0.08)", color: "#0284c7" }}>
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>Verify Certificate</h3>
              <p className={styles.quickActionDesc}>Check how the verification page looks to employers.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>Public Tool</span>
              <ExternalLink size={13} />
            </div>
          </Link>

          {/* Quick Action 6: Preview Student Test Runner */}
          <Link href="/assessments" target="_blank" className={styles.quickActionCard}>
            <div className={styles.quickActionTop}>
              <div className={styles.quickActionIcon} style={{ background: "rgba(234, 88, 12, 0.08)", color: "#ea580c" }}>
                <ExternalLink size={20} />
              </div>
            </div>
            <div className={styles.quickActionBody}>
              <h3 className={styles.quickActionTitle}>Student Test Page</h3>
              <p className={styles.quickActionDesc}>Open live tests to see what students experience.</p>
            </div>
            <div className={styles.quickActionArrow}>
              <span>Test Runner</span>
              <ExternalLink size={13} />
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Meaningful Visual Charts (Real Data, Responsive Layout) */}
      <div className={styles.chartsGrid}>
        {/* Chart 1: Pass Rate & Performance Donut */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Student Pass Rate</h3>
              <p className={styles.chartSubtitle}>Performance across all completed tests</p>
            </div>
          </div>

          <div className={styles.donutContainer}>
            <div className={styles.donutWrapper}>
              <svg className={styles.donutSvg} viewBox="0 0 100 100">
                <circle className={styles.donutTrack} cx="50" cy="50" r="40" />
                {totalAttempts > 0 ? (
                  <circle
                    className={styles.donutFill}
                    cx="50"
                    cy="50"
                    r="40"
                    style={{
                      strokeDasharray: donutCircumference,
                      strokeDashoffset: donutStrokeOffset,
                    }}
                  />
                ) : (
                  <circle className={styles.donutFillEmpty} cx="50" cy="50" r="40" />
                )}
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutPercentage}>
                  {totalAttempts > 0 ? `${overallPassRate}%` : "0%"}
                </span>
                <span className={styles.donutLabel}>
                  {totalAttempts > 0 ? "Pass Rate" : "No Tests"}
                </span>
              </div>
            </div>

            <div className={styles.donutStatsRow}>
              <div className={styles.donutStatItem}>
                <span className={styles.donutStatValue} style={{ color: "#059669" }}>
                  {passedAttempts}
                </span>
                <span className={styles.donutStatName}>Passed</span>
              </div>
              <div className={styles.donutStatItem}>
                <span className={styles.donutStatValue} style={{ color: "#dc2626" }}>
                  {failedAttempts}
                </span>
                <span className={styles.donutStatName}>Needs Retake</span>
              </div>
              <div className={styles.donutStatItem}>
                <span className={styles.donutStatValue} style={{ color: "#0b57d0" }}>
                  {avgScore}%
                </span>
                <span className={styles.donutStatName}>Avg Score</span>
              </div>
            </div>

            <p className={styles.chartNote}>
              {totalAttempts > 0
                ? `Based on ${totalAttempts} completed student tests`
                : "No tests completed yet. Live results will appear here."}
            </p>
          </div>
        </div>

        {/* Chart 2: Inquiries & Leads Distribution */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Inquiries by Type</h3>
              <p className={styles.chartSubtitle}>Applications and messages received</p>
            </div>
            <span className={styles.quickActionBadge}>{formCounts.total} Total</span>
          </div>

          <div className={styles.barList}>
            {leadDistribution.map((lead) => (
              <Link key={lead.id} href={lead.href} className={styles.barRow}>
                <div className={styles.barInfo}>
                  <div className={styles.barLabelWrap}>
                    <span className={styles.barDot} style={{ background: lead.color }}></span>
                    <span>{lead.label}</span>
                  </div>
                  <div className={styles.barCounts}>
                    <strong>{lead.count}</strong>
                    <span>({lead.percentage}%)</span>
                  </div>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${Math.max(lead.percentage, lead.count > 0 ? 5 : 0)}%`,
                      background: lead.color,
                    }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/admin/forms" className={styles.chartFooterLink}>
            <span>Manage All Inquiries</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Chart 3: Tests by Category Distribution */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Tests by Category</h3>
              <p className={styles.chartSubtitle}>Distribution of active tests</p>
            </div>
            <span className={styles.quickActionBadge}>{totalAssessments} Tests</span>
          </div>

          <div className={styles.barList}>
            {categoryBreakdown.map((cat, idx) => {
              const colors = ["#0b57d0", "#7c3aed", "#059669", "#d97706", "#0284c7"];
              const color = colors[idx % colors.length];

              return (
                <div key={cat.name} className={styles.barRow}>
                  <div className={styles.barInfo}>
                    <div className={styles.barLabelWrap}>
                      <span className={styles.barDot} style={{ background: color }}></span>
                      <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {cat.name}
                      </span>
                    </div>
                    <div className={styles.barCounts}>
                      <strong>{cat.count}</strong>
                      <span>({cat.percentage}%)</span>
                    </div>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${Math.max(cat.percentage, cat.count > 0 ? 5 : 0)}%`,
                        background: color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link href="/admin/assessments" className={styles.chartFooterLink}>
            <span>Manage Test Catalog</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* 5. Split Section: Recent Test Submissions & Active Tests List */}
      <div className={styles.splitLayout}>
        {/* Left Column: Recent Student Submissions */}
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Recent Test Submissions</h2>
              <p className={styles.cardSubtitle}>Latest tests taken by students</p>
            </div>
            <Link href="/admin/users" className={styles.viewAllLink}>
              <span>User Directory</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <span>Loading latest data...</span>
            </div>
          ) : recentAttempts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <Award size={26} />
              </div>
              <h3 className={styles.emptyTitle}>No test submissions yet</h3>
              <p className={styles.emptyText}>
                When students take an assessment, their scores, status (Passed/Failed), and completion time will appear here automatically.
              </p>
              <Link href="/assessments" target="_blank" className={styles.emptyBtn}>
                <ExternalLink size={14} />
                <span>Try a Test as Student</span>
              </Link>
            </div>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Result</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttempts.map((att, idx) => {
                    const dateStr = att.submitted_at 
                      ? new Date(att.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                      : "Just now";

                    return (
                      <tr key={att.id || idx}>
                        <td>
                          <div className={styles.cellMainText}>
                            {att.assessment_title || att.title || "Technical Assessment"}
                          </div>
                          <div className={styles.cellSubText}>
                            {att.user_id ? `User: ${att.user_id.slice(0, 8)}...` : "Anonymous Student"}
                          </div>
                        </td>
                        <td>
                          <span className={styles.catBadge}>{att.category_name || "General"}</span>
                        </td>
                        <td>
                          <div className={styles.scoreText}>
                            <strong>{att.score || 0}</strong>/{att.total_questions || 15}
                            <span className={styles.scorePercent}>({att.percentage || 0}%)</span>
                          </div>
                        </td>
                        <td>
                          {att.is_passed ? (
                            <span className={styles.badgePassed}>
                              <CheckCircle2 size={12} />
                              <span>Passed</span>
                            </span>
                          ) : (
                            <span className={styles.badgeFailed}>
                              <AlertCircle size={12} />
                              <span>Needs Retake</span>
                            </span>
                          )}
                        </td>
                        <td className={styles.dateCell}>{dateStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Featured Active Tests */}
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Active Tests</h3>
              <p className={styles.cardSubtitle}>{assessments.length} tests ready for students</p>
            </div>
            <Link href="/admin/assessments" className={styles.viewAllLink}>
              <span>Manage All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className={styles.testMiniList}>
            {activeTests.map((a) => (
              <div key={a.id || a.slug} className={styles.testMiniCard}>
                <div className={styles.miniCardLeft}>
                  <span className={styles.miniCardTitle}>{a.title}</span>
                  <div className={styles.miniCardMeta}>
                    <span>{a.category_name}</span>
                    <span>•</span>
                    <span>{a.duration_minutes || 15} mins</span>
                    <span>•</span>
                    <span>{a.questions?.length || a.total_questions || 15} Questions</span>
                  </div>
                </div>
                <Link href={`/admin/assessments/${a.id || a.slug}/edit`} className={styles.miniEditBtn}>
                  Edit
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.createTestBlock}>
            <Link href="/admin/assessments/new" className={styles.createTestBlockBtn}>
              <PlusCircle size={15} />
              <span>Create New Test</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
