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
            <span>Transform Your Technical Trajectory</span>
          </div>

          <h2 className={styles.title}>
            Ready to Build Real Projects & Land Your Dream Tech Role?
          </h2>

          <p className={styles.subtitle}>
            Join thousands of ambitious students in India’s leading practical bootcamps. Learn by coding, build verifiable capstones, and get direct mentorship.
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
              <span>Explore All Bootcamps</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/internship" className="btn btn-outline-white btn-lg">
              <Briefcase size={18} />
              <span>Apply for Project Internship</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
