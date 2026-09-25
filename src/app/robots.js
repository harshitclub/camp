const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/",
          "/profile",
          "/profile/",
          "/reset-password",
          "/forgot-password",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
