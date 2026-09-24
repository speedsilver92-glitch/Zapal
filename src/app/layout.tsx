import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-provider";
import { FloatingContact } from "@/components/floating-contact";
import { defaultLocale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.zapal.sk"),
  title: { default: "ZAPAL SK — Connecting supply. Powering progress.", template: "%s | ZAPAL SK" },
  description: "Industrial materials, intelligent supply chain planning, and reliable logistics.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body>
        <LanguageProvider initialLocale={defaultLocale}>
          <Header />
          {children}
          <SiteFooter />
          <FloatingContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
