"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import AssessmentEditor from "@/components/admin/AssessmentEditor/AssessmentEditor";
import { getAssessmentById } from "@/lib/adminService";

export default function EditAssessmentPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const found = await getAssessmentById(id);
        if (found) {
          setAssessment(found);
        }
      } catch (err) {
        console.warn("[EditAssessmentPage] fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#64748b" }}>
        <span>Loading assessment data...</span>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.25rem", color: "#091e42", marginBottom: "0.5rem" }}>Assessment Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>The requested assessment could not be located in the studio catalog.</p>
        <Link href="/admin/assessments" className="btn btn-secondary">
          Return to Assessment Studio
        </Link>
      </div>
    );
  }

  return <AssessmentEditor initialAssessment={assessment} isNew={false} />;
}
