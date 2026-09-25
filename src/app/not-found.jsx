import Link from "next/link";
import styles from "./not-found.module.css";
import { 
  Home, 
  BookOpen, 
  Briefcase, 
  Camera, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  Search,
  Compass,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Campussutras",
  description: "The page you are looking for does not exist or has moved. Explore Campussutras technical bootcamps, summer internships, and campus workshops.",
};

export default function NotFound() {
  const quickDestinations = [
    {
      title: "Tech Bootcamps",
      description: "Explore 8 intensive industry tracks in Web Dev, Python, Power BI, and Generative AI.",
      href: "/courses",
      icon: <BookOpen size={20} />,
      badge: "Popular"
    },
    {
      title: "Summer Internship 2026",
      description: "Mentor-guided 2–3 month practical sprints with verified LOR and project portfolio.",
      href: "/internship",
      icon: <Briefcase size={20} />,
      badge: "Enrolling Now"
    },
    {
      title: "Campus Events & Workshops",
      description: "Visual tour and moments from offline bootcamps across 50+ engineering colleges.",
      href: "/events",
      icon: <Camera size={20} />,
      badge: "Gallery"
    },
    {
      title: "Verify Student Certificate",
      description: "Recruiters and universities can validate authentic credentials via online ID.",
      href: "/verify-certificate",
      icon: <ShieldCheck size={20} />,
      badge: "Instant ID"
    },
  ];

  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.ambientGlow}></div>

      <div className={`container ${styles.contentContainer}`}>
        {/* Top 404 Status Pill */}
        <div className={styles.statusPill}>
          <Compass size={15} className={styles.pillIcon} />
          <span>Error 404 • Destination Not Found</span>
        </div>

        {/* Big Stylized 404 Display */}
        <div className={styles.glitchNumber}>
          <span className={styles.number4}>4</span>
          <div className={styles.zeroWrapper}>
            <div className={styles.zeroRing}>
              <div className={styles.zeroCore}></div>
            </div>
          </div>
          <span className={styles.number4}>4</span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className={styles.heading}>
          Looks Like This Page Took an <span className={styles.highlightText}>Uncharted Route</span>
        </h1>

        <p className={styles.description}>
          The link you followed may be broken, deleted, or the address might have moved. Don&apos;t worry — your learning journey doesn&apos;t have to stop here.
        </p>

        {/* Main Action Buttons */}
        <div className={styles.actionButtons}>
          <Link href="/" className={`btn btn-primary ${styles.mainBtn}`}>
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>
          <Link href="/courses" className={`btn btn-secondary ${styles.secondaryBtn}`}>
            <BookOpen size={18} />
            <span>Explore Bootcamps</span>
          </Link>
          <Link href="/contact" className={`btn btn-outline ${styles.outlineBtn}`}>
            <Mail size={18} />
            <span>Contact Support Desk</span>
          </Link>
        </div>

        {/* Quick Destinations Hub */}
        <div className={styles.hubSection}>
          <div className={styles.hubHeader}>
            <Sparkles size={16} className={styles.hubSparkle} />
            <span>Popular Destinations You Might Be Looking For</span>
          </div>

          <div className={styles.destinationsGrid}>
            {quickDestinations.map((dest, idx) => (
              <Link key={idx} href={dest.href} className={styles.destCard}>
                <div className={styles.destTop}>
                  <div className={styles.destIconWrap}>{dest.icon}</div>
                  <span className={styles.destBadge}>{dest.badge}</span>
                </div>
                <h3 className={styles.destTitle}>{dest.title}</h3>
                <p className={styles.destDesc}>{dest.description}</p>
                <div className={styles.destArrow}>
                  <span>Explore Now</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Need Help Footer Notice */}
        <div className={styles.helpBox}>
          <span>Need immediate assistance? Reach our student counseling desk directly at </span>
          <a href="mailto:info@campussutras.com" className={styles.emailLink}>
            info@campussutras.com
          </a>
        </div>
      </div>
    </div>
  );
}
