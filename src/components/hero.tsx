"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import { useLanguage } from "./language-provider";

const slideMeta = [
  { image: "/images/port.jpg", alt: "Cargo ships and container cranes at a busy international shipping port", href: "#solutions" },
  { image: "/images/warehouse.jpg", alt: "Organized industrial warehouse and distribution facility", href: "/supply-chain" },
  { image: "/images/port-aerial.jpg", alt: "Aerial view of an international container terminal beside the sea", href: "/logistics" },
];

export function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const slides = t.hero.slides.map((slide, index) => ({ ...slide, ...slideMeta[index] }));
  const slide = slides[active];
  return (
    <section className="home-hero" aria-roledescription="carousel" aria-label={t.hero.reachKicker}>
      <div className="hero-photograph" key={slide.image}><Image src={slide.image} alt={slide.alt} fill priority sizes="100vw" quality={90} /></div>
      <div className="hero-shade" />
      <div className="container hero-container">
        <div className="hero-copy" key={active} aria-live="polite" aria-atomic="true">
          <p className="eyebrow hero-eyebrow"><span />{slide.eyebrow}</p>
          <h1>{slide.firstLine}<br /><span>{slide.secondLine}</span></h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions"><Link href={slide.href} className="button button-blue">{slide.button}<ArrowUpRight size={19} /></Link><Link href="/contacts" className="button button-outline-white">{t.common.talkToTeam}<ArrowRight size={18} /></Link></div>
        </div>
        <Link href="/about" className="hero-reach"><Globe2 className="reach-globe" size={43} strokeWidth={1} /><span className="reach-kicker">{t.hero.reachKicker}</span><span className="reach-title">{t.hero.reachTitle.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</span><ArrowUpRight size={20} className="reach-arrow" /></Link>
        <div className="hero-bottom"><a href="#solutions" className="hero-scroll"><span className="scroll-icon"><ArrowDown size={15} /></span><span>{slide.caption}</span></a><div className="hero-controls"><span className="slide-current">0{active + 1}</span><div className="slide-indicators">{slides.map((item, index) => <button type="button" key={item.eyebrow} className={index === active ? "selected" : ""} onClick={() => setActive(index)} aria-label={`${t.hero.showSlide} ${index + 1}`} aria-pressed={index === active} />)}</div><span className="slide-total">03</span><span className="control-divider" /><button type="button" className="hero-arrow" onClick={() => setActive((active + slides.length - 1) % slides.length)} aria-label={t.hero.prevSlide}><ArrowLeft size={18} /></button><button type="button" className="hero-arrow" onClick={() => setActive((active + 1) % slides.length)} aria-label={t.hero.nextSlide}><ArrowRight size={18} /></button></div></div>
      </div>
    </section>
  );
}
