import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { materialCategories } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { MaterialCards } from "@/components/service-cards";
import { CtaBanner, SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ section: string; category: string }> };
export function generateStaticParams() { return materialCategories.map(item => ({ section: "materials", category: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = materialCategories.find(item => item.slug === category);
  return { title: item?.title || "Page not found", description: item?.description };
}

export default async function MaterialCategoryPage({ params }: Props) {
  const { section, category } = await params;
  const item = materialCategories.find(item => item.slug === category);
  if (section !== "materials" || !item) notFound();
  return <main id="main-content"><PageHero title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} eyebrow="MATERIALS & SUPPLY" breadcrumb={`Materials / ${item.shortTitle}`} service={item.shortTitle} />
    <section className="section"><div className="container"><Link href="/materials" className="text-link back-link"><ArrowLeft size={16} />All materials & supply</Link><div className="material-detail-grid"><div><SectionLabel>THE RIGHT SPECIFICATION. THE RIGHT SUPPORT.</SectionLabel><h2>Built around<br />your requirements.</h2><p>Whether you know the exact part you need or are exploring the options for your next project, we can help connect the details.</p><p>Share your specifications, quantities, preferred brands, and delivery requirements so we can assess a sourcing solution.</p><Link href={`/contacts?service=${encodeURIComponent(item.shortTitle)}`} className="button button-blue">Request a sourcing proposal<ArrowUpRight size={18} /></Link></div><div className="material-offering"><h3>Our sourcing focus</h3>{item.items.map((text, index) => <div key={text}><span className="offering-number">0{index + 1}</span><span>{text}</span><Check size={18} /></div>)}<p>Product suitability, availability, lead times, and terms are confirmed with your individual proposal.</p></div></div></div></section>
    <section className="section soft-section"><div className="container"><div className="section-heading"><div><SectionLabel>MORE WAYS TO CONNECT</SectionLabel><h2>Explore our materials.</h2></div></div><MaterialCards /></div></section><CtaBanner /></main>;
}
