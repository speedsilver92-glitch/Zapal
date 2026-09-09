import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import type { ReactNode } from "react";

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow section-label${light ? " light" : ""}`}><span />{children}</p>;
}

export function TextLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return <Link href={href} className={`text-link${light ? " light" : ""}`}>{children}<ArrowRight size={17} /></Link>;
}

export function CtaBanner({ title = "Let’s move your business forward.", description = "Tell us where you want to go. We’ll help connect the dots." }: { title?: string; description?: string }) {
  return <section className="cta-section"><div className="container"><div className="cta-banner"><Globe2 className="cta-globe" size={330} strokeWidth={0.6} aria-hidden="true" /><div><SectionLabel light>THE NEXT CONNECTION STARTS HERE</SectionLabel><h2>{title}</h2><p>{description}</p></div><Link href="/contacts" className="button button-white">Start a conversation<ArrowUpRight size={20} /></Link></div></div></section>;
}
