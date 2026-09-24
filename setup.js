const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Move server-only API endpoints to backup
const apiDir = path.join('src', 'app', 'api');
const backupDir = path.join('src', 'api_backup');
if (fs.existsSync(apiDir)) {
  fs.renameSync(apiDir, backupDir);
}

// 2. Configure Next.js static export
fs.writeFileSync('next.config.ts', `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
`);

// 3. Make robots.txt static
fs.writeFileSync(path.join('src', 'app', 'robots.ts'), `import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: \`\${(process.env.SITE_URL || "https://www.zapal.sk").replace(/\\/$/, "")}/sitemap.xml\`,
  };
}
`);

// 4. Make sitemap.xml static
fs.writeFileSync(path.join('src', 'app', 'sitemap.ts'), `import type { MetadataRoute } from "next";
import { materialCategories, services } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.SITE_URL || "https://www.zapal.sk").replace(/\\/$/, "");
  const paths = [
    "",
    ...services.map((service) => \`/\${service.slug}\`),
    ...materialCategories.map((category) => \`/materials/\${category.slug}\`),
    "/about",
    "/partners",
    "/contacts",
    "/privacy",
  ];
  return paths.map((path) => ({
    url: \`\${base}\${path}\`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));
}
`);

// 5. Make root layout static (remove server cookies)
fs.writeFileSync(path.join('src', 'app', 'layout.tsx'), `import type { Metadata } from "next";
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
`);

// 6. Make contacts page static
fs.writeFileSync(path.join('src', 'app', 'contacts', 'page.tsx'), `import type { Metadata } from "next";
import { ContactsView } from "@/components/contacts-view";
import { enquiryServices } from "@/lib/content";
import { getContactDetails } from "@/lib/contact";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(defaultLocale);
  return { title: \`\${t.contacts.breadcrumb} — ZAPAL SK\`, description: t.contacts.description };
}

export default function ContactsPage() {
  const contact = getContactDetails();
  return (
    <ContactsView
      company={contact.company}
      address={contact.address}
      email={contact.email}
      phone={contact.phone}
      whatsapp={contact.whatsapp}
      registration={contact.registration}
      vat={contact.vat}
      directionsUrl={contact.directionsUrl}
      mapUrl={contact.mapUrl}
      emailDeliveryEnabled={contact.emailDeliveryEnabled}
      initialService={enquiryServices[0]}
      initialServiceIndex={0}
      initialChannel="email"
    />
  );
}
`);

// 7. Make [section]/page.tsx static
fs.writeFileSync(path.join('src', 'app', '[section]', 'page.tsx'), `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, serviceSlugs } from "@/lib/content";
import { getDictionary, defaultLocale } from "@/lib/i18n";
import { ServicePage } from "@/components/service-page";
import { AboutPage } from "@/components/about-page";
import { PartnersPage } from "@/components/partners-page";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return [...serviceSlugs.map((slug) => ({ section: slug })), { section: "about" }, { section: "partners" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const t = getDictionary(defaultLocale);
  const service = getContent(defaultLocale).services.find((item) => item.slug === section);
  return {
    title: service?.shortTitle || (section === "about" ? t.about.breadcrumb : section === "partners" ? t.partners.breadcrumb : "Page not found"),
    description: service?.description || t.about.description,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (serviceSlugs.includes(section)) return <ServicePage slug={section} />;
  if (section === "about") return <AboutPage />;
  if (section === "partners") return <PartnersPage />;
  notFound();
}
`);

// 8. Make [section]/[category]/page.tsx static
fs.writeFileSync(path.join('src', 'app', '[section]', '[category]', 'page.tsx'), `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categorySlugs, getContent } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";
import { MaterialCategoryPage } from "@/components/material-category-page";

type Props = { params: Promise<{ section: string; category: string }> };

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ section: "materials", category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = getContent(defaultLocale).materialCategories.find((item) => item.slug === category);
  return { title: item?.title || "Page not found", description: item?.description };
}

export default async function MaterialCategoryRoute({ params }: Props) {
  const { section, category } = await params;
  if (section !== "materials" || !categorySlugs.includes(category)) notFound();
  return <MaterialCategoryPage slug={category} />;
}
`);

console.log("Files updated successfully. Starting production build...");
execSync("npm run build", { stdio: "inherit" });
execSync("open .");
console.log("Build complete! Finder has opened with the 'out' folder ready.");
