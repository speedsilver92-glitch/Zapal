import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-provider";
import { FloatingContact } from "@/components/floating-contact";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.zapal.sk"),
  title: { default: "ZAPAL SK — Connecting supply. Powering progress.", template: "%s | ZAPAL SK" },
  description: "Industrial materials, intelligent supply chain planning, and reliable logistics. Based in Bratislava, ZAPAL SK connects the right solutions to move your business forward.",
  openGraph: { type: "website", locale: "en_GB", siteName: "ZAPAL SK", title: "ZAPAL SK — Connecting supply. Powering progress.", description: "One partner. Every link in your chain. Materials, supply chain planning, and logistics from Slovakia.", images: [{ url: "/images/port.jpg", width: 1200, height: 627, alt: "Global port connections — ZAPAL SK" }] },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  return (
    <html lang={locale}>
      <body>
        <LanguageProvider initialLocale={locale}>
          <Header />
          {children}
          <SiteFooter />
          <FloatingContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
