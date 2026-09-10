import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Layers3, Network } from "lucide-react";
import { type Service, services } from "@/lib/content";
import { PageHero } from "./page-hero";
import { CtaBanner, SectionLabel } from "./ui";
import { MaterialCards } from "./service-cards";
import { Faq } from "./faq";

export function ServicePage({ service }: { service: Service }) {
  const icons = [Compass, Layers3, Network];
  return <main id="main-content"><PageHero title={service.title} description={service.description} image={service.image} imageAlt={service.imageAlt} eyebrow={service.eyebrow} breadcrumb={service.shortTitle} service={service.shortTitle} />
    <div className="service-highlights"><div className="container">{service.highlights.map(item => <span key={item}><Check size={17} />{item}</span>)}</div></div>
    <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>{service.tagline}</SectionLabel><h2 className="preserve-lines">{service.introTitle}</h2></div><p className="intro-description">{service.intro}</p></div><div className="capability-grid">{service.capabilities.map((item, index) => { const Icon = icons[index]; return <article className="capability-card" key={item.title}><div className="capability-top"><Icon size={29} strokeWidth={1.4} /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></div></section>
    {service.slug === "materials" && <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>FIND WHAT YOU NEED</SectionLabel><h2>Three categories.<br />Countless possibilities.</h2></div><p className="section-heading-note">Explore the essentials that keep<br />your projects and operations running.</p></div><MaterialCards /></div></section>}
    <section className="service-approach"><div className="container service-approach-inner"><div><SectionLabel light>YOUR BUSINESS IS OUR STARTING POINT</SectionLabel><h2>Let’s find the right<br />solution. Together.</h2></div><div><p>No two businesses are the same. Tell us about your requirements, timescale, and priorities — and we’ll build the next step around you.</p><Link href={`/contacts?service=${encodeURIComponent(service.shortTitle)}`} className="button button-white">Start your enquiry<ArrowUpRight size={18} /></Link></div></div></section>
    <section className="section"><div className="container faq-grid"><div><SectionLabel>A LITTLE MORE CLARITY</SectionLabel><h2>Your questions.<br />Answered.</h2><p>Have something else in mind?</p><Link className="text-link" href={`/contacts?service=${encodeURIComponent(service.shortTitle)}`}>Let’s talk<ArrowRight size={17} /></Link></div><Faq items={service.faqs} /></div></section>
    <section className="related-section"><div className="container"><SectionLabel>EVERYTHING WORKS BETTER, CONNECTED</SectionLabel><div className="related-links">{services.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} href={`/${item.slug}`}><span>{item.number}</span><h3>{item.shortTitle}</h3><ArrowUpRight size={24} /></Link>)}</div></div></section><CtaBanner /></main>;
}
