import { SEO_CONFIG } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",

          "/admin",
          "/fa/admin",
          "/en/admin",
          "/admin-login",
          "/fa/admin-login",
          "/en/admin-login",

          "/dashboard",
          "/fa/dashboard",
          "/en/dashboard",

          "/cart",
          "/fa/cart",
          "/en/cart",

          "/payment/",
          "/fa/payment/",
          "/en/payment/",
          "/orders/",
          "/fa/orders/",
          "/en/orders/",

          "/login",
          "/fa/login",
          "/en/login",
          "/register",
          "/fa/register",
          "/en/register",
          "/forgot-password",
          "/fa/forgot-password",
          "/en/forgot-password",
          "/verify-email",
          "/fa/verify-email",
          "/en/verify-email",
        ],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
