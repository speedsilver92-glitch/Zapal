import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, serviceSlugs } from "@/lib/content";
import { getDictionary, defaultLocale } from "@/lib/i18n";
import { ServicePage } from "@/components/service-page";
import { AboutPage } from "@/components/about-page";
import { PartnersPage } from "@/components/partners-page";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return [...serviceSlugs.map((slug) => ({ section: slug })), { section: "about" }, { section: "partners" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const t = getDictionary(defaultLocale);
  const service = getContent(defaultLocale).services.find((item) => item.slug === section);
  return {
    title: service?.shortTitle || (section === "about" ? t.about.breadcrumb : section === "partners" ? t.partners.breadcrumb : "Page not found"),
    description: service?.description || t.about.description,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (serviceSlugs.includes(section)) return <ServicePage slug={section} />;
  if (section === "about") return <AboutPage />;
  if (section === "partners") return <PartnersPage />;
  notFound();
}
