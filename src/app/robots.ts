import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main crawlers — full access to public pages
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/static/"],
      },
      // Googlebot — explicitly allow key pages and assets
      {
        userAgent: "Googlebot",
        allow: ["/", "/fleet", "/fleet/", "/training", "/inquiries", "/becomepilot", "/*.png$", "/*.jpg$", "/*.webp$"],
        disallow: ["/admin/", "/api/"],
      },
      // Googlebot-Image — allow all images for Google Images SEO
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // AI crawlers — allow for GEO (Generative Engine Optimization)
      {
        userAgent: "GPTBot",
        allow: ["/", "/fleet", "/training", "/inquiries", "/becomepilot", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/fleet", "/training", "/inquiries", "/becomepilot", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/fleet", "/training", "/inquiries", "/becomepilot", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/fleet", "/training", "/inquiries", "/becomepilot", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/fleet", "/training", "/inquiries", "/becomepilot", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
