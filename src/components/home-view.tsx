"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, CircleCheck, Factory, Globe2, Handshake, Layers3, Network, ShieldCheck, Truck } from "lucide-react";
import { Hero } from "./hero";
import { ServiceCards } from "./service-cards";
import { CtaBanner, SectionLabel, TextLink } from "./ui";
import { useLanguage } from "./language-provider";

function lines(value: string) {
  return value.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>);
}

export function HomeView() {
  const { t } = useLanguage();
  const h = t.home;
  const promiseIcons = [ShieldCheck, Globe2, Layers3, Handshake];
  const disciplineIcons = [Factory, Network, Truck];
  return <main id="main-content">
    <Hero />
    <section className="promise-strip" aria-label="ZAPAL SK"><div className="container promise-grid">{h.promises.map((promise, index) => { const Icon = promiseIcons[index]; return <div className="promise" key={promise.title}><Icon size={27} strokeWidth={1.5} /><div><h2>{promise.title}</h2><p>{promise.detail}</p></div></div>; })}</div></section>
    <section id="solutions" className="section services-section"><div className="container"><div className="section-heading"><div><SectionLabel>{h.servicesEyebrow}</SectionLabel><h2>{h.servicesTitle}<br /><span className="muted-heading">{h.servicesTitle2}</span></h2></div><div className="section-heading-aside"><p>{lines(h.servicesAside)}</p><a href="#service-cards" className="text-link">{h.findSolution}<ArrowUpRight size={17} /></a></div></div><div id="service-cards"><ServiceCards /></div><div className="services-footnote"><CircleCheck size={16} /><span>{h.footnote}</span><Link href="/contacts">{h.notSure}<ArrowUpRight size={14} /></Link></div></div></section>
    <section className="section home-about"><div className="container about-grid"><div className="about-image"><Image src="/images/team.jpg" alt="Professionals collaborating around a table with project plans and data" fill sizes="(max-width: 800px) 100vw, 48vw" /><div className="about-image-tag"><Globe2 size={37} strokeWidth={1.25} /><span>{h.aboutTag}<br /><strong>{h.aboutTagStrong}</strong></span></div><span className="image-caption">{h.aboutCaption}</span></div><div className="about-copy"><SectionLabel>{h.aboutEyebrow}</SectionLabel><h2>{h.aboutTitle}<br />{h.aboutTitleAccent} <span className="blue-text">{h.aboutTitleYou}</span></h2><p className="about-lead">{h.aboutLead}</p><p>{h.aboutBody}</p><div className="about-checks">{h.aboutChecks.map(text => <span key={text}><Check size={16} />{text}</span>)}</div><TextLink href="/about">{h.getToKnow}</TextLink></div></div></section>
    <section className="section process-section"><div className="container"><div className="section-heading"><div><SectionLabel>{h.processEyebrow}</SectionLabel><h2 className="preserve-lines">{h.processTitle}</h2></div><p className="section-heading-note preserve-lines">{h.processNote}</p></div><div className="process-grid">{h.processSteps.map((step, index) => <div className="process-step" key={step.title}><div className="process-step-top"><span>0{index + 1}</span><div /><ArrowUpRight size={20} /></div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>
    <section className="partner-strip"><div className="container partner-strip-inner"><div className="partner-intro"><SectionLabel>{h.partnerEyebrow}</SectionLabel><h2 className="preserve-lines">{h.partnerTitle}</h2><TextLink href="/partners">{h.explorePartnerships}</TextLink></div><div className="partner-disciplines">{h.disciplines.map((discipline, index) => { const Icon = disciplineIcons[index]; return <Fragment key={discipline}>{index > 0 && <span className="network-plus">+</span>}<div><Icon size={33} strokeWidth={1.2} /><span>{lines(discipline)}</span></div></Fragment>; })}</div></div></section>
    <CtaBanner />
  </main>;
}
