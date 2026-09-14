"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";

export function ServiceCards() {
  const { t } = useLanguage();
  const { services } = useContent();
  return <div className="service-grid">{services.map((service, index) => <article className="service-item" key={service.slug}><Link className="service-card" href={`/${service.slug}`}><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" /><div className="service-card-shade" /><span className="service-number">{service.number}<span>/</span></span><span className="service-arrow"><ArrowUpRight size={20} /></span><div className="service-card-copy"><span className="service-card-eyebrow">{t.home.cardEyebrows[index]}</span><h3>{t.home.cardTitles[index].split("\n").map((line, lineIndex) => <span key={line}>{lineIndex > 0 && <br />}{line}</span>)}</h3></div></Link><p className="service-description">{t.home.cardDescriptions[index]}</p></article>)}</div>;
}

export function MaterialCards() {
  const { t } = useLanguage();
  const { materialCategories } = useContent();
  return <div className="service-grid material-grid">{materialCategories.map((category, index) => <Link className="service-card" href={`/materials/${category.slug}`} key={category.slug}><Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /><div className="service-card-shade" /><span className="service-number">0{index + 1}<span>/</span></span><span className="service-arrow"><ArrowUpRight size={20} /></span><div className="service-card-copy"><span className="service-card-eyebrow">{t.service.cardEyebrow}</span><h3>{category.title}</h3></div></Link>)}</div>;
}
