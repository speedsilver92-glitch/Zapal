import { enquiryServices } from "./content";

export type EnquiryPayload = {
  name: string;
  email: string;
  mobile: string;
  service: string;
  message: string;
  consent: boolean;
  channel: "email" | "whatsapp";
  requestId: string;
  website: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryPayload | "form", string>>;
export type EnquiryResult = { id: string; delivery: string; message: string; handoffUrl: string | null; recipientConfigured: boolean };

export function validateEnquiry(input: unknown): { success: true; data: EnquiryPayload } | { success: false; errors: EnquiryErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { success: false, errors: { form: "Please provide a valid enquiry." } };
  const raw = input as Record<string, unknown>;
  const string = (key: string) => typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const data: EnquiryPayload = { name: string("name"), email: string("email").toLowerCase(), mobile: string("mobile"), service: string("service"), message: string("message"), consent: raw.consent === true, channel: raw.channel === "whatsapp" ? "whatsapp" : "email", requestId: string("requestId"), website: string("website") };
  const errors: EnquiryErrors = {};
  if (data.name.length < 2 || data.name.length > 160 || /[\r\n\x00]/.test(data.name)) errors.name = "Please enter your name or company name (2–160 characters).";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  const digits = data.mobile.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]{7,40}$/.test(data.mobile) || digits.length < 7 || digits.length > 15) errors.mobile = "Please enter a valid mobile number, including country code.";
  if (!enquiryServices.includes(data.service)) errors.service = "Please select an area of interest.";
  if (!data.message || (typeof raw.message === "string" && raw.message.length > 1500)) errors.message = "Please enter a message of up to 1,500 characters.";
  if (!data.consent) errors.consent = "Please agree to the privacy policy so we can handle your enquiry.";
  if (raw.channel !== "email" && raw.channel !== "whatsapp") errors.channel = "Please choose email or WhatsApp.";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.requestId)) errors.form = "Your request could not be identified. Please refresh and try again.";
  if (data.website) errors.form = "Your request could not be accepted.";
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}
