import type { MetadataRoute } from "next";
import { ROUTE_MAP } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neza.co.mz";
  const ptUrls = Object.values(ROUTE_MAP.pt);
  const enUrls = Object.values(ROUTE_MAP.en);

  return [...ptUrls, ...enUrls].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/pt" || path === "/en" ? 1.0 : 0.8,
  }));
}

