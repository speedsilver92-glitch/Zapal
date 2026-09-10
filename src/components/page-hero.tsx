import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SectionLabel } from "./ui";

export function PageHero({ title, description, image, imageAlt, eyebrow, breadcrumb, compact = false, service }: { title: string; description: string; image: string; imageAlt: string; eyebrow: string; breadcrumb: string; compact?: boolean; service?: string }) {
  return <section className={`page-hero${compact ? " compact" : ""}`}><Image src={image} alt={imageAlt} fill priority sizes="100vw" quality={85} /><div className="page-hero-shade" /><div className="container page-hero-inner"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={12} /><span aria-current="page">{breadcrumb}</span></nav><div className="page-hero-panel"><SectionLabel light>{eyebrow}</SectionLabel><h1>{title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{description}</p>{service && <Link href={`/contacts?service=${encodeURIComponent(service)}`} className="button button-white">Discuss your requirements<ArrowUpRight size={18} /></Link>}</div></div></section>;
}
