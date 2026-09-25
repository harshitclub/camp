"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./CoursesCatalog.module.css";
import CourseCard from "../CourseCard/CourseCard";
import { allCourses, courseCategories } from "@/data/courses";
import { Search, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

export default function CoursesCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial page from URL query parameter (?page=1 or ?page=2)
  const initialPage = parseInt(searchParams?.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage > 0 ? initialPage : 1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const COURSES_PER_PAGE = 6;

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesCategory =
        selectedCategory === "all" || course.categoryKey === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        (course.shortTitle && course.shortTitle.toLowerCase().includes(query)) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.skills.some((skill) => skill.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PER_PAGE));

  // Sync state if URL query param changes
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams?.get("page") || "1", 10);
    if (pageFromUrl > 0 && pageFromUrl <= totalPages && pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams, totalPages]);

  // Reset to page 1 whenever category or search query changes
  useEffect(() => {
    setCurrentPage(1);
    if (searchParams?.get("page") && searchParams.get("page") !== "1") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const newQuery = params.toString();
      router.replace(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });
    }
  }, [selectedCategory, searchQuery]);

  // Ensure currentPage doesn't exceed totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Calculate slice bounds
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);

  // Handle page change with smooth scroll & URL update
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    const newQuery = params.toString();
    router.push(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });

    const targetEl = document.getElementById("catalog-section");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  };

  return (
    <section className={styles.catalogSection} id="catalog-section">
      <div className="container">
        {/* Filter Controls: Search & Category Tabs */}
        <div className={styles.filterControls}>
          <div className={styles.searchAndMeta}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by skill, topic (e.g. Next.js, Java, Power BI, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.resultsCount}>
              Showing <strong>{filteredCourses.length}</strong> Industry Bootcamps
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {courseCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`${styles.categoryTab} ${selectedCategory === cat.key ? styles.categoryTabActive : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Course Grid Display */}
        {paginatedCourses.length > 0 ? (
          <>
            <div className={styles.grid}>
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Clean, Minimalist Centered Pagination */}
            {totalPages > 1 && (
              <nav className={styles.minimalPagination} aria-label="Pagination Navigation">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.minimalNavBtn}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  <span className={styles.navBtnText}>Previous</span>
                </button>

                <div className={styles.minimalPageList}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`${styles.minimalPageBtn} ${
                        currentPage === pageNum ? styles.minimalPageBtnActive : ""
                      }`}
                      aria-label={`Page ${pageNum}`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.minimalNavBtn}
                  aria-label="Next page"
                >
                  <span className={styles.navBtnText}>Next</span>
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No matching bootcamps found</h3>
            <p className={styles.emptyDesc}>
              We couldn't find any courses matching "{searchQuery}". Try searching for another skill or reset filters.
            </p>
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
