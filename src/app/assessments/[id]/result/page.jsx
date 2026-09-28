import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAssessmentById } from "@/lib/adminService";
import { assessmentsList } from "@/data/assessmentsData";
import AssessmentResult from "@/components/assessments/AssessmentResult/AssessmentResult";

export const dynamic = "auto";
export const revalidate = 300;

export async function generateStaticParams() {
  return assessmentsList.map((a) => ({
    id: a.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const assessment = await getAssessmentById(id);

  if (!assessment) {
    return {
      title: "Scorecard Not Found | Campussutras",
    };
  }

  return {
    title: `Scorecard: ${assessment.title} | Campussutras`,
    description: `Detailed assessment scorecard and solutions for ${assessment.title} on Campussutras.`,
  };
}

export default async function AssessmentResultPage({ params }) {
  const { id } = await params;
  const assessment = await getAssessmentById(id);

  if (!assessment) {
    notFound();
  }

  return (
    <Suspense fallback={<div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading scorecard...</div>}>
      <AssessmentResult assessment={assessment} />
    </Suspense>
  );
}
