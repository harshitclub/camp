import Link from "next/link";
import styles from "./CtaBanner.module.css";
import { ArrowRight, Sparkles, Briefcase, BookOpen } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className={styles.bannerSection}>
      <div className="container">
        <div className={styles.bannerCard}>
          <div className={styles.badge}>
            <Sparkles size={15} />
            <span>Start Your Career Today</span>
          </div>

          <h2 className={styles.title}>
            Ready to Build Real Projects &amp; Get Your Dream Job?
          </h2>

          <p className={styles.subtitle}>
            Join thousands of college students learning practical skills. Learn with hands-on coding, build real projects, and get guidance from expert mentors.
          </p>

          <div className={styles.btnGroup}>
            <Link
              href="/courses"
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--mainBlue)',
                borderColor: '#ffffff',
                fontWeight: 700
              }}
            >
              <BookOpen size={18} />
              <span>Explore All Programs</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/internship" className="btn btn-outline-white btn-lg">
              <Briefcase size={18} />
              <span>Apply for Internship</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
