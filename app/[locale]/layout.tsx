import type { Metadata } from "next";
import { Pixelify_Sans, Manrope } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "../_components/partials/Header";
import Footer from "../_components/partials/Footer";
import SmoothScroll from "../_components/SmoothScroll";
import LoadingScreen from "../_components/LoadingScreen";
import { LoadingProvider } from "../_components/LoadingContext";
import Analytics from "../_components/Analytics";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  display: "swap", // Show system font while loading
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap", // Show system font while loading
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://sbxonestudio.com";
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
      },
    },
    keywords: [
      "SBX One Studio",
      "SBXOne",
      "UI/UX Design Studio Bali",
      "Web App Development Indonesia",
      "Website Modernization",
      "Next.js Development Agency",
      "Gen-Z Digital Agency",
      "High-Performance Websites",
      "studio website bali",
      "moderenisasi website",
      "buat website profesional",
      "layanan website",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      type: "website",
      locale: locale,
      siteName: t("title"),
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    verification: {
      google: "google-site-verification-id", // Ganti dengan ID asli nanti
    },
    // DNS Preconnect for faster resource loading
    other: {
      "dns-prefetch": "https://www.googletagmanager.com",
    },
  };
}

export const viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility but maintain stability
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${pixelifySans.variable} ${manrope.variable} antialiased ${pixelifySans.className} ${manrope.className}`}
      >
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <LoadingProvider>
            <SmoothScroll />
            <LoadingScreen />
            <Header />
            <main className="relative overflow-x-clip">{children}</main>
            <Footer />
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
