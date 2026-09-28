import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { categorySlugs, getContent } from "@/lib/content";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n";
import { MaterialCategoryPage } from "@/components/material-category-page";

type Props = { params: Promise<{ section: string; category: string }> };
export function generateStaticParams() { return categorySlugs.map(slug => ({ section: "materials", category: slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const item = getContent(locale).materialCategories.find(item => item.slug === category);
  return { title: item?.title || "Page not found", description: item?.description };
}

export default async function MaterialCategoryRoute({ params }: Props) {
  const { section, category } = await params;
  if (section !== "materials" || !categorySlugs.includes(category)) notFound();
  return <MaterialCategoryPage slug={category} />;
}
