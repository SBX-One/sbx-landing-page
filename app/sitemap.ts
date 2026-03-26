import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sbxonestudio.com";
  // Ensure the URL starts with https://
  const baseUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
  const locales = routing.locales;

  // Since we only have one page (home page) for now, we just list the home page for each locale.
  // We include both /id and /en since next-intl uses locale prefixes.
  const sitemapEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  return sitemapEntries;
}
