import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, CircleCheck, Factory, Globe2, Handshake, Layers3, Network, ShieldCheck, Truck } from "lucide-react";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { CtaBanner, SectionLabel, TextLink } from "@/components/ui";

const promises = [
  { icon: ShieldCheck, title: "Quality you can rely on", detail: "The right products. The right standards." },
  { icon: Globe2, title: "Connected across borders", detail: "Local understanding. Global perspective." },
  { icon: Layers3, title: "End-to-end expertise", detail: "From sourcing to the final delivery." },
  { icon: Handshake, title: "A genuinely personal approach", detail: "Your goals at the heart of what we do." },
];

export default function HomePage() {
  return <main id="main-content">
    <Hero />
    <section className="promise-strip" aria-label="The ZAPAL SK difference"><div className="container promise-grid">{promises.map(({ icon: Icon, title, detail }) => <div className="promise" key={title}><Icon size={27} strokeWidth={1.5} /><div><h2>{title}</h2><p>{detail}</p></div></div>)}</div></section>
    <section id="solutions" className="section services-section"><div className="container"><div className="section-heading"><div><SectionLabel>OUR EXPERTISE</SectionLabel><h2>One partner.<br /><span className="muted-heading">Every link in your chain.</span></h2></div><div className="section-heading-aside"><p>From essential materials to the bigger picture.<br />We bring it all together, so you can move ahead.</p><a href="#service-cards" className="text-link">Find your solution<ArrowUpRight size={17} /></a></div></div><div id="service-cards"><ServiceCards /></div><div className="services-footnote"><CircleCheck size={16} /><span>Individual expertise. Connected solutions. Tailored to your business.</span><Link href="/contacts">Not sure where to start?<ArrowUpRight size={14} /></Link></div></div></section>
    <section className="section home-about"><div className="container about-grid"><div className="about-image"><Image src="/images/team.jpg" alt="Professionals collaborating around a table with project plans and data" fill sizes="(max-width: 800px) 100vw, 48vw" /><div className="about-image-tag"><Globe2 size={37} strokeWidth={1.25} /><span>Local knowledge.<br /><strong>Wider possibilities.</strong></span></div><span className="image-caption">A SHARED VISION. A STRONGER WAY FORWARD.</span></div><div className="about-copy"><SectionLabel>THIS IS ZAPAL SK</SectionLabel><h2>Built on connections.<br />Focused on <span className="blue-text">you.</span></h2><p className="about-lead">Business moves forward when the right people, products, and ideas come together.</p><p>Based in Bratislava, we bring materials supply, supply chain expertise, and logistics under one roof. We take the time to understand your business — then connect the right solutions to help it grow.</p><div className="about-checks">{["One dedicated point of contact", "Practical, tailored solutions", "Clear and open communication", "Long-term partnership thinking"].map(text => <span key={text}><Check size={16} />{text}</span>)}</div><TextLink href="/about">Get to know ZAPAL SK</TextLink></div></div></section>
    <section className="section process-section"><div className="container"><div className="section-heading"><div><SectionLabel>HOW WE MAKE IT HAPPEN</SectionLabel><h2>Good connections.<br />A clear way forward.</h2></div><p className="section-heading-note">No unnecessary complexity.<br />Just the right approach, built around you.</p></div><div className="process-grid">{[{ title: "We understand.", text: "We start with your business, your challenges, and where you want to go." }, { title: "We connect.", text: "We bring the right products, expertise, and partners together around your needs." }, { title: "We move forward.", text: "We turn a clear plan into coordinated action — and stay connected along the way." }].map((step, index) => <div className="process-step" key={step.title}><div className="process-step-top"><span>0{index + 1}</span><div /><ArrowUpRight size={20} /></div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>
    <section className="partner-strip"><div className="container partner-strip-inner"><div className="partner-intro"><SectionLabel>STRONGER TOGETHER</SectionLabel><h2>A network built<br />on shared ambition.</h2><TextLink href="/partners">Explore our partnerships</TextLink></div><div className="partner-disciplines"><div><Factory size={33} strokeWidth={1.2} /><span>Industry &<br />manufacturing</span></div><span className="network-plus">+</span><div><Network size={33} strokeWidth={1.2} /><span>Technology &<br />infrastructure</span></div><span className="network-plus">+</span><div><Truck size={33} strokeWidth={1.2} /><span>Transport &<br />logistics</span></div></div></div></section>
    <CtaBanner />
  </main>;
}
