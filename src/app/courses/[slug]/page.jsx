import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourseSlugs, allCourses } from "@/data/courses";
import { 
  CourseDetailHero, 
  CourseOutcomes, 
  CourseCurriculum, 
  CourseProjects, 
  CourseSidebar, 
  CourseDetailFaq 
} from "@/components/courses/CourseDetail";
import { CtaBanner } from "@/components/home";
import styles from "./CoursePage.module.css";

// Generate Static Paths for all 12 Bootcamps
export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams?.slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested technical bootcamp could not be found.",
    };
  }

  const durationText = course.duration ? ` (${course.duration})` : "";
  const pageTitle = `${course.title}${durationText} — Industry Career Bootcamp`;
  const pageDesc = course.tagline 
    ? `${course.tagline} ${course.shortDescription}`
    : course.shortDescription;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: `${course.title}, ${course.skills?.join(", ")}, campussutras, practical tech training, verified credentials, industry bootcamp india`,
    alternates: {
      canonical: `/courses/${course.slug}`,
    },
    openGraph: {
      title: `${course.title} | Campussutras`,
      description: course.shortDescription,
      url: `https://campussutras.com/courses/${course.slug}`,
      siteName: "Campussutras",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: course.image || "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Campussutras`,
      description: course.shortDescription,
      images: [course.image || "/opengraph-image.png"],
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: "Campussutras Private Limited",
      sameAs: BASE_URL,
    },
    educationalCredentialAwarded: "Industry-Recognized Verified Credential",
    timeToComplete: course.duration ? `P${course.duration.replace(/\D/g, "")}D` : "P90D",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      courseWorkload: course.duration || "90 Days",
      inLanguage: "en-IN",
    },
    offers: {
      "@type": "Offer",
      category: "Educational",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${BASE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `${BASE_URL}/courses/${course.slug}`,
      },
    ],
  };

  const courseFaqSchema =
    course.courseFaqs && course.courseFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: course.courseFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className={styles.coursePageWrapper}>
      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      {courseFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseFaqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* 1. Header & Hero Value Proposition */}
      <CourseDetailHero course={course} />

      {/* 2. Main 2-Column Content Layout */}
      <div className={`container ${styles.layoutContainer}`}>
        <div className={styles.contentGrid}>
          {/* Left Main Column: Syllabus, Projects, Outcomes & FAQs */}
          <main className={styles.mainCol}>
            {/* Overview, Highlights, Outcomes & Tools */}
            <CourseOutcomes course={course} />

            {/* 4-Milestone Interactive Curriculum Breakdown */}
            <CourseCurriculum 
              curriculum={course.curriculum} 
              courseTitle={course.title} 
            />

            {/* Portfolio-Ready Capstone Projects */}
            <CourseProjects 
              projects={course.projects} 
              courseTitle={course.title} 
            />

            {/* Frequently Asked Questions */}
            <CourseDetailFaq 
              faqs={course.courseFaqs} 
              courseTitle={course.title} 
            />
          </main>

          {/* Right Column: Sticky Registration & Counseling Desk */}
          <div className={styles.sidebarCol}>
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>

      {/* 3. Global Bottom Enrollment CTA Banner */}
      <CtaBanner />
    </div>
  );
}
