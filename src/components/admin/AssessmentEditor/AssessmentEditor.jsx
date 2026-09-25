"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./AssessmentEditor.module.css";
import { 
  getAllCategories, 
  saveCustomCategory, 
  saveAssessment 
} from "@/lib/adminService";
import { 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FolderPlus, 
  Sparkles, 
  Code2, 
  HelpCircle, 
  Eye, 
  X, 
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Clock,
  Award,
  Tag,
  FileText,
  Check,
  Lightbulb,
  Hash,
  BookOpen,
  CheckCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

export default function AssessmentEditor({ initialAssessment = null, isNew = false }) {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: initialAssessment?.id || "",
    slug: initialAssessment?.slug || "",
    title: initialAssessment?.title || "",
    category_id: initialAssessment?.category_id || "web-software",
    category_name: initialAssessment?.category_name || "Software & Mobile Dev",
    difficulty: initialAssessment?.difficulty || "Intermediate",
    description: initialAssessment?.description || "",
    total_questions: initialAssessment?.total_questions || initialAssessment?.questions?.length || 5,
    duration_minutes: initialAssessment?.duration_minutes || 15,
    passing_percentage: initialAssessment?.passing_percentage || 60,
    is_published: initialAssessment?.is_published !== undefined ? initialAssessment.is_published : true,
    tagsInput: (initialAssessment?.tags || []).join(", "),
  });

  const [questions, setQuestions] = useState(
    initialAssessment?.questions && initialAssessment.questions.length > 0
      ? initialAssessment.questions
      : [
          {
            id: `q_1`,
            question_number: 1,
            topic: "Core Fundamentals",
            question_text: "",
            code_snippet: "",
            options: ["", "", "", ""],
            correct_option_index: 0,
            explanation: "",
          }
        ]
  );

  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Category modal
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    let isMounted = true;
    async function loadCats() {
      try {
        const cats = await getAllCategories();
        const validCats = Array.isArray(cats) ? cats.filter((c) => c.slug !== "all") : [];
        if (isMounted) {
          setCategories(validCats);
          if (!initialAssessment && validCats.length > 0) {
            setFormData((prev) => ({
              ...prev,
              category_id: prev.category_id || validCats[0].slug,
              category_name: prev.category_name || validCats[0].name,
            }));
          }
        }
      } catch (err) {
        console.error("[AssessmentEditor] loadCats error:", err);
      }
    }
    loadCats();
    return () => {
      isMounted = false;
    };
  }, [initialAssessment]);

  // Handle category select
  const handleCategoryChange = (catSlug) => {
    const matched = categories.find((c) => c.slug === catSlug || c.id === catSlug);
    setFormData((prev) => ({
      ...prev,
      category_id: catSlug,
      category_name: matched?.name || catSlug,
    }));
  };

  // Add Question
  const handleAddQuestion = () => {
    const nextNum = questions.length + 1;
    const newQ = {
      id: `q_${Date.now()}_${nextNum}`,
      question_number: nextNum,
      topic: "",
      question_text: "",
      code_snippet: "",
      options: ["", "", "", ""],
      correct_option_index: 0,
      explanation: "",
    };
    setQuestions([...questions, newQ]);
    setExpandedQuestionIdx(questions.length);
  };

  // Duplicate Question
  const handleDuplicateQuestion = (idx) => {
    const target = questions[idx];
    const duplicated = {
      ...target,
      id: `q_${Date.now()}_dup`,
      question_number: questions.length + 1,
      question_text: target.question_text ? `${target.question_text} (Copy)` : "",
    };
    const updated = [...questions, duplicated];
    setQuestions(updated);
    setExpandedQuestionIdx(questions.length);
  };

  // Delete Question
  const handleDeleteQuestion = (idx) => {
    if (questions.length <= 1) {
      alert("An assessment must contain at least 1 question.");
      return;
    }
    const updated = questions.filter((_, i) => i !== idx).map((q, i) => ({ ...q, question_number: i + 1 }));
    setQuestions(updated);
    setExpandedQuestionIdx(Math.max(0, idx - 1));
  };

  // Update Question Field
  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  // Update Question Option
  const handleOptionChange = (qIdx, optIdx, val) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = val;
    setQuestions(updated);
  };

  // Helper to check if question is filled
  const isQuestionComplete = (q) => {
    return (
      Boolean(q?.question_text?.trim()) &&
      Boolean(q?.options && q.options.length === 4 && q.options.every((opt) => opt?.trim())) &&
      Boolean(q?.explanation?.trim())
    );
  };

  // Create Quick Category
  const handleCreateCategoryQuick = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    try {
      const slug = newCat.slug.trim() || newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const created = await saveCustomCategory({
        id: `cat_${Date.now()}`,
        slug,
        name: newCat.name.trim(),
        description: newCat.description.trim(),
        color: "#0b57d0",
      });

      const refreshed = await getAllCategories();
      const validCats = Array.isArray(refreshed) ? refreshed.filter((c) => c.slug !== "all") : [];
      setCategories(validCats);
      setFormData((prev) => ({
        ...prev,
        category_id: created.slug,
        category_name: created.name,
      }));
      setShowCatModal(false);
      setNewCat({ name: "", slug: "", description: "" });
    } catch (err) {
      console.error("[AssessmentEditor] saveCategory error:", err);
    }
  };

  // Submit & Save Assessment
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.title.trim()) {
      setErrorMessage("Please enter an assessment title.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Validate Questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim()) {
        setErrorMessage(`Question #${i + 1} is missing a Question Prompt.`);
        setExpandedQuestionIdx(i);
        window.scrollTo({ top: 120, behavior: "smooth" });
        return;
      }
      const emptyOptIndex = q.options.findIndex((opt) => !opt.trim());
      if (emptyOptIndex !== -1) {
        setErrorMessage(`Question #${i + 1} has an empty Option ${String.fromCharCode(65 + emptyOptIndex)}. All 4 options are required.`);
        setExpandedQuestionIdx(i);
        window.scrollTo({ top: 120, behavior: "smooth" });
        return;
      }
      if (!q.explanation.trim()) {
        setErrorMessage(`Question #${i + 1} requires an engineering explanation.`);
        setExpandedQuestionIdx(i);
        window.scrollTo({ top: 120, behavior: "smooth" });
        return;
      }
    }

    setIsSaving(true);

    try {
      const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const tags = formData.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        id: formData.id || `custom_${slug}`,
        slug,
        tags,
        total_questions: questions.length,
        duration_minutes: Number(formData.duration_minutes),
        passing_percentage: Number(formData.passing_percentage),
        questions,
      };

      await saveAssessment(payload);
      setSuccessMessage(`Assessment "${payload.title}" saved successfully!`);
      setTimeout(() => {
        router.push("/admin/assessments");
      }, 1200);
    } catch (err) {
      console.error("[Assessment Save Error]:", err);
      setErrorMessage(err?.message || "Failed to save assessment. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* Top Header Bar */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <Link href="/admin/assessments" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>Back to Studio</span>
          </Link>
          <div className={styles.titleWrapper}>
            <span className={styles.headerBadge}>
              <Sparkles size={12} />
              <span>Assessment Creator Studio</span>
            </span>
            <h1 className={styles.pageTitle}>
              {isNew ? "Create Technical Assessment" : `Edit: ${formData.title || "Assessment"}`}
            </h1>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}
            className={`${styles.statusToggle} ${formData.is_published ? styles.statusPublished : styles.statusDraft}`}
            title="Click to toggle publish status"
          >
            <span className={styles.statusDot}></span>
            <span>{formData.is_published ? "Published (Live)" : "Draft (Hidden)"}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className={styles.saveBtn}
          >
            <Save size={16} />
            <span>{isSaving ? "Saving..." : "Save Assessment"}</span>
          </button>
        </div>
      </header>

      {/* Floating / Top Alert Notifications */}
      {errorMessage && (
        <div className={styles.alertError}>
          <AlertCircle size={18} className={styles.alertIcon} />
          <div className={styles.alertText}>
            <strong>Validation Error:</strong> {errorMessage}
          </div>
          <button type="button" onClick={() => setErrorMessage("")} className={styles.alertClose}>
            <X size={14} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className={styles.alertSuccess}>
          <CheckCircle2 size={18} className={styles.alertIcon} />
          <div className={styles.alertText}>
            <strong>Success!</strong> {successMessage}
          </div>
        </div>
      )}

      <div className={styles.editorLayout}>
        {/* Left Column: Metadata & Configuration Sidebar */}
        <aside className={styles.settingsSidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardHeader}>
              <div className={styles.cardHeaderIcon}>
                <Layers size={18} />
              </div>
              <div>
                <h2 className={styles.sidebarCardTitle}>Assessment Settings</h2>
                <p className={styles.sidebarCardSubtitle}>Core metadata, timing &amp; passing criteria</p>
              </div>
            </div>

            <div className={styles.sidebarFormContent}>
              {/* Assessment Title */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Assessment Title <span className={styles.reqStar}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 16 App Router Mastery"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              {/* URL Slug */}
              <div className={styles.formGroup}>
                <div className={styles.labelWithTip}>
                  <label className={styles.label}>URL Slug</label>
                  <span className={styles.tipText}>Auto-generated if empty</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. nextjs-app-router-mastery"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className={styles.input}
                />
              </div>

              {/* Category Selection + Quick Modal */}
              <div className={styles.formGroup}>
                <div className={styles.labelWithAction}>
                  <label className={styles.label}>
                    Category <span className={styles.reqStar}>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCatModal(true)}
                    className={styles.quickCatBtn}
                  >
                    <Plus size={12} />
                    <span>New Category</span>
                  </button>
                </div>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.category_id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={styles.select}
                  >
                    {(Array.isArray(categories) ? categories : [])
                      .filter((c) => c.slug !== "all")
                      .map((c) => (
                        <option key={c.id || c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Difficulty Level */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Difficulty Level</label>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className={styles.select}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Two Column Grid: Duration & Passing Percentage */}
              <div className={styles.twoColRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Clock size={13} className={styles.inlineIcon} />
                    <span>Duration (Mins)</span>
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Award size={13} className={styles.inlineIcon} />
                    <span>Pass Score (%)</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={formData.passing_percentage}
                    onChange={(e) => setFormData({ ...formData, passing_percentage: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Description */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Description &amp; Syllabus Overview</label>
                <textarea
                  placeholder="Detailed summary of topics, domain expectations, and skills evaluated in this assessment..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              {/* Tags */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Tag size={13} className={styles.inlineIcon} />
                  <span>Topic Tags (comma-separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="React, Next.js, Server Actions, SSR"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Sidebar Summary Footer */}
            <div className={styles.sidebarSummary}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Questions:</span>
                <span className={styles.summaryValue}>{questions.length} Items</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Min. Correct to Pass:</span>
                <span className={styles.summaryValue}>
                  {Math.ceil((questions.length * Number(formData.passing_percentage || 60)) / 100)} / {questions.length}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Question Studio & Question Cards */}
        <main className={styles.questionsWorkspace}>
          {/* Workspace Header */}
          <div className={styles.workspaceHeader}>
            <div className={styles.workspaceHeaderLeft}>
              <div className={styles.qCountBadge}>
                <Hash size={14} />
                <span>{questions.length} {questions.length === 1 ? "Question" : "Questions"}</span>
              </div>
              <h2 className={styles.sectionTitle}>Question Bank &amp; Solutions</h2>
              <p className={styles.sectionSubtitle}>
                Add multiple choice questions, optional code snippets, answer options, and engineering explanations.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className={styles.addQuestionHeaderBtn}
            >
              <Plus size={16} />
              <span>Add Question</span>
            </button>
          </div>

          {/* Quick Jump Question Matrix Pills */}
          <div className={styles.quickNavMatrix}>
            <span className={styles.quickNavLabel}>Quick Jump:</span>
            <div className={styles.quickNavScroll}>
              {questions.map((q, idx) => {
                const complete = isQuestionComplete(q);
                const isCurrent = expandedQuestionIdx === idx;
                return (
                  <button
                    key={q.id || idx}
                    type="button"
                    onClick={() => setExpandedQuestionIdx(idx)}
                    className={`${styles.navPill} ${isCurrent ? styles.navPillCurrent : ""} ${complete ? styles.navPillComplete : styles.navPillIncomplete}`}
                    title={`Question ${idx + 1}: ${q.question_text || "Untitled"} (${complete ? "Complete" : "Incomplete"})`}
                  >
                    <span>Q{idx + 1}</span>
                    {complete && <span className={styles.navPillDot}></span>}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={handleAddQuestion}
                className={styles.navPillAdd}
                title="Add new question"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Questions Stack */}
          <div className={styles.questionsStack}>
            {questions.map((q, qIdx) => {
              const isExpanded = expandedQuestionIdx === qIdx;
              const complete = isQuestionComplete(q);

              return (
                <div 
                  key={q.id || qIdx} 
                  className={`${styles.questionCard} ${isExpanded ? styles.qCardExpanded : ""}`}
                >
                  {/* Question Card Header / Accordion Bar */}
                  <div
                    className={styles.qCardHeader}
                    onClick={() => setExpandedQuestionIdx(isExpanded ? null : qIdx)}
                  >
                    <div className={styles.qHeaderLeft}>
                      <div className={`${styles.qIndexCircle} ${isExpanded ? styles.qIndexActive : ""}`}>
                        #{qIdx + 1}
                      </div>

                      <div className={styles.qHeaderInfo}>
                        <div className={styles.qHeaderMeta}>
                          {q.topic ? (
                            <span className={styles.topicBadge}>{q.topic}</span>
                          ) : (
                            <span className={styles.topicBadgeDefault}>General</span>
                          )}
                          <span className={complete ? styles.statusBadgeReady : styles.statusBadgeDraft}>
                            {complete ? (
                              <>
                                <Check size={11} />
                                <span>Complete</span>
                              </>
                            ) : (
                              <span>Draft</span>
                            )}
                          </span>
                        </div>

                        <div className={styles.qSummaryText}>
                          {q.question_text ? (
                            q.question_text
                          ) : (
                            <span className={styles.placeholderPrompt}>Click to edit question prompt...</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.qHeaderActions} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleDuplicateQuestion(qIdx)}
                        className={styles.qActionBtn}
                        title="Duplicate Question"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(qIdx)}
                        className={`${styles.qActionBtn} ${styles.qDeleteBtn}`}
                        title="Delete Question"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedQuestionIdx(isExpanded ? null : qIdx)}
                        className={styles.qExpandChevron}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Question Card Body */}
                  {isExpanded && (
                    <div className={styles.qCardBody}>
                      {/* Sub-topic / Domain Tag */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <Tag size={13} className={styles.inlineIcon} />
                          <span>Sub-topic / Domain Tag</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. React Server Components, Database Indexes, State Management"
                          value={q.topic}
                          onChange={(e) => handleQuestionChange(qIdx, "topic", e.target.value)}
                          className={styles.input}
                        />
                      </div>

                      {/* Question Prompt Textarea */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <FileText size={13} className={styles.inlineIcon} />
                          <span>Question Prompt</span> <span className={styles.reqStar}>*</span>
                        </label>
                        <textarea
                          placeholder="State the technical question, scenario, or architectural problem clearly..."
                          value={q.question_text}
                          onChange={(e) => handleQuestionChange(qIdx, "question_text", e.target.value)}
                          className={styles.promptTextarea}
                          rows={3}
                          required
                        />
                      </div>

                      {/* Optional Code Snippet with IDE Aesthetic */}
                      <div className={styles.formGroup}>
                        <div className={styles.codeSnippetHeader}>
                          <div className={styles.codeHeaderTitle}>
                            <Code2 size={14} />
                            <span>Code Snippet (Optional)</span>
                          </div>
                          <span className={styles.codeHeaderHint}>
                            JavaScript, TypeScript, Python, SQL, C++, Java
                          </span>
                        </div>
                        <div className={styles.codeEditorContainer}>
                          <div className={styles.codeTopBar}>
                            <span className={styles.codeDot}></span>
                            <span className={styles.codeDot}></span>
                            <span className={styles.codeDot}></span>
                            <span className={styles.codeLangPill}>code-snippet.js</span>
                          </div>
                          <textarea
                            placeholder="// Paste technical code snippet, SQL query, or function example here..."
                            value={q.code_snippet || ""}
                            onChange={(e) => handleQuestionChange(qIdx, "code_snippet", e.target.value)}
                            className={styles.codeTextarea}
                            rows={4}
                            spellCheck={false}
                          />
                        </div>
                      </div>

                      {/* 4 Multiple Choice Options */}
                      <div className={styles.optionsSection}>
                        <div className={styles.optionsHeader}>
                          <div>
                            <label className={styles.label}>
                              Multiple Choice Options <span className={styles.reqStar}>*</span>
                            </label>
                            <p className={styles.optionsSubtitle}>
                              Select the radio button corresponding to the correct answer.
                            </p>
                          </div>
                          <div className={styles.selectedIndicator}>
                            Correct: <strong>Option {String.fromCharCode(65 + q.correct_option_index)}</strong>
                          </div>
                        </div>

                        <div className={styles.optionsGrid}>
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = q.correct_option_index === optIdx;
                            const letter = String.fromCharCode(65 + optIdx);

                            return (
                              <div
                                key={optIdx}
                                className={`${styles.optionCard} ${isCorrect ? styles.optionCardCorrect : ""}`}
                                onClick={() => handleQuestionChange(qIdx, "correct_option_index", optIdx)}
                              >
                                <div className={styles.optionRadioWrapper}>
                                  <input
                                    type="radio"
                                    name={`correct_opt_${qIdx}`}
                                    checked={isCorrect}
                                    onChange={() => handleQuestionChange(qIdx, "correct_option_index", optIdx)}
                                    className={styles.optionRadio}
                                    id={`q_${qIdx}_opt_${optIdx}`}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <label
                                    htmlFor={`q_${qIdx}_opt_${optIdx}`}
                                    className={`${styles.optLetterBadge} ${isCorrect ? styles.optLetterBadgeCorrect : ""}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {letter}
                                  </label>
                                </div>

                                <input
                                  type="text"
                                  placeholder={`Enter option ${letter} text...`}
                                  value={opt}
                                  onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`${styles.optInput} ${isCorrect ? styles.optInputCorrect : ""}`}
                                  required
                                />

                                {isCorrect && (
                                  <span className={styles.correctBadgePill}>
                                    <Check size={12} />
                                    <span>Correct</span>
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Comprehensive Engineering Explanation */}
                      <div className={styles.formGroup}>
                        <div className={styles.explanationHeader}>
                          <label className={styles.label}>
                            <Lightbulb size={14} className={styles.explanationIcon} />
                            <span>Engineering Explanation &amp; Solution Rationale</span> <span className={styles.reqStar}>*</span>
                          </label>
                          <span className={styles.explanationHint}>
                            Displayed on scorecard to explain the exact technical logic
                          </span>
                        </div>
                        <textarea
                          placeholder="Explain why the chosen option is correct, citing core architectural concepts, memory/runtime behavior, or algorithmic complexity..."
                          value={q.explanation}
                          onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
                          className={styles.explanationTextarea}
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Add Question Button */}
            <button
              type="button"
              onClick={handleAddQuestion}
              className={styles.addQuestionDashedBtn}
            >
              <div className={styles.dashedIconCircle}>
                <Plus size={20} />
              </div>
              <div className={styles.dashedTextWrap}>
                <span className={styles.dashedPrimaryText}>Add Question #{questions.length + 1}</span>
                <span className={styles.dashedSubText}>Click to create another multiple-choice problem with custom options</span>
              </div>
            </button>
          </div>
        </main>
      </div>

      {/* Quick Category Creation Modal */}
      {showCatModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCatModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderIcon}>
                <FolderPlus size={18} />
              </div>
              <div>
                <h3 className={styles.modalTitle}>Create New Category</h3>
                <p className={styles.modalSubtitle}>Add a custom taxonomy pillar for assessments</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowCatModal(false)} 
                className={styles.modalCloseBtn}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCategoryQuick} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Category Name <span className={styles.reqStar}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems & Microservices"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className={styles.input}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Slug Identifier (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. distributed-systems-microservices"
                  value={newCat.slug}
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Short Description (Optional)</label>
                <textarea
                  placeholder="Overview of this category's scope..."
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className={styles.textarea}
                  rows={2}
                />
              </div>

              <div className={styles.modalFooter}>
                <button 
                  type="button" 
                  onClick={() => setShowCatModal(false)} 
                  className={styles.modalCancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  <Save size={15} />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
