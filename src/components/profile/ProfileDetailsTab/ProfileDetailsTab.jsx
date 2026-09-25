"use client";

import { useState, useEffect } from "react";
import styles from "./ProfileDetailsTab.module.css";
import { 
  User, 
  Building2, 
  Briefcase, 
  Phone, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Globe, 
  Link2,
  BookOpen,
  Calendar
} from "lucide-react";

export default function ProfileDetailsTab({ profile, user, onProfileUpdated }) {
  const [formData, setFormData] = useState({
    fullName: "",
    userType: "Student",
    phone: "",
    collegeName: "",
    company: "",
    position: "",
    course: "",
    year: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Sync state when profile loads/updates
  useEffect(() => {
    if (profile || user) {
      setFormData({
        fullName: profile?.full_name || user?.user_metadata?.full_name || "",
        userType: profile?.user_type || user?.user_metadata?.user_type || "Student",
        phone: profile?.phone || user?.user_metadata?.phone || "",
        collegeName: profile?.college_name || user?.user_metadata?.college_name || "",
        company: profile?.company || user?.user_metadata?.company || "",
        position: profile?.position || user?.user_metadata?.position || "",
        course: profile?.course || profile?.degree_branch || user?.user_metadata?.course || user?.user_metadata?.degree_branch || "",
        year: profile?.year || profile?.graduation_year || user?.user_metadata?.year || user?.user_metadata?.graduation_year || "",
        githubUrl: profile?.github_url || user?.user_metadata?.github_url || "",
        linkedinUrl: profile?.linkedin_url || user?.user_metadata?.linkedin_url || "",
      });
    }
  }, [profile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmployee = formData.userType === "Employee" || formData.userType === "Working Professional";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Full Name is required.");
      return;
    }

    setIsLoading(true);

    try {
      const updatePayload = {
        full_name: formData.fullName.trim(),
        user_type: formData.userType,
        phone: formData.phone.trim() || null,
        college_name: isEmployee ? null : (formData.collegeName.trim() || null),
        company: isEmployee ? (formData.company.trim() || null) : null,
        position: isEmployee ? (formData.position.trim() || null) : null,
        course: isEmployee ? null : (formData.course.trim() || null),
        year: isEmployee ? null : (formData.year.trim() || null),
        github_url: formData.githubUrl.trim() || null,
        linkedin_url: formData.linkedinUrl.trim() || null,
      };

      if (onProfileUpdated) {
        await onProfileUpdated(updatePayload);
      }

      setSuccessMessage("Profile details updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.warn("[Profile Update Error]:", err?.message || err);
      setErrorMessage(err?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.tabContentCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Personal &amp; Professional Details</h2>
          <p className={styles.sectionDesc}>
            Manage your personal profile, educational background, or corporate affiliation.
          </p>
        </div>
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

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Row 1: Full Name & Persona */}
        <div className={styles.grid2}>
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
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="userType" className={styles.label}>
              Current Status / User Type
            </label>
            <div className={styles.inputWrapper}>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="Student">Student (College / University)</option>
                <option value="Employee">Employee (Corporate / Industry)</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Job Seeker">Job Seeker / Fresher</option>
                <option value="Freelancer">Freelancer / Developer</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Phone & College / Company */}
        <div className={styles.grid2}>
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

          {/* Conditional College vs Company field */}
          {isEmployee ? (
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
                  placeholder="e.g. Google, Microsoft, Infosys, Startup"
                  className={styles.input}
                />
              </div>
            </div>
          ) : (
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
                  placeholder="e.g. Delhi Technological University (DTU)"
                  className={styles.input}
                />
              </div>
            </div>
          )}
        </div>

        {/* Row 3: Role/Position or Course/Year */}
        <div className={styles.grid2}>
          {isEmployee ? (
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
                  placeholder="e.g. Software Engineer, Tech Lead"
                  className={styles.input}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="course" className={styles.label}>
                  Course / Degree Program <span className={styles.optLabel}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <BookOpen size={18} className={styles.fieldIcon} />
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech Computer Science, BCA, MCA"
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
                    className={styles.selectInput}
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
            </>
          )}

          {isEmployee && (
            <div className={styles.inputGroup}>
              <label htmlFor="course" className={styles.label}>
                Domain / Specialization <span className={styles.optLabel}>(Optional)</span>
              </label>
              <div className={styles.inputWrapper}>
                <BookOpen size={18} className={styles.fieldIcon} />
                <input
                  id="course"
                  name="course"
                  type="text"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. Backend Development, DevOps"
                  className={styles.input}
                />
              </div>
            </div>
          )}
        </div>

        {/* Row 4: GitHub & LinkedIn URLs */}
        <div className={styles.grid2}>
          <div className={styles.inputGroup}>
            <label htmlFor="githubUrl" className={styles.label}>
              GitHub Profile URL <span className={styles.optLabel}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <Globe size={18} className={styles.fieldIcon} />
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/your-username"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="linkedinUrl" className={styles.label}>
              LinkedIn Profile URL <span className={styles.optLabel}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <Link2 size={18} className={styles.fieldIcon} />
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={styles.actionsRow}>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary ${styles.saveBtn}`}
          >
            {isLoading ? (
              <span className={styles.loadingWrap}>
                <span className={styles.spinner}></span>
                <span>Saving Changes...</span>
              </span>
            ) : (
              <>
                <Save size={18} />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
