"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./LoginForm.module.css";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email.trim(), password);
      setSuccessMessage("Login successful! Redirecting...");

      // Determine redirect path
      let targetPath = "/profile";
      if (res?.profile?.is_admin) {
        targetPath = "/admin";
      } else if (redirectUrl) {
        targetPath = decodeURIComponent(redirectUrl);
      }

      setTimeout(() => {
        router.push(targetPath);
      }, 700);
    } catch (err) {
      console.warn("[Login Error]:", err?.message || err);
      let msg = "Invalid email or password. Please check your credentials.";
      if (err?.message && !err.message.includes("Email not confirmed")) {
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
          <ShieldCheck size={14} className={styles.eyebrowIcon} />
          <span>Member &amp; Admin Portal</span>
        </div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to access your dashboard, enrolled bootcamps, and technical assessments.
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
        <div className={styles.inputGroup}>
          <label htmlFor="login-email" className={styles.label}>
            Email Address
          </label>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.fieldIcon} />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={styles.input}
              required
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="login-password" className={styles.label}>
              Password
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.fieldIcon} />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={styles.input}
              required
              autoComplete="current-password"
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

        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary btn-lg ${styles.submitBtn}`}
        >
          {isLoading ? (
            <span className={styles.loadingWrap}>
              <span className={styles.spinner}></span>
              <span>Signing In...</span>
            </span>
          ) : (
            <>
              <span>Sign In to Account</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className={styles.footer}>
        <span>Don&apos;t have an account yet?</span>{" "}
        <Link href="/signup" className={styles.switchLink}>
          Create Free Account
        </Link>
      </div>
    </div>
  );
}
