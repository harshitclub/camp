import Link from "next/link";
import styles from "./FeaturedCourses.module.css";
import { allCourses } from "@/data/courses";
import { ArrowRight, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export default function FeaturedCourses() {
  // Feature top 6 industry career tracks
  const featured = allCourses.slice(0, 6);

  return (
    <section className={styles.coursesSection}>
      <div className="container">
        {/* Compact Header Row with Integrated Action */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.eyebrow}>
              <Sparkles size={13} />
              <span>Industry Career Tracks</span>
            </div>
            <h2 className={styles.title}>Featured Career Bootcamps</h2>
          </div>

          <Link href="/courses" className={styles.viewAllBtn}>
            <span>View All Programs</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 6-Card Compact Grid (3x2) */}
        <div className={styles.grid}>
          {featured.map((course) => (
            <Link 
              key={course.id} 
              href={course.path}
              className={styles.card}
            >
              {/* SVG Banner Header */}
              <div className={styles.imageWrap}>
                <img
                  src={course.image}
                  alt={course.title}
                  className={styles.bannerImg}
                  loading="lazy"
                />
                <div className={styles.bannerOverlay}></div>

                {/* Top Badges */}
                <div className={styles.badgesRow}>
                  <span className={styles.categoryBadge}>{course.category}</span>
                  <span className={styles.durationBadge}>
                    <Clock size={11} />
                    <span>{course.duration}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {course.shortTitle || course.title}
                </h3>

                <p className={styles.cardDesc}>
                  {course.shortDescription}
                </p>

                {/* Bottom Metadata & Arrow */}
                <div className={styles.cardFooter}>
                  <div className={styles.capstoneInfo}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span>Live Capstone Sprint</span>
                  </div>

                  <span className={styles.exploreLink}>
                    <span>Explore Track</span>
                    <ArrowRight size={14} className={styles.arrowIcon} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className={styles.mobileCta}>
          <Link href="/courses" className="btn btn-primary btn-block">
            <span>Explore All Programs</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
