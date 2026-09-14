"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Antenna, Cable, Camera, Cpu, Factory, Network, Truck, Waypoints, Wrench } from "lucide-react";
import { PageHero } from "./page-hero";
import { CtaBanner, SectionLabel } from "./ui";
import { Faq } from "./faq";
import { useLanguage } from "./language-provider";

export function PartnersPage() {
  const { t } = useLanguage();
  const p = t.partners;
  const s = p.story;
  const icons = [Factory, Network, Truck];
  const segmentIcons = [Waypoints, Cable, Camera, Antenna, Cpu, Wrench];
  return <main id="main-content"><PageHero title={p.title} description={p.description} eyebrow={p.eyebrow} image="/images/port-aerial.jpg" imageAlt="Connected shipping lanes and container terminals at an international port" breadcrumb={p.breadcrumb} compact />

    {/* Partner story intro */}
    <section className="section"><div className="container partner-story">
      <div className="partner-story-head"><SectionLabel>{s.eyebrow}</SectionLabel><h2>{s.headline}</h2></div>
      <div className="partner-story-intro">{s.intro.map((paragraph, index) => <p key={index} className={index === 0 ? "partner-story-emph" : undefined}>{paragraph}</p>)}</div>
    </div></section>

    {/* Technology network segments */}
    <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{s.networkTitle}</SectionLabel><h2 className="preserve-lines">{s.networkTitle}</h2></div><p className="section-heading-note">{s.networkIntro}</p></div>
      <div className="segment-grid">{s.segments.map((segment, index) => { const Icon = segmentIcons[index]; return <article className="segment-card" key={segment.title}><span className="segment-icon"><Icon size={22} strokeWidth={1.6} /></span><h3>{segment.title}</h3><p>{segment.text}</p></article>; })}</div>
    </div></section>

    {/* More than a supplier list */}
    <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{s.moreTitle}</SectionLabel><h2 className="preserve-lines">{s.moreTitle}</h2></div><div className="intro-description">{s.moreParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></div></section>

    {/* Featured partner brands */}
    <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{s.featuredTitle}</SectionLabel><h2>{s.featuredTitle}</h2></div><p className="section-heading-note">{s.featuredNote}</p></div>
      <div className="partner-logos">
        {[
          { name: "DJI", logo: "/partners/dji.svg", href: undefined },
          { name: "ZTO Cable", logo: "/partners/zto-cable.svg", href: "https://ztockable.com" },
          { name: "ZTT", logo: "/partners/ztt.svg", href: "https://zttgroup.com" },
          { name: "YICHOU", logo: "/partners/yichou.svg", href: "https://nbyichou.com" },
          { name: "MONEYPRO", logo: "/partners/moneypro.svg", href: "https://www.moneyprouav.com/" },
        ].map((partner) => {
          const inner = (<>
            <span className="partner-logo-media"><Image src={partner.logo} alt={partner.name} width={200} height={110} /></span>
            <figcaption className="partner-logo-name">{partner.name}</figcaption>
          </>);
          return partner.href
            ? <a className="partner-logo-card" href={partner.href} target="_blank" rel="noopener noreferrer" key={partner.name}>{inner}</a>
            : <figure className="partner-logo-card" key={partner.name}>{inner}</figure>;
        })}
      </div>
    </div></section>

    {/* Closing statement */}
    <section className="partner-closing"><div className="container partner-closing-inner"><Network className="partner-closing-glow" size={300} strokeWidth={0.6} aria-hidden="true" /><div><SectionLabel light>{s.closingTitle}</SectionLabel><p className="partner-closing-lead">{s.closingLead}</p><p className="partner-closing-strong">{s.closingStrong}</p></div><Link href="/contacts?service=Partnership%20opportunity" className="button button-white">{p.becomePartner}<ArrowUpRight size={18} /></Link></div></section>

    {/* Disciplines / values */}
    <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{p.networkEyebrow}</SectionLabel><h2 className="preserve-lines">{p.networkTitle}</h2></div><p className="section-heading-note preserve-lines">{p.networkNote}</p></div><div className="capability-grid partner-cards">{p.sectors.map((sector, index) => { const Icon = icons[index]; return <article className="capability-card" key={sector.title}><Icon size={37} strokeWidth={1.25} /><h3>{sector.title}</h3><p>{sector.text}</p><div className="sector-tags">{sector.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>; })}</div></div></section>
    <section className="service-approach"><div className="container service-approach-inner"><div><SectionLabel light>{p.approachEyebrow}</SectionLabel><h2 className="preserve-lines">{p.approachTitle}</h2></div><div><p>{p.approachBody}</p><Link href="/contacts?service=Partnership%20opportunity" className="button button-white">{p.becomePartner}<ArrowUpRight size={18} /></Link></div></div></section>
    <section className="section"><div className="container faq-grid"><div><SectionLabel>{p.faqEyebrow}</SectionLabel><h2 className="preserve-lines">{p.faqTitle}</h2></div><Faq items={p.faqs.map((faq) => ({ ...faq }))} /></div></section><CtaBanner title={t.cta.partnersTitle} /></main>;
}
