"use client";

import { useState } from "react";
import styles from "./ContactFaq.module.css";
import { contactFaqs } from "@/data/contact";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ContactFaq() {
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
            <span>Common Inquiries</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find immediate answers regarding bootcamps, counseling, partnerships, and certification.
          </p>
        </div>

        <div className={styles.faqList}>
          {contactFaqs.map((faq, idx) => {
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
