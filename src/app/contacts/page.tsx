import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ContactsView } from "@/components/contacts-view";
import { enquiryServices } from "@/lib/content";
import { getContactDetails } from "@/lib/contact";
import { defaultLocale, getDictionary, isLocale, LOCALE_COOKIE } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const t = getDictionary(locale);
  return { title: `${t.contacts.breadcrumb} — ZAPAL SK`, description: t.contacts.description };
}

export const dynamic = "force-dynamic";

export default async function ContactsPage({ searchParams }: { searchParams: Promise<{ service?: string; channel?: string }> }) {
  const query = await searchParams;
  const contact = getContactDetails();
  // Service is passed via URL using canonical English names; resolve to an index.
  const serviceIndex = query.service ? enquiryServices.indexOf(query.service) : 0;
  const initialServiceIndex = serviceIndex >= 0 ? serviceIndex : 0;
  const initialChannel = query.channel === "whatsapp" ? "whatsapp" : "email";
  return <ContactsView company={contact.company} address={contact.address} email={contact.email} phone={contact.phone} whatsapp={contact.whatsapp} registration={contact.registration} vat={contact.vat} directionsUrl={contact.directionsUrl} mapUrl={contact.mapUrl} emailDeliveryEnabled={contact.emailDeliveryEnabled} initialService={enquiryServices[initialServiceIndex]} initialServiceIndex={initialServiceIndex} initialChannel={initialChannel} />;
}
