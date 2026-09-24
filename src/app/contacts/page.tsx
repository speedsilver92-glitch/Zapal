import type { Metadata } from "next";
import { ContactsView } from "@/components/contacts-view";
import { enquiryServices } from "@/lib/content";
import { getContactDetails } from "@/lib/contact";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(defaultLocale);
  return { title: `${t.contacts.breadcrumb} — ZAPAL SK`, description: t.contacts.description };
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
