import { allCourses } from "@/data/courses";
import { assessmentsList } from "@/data/assessmentsData";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

export default function sitemap() {
  const staticPages = [
    { route: "", priority: 1.0, changeFreq: "daily" },
    { route: "/courses", priority: 0.95, changeFreq: "weekly" },
    { route: "/assessments", priority: 0.95, changeFreq: "weekly" },
    { route: "/verify-certificate", priority: 0.90, changeFreq: "monthly" },
    { route: "/internship", priority: 0.85, changeFreq: "weekly" },
    { route: "/hire", priority: 0.85, changeFreq: "monthly" },
    { route: "/about", priority: 0.80, changeFreq: "monthly" },
    { route: "/events", priority: 0.80, changeFreq: "weekly" },
    { route: "/contact", priority: 0.75, changeFreq: "monthly" },
    { route: "/privacy-and-policy", priority: 0.30, changeFreq: "yearly" },
    { route: "/terms-and-conditions", priority: 0.30, changeFreq: "yearly" },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changeFreq,
    priority,
  }));

  const coursePages = (allCourses || []).map((course) => ({
    url: `${BASE_URL}/courses/${course.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.90,
  }));

  const assessmentPages = (assessmentsList || []).map((test) => ({
    url: `${BASE_URL}/assessments/${test.slug || test.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.80,
  }));

  return [...staticPages, ...coursePages, ...assessmentPages];
}
