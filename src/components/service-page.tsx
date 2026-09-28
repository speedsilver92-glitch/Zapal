"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Layers3, Network, Plane, Route, Ship, Truck } from "lucide-react";
import { PageHero } from "./page-hero";
import { CtaBanner, SectionLabel } from "./ui";
import { MaterialCards } from "./service-cards";
import { Faq } from "./faq";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";

export function ServicePage({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { services } = useContent();
  const service = services.find((item) => item.slug === slug) ?? services[0];
  const icons = [Compass, Layers3, Network];
  const modeIcons = [Ship, Plane, Truck, Route];
  const ls = t.logisticsStory;
  const sc = t.supplyChainStory;
  const ms = t.materialsStory;
  return <main id="main-content"><PageHero title={service.title} description={service.description} image={service.image} imageAlt={service.imageAlt} eyebrow={service.eyebrow} breadcrumb={service.shortTitle} service={service.shortTitle} />
    <div className="service-highlights"><div className="container">{service.highlights.map(item => <span key={item}><Check size={17} />{item}</span>)}</div></div>
    <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{service.tagline}</SectionLabel><h2 className="preserve-lines">{service.introTitle}</h2></div><p className="intro-description">{service.intro}</p></div><div className="capability-grid">{service.capabilities.map((item, index) => { const Icon = icons[index]; return <article className="capability-card" key={item.title}><div className="capability-top"><Icon size={29} strokeWidth={1.4} /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></div></section>

    {service.slug === "materials" && <>
      <section className="section soft-section"><div className="container logistics-story">
        <div className="logistics-story-head"><SectionLabel>{ms.eyebrow}</SectionLabel><h2>{ms.headline}</h2></div>
        <div className="logistics-story-intro">{ms.intro.map((paragraph, index) => <p key={index} className={index === ms.intro.length - 1 ? "logistics-story-emph" : undefined}>{paragraph}</p>)}</div>
      </div></section>

      <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{ms.accessTitle}</SectionLabel><h2 className="preserve-lines">{ms.accessTitle}</h2></div><div className="intro-description">{ms.accessParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></div></section>

      <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{t.service.threeCategoriesEyebrow}</SectionLabel><h2 className="preserve-lines">{t.service.threeCategoriesTitle}</h2></div><p className="section-heading-note preserve-lines">{t.service.threeCategoriesNote}</p></div><MaterialCards /></div></section>

      <section className="section"><div className="container"><div className="section-heading"><div><SectionLabel>{ms.categoriesTitle}</SectionLabel><h2>{ms.categoriesTitle}</h2></div><p className="section-heading-note">{ms.categoriesIntro}</p></div>
        <div className="segment-grid">{ms.categories.map((category) => <article className="segment-card" key={category.title}><h3>{category.title}</h3><p>{category.text}</p></article>)}</div>
      </div></section>

      <section className="section soft-section"><div className="container about-approach"><div className="about-approach-head"><SectionLabel>{ms.projectTitle}</SectionLabel><p className="about-approach-lead">{ms.projectLead}</p><p className="about-approach-intro">{ms.projectIntro}</p></div><ol className="supply-flow">{ms.projectFlow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < ms.projectFlow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol><p className="about-approach-result">{ms.projectResult}</p></div></section>

      <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{ms.closingTitle}</SectionLabel><h2 className="preserve-lines">{ms.closingTitle}</h2></div><div className="intro-description">{ms.closingParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="logistics-flow-strong">{ms.closingStrong}</p></div></div></div></section>
    </>}

    {service.slug === "supply-chain" && <>
      <section className="section soft-section"><div className="container logistics-story">
        <div className="logistics-story-head"><SectionLabel>{sc.eyebrow}</SectionLabel><h2>{sc.headline}</h2></div>
        <div className="logistics-story-intro">{sc.intro.map((paragraph, index) => <p key={index} className={index === sc.intro.length - 1 ? "logistics-story-emph" : undefined}>{paragraph}</p>)}</div>
      </div></section>

      <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{sc.planningTitle}</SectionLabel><p className="about-approach-lead">{sc.planningLead}</p><p className="about-approach-intro">{sc.planningIntro}</p></div><ul className="scm-checklist">{sc.planningItems.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><p className="about-approach-result">{sc.planningResult}</p></div></section>

      <section className="section soft-section"><div className="container"><div className="logistics-blocks">{sc.sections.map((section) => <article className="logistics-block" key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>)}</div></div></section>

      <section className="section"><div className="container about-approach"><div className="about-approach-head"><SectionLabel>{sc.procurementTitle}</SectionLabel>{sc.procurementParagraphs.map((paragraph, index) => <p key={index} className={index === 0 ? "about-approach-lead" : "about-approach-intro"}>{paragraph}</p>)}</div><ol className="supply-flow">{sc.procurementFlow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < sc.procurementFlow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol><p className="about-approach-result">{sc.procurementResult}</p></div></section>

      <section className="section soft-section"><div className="container"><div className="logistics-blocks">
        <article className="logistics-block"><h3>{sc.consultingTitle}</h3>{sc.consultingParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
        <article className="logistics-block"><h3>{sc.executionTitle}</h3>{sc.executionParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
      </div>
        <ol className="supply-flow scm-execution-flow">{sc.executionFlow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < sc.executionFlow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol>
        <p className="logistics-flow-strong">{sc.executionStrong}</p>
      </div></section>
    </>}

    {service.slug === "logistics" && <>
      <section className="section soft-section"><div className="container logistics-story">
        <div className="logistics-story-head"><SectionLabel>{ls.eyebrow}</SectionLabel><h2>{ls.headline}</h2></div>
        <div className="logistics-story-intro">{ls.intro.map((paragraph, index) => <p key={index} className={index === ls.intro.length - 1 ? "logistics-story-emph" : undefined}>{paragraph}</p>)}</div>
      </div></section>

      <section className="section"><div className="container"><div className="section-heading"><div><SectionLabel>{ls.modesTitle}</SectionLabel><h2>{ls.modesTitle}</h2></div><p className="section-heading-note">{ls.modesIntro}</p></div>
        <div className="segment-grid logistics-modes">{ls.modes.map((mode, index) => { const Icon = modeIcons[index]; return <article className="segment-card" key={mode.title}><span className="segment-icon"><Icon size={22} strokeWidth={1.6} /></span><h3>{mode.title}</h3><p>{mode.text}</p></article>; })}</div>
      </div></section>

      <section className="section soft-section"><div className="container"><div className="logistics-blocks">{ls.sections.map((section) => <article className="logistics-block" key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>)}</div></div></section>

      <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{ls.corridorTitle}</SectionLabel><h2 className="preserve-lines">{ls.corridorTitle}</h2></div><div className="intro-description">{ls.corridorParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></div></section>

      <section className="section soft-section"><div className="container about-approach">
        <div className="about-approach-head"><SectionLabel>{ls.flowTitle}</SectionLabel><p className="about-approach-lead">{ls.flowLead}</p></div>
        <ol className="supply-flow">{ls.flow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < ls.flow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol>
        <p className="about-approach-result">{ls.flowResult}</p>
        <p className="logistics-flow-strong">{ls.flowStrong}</p>
      </div></section>
    </>}

    <section className="service-approach"><div className="container service-approach-inner"><div><SectionLabel light>{t.service.approachEyebrow}</SectionLabel><h2 className="preserve-lines">{t.service.approachTitle}</h2></div><div><p>{t.service.approachBody}</p><Link href={`/contacts?service=${encodeURIComponent(service.shortTitle)}`} className="button button-white">{t.common.startEnquiry}<ArrowUpRight size={18} /></Link></div></div></section>
    <section className="section"><div className="container faq-grid"><div><SectionLabel>{t.service.faqEyebrow}</SectionLabel><h2 className="preserve-lines">{t.service.faqTitle}</h2><p>{t.service.faqSomethingElse}</p><Link className="text-link" href={`/contacts?service=${encodeURIComponent(service.shortTitle)}`}>{t.service.faqTalk}<ArrowRight size={17} /></Link></div><Faq items={service.faqs} /></div></section>
    <section className="related-section"><div className="container"><SectionLabel>{t.service.relatedEyebrow}</SectionLabel><div className="related-links">{services.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} href={`/${item.slug}`}><span>{item.number}</span><h3>{item.shortTitle}</h3><ArrowUpRight size={24} /></Link>)}</div></div></section><CtaBanner /></main>;
}
