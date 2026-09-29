"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./AssessmentRunner.module.css";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { getActiveDriveSession, saveActiveDriveSession } from "@/lib/driveUtils";
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle, 
  X, 
  Code2,
  LogIn
} from "lucide-react";


export default function AssessmentRunner({ assessment }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, isAdmin } = useAuth();

  const totalQuestions = assessment?.questions?.length || 0;
  const initialDurationSeconds = (assessment?.duration_minutes || 10) * 60;

  // Assessment state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [flagged, setFlagged] = useState({}); // { [questionIndex]: boolean }
  const [timeRemaining, setTimeRemaining] = useState(initialDurationSeconds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const timerRef = useRef(null);

  // Pick up drive session from URL parameters if present
  useEffect(() => {
    if (!searchParams) return;
    const urlCollege = searchParams.get("college");
    const urlCourse = searchParams.get("course");
    const urlDrive = searchParams.get("drive");
    if (urlCollege || urlDrive) {
      saveActiveDriveSession({
        college: urlCollege || "",
        course: urlCourse || "",
        code: urlDrive || "",
        assessmentSlug: assessment?.slug || "",
      });
    }
  }, [searchParams, assessment?.slug]);

  // Submit Logic
  const finalizeSubmission = useCallback(async (status = "completed") => {
    if (isSubmitting || totalQuestions === 0) return;
    setIsSubmitting(true);

    // Calculate score
    let correctCount = 0;
    (assessment?.questions || []).forEach((q, idx) => {
      if (answers[idx] === q.correct_option_index) {
        correctCount += 1;
      }
    });

    const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(1));
    const isPassed = percentage >= (assessment?.passing_percentage || 60);
    const timeSpentSeconds = initialDurationSeconds - timeRemaining;

    const attemptId = `att_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Check for active campus drive session
    const activeDrive = getActiveDriveSession();
    const sessionAnswers = activeDrive?.college
      ? {
          ...answers,
          _campus_session: {
            code: activeDrive.code || null,
            college: activeDrive.college || null,
            course: activeDrive.course || null,
            taggedAt: timestamp,
          },
        }
      : answers;

    const attemptPayload = {
      id: attemptId,
      user_id: user?.id || "guest",
      user_email: user?.email || null,
      user_name: user?.full_name || user?.user_metadata?.full_name || user?.name || null,
      assessment_id: assessment?.id || assessment?.slug,
      assessment_slug: assessment?.slug,
      assessment_title: assessment?.title,
      category_name: assessment?.category_name,
      difficulty: assessment?.difficulty,
      total_questions: totalQuestions,
      total_answered: Object.keys(answers).length,
      score: correctCount,
      percentage,
      is_passed: isPassed,
      status,
      time_spent_seconds: timeSpentSeconds,
      student_answers: sessionAnswers,
      started_at: timestamp,
      submitted_at: timestamp,
    };

    // 1. Save to localStorage for instant, guaranteed persistence in Member Profile
    if (typeof window !== "undefined") {
      try {
        if (user?.id) {
          const userKey = `campussutras_attempts_${user.id}`;
          const existing = JSON.parse(localStorage.getItem(userKey) || "[]");
          const updated = [attemptPayload, ...existing.filter((item) => item.id !== attemptId)];
          localStorage.setItem(userKey, JSON.stringify(updated));
        }

        if (user?.email) {
          const emailKey = `campussutras_attempts_${user.email}`;
          const existing = JSON.parse(localStorage.getItem(emailKey) || "[]");
          const updated = [attemptPayload, ...existing.filter((item) => item.id !== attemptId)];
          localStorage.setItem(emailKey, JSON.stringify(updated));
        }

        // Global key as well
        const globalAttempts = JSON.parse(localStorage.getItem("campussutras_all_attempts") || "[]");
        localStorage.setItem("campussutras_all_attempts", JSON.stringify([attemptPayload, ...globalAttempts.filter((i) => i.id !== attemptId)]));

        // Session storage for result page
        sessionStorage.setItem(`attempt_${attemptId}`, JSON.stringify({
          ...attemptPayload,
          assessment,
        }));
      } catch (storageErr) {
        console.warn("[AssessmentRunner] Local storage notice:", storageErr);
      }
    }

    // 2. If user is authenticated, sync attempt to Supabase DB in real-time
    if (user?.id) {
      try {
        const fullInsertPayload = {
          id: attemptId,
          user_id: user.id,
          user_email: user.email || null,
          user_name: user.full_name || user.user_metadata?.full_name || user.name || null,
          assessment_id: assessment?.id || assessment?.slug,
          assessment_slug: assessment?.slug,
          assessment_title: assessment?.title,
          category_name: assessment?.category_name || "General",
          difficulty: assessment?.difficulty || "Intermediate",
          total_questions: totalQuestions,
          total_answered: Object.keys(answers).length,
          score: correctCount,
          percentage: Number(percentage) || 0,
          is_passed: Boolean(isPassed),
          status: status || "completed",
          time_spent_seconds: timeSpentSeconds,
          student_answers: sessionAnswers,
          started_at: timestamp,
          submitted_at: timestamp,
          expires_at: timestamp,
        };

        const { error: insertErr } = await supabase
          .from("assessment_attempts")
          .insert(fullInsertPayload);

        if (insertErr) {
          console.warn("[AssessmentRunner] Full insert notice, attempting standard payload:", insertErr);
          await supabase.from("assessment_attempts").insert({
            id: attemptId,
            user_id: user.id,
            user_email: user.email || null,
            assessment_id: assessment?.id || assessment?.slug,
            score: correctCount,
            total_questions: totalQuestions,
            percentage: Number(percentage) || 0,
            is_passed: Boolean(isPassed),
            status: status || "completed",
            student_answers: sessionAnswers,
            started_at: timestamp,
            submitted_at: timestamp,
            expires_at: timestamp,
          });
        }

        // Also asynchronously ensure user profile has college and course saved
        if (activeDrive?.college) {
          supabase
            .from("profiles")
            .update({
              college: activeDrive.college,
              degree: activeDrive.course || undefined,
            })
            .eq("id", user.id)
            .then(() => {})
            .catch(() => {});
        }
      } catch (dbErr) {
        console.warn("[AssessmentRunner] Supabase attempt sync error:", dbErr);
      }
    }

    router.push(`/assessments/${assessment?.slug}/result?attemptId=${attemptId}`);
  }, [isSubmitting, totalQuestions, assessment, answers, initialDurationSeconds, timeRemaining, user, router]);

  const handleAutoSubmit = useCallback(async () => {
    await finalizeSubmission("expired");
  }, [finalizeSubmission]);

  // Start test countdown ONLY when user is authenticated, not loading, and has questions
  useEffect(() => {
    if (loading || !user || totalQuestions === 0) return;

    setHasStarted(true);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, user, totalQuestions, handleAutoSubmit]);

  // Format time remaining MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const timerPercentage = (timeRemaining / initialDurationSeconds) * 100;
  const isTimeWarning = timeRemaining < 180 && timeRemaining >= 60;
  const isTimeCritical = timeRemaining < 60;

  // Options letter mapper
  const optionLetters = ["A", "B", "C", "D"];

  const currentQuestion = assessment?.questions?.[currentIdx] || null;
  const selectedOption = answers[currentIdx];
  const isCurrentFlagged = Boolean(flagged[currentIdx]);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);

  // Handle Option Select
  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIndex,
    }));
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentIdx]: !prev[currentIdx],
    }));
  };

  const handleManualSubmit = async () => {
    setShowConfirmModal(false);
    await finalizeSubmission("completed");
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className={styles.authGateWrapper}>
        <div className={styles.authSpinner}></div>
        <p className={styles.authGateLoadingText}>Verifying student authentication...</p>
      </div>
    );
  }

  // 2. Early return if assessment has no questions configured
  if (totalQuestions === 0) {
    return (
      <div className="container" style={{ padding: "4rem 1.5rem", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: "#ffffff", padding: "2.5rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,34,85,0.06)" }}>
          <AlertCircle size={44} style={{ color: "#d97706", margin: "0 auto 1rem auto" }} />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#091e42", marginBottom: "0.5rem" }}>
            {assessment?.title || "Assessment"} – Coming Soon
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            This assessment is currently being prepared with curated questions. Please check back shortly or explore our other live practice tests.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assessments" className="btn btn-primary">
              Explore Active Assessments
            </Link>
            {isAdmin && (
              <Link href="/admin/assessments" className="btn btn-secondary">
                Edit in Admin Studio
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Unauthenticated User Gate: User must register/login before starting assessment
  if (!user) {
    const passQuestions = Math.ceil(((assessment?.total_questions || totalQuestions) * (assessment?.passing_percentage || 60)) / 100);
    const currentParams = searchParams?.toString();
    const targetAssessmentPath = `/assessments/${assessment.slug}`;
    const signupRedirectHref = currentParams 
      ? `/signup?redirect=${encodeURIComponent(targetAssessmentPath)}&${currentParams}`
      : `/signup?redirect=${encodeURIComponent(targetAssessmentPath)}`;
    const loginRedirectHref = `/login?redirect=${encodeURIComponent(targetAssessmentPath)}`;

    return (
      <div className={styles.authGateWrapper}>
        <div className={styles.authGateCard}>
          <div className={styles.authGateIconWrap}>
            <ShieldAlert size={36} className={styles.authGateIcon} />
          </div>

          <div className={styles.authGateHeader}>
            <span className={styles.categoryBadge}>{assessment.category_name}</span>
            <h1 className={styles.authGateTitle}>{assessment.title}</h1>
            <p className={styles.authGateSubtitle}>
              Please create a free account or sign in to take this assessment. Your score, time, and complete solution explanations will be recorded on your verified student transcript.
            </p>
          </div>

          <div className={styles.authGateSpecGrid}>
            <div className={styles.authGateSpecItem}>
              <span className={styles.specLabel}>Total Questions</span>
              <strong className={styles.specValue}>{totalQuestions} Questions</strong>
            </div>
            <div className={styles.authGateSpecItem}>
              <span className={styles.specLabel}>Time Limit</span>
              <strong className={styles.specValue}>{assessment.duration_minutes || 10} Minutes</strong>
            </div>
            <div className={styles.authGateSpecItem}>
              <span className={styles.specLabel}>Passing Score</span>
              <strong className={styles.specValue}>{assessment.passing_percentage}% ({passQuestions}/{totalQuestions})</strong>
            </div>
          </div>

          <div className={styles.authGateActions}>
            <Link 
              href={signupRedirectHref}
              className={`btn btn-primary ${styles.authGatePrimaryBtn}`}
            >
              <Sparkles size={18} />
              <span>Create Free Account &amp; Start Test</span>
            </Link>

            <Link 
              href={loginRedirectHref}
              className={`btn btn-secondary ${styles.authGateSecondaryBtn}`}
            >
              <LogIn size={18} />
              <span>Already have an account? Sign In</span>
            </Link>
          </div>

          <div className={styles.authGateFooter}>
            <Link href="/assessments" className={styles.authGateBackLink}>
              <ChevronLeft size={16} />
              <span>Browse All Assessments</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.runnerWrapper}>
      {/* Sticky Header with Timer Bar */}
      <header className={styles.stickyHeader}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerLeft}>
            <span className={styles.categoryBadge}>{assessment.category_name}</span>
            <h1 className={styles.assessmentTitleText}>{assessment.title}</h1>
          </div>

          <div className={styles.headerRight}>
            <div className={`${styles.timerBox} ${isTimeCritical ? styles.timerCritical : isTimeWarning ? styles.timerWarning : ""}`}>
              <Clock size={16} className={styles.timerIcon} />
              <span className={styles.timerDigits}>{formatTime(timeRemaining)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className={`btn btn-primary btn-sm ${styles.submitHeaderBtn}`}
              disabled={isSubmitting}
            >
              <Send size={14} />
              <span>Submit Test</span>
            </button>
          </div>
        </div>

        {/* Real-time Progress Countdown Bar */}
        <div className={styles.timerProgressTrack}>
          <div 
            className={`${styles.timerProgressFill} ${isTimeCritical ? styles.fillCritical : isTimeWarning ? styles.fillWarning : ""}`}
            style={{ width: `${timerPercentage}%` }}
          ></div>
        </div>
      </header>

      {/* Main Runner Body */}
      <div className={`container ${styles.runnerBody}`}>
        <div className={styles.runnerLayout}>
          {/* Left Column: Question Workspace */}
          <main className={styles.questionWorkspace}>
            <div className={styles.questionCard}>
              {/* Question Header */}
              <div className={styles.qCardHeader}>
                <div className={styles.qNumRow}>
                  <span className={styles.qNumBadge}>Question {currentIdx + 1} of {totalQuestions}</span>
                  {currentQuestion?.topic && (
                    <span className={styles.topicBadge}>{currentQuestion.topic}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`${styles.flagBtn} ${isCurrentFlagged ? styles.flagBtnActive : ""}`}
                >
                  <Flag size={14} />
                  <span>{isCurrentFlagged ? "Marked for Review" : "Mark for Review"}</span>
                </button>
              </div>

              {/* Question Prompt */}
              <h2 className={styles.questionPrompt}>{currentQuestion?.question_text}</h2>

              {/* Optional Syntax-Highlighted Code Snippet */}
              {currentQuestion?.code_snippet && (
                <div className={styles.codeSnippetBox}>
                  <div className={styles.codeHeader}>
                    <Code2 size={14} />
                    <span>Code Snippet</span>
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>{currentQuestion.code_snippet}</code>
                  </pre>
                </div>
              )}

              {/* Multiple Choice Options List */}
              <div className={styles.optionsList}>
                {(currentQuestion?.options || []).map((optText, optIdx) => {
                  const isSelected = selectedOption === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                    >
                      <div className={`${styles.optionLetterPill} ${isSelected ? styles.letterPillSelected : ""}`}>
                        {optionLetters[optIdx]}
                      </div>
                      <span className={styles.optionText}>{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Step Navigation Bar */}
              <div className={styles.stepNavBar}>
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className={`btn btn-secondary ${styles.navStepBtn}`}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                {currentIdx < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className={`btn btn-primary ${styles.navStepBtn}`}
                  >
                    <span>Next Question</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className={`btn btn-primary ${styles.navStepBtn}`}
                  >
                    <Send size={16} />
                    <span>Review &amp; Submit</span>
                  </button>
                )}
              </div>
            </div>
          </main>

          {/* Right Column: 1-to-N Matrix Navigator */}
          <aside className={styles.matrixSidebar}>
            <div className={styles.matrixCard}>
              <h3 className={styles.matrixTitle}>Question Navigator</h3>
              
              <div className={styles.legendRow}>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.dotAnswered}`}></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.dotUnanswered}`}></span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.dotFlagged}`}></span>
                  <span>Review ({Object.values(flagged).filter(Boolean).length})</span>
                </div>
              </div>

              {/* 1 to N Grid */}
              <div className={styles.matrixGrid}>
                {assessment.questions.map((q, idx) => {
                  const isAns = answers[idx] !== undefined;
                  const isCur = currentIdx === idx;
                  const isFlg = Boolean(flagged[idx]);

                  let stateClass = styles.matrixUnanswered;
                  if (isCur) stateClass = styles.matrixCurrent;
                  else if (isFlg) stateClass = styles.matrixFlagged;
                  else if (isAns) stateClass = styles.matrixAnswered;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      className={`${styles.matrixPill} ${stateClass}`}
                      aria-label={`Jump to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Quick Submit Block */}
              <div className={styles.sidebarSubmitBlock}>
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className={`btn btn-primary ${styles.fullSubmitBtn}`}
                  disabled={isSubmitting}
                >
                  <Send size={15} />
                  <span>Submit Assessment</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap}>
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className={styles.modalTitle}>Submit Assessment?</h3>
                <p className={styles.modalSubtitle}>
                  Please confirm that you are ready to complete your evaluation.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowConfirmModal(false)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.summaryStats}>
                <div className={styles.statBox}>
                  <span className={styles.statBoxNum}>{answeredCount}</span>
                  <span className={styles.statBoxLabel}>Answered</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statBoxNum} style={{ color: unansweredCount > 0 ? '#dc2626' : '#059669' }}>
                    {unansweredCount}
                  </span>
                  <span className={styles.statBoxLabel}>Unanswered</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statBoxNum}>{formatTime(timeRemaining)}</span>
                  <span className={styles.statBoxLabel}>Time Left</span>
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className={styles.modalWarning}>
                  <AlertCircle size={16} />
                  <span>You have <strong>{unansweredCount}</strong> unanswered questions remaining.</span>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary"
              >
                Continue Assessment
              </button>

              <button
                type="button"
                onClick={handleManualSubmit}
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? "Grading..." : "Yes, Submit Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
