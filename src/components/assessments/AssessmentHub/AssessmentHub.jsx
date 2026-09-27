"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import styles from "./AssessmentHub.module.css";
import { 
  assessmentCategories as initialCategories, 
  assessmentsList as initialAssessments 
} from "@/data/assessmentsData";
import { getAllAssessments, getAllCategories } from "@/lib/adminService";
import { 
  FileText, 
  Clock, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Search, 
  ChevronRight,
  ChevronLeft,
  Code2,
  Brain,
  Database,
  ShieldCheck,
  Zap,
  Layers,
  Server,
  TrendingUp,
  X,
  Filter
} from "lucide-react";
import { getPaginationRange } from "@/lib/pagination";

const ITEMS_PER_PAGE = 6;

export default function AssessmentHub() {
  const [categories, setCategories] = useState(initialCategories);
  const [assessments, setAssessments] = useState(initialAssessments);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const gridTopRef = useRef(null);

  // Fetch live assessments & categories from Supabase on mount
  useEffect(() => {
    async function loadLiveDbData() {
      try {
        setIsLoading(true);
        const [liveAssessments, liveCategories] = await Promise.all([
          getAllAssessments(),
          getAllCategories(),
        ]);
        if (liveAssessments && liveAssessments.length > 0) {
          setAssessments(liveAssessments);
        }
        if (liveCategories && liveCategories.length > 0) {
          setCategories(liveCategories);
        }
      } catch (err) {
        console.warn("[AssessmentHub] Live fetch notice:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadLiveDbData();
  }, []);

  // Helper to check if an assessment belongs to a specific category
  const isAssessmentInCategory = (item, catSlug) => {
    if (!catSlug || catSlug === "all") return true;

    const catObj = categories.find((c) => c.slug === catSlug || c.id === catSlug);
    const targetSlug = (catObj?.slug || catSlug).toLowerCase().trim();
    const targetName = (catObj?.name || "").toLowerCase().trim();
    const targetId = catObj?.id;

    const itemCatId = String(item.category_id || "").toLowerCase().trim();
    const itemCatSlug = String(item.category_slug || "").toLowerCase().trim();
    const itemCatName = String(item.category_name || "").toLowerCase().trim();

    // 1. Direct Slug / ID match
    if (itemCatSlug === targetSlug || itemCatId === targetSlug) return true;
    if (targetId && (itemCatId === String(targetId).toLowerCase() || itemCatSlug === String(targetId).toLowerCase())) return true;

    // 2. Direct Name match
    if (targetName && itemCatName === targetName) return true;

    // 3. Known mappings & Aliases
    const categoryAliases = {
      "ai-data": ["ai-data", "ai-machine-learning", "ai-genai", "ai, ml & python"],
      "web-software": ["web-software", "web-development", "core-engineering", "mobile-development", "software & mobile dev"],
      "data-cloud": ["data-cloud", "data-analytics", "backend-cloud", "database-cloud", "security", "data, cloud & security"],
      "business-management": ["business-management", "business-analytics", "business & management"],
      "growth-career": ["growth-career", "marketing", "marketing, design & career"],
    };

    const aliases = categoryAliases[targetSlug] || [];
    if (aliases.some((alias) => itemCatSlug.includes(alias) || itemCatName.includes(alias) || itemCatId.includes(alias))) {
      return true;
    }

    return false;
  };

  // Filter assessments based on active category & search query
  const filteredAssessments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return assessments.filter((item) => {
      // Category Match
      const matchesCategory = isAssessmentInCategory(item, selectedCategory);

      // Search Query Match
      const inTitle = (item.title || "").toLowerCase().includes(q);
      const inDesc = (item.description || "").toLowerCase().includes(q);
      const inCategory = (item.category_name || "").toLowerCase().includes(q);
      const inTags = Array.isArray(item.tags) && item.tags.some((t) => String(t).toLowerCase().includes(q));
      
      const matchesSearch = !q || inTitle || inDesc || inCategory || inTags;

      return matchesCategory && matchesSearch;
    });
  }, [assessments, selectedCategory, searchQuery, categories]);

  // Compute counts for each category pill
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach((cat) => {
      if (cat.slug === "all") {
        counts["all"] = assessments.length;
      } else {
        counts[cat.slug] = assessments.filter((a) => isAssessmentInCategory(a, cat.slug)).length;
      }
    });
    return counts;
  }, [assessments, categories]);

  // Reset to page 1 whenever category or search changes
  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = filteredAssessments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedAssessments = filteredAssessments.slice(startIndex, endIndex);

  // Smooth scroll to top of grid when page changes
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Icon mapping for categories
  const getCategoryIcon = (catSlug) => {
    switch (catSlug) {
      case "ai-data":
      case "ai-machine-learning":
      case "ai-genai":
        return <Brain size={15} />;
      case "web-software":
      case "web-development":
      case "core-engineering":
      case "mobile-development":
        return <Code2 size={15} />;
      case "data-cloud":
      case "data-analytics":
      case "backend-cloud":
      case "security":
        return <Server size={15} />;
      case "business-management":
      case "business-analytics":
        return <Database size={15} />;
      case "growth-career":
      case "marketing":
        return <TrendingUp size={15} />;
      default:
        return <Layers size={15} />;
    }
  };

  // Current category label
  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : "All Categories";

  return (
    <div className={styles.hubWrapper}>
      {/* Top Hero Banner */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.breadcrumbBar}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <span className={styles.breadcrumbCurrent}>Skill Assessments</span>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>Free Online Tests</span>
            </div>
            <h1 className={styles.heroTitle}>Test Your Skills &amp; Check Your Knowledge</h1>
            <p className={styles.heroSubtitle}>
              Take timed, 15-question practice tests across Technical, Business, English, Soft Skills, and Marketing. 
              Get instant scorecards, accuracy analysis, and complete question-by-question solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className={styles.mainSection} ref={gridTopRef}>
        <div className="container">
          {/* Controls Bar: Category Pills + Search */}
          <div className={styles.controlsBar}>
            {/* Category Filter Pills */}
            <div className={styles.categoryPills}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const count = categoryCounts[cat.slug] ?? 0;
                return (
                  <button
                    key={cat.id || cat.slug}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`${styles.catPill} ${isActive ? styles.catPillActive : ""}`}
                    aria-pressed={isActive}
                  >
                    {getCategoryIcon(cat.slug)}
                    <span>{cat.name}</span>
                    <span className={`${styles.pillBadge} ${isActive ? styles.pillBadgeActive : ""}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search assessments, skills, tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className={styles.resultsInfoBar}>
            <div className={styles.resultsCount}>
              {totalItems === 0 ? (
                <span>No assessments match your criteria</span>
              ) : (
                <span>
                  Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> assessments
                  {selectedCategory !== "all" && (
                    <span> in <em>{activeCategoryName}</em></span>
                  )}
                  {searchQuery && (
                    <span> for &quot;<em>{searchQuery}</em>&quot;</span>
                  )}
                </span>
              )}
            </div>

            {totalPages > 1 && (
              <div className={styles.pageIndicator}>
                Page <strong>{safePage}</strong> of <strong>{totalPages}</strong> (6 per page)
              </div>
            )}
          </div>

          {/* Assessments Grid */}
          {paginatedAssessments.length === 0 ? (
            <div className={styles.noResultsCard}>
              <FileText size={44} className={styles.noResultsIcon} />
              <h3 className={styles.noResultsTitle}>No Assessments Found</h3>
              <p className={styles.noResultsDesc}>
                We couldn&apos;t find any assessments matching your current filter or search criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className={`btn btn-secondary btn-sm ${styles.resetBtn}`}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {paginatedAssessments.map((assessment) => {
                  const passQuestions = Math.ceil(
                    ((assessment.total_questions || 15) * (assessment.passing_percentage || 70)) / 100
                  );

                  return (
                    <div key={assessment.id || assessment.slug} className={styles.assessmentCard}>
                      {/* Top Metadata Badges */}
                      <div className={styles.cardHeader}>
                        <span className={styles.categoryTag}>
                          {assessment.category_name || "Technical"}
                        </span>
                        <span className={styles.difficultyPill}>
                          <Clock size={12} className={styles.miniIcon} />
                          {assessment.duration_minutes || 15} Mins • {assessment.total_questions || 15} Qs
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h2 className={styles.cardTitle}>{assessment.title}</h2>
                      <p className={styles.cardDesc}>{assessment.description}</p>

                      {/* Skill Tags */}
                      {assessment.tags && assessment.tags.length > 0 && (
                        <div className={styles.tagList}>
                          {assessment.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className={styles.tagPill}>{tag}</span>
                          ))}
                        </div>
                      )}

                      {/* Spec Strip: Questions, Duration, Passing Criteria */}
                      <div className={styles.specStrip}>
                        <div className={styles.specItem}>
                          <FileText size={13} className={styles.specIcon} />
                          <span><strong>{assessment.total_questions || 15}</strong> Questions</span>
                        </div>
                        <div className={styles.specDivider}>•</div>
                        <div className={styles.specItem}>
                          <Clock size={13} className={styles.specIcon} />
                          <span><strong>{assessment.duration_minutes || 15}</strong> Mins</span>
                        </div>
                        <div className={styles.specDivider}>•</div>
                        <div className={styles.specItem}>
                          <Award size={13} className={styles.specIcon} />
                          <span>Pass: <strong>{passQuestions}/{assessment.total_questions || 15} ({assessment.passing_percentage || 70}%)</strong></span>
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className={styles.cardFooter}>
                        <Link 
                          href={`/assessments/${assessment.slug || assessment.id}`}
                          className={`btn btn-primary ${styles.startBtn}`}
                        >
                          <span>Start Assessment</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                  <button
                    type="button"
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage <= 1}
                    className={`${styles.pageNavBtn} ${safePage <= 1 ? styles.pageNavDisabled : ""}`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                    <span className={styles.navBtnText}>Previous</span>
                  </button>

                  <div className={styles.pageNumbers}>
                    {getPaginationRange(safePage, totalPages).map((item, idx) => {
                      if (typeof item !== "number" || item === "...") {
                        return (
                          <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
                            &hellip;
                          </span>
                        );
                      }

                      const isPageActive = item === safePage;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handlePageChange(item)}
                          className={`${styles.pageNumberBtn} ${isPageActive ? styles.pageNumberBtnActive : ""}`}
                          aria-current={isPageActive ? "page" : undefined}
                          aria-label={`Page ${item}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage >= totalPages}
                    className={`${styles.pageNavBtn} ${safePage >= totalPages ? styles.pageNavDisabled : ""}`}
                    aria-label="Next page"
                  >
                    <span className={styles.navBtnText}>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Value Props Strip */}
          <div className={styles.valuePropsGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrap} style={{ background: "rgba(11, 87, 208, 0.08)", color: "#002255" }}>
                <Zap size={22} />
              </div>
              <h4 className={styles.valueTitle}>Timed Practice Tests</h4>
              <p className={styles.valueDesc}>
                Real timer conditions to test your speed, accuracy, and confidence for interviews and exams.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconWrap} style={{ background: "rgba(5, 150, 105, 0.08)", color: "#059669" }}>
                <ShieldCheck size={22} />
              </div>
              <h4 className={styles.valueTitle}>Instant Results &amp; Answers</h4>
              <p className={styles.valueDesc}>
                Get your score immediately with clear, simple explanations for every question to learn from your mistakes.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconWrap} style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed" }}>
                <TrendingUp size={22} />
              </div>
              <h4 className={styles.valueTitle}>Track Your Progress</h4>
              <p className={styles.valueDesc}>
                Save your test history to your profile and review questions anytime to track your improvement over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
