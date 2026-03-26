import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Aktifkan Gzip & Brotli compression untuk memperkecil size payload javascript & HTML
  compress: true,
  // Caching Header Super Agresif
  async headers() {
    return [
      {
        // Beri tahu browser untuk menyimpan cache aset SVG, WEBP, PNG selama 1 Tahun!
        source: "/(.*\\.(svg|webp|png|jpg|jpeg|gif))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache Font (woff, woff2)
        source: "/(.*\\.(woff|woff2|ttf|otf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache JS / CSS 
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
