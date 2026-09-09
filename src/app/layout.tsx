import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.zapal.sk"),
  title: { default: "ZAPAL SK — Connecting supply. Powering progress.", template: "%s | ZAPAL SK" },
  description: "Industrial materials, intelligent supply chain planning, and reliable logistics. Based in Bratislava, ZAPAL SK connects the right solutions to move your business forward.",
  openGraph: { type: "website", locale: "en_GB", siteName: "ZAPAL SK", title: "ZAPAL SK — Connecting supply. Powering progress.", description: "One partner. Every link in your chain. Materials, supply chain planning, and logistics from Slovakia.", images: [{ url: "/images/port.jpg", width: 1200, height: 627, alt: "Global port connections — ZAPAL SK" }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><Header />{children}<SiteFooter /><Link href="/contacts#enquiry-form" className="floating-contact" aria-label="Send ZAPAL SK a message"><MessageSquareText size={23} strokeWidth={1.7} /><span>Let’s connect</span></Link></body></html>;
}
