"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";

const slides = [
  { eyebrow: "YOUR BUSINESS, BETTER CONNECTED", firstLine: "Connecting supply.", secondLine: "Powering progress.", description: "Industrial materials, intelligent supply chains, and reliable logistics. One partner to move your business forward.", image: "/images/port.jpg", alt: "Cargo ships and container cranes at a busy international shipping port", button: "Explore our solutions", href: "#solutions", caption: "A WORLD OF POSSIBILITIES. ONE PARTNER." },
  { eyebrow: "CLARITY AT EVERY LINK", firstLine: "Smarter planning.", secondLine: "Stronger business.", description: "Build an efficient, resilient supply chain with practical insight, connected thinking, and a clear path forward.", image: "/images/warehouse.jpg", alt: "Organized industrial warehouse and distribution facility", button: "Discover supply chain solutions", href: "/supply-chain", caption: "CONNECTED THINKING. MEASURABLE PROGRESS." },
  { eyebrow: "BUILT TO KEEP YOU MOVING", firstLine: "Every connection.", secondLine: "Moving you ahead.", description: "From sourcing to the final delivery, we bring the details together — so your business never stands still.", image: "/images/port-aerial.jpg", alt: "Aerial view of an international container terminal beside the sea", button: "Explore logistics", href: "/logistics", caption: "FROM THE FIRST MILE TO THE FINAL HANDOVER." },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <section className="home-hero" aria-roledescription="carousel" aria-label="Our connected solutions">
      <div className="hero-photograph" key={slide.image}><Image src={slide.image} alt={slide.alt} fill priority sizes="100vw" quality={90} /></div>
      <div className="hero-shade" />
      <div className="container hero-container">
        <div className="hero-copy" key={active} aria-live="polite" aria-atomic="true">
          <p className="eyebrow hero-eyebrow"><span />{slide.eyebrow}</p>
          <h1>{slide.firstLine}<br /><span>{slide.secondLine}</span></h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions"><Link href={slide.href} className="button button-blue">{slide.button}<ArrowUpRight size={19} /></Link><Link href="/contacts" className="button button-outline-white">Talk to our team<ArrowRight size={18} /></Link></div>
        </div>
        <Link href="/about" className="hero-reach"><Globe2 className="reach-globe" size={43} strokeWidth={1} /><span className="reach-kicker">LOCAL ROOTS. GLOBAL REACH.</span><span className="reach-title">Your next step.<br />Our shared ambition.</span><ArrowUpRight size={20} className="reach-arrow" /></Link>
        <div className="hero-bottom"><a href="#solutions" className="hero-scroll"><span className="scroll-icon"><ArrowDown size={15} /></span><span>{slide.caption}</span></a><div className="hero-controls"><span className="slide-current">0{active + 1}</span><div className="slide-indicators">{slides.map((item, index) => <button type="button" key={item.eyebrow} className={index === active ? "selected" : ""} onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}: ${item.firstLine}`} aria-pressed={index === active} />)}</div><span className="slide-total">03</span><span className="control-divider" /><button type="button" className="hero-arrow" onClick={() => setActive((active + slides.length - 1) % slides.length)} aria-label="Previous slide"><ArrowLeft size={18} /></button><button type="button" className="hero-arrow" onClick={() => setActive((active + 1) % slides.length)} aria-label="Next slide"><ArrowRight size={18} /></button></div></div>
      </div>
    </section>
  );
}
