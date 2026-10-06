"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ProfileAssessmentsTab.module.css";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Search,
  ExternalLink
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { getAllAssessments } from "@/lib/adminService";

export default function ProfileAssessmentsTab({ user }) {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAttempts() {
      const combinedMap = new Map();

      // 1. Read from localStorage first (instant retrieval)
      if (typeof window !== "undefined") {
        try {
          const userKey = user?.id ? `campussutras_attempts_${user.id}` : null;
          const emailKey = user?.email ? `campussutras_attempts_${user.email}` : null;
          const localUserAttempts = userKey ? JSON.parse(localStorage.getItem(userKey) || "[]") : [];
          const localEmailAttempts = emailKey ? JSON.parse(localStorage.getItem(emailKey) || "[]") : [];
          const globalAttempts = JSON.parse(localStorage.getItem("campussutras_all_attempts") || "[]");

          const matchingGlobal = globalAttempts.filter((att) => {
            if (!att) return false;
            const aUserId = String(att.user_id || "").toLowerCase();
            const aUserEmail = String(att.user_email || att.email || "").toLowerCase();
            const targetId = user?.id ? String(user.id).toLowerCase() : null;
            const targetEmail = user?.email ? String(user.email).toLowerCase() : null;
            return (targetId && aUserId === targetId) || (targetEmail && (aUserEmail === targetEmail || aUserId === targetEmail));
          });

          [...localUserAttempts, ...localEmailAttempts, ...matchingGlobal].forEach((att) => {
            if (att?.id || att?.assessment_id) {
              const key = att.id || `${att.assessment_id || att.assessment_slug}_${att.submitted_at}`;
              combinedMap.set(key, att);
            }
          });
        } catch (e) {
          console.warn("[ProfileAssessmentsTab] localStorage read:", e);
        }
      }

      // 2. Query Supabase assessment_attempts if user is logged in
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from("assessment_attempts")
            .select("*")
            .eq("user_id", user.id)
            .order("submitted_at", { ascending: false });

          if (!error && Array.isArray(data)) {
            data.forEach((dbAtt) => {
              const key = dbAtt.id || `${dbAtt.assessment_id}_${dbAtt.submitted_at}`;
              combinedMap.set(key, {
                ...dbAtt,
                id: dbAtt.id,
              });
            });
          }
        } catch (err) {
          console.warn("[ProfileAssessmentsTab] Supabase fetch notice:", err);
        }
      }

      // 3. Resolve assessment catalog map for title & slug normalization
      let allAssessmentsMap = new Map();
      try {
        const allAsms = await getAllAssessments();
        if (Array.isArray(allAsms)) {
          allAsms.forEach((a) => {
            if (a.id) allAssessmentsMap.set(String(a.id).toLowerCase(), a);
            if (a.slug) allAssessmentsMap.set(String(a.slug).toLowerCase(), a);
          });
        }
      } catch (err) {
        console.warn("[ProfileAssessmentsTab] assessment map notice:", err);
      }

      // 4. Normalize attempts with assessment definitions
      const normalized = Array.from(combinedMap.values()).map((attempt) => {
        const lookupKey = String(attempt.assessment_id || attempt.assessment_slug || "").toLowerCase();
        const assessmentDef = allAssessmentsMap.get(lookupKey) || null;
        return {
          ...attempt,
          title: attempt.assessment_title || attempt.title || assessmentDef?.title || "Assessment",
          category_name: attempt.category_name || assessmentDef?.category_name || "General",
          slug: attempt.assessment_slug || attempt.slug || assessmentDef?.slug || attempt.assessment_id || "generative-ai-agents",
        };
      });

      // Sort by latest date
      normalized.sort((a, b) => {
        const timeA = new Date(a.submitted_at || a.started_at || 0).getTime();
        const timeB = new Date(b.submitted_at || b.started_at || 0).getTime();
        return timeB - timeA;
      });

      setAttempts(normalized);
      setIsLoading(false);
    }

    loadAttempts();
  }, [user]);

  // Calculate high-level stats
  const totalCompleted = attempts.length;
  const passedCount = attempts.filter((a) => a.is_passed).length;
  const avgScore = totalCompleted > 0
    ? (attempts.reduce((acc, curr) => acc + Number(curr.percentage || 0), 0) / totalCompleted).toFixed(1)
    : "0.0";

  return (
    <div className={styles.container}>
      {/* Top Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "rgba(11, 87, 208, 0.08)", color: "#002255" }}>
            <FileText size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Assessments Taken</span>
            <span className={styles.statValue}>{totalCompleted}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "rgba(16, 185, 129, 0.08)", color: "#059669" }}>
            <Award size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Passed Tests</span>
            <span className={styles.statValue}>{passedCount}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Average Score</span>
            <span className={styles.statValue}>{avgScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Attempts List Card */}
      <div className={styles.tabContentCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>My Assessment Transcripts</h2>
            <p className={styles.sectionDesc}>
              Review your evaluation history, scores, and scorecard performance.
            </p>
          </div>
          <Link href="/assessments" className={`btn btn-primary btn-sm ${styles.browseBtn}`}>
            <Sparkles size={15} />
            <span>Explore Assessments</span>
          </Link>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <span>Loading your assessment transcripts...</span>
          </div>
        ) : attempts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrap}>
              <FileText size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No Assessments Attempted Yet</h3>
            <p className={styles.emptyDesc}>
              Test your technical skills across Full Stack Web Development, Artificial Intelligence, Data Science, and Cloud Computing.
            </p>
            <Link href="/assessments" className={`btn btn-primary ${styles.startFirstBtn}`}>
              <span>Take Your First Assessment</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Assessment / Category</th>
                  <th>Date Attempted</th>
                  <th>Questions</th>
                  <th>Score &amp; Accuracy</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => {
                  const testTitle = attempt.title || attempt.assessment_title || "Technical Assessment";
                  const category = attempt.category_name || "General";
                  const targetSlug = attempt.slug || attempt.assessment_slug || attempt.assessment_id || "nextjs-core-assessment";
                  const dateStr = attempt.submitted_at || attempt.started_at 
                    ? new Date(attempt.submitted_at || attempt.started_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "Recent";
                  const totalQ = attempt.total_questions || 10;
                  const score = attempt.score || 0;
                  const pct = attempt.percentage !== undefined ? Number(attempt.percentage).toFixed(0) : "0";

                  return (
                    <tr key={attempt.id || `${attempt.assessment_id}_${dateStr}`}>
                      <td>
                        <div className={styles.assessmentCell}>
                          <span className={styles.testTitleText}>{testTitle}</span>
                          <span className={styles.categoryBadge}>{category}</span>
                        </div>
                      </td>
                      <td className={styles.dateCell}>
                        <Clock size={13} className={styles.cellIcon} />
                        <span>{dateStr}</span>
                      </td>
                      <td>
                        <span className={styles.questionsPill}>
                          {attempt.total_answered !== undefined ? attempt.total_answered : totalQ}/{totalQ} answered
                        </span>
                      </td>
                      <td>
                        <div className={styles.scoreWrap}>
                          <span className={styles.scoreText}>{score}/{totalQ}</span>
                          <span className={styles.percentText}>({pct}%)</span>
                        </div>
                      </td>
                      <td>
                        {attempt.is_passed ? (
                          <span className={styles.passBadge}>
                            <CheckCircle2 size={13} />
                            <span>Passed</span>
                          </span>
                        ) : (
                          <span className={styles.failBadge}>
                            <XCircle size={13} />
                            <span>Needs Improvement</span>
                          </span>
                        )}
                      </td>
                      <td>
                        <Link 
                          href={`/assessments/${targetSlug}/result?attemptId=${attempt.id}`}
                          className={styles.reviewLink}
                        >
                          <span>Review Scorecard</span>
                          <ExternalLink size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
