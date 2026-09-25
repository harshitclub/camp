"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FaqSection.module.css";
import { faqsData } from "@/data/faqs";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);


  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Frequently Asked Questions</span>
          <h2 className="section-title">Everything You Need to Know About Our Bootcamps</h2>
          <p className="section-subtitle">
            Find answers to common questions regarding our learning format, curriculum, certificates, and internship support.
          </p>
        </div>

        <div className={styles.faqWrapper}>
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqHeader}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <div className={styles.faqIconBox}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.faqBody}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className={styles.faqMoreCard}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--mainBlue)' }}>
                Have more specific questions?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Our admissions and student counseling team is here to assist you.
              </p>
            </div>
            <Link href="/contact" className="btn btn-secondary btn-sm">
              <span>Contact Academic Advisor</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
