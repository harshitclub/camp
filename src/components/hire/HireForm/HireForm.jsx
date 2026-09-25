"use client";

import { useState } from "react";
import styles from "./HireForm.module.css";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  Send, 
  CheckCircle2, 
  FileText,
  Clock,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function HireForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    workEmail: "",
    phone: "",
    companyWebsite: "",
    targetDomain: "Software & Web Development (Full Stack, Backend, Frontend)",
    employmentType: "Full-Time Freshers (Graduates)",
    openingsCount: "1–2 Hires",
    workMode: "On-Site (Office)",
    jobLocation: "",
    compensationRange: "",
    jobDescription: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errors = {};
    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
    }
    if (!formData.contactName.trim()) {
      errors.contactName = "Contact person name is required";
    }
    if (!formData.workEmail.trim()) {
      errors.workEmail = "Official work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = "Please enter a valid work email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone or WhatsApp number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      errors.phone = "Enter valid 10-digit phone number";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors((prev) => ({ ...prev, submit: "" }));

    const payload = {
      ...formData,
      inquiryId: `CS-HIRE-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const res = await fetch("/api/forms/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit hiring request. Please try again.");
      }

      const finalData = {
        ...payload,
        inquiryId: result.referenceId || payload.inquiryId,
      };

      setIsSubmitted(true);
      setSubmittedData(finalData);
    } catch (err) {
      console.error("[HireForm] Error:", err);
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to submit hiring request. Please check your network and try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      companyName: "",
      contactName: "",
      workEmail: "",
      phone: "",
      companyWebsite: "",
      targetDomain: "Software & Web Development (Full Stack, Backend, Frontend)",
      employmentType: "Full-Time Freshers (Graduates)",
      openingsCount: "1–2 Hires",
      workMode: "On-Site (Office)",
      jobLocation: "",
      compensationRange: "",
      jobDescription: "",
    });
    setFormErrors({});
  };

  return (
    <section id="hiring-form" className={styles.section}>
      <div className="container">
        <div className={styles.formCard}>
          {isSubmitted ? (
            <div className={styles.successState}>
              <div className={styles.successIconCircle}>
                <CheckCircle2 size={48} color="#059669" />
              </div>
              <h2 className={styles.successTitle}>Hiring Requirements Received!</h2>
              <p className={styles.successText}>
                Thank you, <strong>{submittedData?.contactName}</strong> from <strong>{submittedData?.companyName}</strong>. Your talent request has been logged into our corporate placement system.
              </p>

              <div className={styles.refBox}>
                <span className={styles.refLabel}>Inquiry Reference ID:</span>
                <span className={styles.refId}>{submittedData?.inquiryId}</span>
              </div>

              <div className={styles.nextStepsCard}>
                <div className={styles.nextStepsTitle}>
                  <Clock size={18} className={styles.nextStepsIcon} />
                  <span>What Happens Next?</span>
                </div>
                <ul className={styles.nextStepsList}>
                  <li>Our corporate placement lead will contact you via WhatsApp / Email within 24 hours.</li>
                  <li>We will match your criteria against top performers across our 50+ college partner cohorts.</li>
                  <li>You will receive curated candidate profiles with verified assessment scores and project links ready for direct interview.</li>
                </ul>
              </div>

              <button 
                type="button" 
                onClick={handleReset} 
                className="btn btn-secondary"
                style={{ marginTop: "1.5rem" }}
              >
                Submit Another Hiring Requirement
              </button>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <div className={styles.eyebrow}>
                  <Sparkles size={14} className={styles.eyebrowIcon} />
                  <span>Direct Talent Request</span>
                </div>
                <h2 className={styles.title}>Submit Your Hiring Requirements</h2>
                <p className={styles.subtitle}>
                  Tell us what roles you are hiring for. Our placement team will curate verified, high-performing candidates from our 50+ college partner cohorts and deliver custom shortlists in 48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className={styles.formGrid}>
                {/* SECTION 1: Company & Recruiter Information */}
                <div className={styles.formSectionHeader}>
                  <Building2 size={18} />
                  <span>1. Company &amp; Contact Details</span>
                </div>

                <div className={styles.row2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="companyName" className={styles.label}>
                      Company / Organization Name <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <Building2 size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Razorpay, Swiggy, Nexus Tech"
                        className={`${styles.input} ${formErrors.companyName ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.companyName && <span className={styles.errText}>{formErrors.companyName}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contactName" className={styles.label}>
                      Your Full Name <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <User size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Sharma (HR Lead)"
                        className={`${styles.input} ${formErrors.contactName ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.contactName && <span className={styles.errText}>{formErrors.contactName}</span>}
                  </div>
                </div>

                <div className={styles.row3}>
                  <div className={styles.formGroup}>
                    <label htmlFor="workEmail" className={styles.label}>
                      Official Work Email <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <Mail size={18} className={styles.inputIcon} />
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="ananya@company.com"
                        className={`${styles.input} ${formErrors.workEmail ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.workEmail && <span className={styles.errText}>{formErrors.workEmail}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone / WhatsApp <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <Phone size={18} className={styles.inputIcon} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className={`${styles.input} ${formErrors.phone ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.phone && <span className={styles.errText}>{formErrors.phone}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="companyWebsite" className={styles.label}>
                      Company Website / LinkedIn
                    </label>
                    <div className={styles.inputWrap}>
                      <Globe size={18} className={styles.inputIcon} />
                      <input
                        type="url"
                        id="companyWebsite"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        placeholder="https://yourcompany.com"
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Role & Talent Requirements */}
                <div className={`${styles.formSectionHeader} ${styles.sectionGap}`}>
                  <Briefcase size={18} />
                  <span>2. Role &amp; Talent Requirements</span>
                </div>

                <div className={styles.row2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="targetDomain" className={styles.label}>
                      Candidate Domain / Discipline <span className={styles.req}>*</span>
                    </label>
                    <select
                      id="targetDomain"
                      name="targetDomain"
                      value={formData.targetDomain}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="Software & Web Development (Full Stack, Backend, Frontend)">
                        Software &amp; Web Development (Full Stack, Backend, Frontend)
                      </option>
                      <option value="Artificial Intelligence & Python (RAG, LLMs, Agents)">
                        Artificial Intelligence &amp; Python (RAG, LLMs, Agents)
                      </option>
                      <option value="Business Intelligence & Analytics (Power BI, SQL, Excel)">
                        Business Intelligence &amp; Analytics (Power BI, SQL, Excel)
                      </option>
                      <option value="Growth Marketing & Performance Media (Meta, Google, SEO)">
                        Growth Marketing &amp; Performance Media (Meta, Google, SEO)
                      </option>
                      <option value="Corporate Law & Legal Compliance (Contracts, Cyber Law)">
                        Corporate Law &amp; Legal Compliance (Contracts, Cyber Law)
                      </option>
                      <option value="Multiple Domains / Custom Batch Hiring">
                        Multiple Domains / Custom Batch Hiring
                      </option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="employmentType" className={styles.label}>
                      Hiring Type
                    </label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="Full-Time Freshers (Graduates)">Full-Time Freshers (Graduates)</option>
                      <option value="Internship to Full-Time (PPO)">Internship to Full-Time (PPO)</option>
                      <option value="Summer / 3-Month Interns">Summer / 3-Month Interns</option>
                      <option value="Both Full-Time & Interns">Both Full-Time &amp; Interns</option>
                    </select>
                  </div>
                </div>

                <div className={styles.row3}>
                  <div className={styles.formGroup}>
                    <label htmlFor="openingsCount" className={styles.label}>
                      Number of Openings
                    </label>
                    <select
                      id="openingsCount"
                      name="openingsCount"
                      value={formData.openingsCount}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="1–2 Hires">1–2 Hires</option>
                      <option value="3–5 Hires">3–5 Hires</option>
                      <option value="6–10 Hires">6–10 Hires</option>
                      <option value="10+ Bulk Campus Hiring">10+ Bulk Campus Hiring</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="workMode" className={styles.label}>
                      Work Mode
                    </label>
                    <select
                      id="workMode"
                      name="workMode"
                      value={formData.workMode}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="On-Site (Office)">On-Site (Office)</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote / Work From Home">Remote / Work From Home</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="jobLocation" className={styles.label}>
                      Job Location / City
                    </label>
                    <div className={styles.inputWrap}>
                      <MapPin size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="jobLocation"
                        name="jobLocation"
                        value={formData.jobLocation}
                        onChange={handleChange}
                        placeholder="e.g. Bengaluru / Delhi NCR / Remote"
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="compensationRange" className={styles.label}>
                    Expected CTC / Monthly Stipend Range
                  </label>
                  <div className={styles.inputWrap}>
                    <IndianRupee size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="compensationRange"
                      name="compensationRange"
                      value={formData.compensationRange}
                      onChange={handleChange}
                      placeholder="e.g. ₹4–8 LPA for Full-time or ₹15k–25k/month for Interns"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="jobDescription" className={styles.label}>
                    Key Skills Required &amp; Role Details
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows={4}
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Provide a brief overview of the role, must-have tools or programming languages, interview process, or any special criteria..."
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formFooter}>
                  {formErrors.submit && (
                    <div style={{
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      marginBottom: "1rem",
                      width: "100%",
                      textAlign: "left"
                    }}>
                      ⚠️ {formErrors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  >
                    {isSubmitting ? (
                      <span>Processing Requirement...</span>
                    ) : (
                      <>
                        <span>Submit Hiring Request</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <div className={styles.trustNote}>
                    <ShieldCheck size={16} className={styles.trustIcon} />
                    <span>Zero agency placement fees. Guaranteed shortlist turnaround in 48 hours.</span>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
