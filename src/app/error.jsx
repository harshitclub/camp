"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log application errors to monitoring service if configured
    console.error("[Application Boundary Error]:", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      backgroundColor: "var(--bg-page)",
      textAlign: "center",
    }}>
      <div style={{
        maxWidth: "520px",
        background: "#ffffff",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem 2rem",
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#fee2e2",
          color: "#dc2626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <AlertTriangle size={28} />
        </div>

        <h2 style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          color: "var(--text-heading)",
          marginBottom: "0.75rem",
        }}>
          Something went wrong
        </h2>

        <p style={{
          fontSize: "0.95rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}>
          We encountered an unexpected error while rendering this page. You can try refreshing the component or return to the homepage.
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RotateCcw size={16} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="btn btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Home size={16} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
