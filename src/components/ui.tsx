"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "./language-provider";

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow section-label${light ? " light" : ""}`}><span />{children}</p>;
}

export function TextLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return <Link href={href} className={`text-link${light ? " light" : ""}`}>{children}<ArrowRight size={17} /></Link>;
}

export function CtaBanner({ title, description }: { title?: string; description?: string }) {
  const { t } = useLanguage();
  return <section className="cta-section"><div className="container"><div className="cta-banner"><Globe2 className="cta-globe" size={330} strokeWidth={0.6} aria-hidden="true" /><div><SectionLabel light>{t.cta.eyebrow}</SectionLabel><h2>{title ?? t.cta.title}</h2><p>{description ?? t.cta.description}</p></div><Link href="/contacts" className="button button-white">{t.common.startConversation}<ArrowUpRight size={20} /></Link></div></div></section>;
}
