"use client";

import { useState } from "react";
import styles from "./InternshipHero.module.css";
import { internshipProgramNames } from "@/data/internships";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Send, 
  Sparkles,
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap
} from "lucide-react";

export default function InternshipHero() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: internshipProgramNames[0],
    college: "",
    yearOfStudy: "3rd Year",
    branch: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = "Enter valid 10-digit number";
    }
    if (!formData.college.trim()) {
      errors.college = "College/University is required";
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
      applicationId: `CS-INT-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const res = await fetch("/api/forms/internship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit application. Please try again.");
      }

      const finalData = {
        ...payload,
        applicationId: result.referenceId || payload.applicationId,
      };

      setIsSubmitted(true);
      setSubmittedData(finalData);
    } catch (err) {
      console.error("[InternshipForm] Error:", err);
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to submit application. Please check your network and try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      program: internshipProgramNames[0],
      college: "",
      yearOfStudy: "3rd Year",
      branch: "",
    });
    setFormErrors({});
  };

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Heading, Info, and Clean Program List */}
        <div className={styles.infoCol}>
          <div className={styles.badgeRow}>
            <span className={styles.liveDot}></span>
            <span className={styles.badgeText}>Summer Internship & Training Programs</span>
          </div>

          <h1 className={styles.title}>
            Bridge the Gap Between College &amp; Industry with{" "}
            <span className={styles.highlight}>Practical Internships</span>
          </h1>

          <p className={styles.description}>
            At Campussutras, we offer dynamic <strong>2–3 month internship programs</strong> designed to bridge the gap between academic learning and industry demands. 
            Our internships are hands-on, mentor-driven, and focused on helping students gain practical skills, real-world exposure, and portfolio-worthy experience.
          </p>

          {/* Clean Programs Offered Badges/Chips */}
          <div className={styles.programsBlock}>
            <div className={styles.programsTitle}>Programs Offered:</div>
            <div className={styles.programsList}>
              {internshipProgramNames.map((prog, idx) => (
                <span 
                  key={idx} 
                  className={styles.programChip}
                  onClick={() => setFormData((prev) => ({ ...prev, program: prog }))}
                  title="Click to select in form"
                >
                  <span className={styles.chipCheck}>✓</span>
                  {prog}
                </span>
              ))}
            </div>
          </div>

          {/* Key Quick Highlights */}
          <div className={styles.highlightsGrid}>
            <div className={styles.hlItem}>
              <Calendar size={18} className={styles.hlIcon} />
              <span>2–3 Months Duration</span>
            </div>
            <div className={styles.hlItem}>
              <CheckCircle2 size={18} className={styles.hlIcon} />
              <span>100% Practical Projects</span>
            </div>
            <div className={styles.hlItem}>
              <ShieldCheck size={18} className={styles.hlIcon} />
              <span>Verified Certificate &amp; LOR</span>
            </div>
            <div className={styles.hlItem}>
              <Users size={18} className={styles.hlIcon} />
              <span>1:1 Mentor Support</span>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Enrollment Form */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            {isSubmitted ? (
              <div className={styles.successState}>
                <div className={styles.successIconCircle}>
                  <CheckCircle2 size={40} color="#059669" />
                </div>
                <h3 className={styles.successTitle}>Application Submitted!</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{submittedData?.fullName}</strong>. We have received your application for <strong>{submittedData?.program}</strong>.
                </p>

                <div className={styles.appRefBox}>
                  <span className={styles.appRefLabel}>Reference ID:</span>
                  <span className={styles.appRefId}>{submittedData?.applicationId}</span>
                </div>

                <div className={styles.nextSteps}>
                  <strong>What's Next:</strong>
                  <p>Our counseling team will reach out via WhatsApp / Phone within 24 hours with your cohort schedule and onboarding details.</p>
                </div>

                <button 
                  type="button" 
                  onClick={handleReset} 
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <>
                <div className={styles.formHead}>
                  <div className={styles.formEyebrow}>Quick Enrollment</div>
                  <h3 className={styles.formHeading}>Apply for Internship</h3>
                  <p className={styles.formSub}>Fill your details to secure your cohort seat.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate className={styles.formBody}>
                  {/* Program Select */}
                  <div className={styles.formGroup}>
                    <label htmlFor="program" className={styles.label}>
                      Choose Program <span className={styles.req}>*</span>
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      {internshipProgramNames.map((prog, idx) => (
                        <option key={idx} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <User size={17} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`${styles.input} ${formErrors.fullName ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.fullName && <span className={styles.errText}>{formErrors.fullName}</span>}
                  </div>

                  {/* Email & Phone in 2 Columns */}
                  <div className={styles.row2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address <span className={styles.req}>*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <Mail size={17} className={styles.inputIcon} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rahul@gmail.com"
                          className={`${styles.input} ${formErrors.email ? styles.inputError : ""}`}
                        />
                      </div>
                      {formErrors.email && <span className={styles.errText}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone / WhatsApp <span className={styles.req}>*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <Phone size={17} className={styles.inputIcon} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          className={`${styles.input} ${formErrors.phone ? styles.inputError : ""}`}
                        />
                      </div>
                      {formErrors.phone && <span className={styles.errText}>{formErrors.phone}</span>}
                    </div>
                  </div>

                  {/* College / University */}
                  <div className={styles.formGroup}>
                    <label htmlFor="college" className={styles.label}>
                      College / University <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <Building2 size={17} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="e.g. Delhi University / VIT / AKTU"
                        className={`${styles.input} ${formErrors.college ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.college && <span className={styles.errText}>{formErrors.college}</span>}
                  </div>

                  {/* Year & Branch */}
                  <div className={styles.row2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="yearOfStudy" className={styles.label}>
                        Year of Study
                      </label>
                      <div className={styles.inputWrap}>
                        <GraduationCap size={17} className={styles.inputIcon} />
                        <select
                          id="yearOfStudy"
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th / Final Year">4th / Final Year</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="branch" className={styles.label}>
                        Branch / Degree
                      </label>
                      <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="e.g. B.Tech, BCA, MCA, MBA, BBA, Law"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {formErrors.submit && (
                    <div style={{
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      marginBottom: "1rem"
                    }}>
                      ⚠️ {formErrors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary ${styles.submitBtn}`}
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <div className={styles.formNote}>
                    🔒 Free Counseling &amp; Batch Roadmap will be shared on WhatsApp.
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
