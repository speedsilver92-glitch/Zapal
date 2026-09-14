"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SectionLabel } from "./ui";
import { useLanguage } from "./language-provider";

export function PageHero({ title, description, image, imageAlt, eyebrow, breadcrumb, compact = false, service }: { title: string; description: string; image: string; imageAlt: string; eyebrow: string; breadcrumb: string; compact?: boolean; service?: string }) {
  const { t } = useLanguage();
  return <section className={`page-hero${compact ? " compact" : ""}`}><Image src={image} alt={imageAlt} fill priority sizes="100vw" quality={85} /><div className="page-hero-shade" /><div className="container page-hero-inner"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">{t.common.home}</Link><ChevronRight size={12} /><span aria-current="page">{breadcrumb}</span></nav><div className="page-hero-panel"><SectionLabel light>{eyebrow}</SectionLabel><h1>{title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{description}</p>{service && <Link href={`/contacts?service=${encodeURIComponent(service)}`} className="button button-white">{t.common.discussRequirements}<ArrowUpRight size={18} /></Link>}</div></div></section>;
}
