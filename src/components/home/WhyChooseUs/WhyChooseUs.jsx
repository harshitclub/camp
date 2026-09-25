import styles from "./WhyChooseUs.module.css";
import { ShieldCheck, Target, Users, Terminal, Sparkles, Award } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Target size={22} />,
      title: "Outcome-Oriented Career Tracks",
      description: "Structured timeline focused on delivering concrete technical depth rather than passive video lectures."
    },
    {
      icon: <Terminal size={22} />,
      title: "Real Industry Project Sprints",
      description: "Build production-grade applications that mirror actual corporate workflows and pull requests."
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Tamper-Proof Verified Certificates",
      description: "Every credential has a permanent verification URL allowing recruiters to instantly confirm your skill mastery."
    },
    {
      icon: <Users size={22} />,
      title: "1:1 Code Reviews & Mentorship",
      description: "Direct feedback on architecture, clean coding standards, and algorithmic optimizations."
    }
  ];

  return (
    <section className={styles.whySection}>
      <div className={`container ${styles.whyGrid}`}>
        {/* Left Column: Content */}
        <div className={styles.contentCol}>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start' }}>
            Why Campussutras
          </div>

          <h2 className={styles.title}>
            Engineered Specifically to Make College Students Career-Ready
          </h2>

          <p className={styles.subtitle}>
            Traditional college degrees often leave students unprepared for modern technical stacks. Campussutras delivers practical, hands-on mastery designed to get you hired.
          </p>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>
                  {pillar.icon}
                </div>
                <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                <p className={styles.pillarText}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className={styles.imageCol}>
          <div className={styles.imageCard}>
            <img
              src="/media/whyChoose.jpg"
              alt="Why Choose Campussutras"
              className={styles.whyImg}
            />

            <div className={styles.trustOverlay}>
              <div className={styles.trustText}>
                Trusted by <span className={styles.trustHighlight}>50,000+ Students</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8' }}>
                <Award size={18} />
                <span style={{ fontSize: '0.825rem', fontWeight: 700 }}>Industry Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
