export type ContactDetails = {
  company: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  registration: string;
  vat: string;
  directionsUrl: string;
  mapUrl: string;
  emailDeliveryEnabled: boolean;
};

export function getContactDetails(): ContactDetails {
  const address = process.env.CONTACT_ADDRESS || "Obchodná 559/37, 811 06 Bratislava, Slovakia";
  const email = process.env.CONTACT_EMAIL?.trim() || "";
  const phone = process.env.CONTACT_PHONE?.trim() || "";
  const whatsapp = (process.env.CONTACT_WHATSAPP || "").replace(/\D/g, "");
  return {
    company: "Zapal SK s. r. o.",
    address,
    email,
    phone,
    whatsapp: /^\d{8,15}$/.test(whatsapp) ? whatsapp : "",
    registration: "53989775",
    vat: "SK2121542808",
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
    mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`,
    emailDeliveryEnabled: Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM && email),
  };
}
