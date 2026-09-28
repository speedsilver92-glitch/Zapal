"use client";

import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { SectionLabel } from "./ui";
import { useLanguage } from "./language-provider";

export function NotFoundView() {
  const { t } = useLanguage();
  const n = t.notFound;
  return <main id="main-content" className="not-found-page"><div className="container"><span className="not-found-number">404<MoveUpRight size={80} strokeWidth={1} /></span><SectionLabel>{n.eyebrow}</SectionLabel><h1 className="preserve-lines">{n.title}</h1><p>{n.body}</p><Link href="/" className="button button-blue">{n.backHome}<ArrowRight size={18} /></Link><Link href="/contacts" className="text-link">{n.contactTeam}<ArrowRight size={17} /></Link></div></main>;
}
