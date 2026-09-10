import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { materialCategories, services } from "@/lib/content";

export function ServiceCards() {
  return <div className="service-grid">{services.map(service => <article className="service-item" key={service.slug}><Link className="service-card" href={`/${service.slug}`}><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" /><div className="service-card-shade" /><span className="service-number">{service.number}<span>/</span></span><span className="service-arrow"><ArrowUpRight size={20} /></span><div className="service-card-copy"><span className="service-card-eyebrow">{service.slug === "materials" ? "SOURCE WITH CONFIDENCE" : service.slug === "supply-chain" ? "PLAN WITH PRECISION" : "DELIVER WITH CERTAINTY"}</span><h3>{service.slug === "materials" ? <>Materials<br />& Supply</> : service.slug === "supply-chain" ? <>Supply Chain<br />Planning & Consulting</> : <>Logistics &<br />Transportation</>}</h3></div></Link><p className="service-description">{service.slug === "materials" ? "The right components, cables, and technology for your next project." : service.slug === "supply-chain" ? "Smarter networks. Greater visibility. A more resilient operation." : "Reliable transportation that keeps your goods — and business — moving."}</p></article>)}</div>;
}

export function MaterialCards() {
  return <div className="service-grid material-grid">{materialCategories.map((category, index) => <Link className="service-card" href={`/materials/${category.slug}`} key={category.slug}><Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /><div className="service-card-shade" /><span className="service-number">0{index + 1}<span>/</span></span><span className="service-arrow"><ArrowUpRight size={20} /></span><div className="service-card-copy"><span className="service-card-eyebrow">MATERIALS & SUPPLY</span><h3>{category.title}</h3></div></Link>)}</div>;
}
