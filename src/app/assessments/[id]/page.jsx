import { notFound } from "next/navigation";
import { getAssessmentById } from "@/lib/adminService";
import { assessmentsList } from "@/data/assessmentsData";
import AssessmentRunner from "@/components/assessments/AssessmentRunner/AssessmentRunner";

export const dynamic = "force-dynamic";

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
      title: "Assessment Not Found",
      description: "The requested skill assessment could not be found.",
    };
  }

  const title = `${assessment.title} — Free Online Skill Test`;
  const description = assessment.description || `Take the 15-question ${assessment.title} test on Campussutras. Get an instant score, detailed solution breakdown, and topic-wise accuracy analysis.`;

  return {
    title,
    description,
    keywords: `${assessment.title}, online test, skill evaluation, campussutras assessment, practice test`,
    alternates: {
      canonical: `/assessments/${id}`,
    },
    openGraph: {
      title: `${assessment.title} | Campussutras`,
      description,
      url: `https://campussutras.com/assessments/${id}`,
      siteName: "Campussutras",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${assessment.title} | Campussutras`,
      description,
    },
  };
}

export default async function AssessmentTakePage({ params }) {
  const { id } = await params;
  const assessment = await getAssessmentById(id);

  if (!assessment) {
    notFound();
  }

  return <AssessmentRunner assessment={assessment} />;
}
