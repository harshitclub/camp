import { Suspense } from "react";
import { SignupForm } from "@/components/auth";

export const metadata = {
  title: "Create Student Account | Campussutras",
  description: "Join Campussutras to access practical bootcamps, project-based internships, and assessments.",
};

export default function SignupPage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 140px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3.5rem 1.25rem",
      backgroundColor: "var(--bg-page)",
      background: "radial-gradient(circle at 50% 10%, rgba(11, 87, 208, 0.08) 0%, transparent 60%)",
    }}>
      <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Loading signup form...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
