import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { readFleet } from "@/lib/admin/dal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fleet = await readFleet();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/fleet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/inquiries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const fleetPages: MetadataRoute.Sitemap = fleet.map((plane) => ({
    url: `${SITE_URL}/fleet/${plane.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...fleetPages];
}
