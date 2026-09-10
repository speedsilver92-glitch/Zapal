import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Factory, Globe2, Handshake, Network, ShieldCheck, Truck } from "lucide-react";
import { services } from "@/lib/content";
import { ServicePage } from "@/components/service-page";
import { PageHero } from "@/components/page-hero";
import { CtaBanner, SectionLabel, TextLink } from "@/components/ui";
import { Faq } from "@/components/faq";

type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() { return [...services.map(service => ({ section: service.slug })), { section: "about" }, { section: "partners" }]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const service = services.find(item => item.slug === section);
  return { title: service?.shortTitle || (section === "about" ? "About us" : section === "partners" ? "Our partners" : "Page not found"), description: service?.description || "Meet ZAPAL SK: connecting materials, supply chain expertise, and logistics from Bratislava, Slovakia." };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const service = services.find(item => item.slug === section);
  if (service) return <ServicePage service={service} />;
  if (section === "about") return <AboutPage />;
  if (section === "partners") return <PartnersPage />;
  notFound();
}

function AboutPage() {
  return <main id="main-content"><PageHero title={"Better connected.\nBetter, together."} description="We believe progress starts with the right connection. Between people, between businesses, and between your ambition and what comes next." eyebrow="THIS IS ZAPAL SK" image="/images/team.jpg" imageAlt="Business professionals sharing ideas and planning a project" breadcrumb="About us" compact />
    <section className="section"><div className="container"><div className="section-heading service-intro"><div><SectionLabel>A PARTNER, NOT JUST A PROVIDER</SectionLabel><h2>Your business.<br />Our shared ambition.</h2></div><div className="intro-description"><p>Zapal SK brings industrial materials supply, supply chain planning, and transportation together with a simple purpose: making your business better connected.</p><p>From our base in Bratislava, Slovakia, we take a practical and personal approach. We listen, understand the challenge, and connect the expertise your operation needs.</p></div></div><div className="capability-grid">{[{ icon: ShieldCheck, title: "Reliability, in the details.", text: "Good partnerships are built on doing the essentials well. We value clear requirements, thoughtful coordination, and dependable communication." }, { icon: Globe2, title: "A broader perspective.", text: "We look beyond individual products and shipments to understand how each decision fits into the bigger picture of your business." }, { icon: Handshake, title: "People come first.", text: "A dedicated point of contact, a straightforward conversation, and a shared commitment to finding the right solution." }].map(({ icon: Icon, title, text }, index) => <article className="capability-card" key={title}><div className="capability-top"><Icon size={30} strokeWidth={1.4} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section soft-section"><div className="container about-grid"><div className="about-image city-image"><Image src="/images/bratislava.jpg" alt="Modern Bratislava skyline overlooking the Danube River in Slovakia" fill sizes="(max-width: 800px) 100vw, 48vw" /><div className="about-image-tag"><Globe2 size={36} strokeWidth={1.2} /><span>Bratislava, Slovakia.<br /><strong>Connected to possibility.</strong></span></div></div><div className="about-copy"><SectionLabel>LOCAL ROOTS. INTERNATIONAL OUTLOOK.</SectionLabel><h2>At the heart of Europe.<br />On your side.</h2><p className="about-lead">A local understanding with a view beyond borders.</p><p>Being based in Slovakia places us at the intersection of European industry, technology, and transportation. We bring that connected perspective to every conversation.</p><TextLink href="/contacts">Find us in Bratislava</TextLink></div></div></section>
    <CtaBanner title="A good partnership starts with a conversation." /></main>;
}

function PartnersPage() {
  const sectors = [{ icon: Factory, title: "Industry & manufacturing", text: "Product manufacturers, technical specialists, and distributors who care about quality and understand the demands of industrial operations.", tags: ["Electrical equipment", "Cables & components", "Industrial supply"] }, { icon: Network, title: "Technology & infrastructure", text: "Technology providers who connect businesses with dependable computing, networking, and infrastructure solutions.", tags: ["Computer systems", "Network solutions", "Technical expertise"] }, { icon: Truck, title: "Transport & logistics", text: "Transport and logistics specialists who share a commitment to practical coordination, clear communication, and reliable delivery.", tags: ["Freight services", "Cross-border networks", "Delivery coordination"] }];
  return <main id="main-content"><PageHero title={"Progress happens\nin good company."} description="Strong connections create stronger outcomes. We bring complementary expertise together to build practical solutions for our customers." eyebrow="PARTNERS & CONNECTIONS" image="/images/port-aerial.jpg" imageAlt="Connected shipping lanes and container terminals at an international port" breadcrumb="Partners" compact />
    <section className="section"><div className="container"><div className="section-heading"><div><SectionLabel>COMPLEMENTARY EXPERTISE. SHARED VALUES.</SectionLabel><h2>A connected network.<br />A common purpose.</h2></div><p className="section-heading-note">We welcome conversations with businesses<br />across these connected disciplines.</p></div><div className="capability-grid partner-cards">{sectors.map(({ icon: Icon, title, text, tags }) => <article className="capability-card" key={title}><Icon size={37} strokeWidth={1.25} /><h3>{title}</h3><p>{text}</p><div className="sector-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>
    <section className="service-approach"><div className="container service-approach-inner"><div><SectionLabel light>LET’S CREATE SOMETHING VALUABLE</SectionLabel><h2>Your expertise.<br />Our next connection.</h2></div><div><p>Are you a manufacturer, distributor, technology provider, or logistics specialist? Tell us what you do and where you see an opportunity to work together.</p><Link href="/contacts?service=Partnership%20opportunity" className="button button-white">Become a partner<ArrowUpRight size={18} /></Link></div></div></section>
    <section className="section"><div className="container faq-grid"><div><SectionLabel>STARTING A PARTNERSHIP</SectionLabel><h2>Let’s get<br />on the same page.</h2></div><Faq items={[{ question: "Who can start a partnership conversation?", answer: "We welcome enquiries from manufacturers, product distributors, technology providers, and transport or logistics businesses whose expertise complements our services." }, { question: "What should we include in our introduction?", answer: "Tell us about your company, your products or services, the markets you cover, and the opportunity you have in mind. Our contact form includes a Partnership opportunity option to help route your enquiry." }, { question: "Are the disciplines shown a list of current partners?", answer: "No. These are the areas in which we welcome collaboration. We do not publish individual partner names or imply commercial relationships without their permission." }]} /></div></section><CtaBanner title="Better connections. Bigger possibilities." /></main>;
}
