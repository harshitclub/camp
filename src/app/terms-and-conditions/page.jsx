import LegalHero from "@/components/legal/LegalHero";
import styles from "@/components/legal/LegalContent.module.css";
import { companyInfo } from "@/data/company";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description: "Read Campussutras' Terms and Conditions governing enrollment in our 90-day technical bootcamps, summer internship programs, mentor sessions, and credential verification.",
  keywords: "Campussutras terms and conditions, edtech terms, student agreement, bootcamp rules, internship terms, verified credential terms",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Campussutras",
    description: "Official Terms & Conditions of Campussutras Private Limited.",
    url: "https://campussutras.com/terms-and-conditions",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. Eligibility & Student Conduct" },
    { id: "bootcamps-internships", title: "3. Bootcamps & Summer Internships" },
    { id: "credentials", title: "4. Certification & Letter of Recommendation" },
    { id: "fees-refunds", title: "5. Fees, Payments & Cancellation" },
    { id: "ip-materials", title: "6. Intellectual Property & Curricula" },
    { id: "mentorship", title: "7. Mentorship & Academic Integrity" },
    { id: "liability", title: "8. Disclaimer & Limitation of Liability" },
    { id: "governing-law", title: "9. Governing Law & Jurisdiction" },
    { id: "contact-terms", title: "10. Contact & Legal Notices" },
  ];

  return (
    <>
      <LegalHero
        title="Terms &amp; Conditions"
        subtitle="Please read these terms carefully before accessing our platform, enrolling in our 90-day bootcamps, or applying for our summer internship cohorts."
        lastUpdated="September 2025"
        type="terms"
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
            <div id="acceptance" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>01.</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className={styles.text}>
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Student&quot;, or &quot;Learner&quot;) and <strong>{companyInfo.legalName}</strong> (&quot;Campussutras&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;).
              </p>
              <p className={styles.text}>
                By accessing <strong>https://campussutras.com</strong>, submitting an inquiry, enrolling in any of our 90-Day Industry Bootcamps, or registering for our Summer Internship programs, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>

            {/* Section 2 */}
            <div id="eligibility" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>02.</span>
                <span>Eligibility &amp; Student Code of Conduct</span>
              </h2>
              <p className={styles.text}>
                Our programs are open to university students, college graduates, and early-career individuals aspiring to build practical software engineering, analytics, marketing, and design capabilities.
              </p>
              <p className={styles.text}>
                All learners enrolled in Campussutras agree to maintain a professional standard of conduct:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Treat fellow cohort members, mentors, and staff with mutual respect and professionalism.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Abstain from harassment, hate speech, disruptive behavior, or malicious actions in cohort communication channels.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Do not attempt to compromise the security or integrity of our portal, code repositories, or verification databases.</div>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="bootcamps-internships" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>03.</span>
                <span>Bootcamps &amp; Summer Internship Programs</span>
              </h2>
              <p className={styles.text}>
                Campussutras delivers project-centric curriculum tracks structured around modern industry tooling (e.g. Full Stack MERN/Next.js, Python, Java, Power BI, Excel Analytics, Generative AI, Digital Marketing, and Graphic Designing).
              </p>
              <p className={styles.text}>
                While we deliver comprehensive mentoring, live sprint labs, resume reviews, and placement guidance, completion of a program does not guarantee automatic employment or a specific salary package, as hiring outcomes depend upon candidate performance and external employer discretion.
              </p>
            </div>

            {/* Section 4 */}
            <div id="credentials" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>04.</span>
                <span>Certification &amp; Letter of Recommendation (LOR)</span>
              </h2>
              <p className={styles.text}>
                To earn an official Verified Certificate of Completion and/or Letter of Recommendation:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>The student must fulfill milestone submissions and achieve passing evaluation marks on assigned capstone projects.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Performance-based Letters of Recommendation (LOR) are granted at the discretion of the domain mentor to learners demonstrating high code quality, timely delivery, and proactive participation.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div>Each certificate contains a tamper-proof verification ID accessible online at <strong>/verify-certificate</strong> for recruiter validation.</div>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="fees-refunds" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>05.</span>
                <span>Fees, Payments &amp; Cancellation Policy</span>
              </h2>
              <p className={styles.text}>
                All program enrollment fees must be paid through our designated payment channels prior to cohort kickoff:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Transparent Pricing:</strong> Program fees are displayed clearly before enrollment without hidden platform charges.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Refund Requests:</strong> Refund eligibility is subject to written notice submitted within 7 days of cohort kickoff prior to accessing substantial proprietary course assets or 1:1 mentor code reviews.</div>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listBullet}>•</span>
                  <div><strong>Batch Transfers:</strong> Students facing unforeseen academic exams or medical emergencies may request a transfer to an upcoming cohort batch by contacting their academic counselor.</div>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="ip-materials" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>06.</span>
                <span>Intellectual Property &amp; Course Materials</span>
              </h2>
              <p className={styles.text}>
                All pedagogical content, curated assignments, syllabi, branding assets, logos, and recorded sessions provided by Campussutras are the proprietary intellectual property of <strong>{companyInfo.legalName}</strong>.
              </p>
              <p className={styles.text}>
                Students are granted a personal, non-transferable, non-exclusive license to use learning materials for educational study only. Unauthorized duplication, resale, or public redistribution of Campussutras curriculum materials is strictly prohibited.
              </p>
            </div>

            {/* Section 7 */}
            <div id="mentorship" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>07.</span>
                <span>Mentorship &amp; Academic Integrity</span>
              </h2>
              <p className={styles.text}>
                Academic honesty is vital. Students are expected to submit original project code and honest assignment solutions. Plagiarized submissions or unauthorized code cloning from external sources without attribution may result in withholding of certification.
              </p>
              <p className={styles.text}>
                Mentors provide feedback, guidance, and architecture reviews; students are expected to take ownership of implementing fixes and developing their code.
              </p>
            </div>

            {/* Section 8 */}
            <div id="liability" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>08.</span>
                <span>Disclaimer of Warranties &amp; Limitation of Liability</span>
              </h2>
              <p className={styles.text}>
                Our platform and training materials are provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by applicable Indian law, Campussutras disclaims all express or implied warranties. In no event shall Campussutras or its directors be liable for indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* Section 9 */}
            <div id="governing-law" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>09.</span>
                <span>Governing Law &amp; Jurisdiction</span>
              </h2>
              <p className={styles.text}>
                These Terms shall be governed by, construed, and enforced in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts of India.
              </p>
            </div>

            {/* Section 10 */}
            <div id="contact-terms" className={styles.legalBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>10.</span>
                <span>Contact &amp; Legal Notices</span>
              </h2>
              <p className={styles.text}>
                For official legal notices, inquiries regarding these Terms, or institutional partnership agreements, please reach out to:
              </p>

              <div className={styles.contactTable}>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Legal Entity:</span>
                  <span className={styles.contactVal}>{companyInfo.legalName}</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Legal &amp; Support Email:</span>
                  <a href={`mailto:${companyInfo.email}`} className={styles.contactVal} style={{ color: 'var(--accentBlue)' }}>
                    {companyInfo.email}
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Official Portal:</span>
                  <span className={styles.contactVal}>https://campussutras.com</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactKey}>Direct Inquiries:</span>
                  <Link href="/contact" className={styles.contactVal} style={{ color: 'var(--accentBlue)' }}>
                    Contact Admissions &amp; Legal Desk →
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
