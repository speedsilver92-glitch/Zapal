import type { MetadataRoute } from "next";
import { materialCategories, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.SITE_URL || "https://www.zapal.sk").replace(/\/$/, "");
  const paths = ["", ...services.map(service => `/${service.slug}`), ...materialCategories.map(category => `/materials/${category.slug}`), "/about", "/partners", "/contacts", "/privacy"];
  return paths.map(path => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8 }));
}
