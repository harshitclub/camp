import { Suspense } from "react";
import { LoginForm } from "@/components/auth";

export const metadata = {
  title: "Sign In | Campussutras",
  description: "Sign in to your Campussutras portal to access your assessments, courses, and profile.",
};

export default function LoginPage() {
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
      <Suspense fallback={<div>Loading login portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
