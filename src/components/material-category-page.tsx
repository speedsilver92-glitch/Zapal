"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "./page-hero";
import { MaterialCards } from "./service-cards";
import { CtaBanner, SectionLabel } from "./ui";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";
import { getMaterialCategoryStory } from "@/lib/i18n";

export function MaterialCategoryPage({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const { materialCategories } = useContent();
  const item = materialCategories.find((category) => category.slug === slug) ?? materialCategories[0];
  const m = t.materialsCat;
  const story = getMaterialCategoryStory(locale, slug);
  return <main id="main-content"><PageHero title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} eyebrow={t.service.cardEyebrow} breadcrumb={`${t.nav.materials} / ${item.shortTitle}`} service={item.shortTitle} />
    <section className="section"><div className="container"><Link href="/materials" className="text-link back-link"><ArrowLeft size={16} />{m.allMaterials}</Link><div className="material-detail-grid"><div><SectionLabel>{m.specEyebrow}</SectionLabel><h2 className="preserve-lines">{m.specTitle}</h2><p>{m.specBody1}</p><p>{m.specBody2}</p><Link href={`/contacts?service=${encodeURIComponent(item.shortTitle)}`} className="button button-blue">{m.requestProposal}<ArrowUpRight size={18} /></Link></div><div className="material-offering"><h3>{m.offeringTitle}</h3>{item.items.map((text, index) => <div key={text}><span className="offering-number">0{index + 1}</span><span>{text}</span><Check size={18} /></div>)}<p>{m.offeringNote}</p></div></div></div></section>

    {story && <>
      <section className="section soft-section"><div className="container logistics-story">
        <div className="logistics-story-head"><SectionLabel>{story.eyebrow}</SectionLabel><h2>{story.headline}</h2></div>
        <div className="logistics-story-intro">{story.intro.map((paragraph, index) => <p key={index} className={index === story.intro.length - 1 ? "logistics-story-emph" : undefined}>{paragraph}</p>)}</div>
      </div></section>

      {story.accessTitle && story.accessParagraphs && <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{story.accessTitle}</SectionLabel><h2 className="preserve-lines">{story.accessTitle}</h2></div><div className="intro-description">{story.accessParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></div></section>}

      {story.componentsTitle && story.components && <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{story.componentsTitle}</SectionLabel><h2>{story.componentsTitle}</h2></div>{story.componentsIntro && <p className="section-heading-note">{story.componentsIntro}</p>}</div>
        <ul className="scm-checklist component-checklist">{story.components.map((component) => <li key={component}><Check size={16} />{component}</li>)}</ul>
        {story.componentsNote && <p className="about-approach-result">{story.componentsNote}</p>}
      </div></section>}

      {story.sections.length > 0 && <section className={`section${story.componentsTitle ? "" : " soft-section"}`}><div className="container"><div className="logistics-blocks">{story.sections.map((section) => <article className="logistics-block" key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>)}</div></div></section>}

      <section className={`section${story.componentsTitle ? " soft-section" : ""}`}><div className="container about-approach"><div className="about-approach-head"><SectionLabel>{story.flowTitle}</SectionLabel><p className="about-approach-lead">{story.flowLead}</p><p className="about-approach-intro">{story.flowIntro}</p></div><ol className="supply-flow">{story.flow.map((step, index) => <li key={step} className="supply-flow-step"><span className="supply-flow-num">{String(index + 1).padStart(2, "0")}</span><span className="supply-flow-label">{step}</span>{index < story.flow.length - 1 && <ArrowRight className="supply-flow-arrow" size={16} aria-hidden="true" />}</li>)}</ol>{story.flowResult && <p className="about-approach-result">{story.flowResult}</p>}</div></section>

      <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{story.closingTitle}</SectionLabel><h2 className="preserve-lines">{story.closingTitle}</h2></div><div className="intro-description">{story.closingParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="logistics-flow-strong">{story.closingStrong}</p></div></div></div></section>
    </>}

    <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>{m.moreEyebrow}</SectionLabel><h2>{m.moreTitle}</h2></div></div><MaterialCards /></div></section><CtaBanner /></main>;
}
