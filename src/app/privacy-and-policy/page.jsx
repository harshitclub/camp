import LegalHero from "@/components/legal/LegalHero";
import styles from "@/components/legal/LegalContent.module.css";
import { companyInfo } from "@/data/company";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Read Campussutras' Privacy Policy to understand how we collect, protect, and process student data, academic credentials, and project submissions in compliance with applicable laws.",
  keywords: "Campussutras privacy policy, data protection, student data privacy, edtech compliance, verified credentials privacy",
  alternates: {
    canonical: "/privacy-and-policy",
  },
  openGraph: {
    title: "Privacy Policy | Campussutras",
    description: "Official Privacy Policy of Campussutras Private Limited.",
    url: "https://campussutras.com/privacy-and-policy",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "intro", title: "1. Introduction & Overview" },
    { id: "info-collected", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "sharing", title: "4. Information Sharing & Third Parties" },
    { id: "projects-ip", title: "5. Student Project Work & IP" },
    { id: "security", title: "6. Data Security & Credentials" },
    { id: "cookies", title: "7. Cookies & Analytics" },
    { id: "rights", title: "8. Student Rights & Retention" },
    { id: "updates", title: "9. Policy Updates" },
    { id: "contact", title: "10. Grievance & Contact Info" },
  ];

  return (
    <>
      <LegalHero
        title="Privacy Policy"
        subtitle="We value your trust and are committed to protecting your personal data, academic records, and technical submissions with utmost transparency."
        lastUpdated="September 2025"
        type="privacy"
      />

      <section className={styles.legalSection}>
        <div className={`container ${styles.legalGrid}`}>
          {/* Left Table of Contents */}
          <aside className={styles.tocSidebar}>
            <div className={styles.tocTitle}>Table of Contents</div>
            <nav className={styles.tocNav}>
              {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className={styles.tocLink}>
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Main Content */}
          <main className={styles.contentCard}>
            {/* Section 1 */}
            <div id="intro" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>01.</span>
                <span>Introduction &amp; Overview</span>
              </h2>
              <p className={styles.text}>
                Welcome to <strong>{companyInfo.legalName}</strong> (&quot;Campussutras&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). 
                Campussutras operates as an Indian workforce-training and EdTech platform delivering structured 90-day technical bootcamps, project-based summer internship programs, and verifiable skill credentialing.
              </p>
              <p className={styles.text}>
                This Privacy Policy explains how we collect, use, store, process, and safeguard your personal data when you visit our website (<strong>https://campussutras.com</strong>), enroll in any of our technical programs, apply for internships, or interact with our mentor and counseling teams.
              </p>
              <div className={styles.calloutBox}>
                <div className={styles.calloutTitle}>Core Privacy Commitment</div>
                <p className={styles.calloutText}>
                  We do not sell, rent, or trade your personal information or contact numbers to third-party marketing agencies. Your data is used exclusively to facilitate your learning, mentor matching, project reviews, and credential verification.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div id="info-collected" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>02.</span>
                <span>Information We Collect</span>
              </h2>
              <p className={styles.text}>
                We collect information that you voluntarily provide to us when expressing interest in our programs, enrolling in a bootcamp, or contacting our team:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Personal Identifiers:</strong> Full name, email address, WhatsApp / phone number, and city/state of residence.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Academic Profile:</strong> College/university name, degree program (e.g. B.Tech, BCA, MCA), year of graduation, and branch of study.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Technical Submissions:</strong> GitHub repositories, code pull requests, capstone project assignments, and portfolio links submitted during sprints.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Payment Information:</strong> Transaction IDs, billing details, and payment confirmation metadata processed securely through RBI-authorized payment gateways. We do not store raw credit card numbers or UPI PINs.</div>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="how-we-use" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>03.</span>
                <span>How We Use Your Information</span>
              </h2>
              <p className={styles.text}>
                The information collected is used for legitimate academic and operational purposes, including:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Facilitating enrollment, onboarding, and cohort scheduling for 90-day bootcamps and summer internships.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Assigning dedicated technical mentors for weekly 1:1 code evaluations and doubt resolution.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Issuing official, verifiable Certificates of Completion and performance-based Letters of Recommendation (LOR).</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Providing resume reviews, mock interviews, and hiring referral assistance.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Communicating curriculum updates, live session links, and assessment deadlines via WhatsApp, Email, or SMS.</div>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="sharing" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>04.</span>
                <span>Information Sharing &amp; Third Parties</span>
              </h2>
              <p className={styles.text}>
                We do not sell your personal data. We may share limited information under the following strict conditions:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Service Providers &amp; Infrastructure:</strong> Trusted cloud hosting partners, email dispatchers, and secure database providers who comply with stringent confidentiality standards.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Recruiter Verification:</strong> Public verification pages allow prospective employers to validate your unique Credential ID upon entering the certificate number.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Legal Compliance:</strong> When required by applicable Indian laws, judicial proceedings, or regulatory authorities.</div>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="projects-ip" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>05.</span>
                <span>Student Project Work &amp; Intellectual Property</span>
              </h2>
              <p className={styles.text}>
                Students retain full intellectual property ownership of the original code, designs, and capstone applications they create during our bootcamps and internship sprints.
              </p>
              <p className={styles.text}>
                By participating in Campussutras programs, you grant us a non-exclusive, revocable license to showcase your project titles, demo videos, and verified testimonials for educational and portfolio demonstration purposes.
              </p>
            </div>

            {/* Section 6 */}
            <div id="security" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>06.</span>
                <span>Data Security &amp; Credentials</span>
              </h2>
              <p className={styles.text}>
                We implement industry-standard administrative, technical, and physical safeguards to protect student data against unauthorized access, alteration, or disclosure. All web traffic is encrypted using modern TLS (Transport Layer Security) protocols.
              </p>
              <p className={styles.text}>
                Our credential verification engine generates unique, tamper-resistant identifiers ensuring the integrity of student certificates against fraud or falsification.
              </p>
            </div>

            {/* Section 7 */}
            <div id="cookies" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>07.</span>
                <span>Cookies &amp; Tracking Technologies</span>
              </h2>
              <p className={styles.text}>
                Our website uses essential cookies and aggregated analytics to measure page load performance, remember form selections, and optimize user experience. You can manage or disable cookie preferences through your web browser settings.
              </p>
            </div>

            {/* Section 8 */}
            <div id="rights" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>08.</span>
                <span>Student Rights &amp; Data Retention</span>
              </h2>
              <p className={styles.text}>
                You have the right to access, update, or request the deletion of your personal contact data from our marketing systems at any time. Academic records associated with verified credential IDs are retained indefinitely to ensure lifetime verification validity for recruiters.
              </p>
            </div>

            {/* Section 9 */}
            <div id="updates" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>09.</span>
                <span>Changes to this Privacy Policy</span>
              </h2>
              <p className={styles.text}>
                We may periodically update this Privacy Policy to reflect changes in our pedagogical offerings, legal mandates, or technological practices. Any modifications will be posted on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </div>

            {/* Section 10 */}
            <div id="contact" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>10.</span>
                <span>Grievance Officer &amp; Contact Information</span>
              </h2>
              <p className={styles.text}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your data, please contact our grievance team:
              </p>

              <div className={styles.contactTable}>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Company:</span>
                  <span className={styles.contactVal}>{companyInfo.legalName}</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Email:</span>
                  <a href={`mailto:${companyInfo.email}`} className={styles.contactVal} style={{ color: 'var(--accentBlue)' }}>
                    {companyInfo.email}
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Website:</span>
                  <span className={styles.contactVal}>https://campussutras.com</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Support Desk:</span>
                  <Link href="/contact" className={styles.contactVal} style={{ color: 'var(--accentBlue)' }}>
                    Visit Online Support Desk →
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
