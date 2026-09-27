import styles from "./CourseDetailHero.module.css";
import Link from "next/link";
import { 
  Clock, 
  Calendar, 
  Award, 
  FolderGit2, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Users,
  Layers
} from "lucide-react";

export default function CourseDetailHero({ course }) {
  if (!course) return null;

  return (
    <section className={styles.heroSection}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/courses" className={styles.breadcrumbLink}>Courses</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{course.title}</span>
        </nav>

        <div className={styles.heroGrid}>
          {/* Main Hero Left Content */}
          <div className={styles.heroContent}>
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{course.category}</span>
              {course.badge && (
                <span className={styles.featuredBadge}>
                  <Sparkles size={13} />
                  <span>{course.badge}</span>
                </span>
              )}
              <span className={styles.durationBadge}>
                <Clock size={13} />
                <span>{course.duration} Bootcamp</span>
              </span>
            </div>

            <h1 className={styles.title}>{course.title}</h1>

            <p className={styles.tagline}>{course.tagline || course.shortDescription}</p>

            {/* Ratings & Enrolled Proof */}
            <div className={styles.ratingBar}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={styles.starIcon} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className={styles.ratingScore}>{course.rating || 4.9}</span>
              <span className={styles.reviewCount}>({course.reviewsCount || 350}+ verified learners)</span>
              <span className={styles.dotSep}>•</span>
              <span className={styles.modeText}>{course.mode}</span>
            </div>

            {/* Key Value Meta Pills */}
            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <div className={styles.metaIconWrap}>
                  <Clock size={18} />
                </div>
                <div className={styles.metaTextWrap}>
                  <span className={styles.metaLabel}>Duration</span>
                  <strong className={styles.metaValue}>{course.duration}</strong>
                </div>
              </div>

              <div className={styles.metaCard}>
                <div className={styles.metaIconWrap}>
                  <FolderGit2 size={18} />
                </div>
                <div className={styles.metaTextWrap}>
                  <span className={styles.metaLabel}>Capstones</span>
                  <strong className={styles.metaValue}>{course.projectsCount}</strong>
                </div>
              </div>

              <div className={styles.metaCard}>
                <div className={styles.metaIconWrap}>
                  <Layers size={18} />
                </div>
                <div className={styles.metaTextWrap}>
                  <span className={styles.metaLabel}>Skill Level</span>
                  <strong className={styles.metaValue}>{course.level}</strong>
                </div>
              </div>

              <div className={styles.metaCard}>
                <div className={styles.metaIconWrap}>
                  <Award size={18} />
                </div>
                <div className={styles.metaTextWrap}>
                  <span className={styles.metaLabel}>Credential</span>
                  <strong className={styles.metaValue}>Verified ID</strong>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className={styles.actionsRow}>
              <a href="#enroll-form" className={`btn btn-primary ${styles.ctaBtn}`}>
                <span>Register for this Course</span>
                <ArrowRight size={18} />
              </a>
              <a href="#curriculum" className={`btn btn-secondary ${styles.syllabusBtn}`}>
                <span>View Full Syllabus</span>
              </a>
            </div>

            {/* Trust highlights under hero */}
            <div className={styles.trustHighlights}>
              <div className={styles.trustItem}>
                <CheckCircle2 size={15} className={styles.trustIcon} />
                <span>1:1 Weekly Code Reviews</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle2 size={15} className={styles.trustIcon} />
                <span>Live Project Deployments</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle2 size={15} className={styles.trustIcon} />
                <span>Placement & Internship Assistance</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Preview Card */}
          <div className={styles.visualCol}>
            <div className={styles.previewCard}>
              <div className={styles.previewImageWrap}>
                <img 
                  src={course.image || "/opengraph-image.png"} 
                  alt={course.title}
                  className={styles.previewImage}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.overlayBadge}>Practical Intensive Cohort</span>
                </div>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.previewStats}>
                  <div className={styles.previewStat}>
                    <span className={styles.statNum}>120+</span>
                    <span className={styles.statLbl}>Live Mentor Hours</span>
                  </div>
                  <div className={styles.previewStat}>
                    <span className={styles.statNum}>100%</span>
                    <span className={styles.statLbl}>Project-Based</span>
                  </div>
                  <div className={styles.previewStat}>
                    <span className={styles.statNum}>1:1</span>
                    <span className={styles.statLbl}>Doubt Clearance</span>
                  </div>
                </div>

                <div className={styles.batchNotice}>
                  <span className={styles.pulseDot}></span>
                  <span><strong>Next Batch:</strong> Admissions Open • Limited Seats Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
