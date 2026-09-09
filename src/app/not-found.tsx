import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui";

export default function NotFound() {
  return <main id="main-content" className="not-found-page"><div className="container"><span className="not-found-number">404<MoveUpRight size={80} strokeWidth={1} /></span><SectionLabel>LET’S GET YOU BACK ON TRACK</SectionLabel><h1>A missing link.<br />Not the end of the road.</h1><p>The page you’re looking for isn’t here. Let’s reconnect you with the right place.</p><Link href="/" className="button button-blue">Back to home<ArrowRight size={18} /></Link><Link href="/contacts" className="text-link">Contact our team<ArrowRight size={17} /></Link></div></main>;
}
