import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 🎯 استفاده از متغیر صحیح همراه با Fallback برای جلوگیری از ۴۰۴ در لوکال
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://course-shop-api.onrender.com";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`, // 👈 پروکسی به سرور رندر دات کام
      },
    ];
  },
};

export default withNextIntl(nextConfig);
