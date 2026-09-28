"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "./brand";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";

type Props = { address: string; email: string; phone: string; directionsUrl: string; registration: string };

export function SiteFooterView({ address, email, phone, directionsUrl, registration }: Props) {
  const { t } = useLanguage();
  const { services } = useContent();
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand inverse /><p>{t.footer.tagline.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p><span className="footer-origin"><span className="slovakia-flag" />{t.footer.origin}</span></div><div className="footer-links"><h2>{t.footer.expertise}</h2><Link href="/materials">{services[0].shortTitle}</Link><Link href="/supply-chain">{services[1].shortTitle}</Link><Link href="/logistics">{services[2].shortTitle}</Link></div><div className="footer-links"><h2>{t.footer.company}</h2><Link href="/about">{t.nav.about}</Link><Link href="/partners">{t.nav.partners}</Link><Link href="/contacts">{t.nav.contacts}</Link></div><div className="footer-contact"><h2>{t.footer.connect}</h2><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="footer-address"><MapPin size={17} /><span>{address}</span><ArrowUpRight size={14} /></a>{email ? <a className="footer-email" href={`mailto:${email}`}>{email}<ArrowRight size={15} /></a> : <Link className="footer-email" href="/contacts">{t.footer.sendEnquiry}<ArrowRight size={15} /></Link>}{phone && <a className="footer-phone" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Zapal SK s. r. o. {t.footer.rights}</span><div><span>IČO {registration}</span><Link href="/privacy">{t.footer.privacy}</Link><a href="/sitemap.xml">{t.footer.sitemap}<ArrowUpRight size={12} /></a></div></div></div></footer>;
}
