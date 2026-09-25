"use client";

import { useState } from "react";
import styles from "./ContactMain.module.css";
import { companyInfo } from "@/data/company";
import { contactChannels } from "@/data/contact";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  HelpCircle,
  Sparkles
} from "lucide-react";

export default function ContactMain() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Bootcamp Admission",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const iconMap = {
    Mail: <Mail size={22} />,
    GraduationCap: <GraduationCap size={22} />,
    Building2: <Building2 size={22} />,
    ShieldCheck: <ShieldCheck size={22} />,
  };

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
      errors.phone = "Please enter a valid 10-digit number";
    }
    if (!formData.message.trim()) {
      errors.message = "Please write your query or message";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
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
      ticketId: `CS-INQ-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit inquiry. Please try again.");
      }

      const finalData = {
        ...payload,
        ticketId: result.referenceId || payload.ticketId,
      };

      setIsSubmitted(true);
      setSubmittedData(finalData);
    } catch (err) {
      console.error("[ContactForm] Error:", err);
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to submit inquiry. Please check your network and try again.",
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
      subject: "90-Day Bootcamp Admission",
      message: "",
    });
    setFormErrors({});
  };

  return (
    <section className={styles.mainSection}>
      <div className={`container ${styles.mainGrid}`}>
        {/* Left Column: Direct Info & Communication Desks */}
        <div className={styles.infoCol}>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start' }}>
            Direct Contact Desks
          </div>
          
          <h2 className={styles.infoTitle}>Reach the Right Team Faster</h2>
          <p className={styles.infoSubtitle}>
            Choose a specialized department for prompt resolution, or submit the form for general counseling.
          </p>

          <div className={styles.channelsList}>
            {contactChannels.map((channel) => (
              <div key={channel.id} className={styles.channelCard}>
                <div className={styles.channelIconWrap}>
                  {iconMap[channel.icon] || <Mail size={22} />}
                </div>
                <div className={styles.channelBody}>
                  <div className={styles.channelHeader}>
                    <h3 className={styles.channelName}>{channel.title}</h3>
                    <span className={styles.channelBadge}>{channel.badge}</span>
                  </div>
                  <p className={styles.channelDesc}>{channel.description}</p>
                  <a href={channel.href} className={styles.channelLink}>
                    <span>{channel.value}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Hours & Corporate Box */}
          <div className={styles.operationsCard}>
            <div className={styles.opHeader}>
              <Clock size={18} className={styles.opIcon} />
              <h4 className={styles.opTitle}>Counseling &amp; Support Hours</h4>
            </div>
            <div className={styles.opRow}>
              <span className={styles.opLabel}>Working Days:</span>
              <span className={styles.opValue}>Monday – Saturday</span>
            </div>
            <div className={styles.opRow}>
              <span className={styles.opLabel}>Support Hours:</span>
              <span className={styles.opValue}>9:30 AM – 6:30 PM IST</span>
            </div>
            <div className={styles.opRow}>
              <span className={styles.opLabel}>Entity:</span>
              <span className={styles.opValue}>{companyInfo.legalName}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className={styles.socialCard}>
            <div className={styles.socialLabel}>Follow Campussutras on Social Media:</div>
            <div className={styles.socialButtons}>
              <a
                href={companyInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <span>LinkedIn</span>
                <ExternalLink size={13} />
              </a>
              <a
                href={companyInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <span>Instagram</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className={styles.formCol}>
          <div className={styles.formContainer}>
            {isSubmitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIconCircle}>
                  <CheckCircle2 size={44} color="#059669" />
                </div>
                <h3 className={styles.successHeading}>Message Sent Successfully!</h3>
                <p className={styles.successDesc}>
                  Thank you, <strong>{submittedData?.fullName}</strong>. Your query regarding <strong>{submittedData?.subject}</strong> has been received by our academic desk.
                </p>

                <div className={styles.ticketCard}>
                  <div className={styles.ticketRow}>
                    <span className={styles.ticketLabel}>Inquiry Reference:</span>
                    <strong className={styles.ticketCode}>{submittedData?.ticketId}</strong>
                  </div>
                  <div className={styles.ticketRow}>
                    <span className={styles.ticketLabel}>Registered Email:</span>
                    <span>{submittedData?.email}</span>
                  </div>
                  <div className={styles.ticketRow}>
                    <span className={styles.ticketLabel}>Phone / WhatsApp:</span>
                    <span>{submittedData?.phone}</span>
                  </div>
                </div>

                <div className={styles.responseTimeline}>
                  <strong>⏱️ Expected Turnaround:</strong>
                  <p>Our team will contact you within 12–24 business hours via WhatsApp or Email.</p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ marginTop: '1.5rem', width: '100%' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className={styles.formHead}>
                  <div className={styles.formEyebrow}>Online Inquiry Desk</div>
                  <h3 className={styles.formTitle}>Send Us a Message</h3>
                  <p className={styles.formSubtitle}>
                    Fill out the form below and our counseling team will get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className={styles.form}>
                  {/* Full Name */}
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <User size={18} className={styles.fieldIcon} />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Priyanshu Sharma"
                        className={`${styles.input} ${formErrors.fullName ? styles.inputError : ""}`}
                      />
                    </div>
                    {formErrors.fullName && <span className={styles.errText}>{formErrors.fullName}</span>}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address <span className={styles.req}>*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <Mail size={18} className={styles.fieldIcon} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="priyanshu@example.com"
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
                        <Phone size={18} className={styles.fieldIcon} />
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

                  {/* Inquiry Subject */}
                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Inquiry Type / Subject <span className={styles.req}>*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="Bootcamp Admission">Bootcamp Admission &amp; Syllabus</option>
                      <option value="Summer Internship Enrollment">Summer Internship & Training Inquiry</option>
                      <option value="College / Campus Partnership">College / University Training MoU</option>
                      <option value="Corporate Hiring & Placement">Corporate Hiring & Talent Placement</option>
                      <option value="Certificate Verification Issue">Certificate Verification Assistance</option>
                      <option value="General Support Query">General Support / Other Query</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Your Message / Question <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please let us know how we can help you with courses, internships, or campus collaborations..."
                      className={`${styles.textarea} ${formErrors.message ? styles.inputError : ""}`}
                    ></textarea>
                    {formErrors.message && <span className={styles.errText}>{formErrors.message}</span>}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary ${styles.submitBtn}`}
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Your Inquiry</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <div className={styles.privacyText}>
                    🔒 We respect your privacy. Your information is used strictly to respond to your inquiry.
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
