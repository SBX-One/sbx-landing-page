import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sbxonestudio.com";
  // Ensure the URL starts with https://
  const baseUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
