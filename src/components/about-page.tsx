"use client";

import Image from "next/image";
import { ArrowRight, Globe2, Handshake, ShieldCheck } from "lucide-react";
import { PageHero } from "./page-hero";
import { CtaBanner, SectionLabel, TextLink } from "./ui";
import { useLanguage } from "./language-provider";

export function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;
  const s = a.story;
  const icons = [ShieldCheck, Globe2, Handshake];
  return <main id="main-content"><PageHero title={a.title} description={a.description} eyebrow={a.eyebrow} image="/images/team.jpg" imageAlt="Business professionals sharing ideas and planning a project" breadcrumb={a.breadcrumb} compact />

    {/* Company story */}
    <section className="section"><div className="container about-story">
      <div className="about-story-head"><SectionLabel>{s.eyebrow}</SectionLabel><h2>{s.headline}</h2></div>
      <div className="about-story-intro">{s.intro.map((paragraph, index) => <p key={index} className={index === s.intro.length - 1 ? "about-story-emph" : undefined}>{paragraph}</p>)}</div>
      <div className="about-story-sections">{s.sections.map((section) => <article key={section.title} className="about-story-block"><h3>{section.title}</h3>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>)}</div>
    </div></section>

    {/* Our approach — supply chain flow */}
    <section className="section soft-section"><div className="container about-approach">
      <div className="about-approach-head"><SectionLabel>{s.approachTitle}</SectionLabel><p className="about-approach-lead">{s.approachLead}</p><p className="about-approach-intro">{s.approachIntro}</p></div>
      <ol className="supply-flow">{s.flow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < s.flow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol>
      <p className="about-approach-result">{s.approachResult}</p>
    </div></section>

    {/* Our strength */}
    <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{s.strengthTitle}</SectionLabel><h2 className="preserve-lines">{a.partnerTitle}</h2></div><div className="intro-description">{s.strengthParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div><div className="capability-grid">{a.cards.map((card, index) => { const Icon = icons[index]; return <article className="capability-card" key={card.title}><div className="capability-top"><Icon size={30} strokeWidth={1.4} /><span>0{index + 1}</span></div><h3>{card.title}</h3><p>{card.text}</p></article>; })}</div></div></section>

    <section className="section soft-section"><div className="container about-grid"><div className="about-image city-image"><Image src="/images/bratislava.jpg" alt="Modern Bratislava skyline overlooking the Danube River in Slovakia" fill sizes="(max-width: 800px) 100vw, 48vw" /><div className="about-image-tag"><Globe2 size={36} strokeWidth={1.2} /><span>{a.cityTag}<br /><strong>{a.cityTagStrong}</strong></span></div></div><div className="about-copy"><SectionLabel>{a.cityEyebrow}</SectionLabel><h2 className="preserve-lines">{a.cityTitle}</h2><p className="about-lead">{a.cityLead}</p><p>{a.cityBody}</p><TextLink href="/contacts">{a.findUs}</TextLink></div></div></section>
    <CtaBanner title={t.cta.aboutTitle} /></main>;
}
