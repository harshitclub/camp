import AssessmentEditor from "@/components/admin/AssessmentEditor/AssessmentEditor";

export const metadata = {
  title: "Create Technical Assessment | Admin Studio",
  description: "Design custom technical evaluations with dynamic question counts, timed limits, and engineering explanations.",
};

export default function NewAssessmentPage() {
  return <AssessmentEditor isNew={true} />;
}
