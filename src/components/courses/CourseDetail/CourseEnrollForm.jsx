"use client";

import { useState } from "react";
import styles from "./CourseEnrollForm.module.css";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  HelpCircle
} from "lucide-react";

export default function CourseEnrollForm({ course, isSidebar = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeOrOrg: "",
    graduationYear: "2026",
    batchPreference: "Weekday Evening (7:30 PM - 9:30 PM)",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = "Enter valid 10-digit number";
    }
    if (!formData.collegeOrOrg.trim()) {
      errors.collegeOrOrg = "College / University name is required";
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
      courseId: course?.id || "course",
      courseTitle: course?.title || "Campussutras Bootcamp",
      registrationId: `CS-REG-${Date.now().toString().slice(-6)}`,
      registeredAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const res = await fetch("/api/forms/course-enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit course application. Please try again.");
      }

      const finalData = {
        ...payload,
        registrationId: result.referenceId || payload.registrationId,
      };

      setIsSubmitted(true);
      setRegistrationData(finalData);
    } catch (err) {
      console.error("[CourseEnrollForm] Error:", err);
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to submit course application. Please check your network and try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setRegistrationData(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      collegeOrOrg: "",
      graduationYear: "2026",
      batchPreference: "Weekday Evening (7:30 PM - 9:30 PM)",
      message: "",
    });
    setFormErrors({});
  };

  return (
    <div 
      className={`${styles.formWrapper} ${isSidebar ? styles.sidebarVariant : styles.standaloneVariant}`} 
      id="enroll-form"
    >
      <div className={styles.formCard}>
        {isSubmitted ? (
          <div className={styles.successState}>
            <div className={styles.successIconWrap}>
              <CheckCircle2 size={48} color="#059669" />
            </div>

            <h3 className={styles.successTitle}>Registration Received!</h3>
            <p className={styles.successSubtitle}>
              Congratulations, <strong>{registrationData?.fullName}</strong>. You have registered for the <strong>{registrationData?.courseTitle}</strong>.
            </p>

            <div className={styles.receiptBox}>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Registration ID:</span>
                <strong className={styles.receiptValue}>{registrationData?.registrationId}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Program Duration:</span>
                <span>{course?.duration || "90 Days"}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Registered Email:</span>
                <span>{registrationData?.email}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Contact WhatsApp:</span>
                <span>{registrationData?.phone}</span>
              </div>
            </div>

            <div className={styles.nextStepsCard}>
              <strong>📲 What Happens Next:</strong>
              <p>
                Our academic counselor will reach out via WhatsApp / Email within 12 business hours with your batch onboarding guide, calendar invites, and starter curriculum kit.
              </p>
            </div>

            <button 
              type="button" 
              onClick={handleReset} 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Register Another Student
            </button>
          </div>
        ) : (
          <>
            <div className={styles.formHeader}>
              <div className={styles.eyebrowTag}>
                <Sparkles size={13} />
                <span>Admissions Open</span>
              </div>
              <h3 className={styles.formHeading}>
                {isSidebar ? "Apply for this Bootcamp" : "Enroll & Reserve Your Seat"}
              </h3>
              <p className={styles.formSub}>
                Fill out the quick registration form below. Our academic counseling desk will verify your details and share the batch timetable.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className={styles.form}>
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
                    placeholder="e.g. Aryan Sharma"
                    className={`${styles.input} ${formErrors.fullName ? styles.inputError : ""}`}
                  />
                </div>
                {formErrors.fullName && <span className={styles.errorText}>{formErrors.fullName}</span>}
              </div>

              {/* Email & Phone Grid */}
              <div className={styles.grid2}>
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
                      placeholder="aryan@gmail.com"
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ""}`}
                    />
                  </div>
                  {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    WhatsApp Number <span className={styles.req}>*</span>
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
                  {formErrors.phone && <span className={styles.errorText}>{formErrors.phone}</span>}
                </div>
              </div>

              {/* College / Organization */}
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label htmlFor="collegeOrOrg" className={styles.label}>
                    College / University <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <GraduationCap size={17} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="collegeOrOrg"
                      name="collegeOrOrg"
                      value={formData.collegeOrOrg}
                      onChange={handleChange}
                      placeholder="e.g. IIT Delhi / Amity / VIT"
                      className={`${styles.input} ${formErrors.collegeOrOrg ? styles.inputError : ""}`}
                    />
                  </div>
                  {formErrors.collegeOrOrg && <span className={styles.errorText}>{formErrors.collegeOrOrg}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="graduationYear" className={styles.label}>
                    Graduation Year
                  </label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="2024">2024 (Graduated)</option>
                    <option value="2025">2025 (Final Year)</option>
                    <option value="2026">2026 (Pre-final Year)</option>
                    <option value="2027">2027 (2nd Year)</option>
                    <option value="2028">2028 (1st Year)</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              {/* Preferred Batch Timing */}
              <div className={styles.formGroup}>
                <label htmlFor="batchPreference" className={styles.label}>
                  Preferred Batch Slot
                </label>
                <select
                  id="batchPreference"
                  name="batchPreference"
                  value={formData.batchPreference}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="Weekday Evening (7:30 PM - 9:30 PM)">Weekday Evening (Mon - Fri: 7:30 PM - 9:30 PM)</option>
                  <option value="Weekend Intensive (Sat & Sun)">Weekend Intensive (Sat &amp; Sun: 10:00 AM - 2:00 PM)</option>
                  <option value="Flexible / Self-Paced + Live Mentorship">Flexible Schedule + Live Mentor Syncs</option>
                </select>
              </div>

              {/* Message / Remarks */}
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Any specific question or goals? <span className={styles.optional}>(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={isSidebar ? 2 : 3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ask about scholarship, prerequisites, or customized project guidance..."
                  className={styles.textarea}
                ></textarea>
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

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${styles.submitBtn}`}
              >
                {isSubmitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <span>Submit Course Application</span>
                    <Send size={17} />
                  </>
                )}
              </button>

              <div className={styles.formFooterNote}>
                <ShieldCheck size={14} className={styles.shieldIcon} />
                <span>100% Confidential • Official Campussutras Academic Desk</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
