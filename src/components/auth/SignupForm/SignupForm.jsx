"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePhone } from "@/lib/validators";
import styles from "./SignupForm.module.css";
import { 
  User, 
  Mail, 
  Lock, 
  Building2, 
  Briefcase, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap,
  BookOpen,
  Calendar
} from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Student", // Default: "Student", or "Working Professional"
    collegeName: "",
    course: "",
    year: "",
    company: "",
    position: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAudienceChange = (type) => {
    setFormData((prev) => ({ ...prev, userType: type }));
  };

  const isStudent = formData.userType === "Student";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Required Form Validations
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return;
    }
    if (!validateEmail(formData.email.trim())) {
      setErrorMessage("Please enter a valid Email Address.");
      return;
    }
    if (formData.phone?.trim() && !validatePhone(formData.phone.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-type.");
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        userType: formData.userType,
        phone: formData.phone.trim() || null,
        collegeName: isStudent ? (formData.collegeName.trim() || null) : null,
        course: isStudent ? (formData.course.trim() || null) : null,
        year: isStudent ? (formData.year.trim() || null) : null,
        company: !isStudent ? (formData.company.trim() || null) : null,
        position: !isStudent ? (formData.position.trim() || null) : null,
      });

      setSuccessMessage("Account created successfully! Welcome to Campussutras.");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
    } catch (err) {
      console.warn("[Signup Error]:", err?.message || err);
      let msg = "Failed to create account. Please try again.";
      if (err?.message?.includes("already registered")) {
        msg = "An account with this email address already exists. Please log in.";
      } else if (err?.message) {
        msg = err.message;
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <Sparkles size={14} className={styles.eyebrowIcon} />
          <span>Quick Registration</span>
        </div>
        <h1 className={styles.title}>Create Your Account</h1>
        <p className={styles.subtitle}>
          Sign up in seconds to access coding assessments, bootcamps, and career tracks.
        </p>
      </div>

      {errorMessage && (
        <div className={styles.alertError}>
          <AlertCircle size={18} className={styles.alertIcon} />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className={styles.alertSuccess}>
          <CheckCircle2 size={18} className={styles.alertIconSuccess} />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Audience Selector: Student vs Working Professional */}
        <div className={styles.audienceSection}>
          <label className={styles.sectionLabel}>
            I am a <span className={styles.reqStar}>*</span>
          </label>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              onClick={() => handleAudienceChange("Student")}
              className={`${styles.segmentBtn} ${isStudent ? styles.segmentBtnActive : ""}`}
            >
              <GraduationCap size={18} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleAudienceChange("Working Professional")}
              className={`${styles.segmentBtn} ${!isStudent ? styles.segmentBtnActive : ""}`}
            >
              <Briefcase size={18} />
              <span>Working Professional</span>
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name <span className={styles.reqStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <User size={18} className={styles.fieldIcon} />
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Aryan Sharma"
              className={styles.input}
              required
              autoFocus
            />
          </div>
        </div>

        {/* Email Address */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address <span className={styles.reqStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.fieldIcon} />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Password Fields in 2 Columns */}
        <div className={styles.grid2}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password <span className={styles.reqStar}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.fieldIcon} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password <span className={styles.reqStar}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.fieldIcon} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type password"
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Profile Information Block (Always OPEN & Visible) */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <span className={styles.detailsTitle}>
              {isStudent ? "Academic Details" : "Professional Details"}
            </span>
            <span className={styles.optionalBadge}>Optional</span>
          </div>

          {isStudent ? (
            /* Student Fields */
            <div className={styles.detailsGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="collegeName" className={styles.label}>
                  College / University Name <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <GraduationCap size={18} className={styles.fieldIcon} />
                  <input
                    id="collegeName"
                    name="collegeName"
                    type="text"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Delhi University, DTU, VIT"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="course" className={styles.label}>
                  Course / Specialization <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <BookOpen size={18} className={styles.fieldIcon} />
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech CSE, BCA, MCA"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="year" className={styles.label}>
                  Year of Study <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Calendar size={18} className={styles.fieldIcon} />
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.selectCustom}`}
                  >
                    <option value="">Select Year (Optional)</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year / Final Year">4th Year / Final Year</option>
                    <option value="Passout / Graduated">Passout / Graduated</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} className={styles.fieldIcon} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Working Professional Fields */
            <div className={styles.detailsGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="company" className={styles.label}>
                  Company / Organization <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Building2 size={18} className={styles.fieldIcon} />
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. TCS, Infosys, Microsoft, Startup"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="position" className={styles.label}>
                  Current Position / Role <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Briefcase size={18} className={styles.fieldIcon} />
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer, Frontend Dev"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullSpan}`}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} className={styles.fieldIcon} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary btn-lg ${styles.submitBtn}`}
        >
          {isLoading ? (
            <span className={styles.loadingWrap}>
              <span className={styles.spinner}></span>
              <span>Creating Account...</span>
            </span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className={styles.footer}>
        <span>Already have an account?</span>{" "}
        <Link href="/login" className={styles.switchLink}>
          Sign In Here
        </Link>
      </div>
    </div>
  );
}
