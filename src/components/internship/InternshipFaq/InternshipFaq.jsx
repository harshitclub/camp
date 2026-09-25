"use client";

import { useState } from "react";
import styles from "./InternshipFaq.module.css";
import { internshipFaqs } from "@/data/internships";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function InternshipFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our Summer Internship & Training programs.
          </p>
        </div>

        <div className={styles.faqList}>
          {internshipFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className={styles.faqQuestion}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  />
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
      </div>
    </section>
  );
}
