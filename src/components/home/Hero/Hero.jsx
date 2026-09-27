"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  Users, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin
} from "lucide-react";

// Real event and workshop photos from partner campuses (Optimized for WebP/AVIF & LCP)
const heroSlides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dwg0cqk12/image/upload/f_auto,q_auto,w_1000/v1754896899/IMG_6998_nml1wl.jpg",
    title: "Live Generative AI Masterclass",
    location: "Partner University Campus",
    attendees: "350+ Students",
    tag: "Auditorium Sprint"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dwg0cqk12/image/upload/f_auto,q_auto,w_1000/v1754896896/IMG_7008_kjmlj5.jpg",
    title: "Campus Hackathon & Case Sprints",
    location: "Campus Central Hall",
    attendees: "250+ Participants",
    tag: "Hands-on Innovation"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dwg0cqk12/image/upload/f_auto,q_auto,w_1000/v1754896390/IMG_9780_vz8gbz.jpg",
    title: "Project Bootcamps & Practical Labs",
    location: "Campus Computer Lab",
    attendees: "Active Cohort",
    tag: "1:1 Mentorship"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dwg0cqk12/image/upload/f_auto,q_auto,w_1000/v1749544438/IMG20250221145731_pfzkxs.jpg",
    title: "Workforce & Corporate Career Readiness",
    location: "Partner University Auditorium",
    attendees: "400+ Candidates",
    tag: "Career Launchpad"
  }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slides smoothly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const current = heroSlides[activeSlide];

  return (
    <section className={styles.heroSection}>
      {/* Dynamic Background Image Layers with ambient gradient overlay */}
      <div className={styles.bgSlidesWrapper}>
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`${styles.bgSlide} ${idx === activeSlide ? styles.bgSlideActive : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className={styles.ambientOverlay} />
        <div className={styles.patternGrid} />
      </div>

      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Headline & Value Proposition */}
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowPulse}></span>
            <span>Campus to Corporate — Empowering 50,000+ Students Across 50+ Colleges</span>
          </div>

          <h1 className={styles.heroTitle}>
            Bridge The Gap Between <span className={styles.highlightText}>College Curricula</span> &amp; Industry Expectations
          </h1>

          <p className={styles.heroSubtitle}>
            Practical industry bootcamps, project sprints, and career internships across <strong>B.Tech, BCA, MCA, MBA, BBA, PGDM, Law &amp; more</strong> — designed to build verified portfolios and accelerate your career.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/courses" className={`btn btn-primary btn-lg ${styles.mainCta}`}>
              <span>Explore Career Tracks</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/internship" className={`btn btn-secondary btn-lg ${styles.secCta}`}>
              <Briefcase size={18} />
              <span>Internship Programs</span>
            </Link>
          </div>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <CheckCircle size={16} className={styles.featureIcon} />
              <span>100% Project-Based Learning</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle size={16} className={styles.featureIcon} />
              <span>Online Verified Certificate</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle size={16} className={styles.featureIcon} />
              <span>1:1 Mentor Guidance</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Real Campus Showcase Card */}
        <div className={styles.heroMediaWrapper}>
          <div className={styles.showcaseCard}>
            {/* Real Campus Photo Frame */}
            <div className={styles.imageContainer}>
              {heroSlides.map((slide, idx) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  className={`${styles.showcaseImg} ${idx === activeSlide ? styles.imgActive : ""}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "low"}
                />
              ))}

              <div className={styles.imageTopBadge}>
                <span className={styles.liveDot}></span>
                <span>{current.tag}</span>
              </div>

              <div className={styles.imageCaptionBar}>
                <div className={styles.captionMeta}>
                  <h4 className={styles.captionTitle}>{current.title}</h4>
                  <div className={styles.captionSub}>
                    <span className={styles.locationChip}>
                      <MapPin size={12} />
                      <span>{current.location}</span>
                    </span>
                    <span className={styles.attendeesChip}>
                      <Users size={12} />
                      <span>{current.attendees}</span>
                    </span>
                  </div>
                </div>

                {/* Slider Navigation Arrows */}
                <div className={styles.slideControls}>
                  <button 
                    type="button" 
                    onClick={prevSlide} 
                    className={styles.ctrlBtn} 
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button" 
                    onClick={nextSlide} 
                    className={styles.ctrlBtn} 
                    aria-label="Next photo"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Indicators Dots */}
            <div className={styles.dotsRow}>
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`${styles.dot} ${idx === activeSlide ? styles.dotActive : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Floating Live Badges */}
            <div className={styles.floatingBadgeTop}>
              <div className={styles.badgeIconBox}>
                <Award size={18} />
              </div>
              <div>
                <div className={styles.badgeTitle}>Bootcamp Format</div>
                <div className={styles.badgeValue}>Hands-on Practical Track</div>
              </div>
            </div>

            <div className={styles.floatingBadgeBottom}>
              <ShieldCheck size={22} className={styles.shieldIcon} />
              <div>
                <div className={styles.bottomBadgeTitle}>Placement &amp; Internship Ready</div>
                <div className={styles.bottomBadgeValue}>50,000+ Students Trained</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
