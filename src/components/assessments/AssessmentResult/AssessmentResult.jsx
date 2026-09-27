"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./AssessmentResult.module.css";
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Code2,
  Share2,
  Bookmark
} from "lucide-react";

export default function AssessmentResult({ assessment }) {
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [attemptData, setAttemptData] = useState(null);
  const [filterState, setFilterState] = useState("all"); // "all", "correct", "incorrect"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`attempt_${attemptId}`);
      if (stored) {
        try {
          setAttemptData(JSON.parse(stored));
        } catch (e) {
          console.warn("[AssessmentResult] JSON Parse error:", e);
        }
      }
    }
  }, [attemptId]);

  // Fallback calculations if direct access without attemptId
  const totalQuestions = assessment.questions.length;
  const userAnswers = attemptData?.student_answers || {};
  const score = attemptData?.score !== undefined ? attemptData.score : 0;
  const percentage = attemptData?.percentage !== undefined 
    ? attemptData.percentage 
    : Math.round((score / totalQuestions) * 100);
  const isPassed = attemptData?.is_passed !== undefined 
    ? attemptData.is_passed 
    : percentage >= assessment.passing_percentage;

  const timeSpentSecs = attemptData?.time_spent_seconds || 0;
  const timeSpentMins = Math.floor(timeSpentSecs / 60);
  const timeSpentRemSecs = timeSpentSecs % 60;
  const timeSpentStr = `${timeSpentMins}m ${timeSpentRemSecs}s`;

  const optionLetters = ["A", "B", "C", "D"];

  // Filter questions
  const filteredQuestions = assessment.questions.filter((q, idx) => {
    const userSelected = userAnswers[idx];
    const isCorrect = userSelected === q.correct_option_index;
    if (filterState === "correct") return isCorrect;
    if (filterState === "incorrect") return !isCorrect;
    return true;
  });

  const correctCount = assessment.questions.filter((q, idx) => userAnswers[idx] === q.correct_option_index).length;
  const incorrectCount = totalQuestions - correctCount;

  return (
    <div className={styles.resultWrapper}>
      <div className="container">
        {/* Breadcrumb Bar */}
        <div className={styles.breadcrumbBar}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <Link href="/assessments" className={styles.breadcrumbLink}>Assessments</Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Scorecard Review</span>
        </div>

        {/* Hero Scorecard Banner */}
        <div className={styles.scorecardHero}>
          <div className={styles.scorecardMain}>
            <div className={styles.statusHeader}>
              <div className={`${styles.statusPill} ${isPassed ? styles.pillPassed : styles.pillFailed}`}>
                {isPassed ? <Trophy size={16} /> : <AlertCircle size={16} />}
                <span>{isPassed ? "Assessment Passed" : "Needs Review & Practice"}</span>
              </div>
              <span className={styles.categoryBadge}>{assessment.category_name}</span>
            </div>

            <h1 className={styles.assessmentTitle}>{assessment.title}</h1>
            <p className={styles.scorecardDesc}>
              {isPassed 
                ? "Congratulations! You demonstrated strong understanding across all key concepts tested in this assessment." 
                : "You were close to the passing mark. Review the clear explanations below to strengthen your concepts before retaking."}
            </p>

            {/* Action Buttons */}
            <div className={styles.heroActions}>
              <Link 
                href={`/assessments/${assessment.slug}`}
                className={`btn btn-secondary ${styles.actionBtn}`}
              >
                <RotateCcw size={16} />
                <span>Retake Assessment</span>
              </Link>

              <Link 
                href="/profile"
                className={`btn btn-primary ${styles.actionBtn}`}
              >
                <span>View in Profile</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Score Gauge Card */}
          <div className={styles.scoreGaugeCard}>
            <div className={styles.gaugeCenter}>
              <span className={styles.gaugeScoreNum}>{score}/{totalQuestions}</span>
              <span className={styles.gaugePercentage}>{percentage}%</span>
              <span className={styles.gaugeLabel}>Final Score</span>
            </div>

            <div className={styles.metaStatList}>
              <div className={styles.metaStatItem}>
                <Clock size={14} className={styles.statIcon} />
                <span>Time Taken: <strong>{timeSpentStr}</strong></span>
              </div>
              <div className={styles.metaStatItem}>
                <CheckCircle2 size={14} className={styles.statIconSuccess} />
                <span>Passing Mark: <strong>{assessment.passing_percentage}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <section className={styles.solutionsSection}>
          <div className={styles.solutionsHeader}>
            <div>
              <h2 className={styles.solutionsTitle}>Detailed Solutions &amp; Explanations</h2>
              <p className={styles.solutionsSubtitle}>
                Review your answers with clear explanations for every question.
              </p>
            </div>

            {/* Filter Pills */}
            <div className={styles.filterPills}>
              <button
                type="button"
                onClick={() => setFilterState("all")}
                className={`${styles.filterBtn} ${filterState === "all" ? styles.filterBtnActive : ""}`}
              >
                <span>All ({totalQuestions})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterState("correct")}
                className={`${styles.filterBtn} ${filterState === "correct" ? styles.filterBtnActive : ""}`}
              >
                <CheckCircle2 size={14} color="#059669" />
                <span>Correct ({correctCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterState("incorrect")}
                className={`${styles.filterBtn} ${filterState === "incorrect" ? styles.filterBtnActive : ""}`}
              >
                <XCircle size={14} color="#dc2626" />
                <span>Incorrect ({incorrectCount})</span>
              </button>
            </div>
          </div>

          {/* Question Breakdown Cards */}
          <div className={styles.questionsStack}>
            {filteredQuestions.map((q) => {
              const originalIdx = assessment.questions.findIndex((item) => item.id === q.id);
              const userChoice = userAnswers[originalIdx];
              const isCorrect = userChoice === q.correct_option_index;
              const isSkipped = userChoice === undefined;

              return (
                <div key={q.id} className={`${styles.solutionCard} ${isCorrect ? styles.cardCorrect : styles.cardIncorrect}`}>
                  {/* Top Status Bar */}
                  <div className={styles.cardTopRow}>
                    <div className={styles.qInfoGroup}>
                      <span className={styles.qIndexBadge}>Question {originalIdx + 1}</span>
                      {q.topic && <span className={styles.topicTag}>{q.topic}</span>}
                    </div>

                    <div className={styles.resultBadge}>
                      {isCorrect ? (
                        <span className={styles.badgeCorrect}>
                          <CheckCircle2 size={14} />
                          <span>Correct (+1)</span>
                        </span>
                      ) : isSkipped ? (
                        <span className={styles.badgeSkipped}>
                          <AlertCircle size={14} />
                          <span>Unanswered</span>
                        </span>
                      ) : (
                        <span className={styles.badgeIncorrect}>
                          <XCircle size={14} />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h3 className={styles.promptText}>{q.question_text}</h3>

                  {/* Optional Code Snippet */}
                  {q.code_snippet && (
                    <div className={styles.codeSnippetBox}>
                      <div className={styles.codeHeader}>
                        <Code2 size={14} />
                        <span>Code Reference</span>
                      </div>
                      <pre className={styles.codeBlock}>
                        <code>{q.code_snippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* 4 Options Grid with Highlights */}
                  <div className={styles.optionsGrid}>
                    {q.options.map((optText, optIdx) => {
                      const isThisCorrect = optIdx === q.correct_option_index;
                      const isThisUserSelected = userChoice === optIdx;

                      let optStateClass = styles.optDefault;
                      if (isThisCorrect) optStateClass = styles.optCorrect;
                      else if (isThisUserSelected && !isThisCorrect) optStateClass = styles.optWrong;

                      return (
                        <div key={optIdx} className={`${styles.optionItem} ${optStateClass}`}>
                          <div className={styles.optLetterWrap}>
                            <span className={styles.optLetter}>{optionLetters[optIdx]}</span>
                          </div>
                          <span className={styles.optText}>{optText}</span>

                          {/* Badges */}
                          {isThisCorrect && (
                            <span className={styles.correctLabel}>
                              <CheckCircle2 size={13} />
                              <span>Correct Answer</span>
                            </span>
                          )}

                          {isThisUserSelected && !isThisCorrect && (
                            <span className={styles.yourChoiceLabel}>
                              <XCircle size={13} />
                              <span>Your Choice</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Engineering Explanation Box */}
                  <div className={styles.explanationBox}>
                    <div className={styles.explanationHeader}>
                      <Sparkles size={15} className={styles.explanationSparkle} />
                      <span className={styles.explanationTitle}>Engineering Explanation</span>
                    </div>
                    <p className={styles.explanationBody}>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
