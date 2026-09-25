"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./ForgotPasswordForm.module.css";
import { Mail, ArrowRight, ArrowLeft, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email.trim());
      setSuccessMessage(`Password reset link dispatched to ${email.trim()}! Please check your inbox (and Spam/Junk folder) to set your new password.`);
    } catch (err) {
      console.warn("[Forgot Password Error]:", err?.message || err);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("rate limit") || err?.status === 429) {
        setErrorMessage("Password reset request rate limit reached. Please wait 60 seconds before requesting another email.");
      } else {
        setErrorMessage(msg || "Failed to send reset email. Please ensure the email is registered and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <div className={styles.iconCircle}>
          <KeyRound size={26} />
        </div>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>
          Enter your registered email and we&apos;ll send you a secure link to reset your account password.
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

      {!successMessage && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="reset-email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.fieldIcon} />
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={styles.input}
                required
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary btn-lg ${styles.submitBtn}`}
          >
            {isLoading ? "Sending Link..." : "Send Password Reset Link"}
          </button>
        </form>
      )}

      <div className={styles.footer}>
        <Link href="/login" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
