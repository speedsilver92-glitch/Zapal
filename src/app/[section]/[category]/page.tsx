import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categorySlugs, getContent } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";
import { MaterialCategoryPage } from "@/components/material-category-page";

type Props = { params: Promise<{ section: string; category: string }> };

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ section: "materials", category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = getContent(defaultLocale).materialCategories.find((item) => item.slug === category);
  return { title: item?.title || "Page not found", description: item?.description };
}

export default async function MaterialCategoryRoute({ params }: Props) {
  const { section, category } = await params;
  if (section !== "materials" || !categorySlugs.includes(category)) notFound();
  return <MaterialCategoryPage slug={category} />;
}
