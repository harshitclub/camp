"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { companyInfo } from "@/data/company";
import { allCourses } from "@/data/courses";
import { footerQuickLinks, legalLinks } from "@/data/navigation";
import { Mail, ShieldCheck, CheckCircle2, Award } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Do not render public website footer on Admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Column 1: Brand & Overview */}
        <div className={styles.brandCol}>
          <div className={styles.brandLogoWrap}>
            <img
              src="/media/logo.png"
              alt="Campus Sutras"
              className={styles.footerLogo}
            />
          </div>

          <p className={styles.brandDesc}>
            {companyInfo.legalName} is an Indian EdTech & workforce-training platform dedicated to bridging the gap between college curricula and practical industry expectations through structured technical bootcamps.
          </p>

          <div className={styles.socialRow}>
            <a
              href={companyInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
              </svg>
            </a>
            <a
              href={companyInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <div className={styles.trustBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff', fontWeight: 700, marginBottom: '0.25rem' }}>
              <ShieldCheck size={16} color="#34d399" />
              <span>Verified Certifications</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              All student certificates are cryptographically unique and instantly verifiable by corporate recruiters.
            </p>
          </div>
        </div>

        {/* Column 2: Bootcamps */}
        <div>
          <h4 className={styles.colTitle}>Bootcamps</h4>
          <ul className={styles.linkList}>
            {allCourses.slice(0, 6).map((course) => (
              <li key={course.id}>
                <Link href={course.path} className={styles.footerLink}>
                  <span>{course.shortTitle || course.title}</span>
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '0.25rem' }}>
              <Link href="/courses" className={styles.footerLink} style={{ color: '#38bdf8', fontWeight: 600 }}>
                <span>View All 12 Programs →</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Platform & Programs */}
        <div>
          <h4 className={styles.colTitle}>Programs & Quick Links</h4>
          <ul className={styles.linkList}>
            {footerQuickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Legal */}
        <div>
          <h4 className={styles.colTitle}>Contact & Location</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Support & Inquiries:</strong>
                <a href={`mailto:${companyInfo.email}`} style={{ color: '#e2e8f0' }}>
                  {companyInfo.email}
                </a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <Award size={18} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Corporate Registry:</strong>
                <span>{companyInfo.legalName}</span>
              </div>
            </li>
          </ul>

          <div style={{ marginTop: '1.25rem' }}>
            <Link href="/verify-certificate" className="btn btn-outline-white btn-sm" style={{ width: '100%', fontSize: '0.8125rem' }}>
              <CheckCircle2 size={15} />
              <span>Verify Certificate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <div>
            © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            {legalLinks.map((item, idx) => (
              <Link key={idx} href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
