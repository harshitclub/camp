"use client";

import { useState } from "react";
import styles from "./CourseDetailFaq.module.css";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function CourseDetailFaq({ faqs = [], courseTitle = "" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={styles.faqSection} id="faqs">
      <div className={styles.header}>
        <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
          Have Questions?
        </div>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionSubtitle}>
          Everything you need to know about the {courseTitle} program, mentorship, and credentials.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`${styles.faqCard} ${isOpen ? styles.faqOpen : ""}`}
            >
              <button
                type="button"
                className={styles.faqQuestionBtn}
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
              >
                <div className={styles.questionLeft}>
                  <HelpCircle size={18} className={styles.faqIcon} />
                  <span className={styles.questionText}>{faq.question}</span>
                </div>
                <div className={styles.chevronWrap}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isOpen && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
