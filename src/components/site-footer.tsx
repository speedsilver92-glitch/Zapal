import { getContactDetails } from "@/lib/contact";
import { SiteFooterView } from "./site-footer-view";

export function SiteFooter() {
  const contact = getContactDetails();
  return <SiteFooterView address={contact.address} email={contact.email} phone={contact.phone} directionsUrl={contact.directionsUrl} registration={contact.registration} />;
}
