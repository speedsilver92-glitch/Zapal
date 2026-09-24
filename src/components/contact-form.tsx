"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronDown, CircleAlert, LoaderCircle, Mail, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { enquiryServices as canonicalServices } from "@/lib/content";
import { type EnquiryErrors, type EnquiryResult, validateEnquiry } from "@/lib/enquiry-validation";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";

export function ContactForm({ initialServiceIndex = 0, initialChannel = "email", emailConfigured, emailDeliveryEnabled, whatsappConfigured }: { initialServiceIndex?: number; initialChannel?: "email" | "whatsapp"; emailConfigured: boolean; emailDeliveryEnabled: boolean; whatsappConfigured: boolean }) {
  const { t } = useLanguage();
  const { enquiryServices } = useContent();
  const f = t.form;
  const [fields, setFields] = useState({ name: "", email: "", mobile: "", serviceIndex: initialServiceIndex, message: "", consent: false, website: "" });
  const [channel, setChannel] = useState<"email" | "whatsapp">(initialChannel);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const requestId = useRef("");
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Errors are stored as keys and localized at render time.
  const errorText: Record<string, string> = { name: f.errName, email: f.errEmail, mobile: f.errMobile, service: f.errService, message: f.errMessage, consent: f.errConsent };
  const localizeErrors = (raw: EnquiryErrors): EnquiryErrors => {
    const out: EnquiryErrors = {};
    (Object.keys(raw) as (keyof EnquiryErrors)[]).forEach((key) => { out[key] = key === "form" ? raw[key] : (errorText[key] ?? raw[key]); });
    return out;
  };

  function update<K extends keyof typeof fields>(field: K, value: (typeof fields)[K]) {
    setFields(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field === "serviceIndex" ? "service" : field]: undefined, form: undefined }));
    requestId.current = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    requestId.current ||= crypto.randomUUID();
    // Always send the canonical (English) service string the API validates against.
    const payload = { name: fields.name, email: fields.email, mobile: fields.mobile, service: canonicalServices[fields.serviceIndex] ?? canonicalServices[0], message: fields.message, consent: fields.consent, website: fields.website, channel, requestId: requestId.current };
    const validated = validateEnquiry(payload);
    if (!validated.success) {
      setErrors(localizeErrors(validated.errors));
      const first = Object.keys(validated.errors)[0];
      const target = first === "service" ? "service" : first;
      formRef.current?.querySelector<HTMLElement>(`[name="${target}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    setErrors({});
    let popup: Window | null = null;
    if (channel === "whatsapp") {
      popup = window.open("about:blank", "_blank");
      if (popup) { popup.opener = null; popup.document.title = "ZAPAL SK"; popup.document.body.textContent = "…"; }
    }
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as EnquiryResult & { error?: string; errors?: EnquiryErrors };
      if (!response.ok) { setErrors(data.errors ? localizeErrors(data.errors) : {}); throw new Error(data.error || f.errGeneric); }
      setResult(data);
      if (data.handoffUrl) {
        if (channel === "whatsapp" && popup) popup.location.href = data.handoffUrl;
        else if (channel === "email" && data.handoffUrl.startsWith("mailto:")) window.location.href = data.handoffUrl;
      } else popup?.close();
      requestAnimationFrame(() => { resultRef.current?.focus(); resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
    } catch (error) {
      popup?.close();
      setErrors(current => ({ ...current, form: error instanceof Error ? error.message : f.errGeneric }));
    } finally { setPending(false); submitting.current = false; }
  }

  function reset() {
    setResult(null); setErrors({}); setCopied(false); requestId.current = "";
    setFields({ name: "", email: "", mobile: "", serviceIndex: initialServiceIndex, message: "", consent: false, website: "" });
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("[name=name]")?.focus());
  }

  if (result) {
    const heading = result.delivery === "email_sent" ? f.successSent : result.delivery === "whatsapp_draft" ? f.successWhatsapp : result.delivery === "email_draft" ? f.successEmailDraft : f.successSaved;
    return <div id="enquiry-form" className="contact-form-card form-success" ref={resultRef} tabIndex={-1} role="status"><span className="success-icon"><CheckCheck size={31} strokeWidth={1.5} /></span><p className="eyebrow">{f.successEyebrow}</p><h2>{heading}</h2><p>{result.message}</p><div className="enquiry-reference"><span>{f.reference}</span><strong>{result.id}</strong><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(result.id); setCopied(true); } catch { setCopied(false); } }}>{copied ? <><Check size={13} />{f.copied}</> : f.copyReference}</button></div>{result.handoffUrl && <a className={`button ${result.delivery === "whatsapp_draft" ? "button-whatsapp" : "button-blue"}`} href={result.handoffUrl} target={result.delivery === "whatsapp_draft" ? "_blank" : undefined} rel="noopener noreferrer">{result.delivery === "whatsapp_draft" ? <><MessageCircle size={18} />{f.openWhatsapp}</> : <><Mail size={18} />{f.openEmail}</>}<ArrowUpRight size={17} /></a>}<button type="button" className="text-link new-enquiry" onClick={reset}><RotateCcw size={15} />{f.sendAnother}</button></div>;
  }

  const errorFor = (field: string) => errors[field as keyof EnquiryErrors] ? <span id={`${field}-error`} className="field-error">{errors[field as keyof EnquiryErrors]}</span> : null;

  return <form className="contact-form-card" id="enquiry-form" ref={formRef} onSubmit={submit} noValidate aria-label={f.title}><div className="form-title"><div><h2>{f.title}</h2><p>{f.subtitle}</p></div><span className="form-title-icon"><ArrowUpRight size={24} strokeWidth={1.4} /></span></div>
    <fieldset disabled={pending} className="form-fields"><legend className="sr-only">{f.title}</legend><div className="channel-switch" role="group" aria-label={f.title}><button type="button" aria-pressed={channel === "email"} className={channel === "email" ? "selected" : ""} onClick={() => { setChannel("email"); requestId.current = ""; }}><Mail size={17} />{f.emailTab}{channel === "email" && <Check size={14} />}</button><button type="button" aria-pressed={channel === "whatsapp"} className={channel === "whatsapp" ? "selected" : ""} onClick={() => { setChannel("whatsapp"); requestId.current = ""; }}><MessageCircle size={17} />{f.whatsappTab}{channel === "whatsapp" && <Check size={14} />}</button></div>
      <div className="form-field"><label htmlFor="name">{f.name} <span>*</span></label><input id="name" name="name" value={fields.name} onChange={event => update("name", event.target.value)} placeholder={f.namePlaceholder} autoComplete="organization" required maxLength={160} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errorFor("name")}</div>
      <div className="form-row"><div className="form-field"><label htmlFor="email">{f.email} <span>*</span></label><input id="email" type="email" name="email" value={fields.email} onChange={event => update("email", event.target.value)} placeholder={f.emailPlaceholder} autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errorFor("email")}</div><div className="form-field"><label htmlFor="mobile">{f.mobile} <span>*</span></label><input id="mobile" type="tel" name="mobile" value={fields.mobile} onChange={event => update("mobile", event.target.value)} placeholder={f.mobilePlaceholder} autoComplete="tel" required maxLength={40} aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? "mobile-error" : undefined} />{errorFor("mobile")}</div></div>
      <div className="form-field"><label htmlFor="service">{f.interest}</label><div className="select-wrap"><select id="service" name="service" value={fields.serviceIndex} onChange={event => update("serviceIndex", Number(event.target.value))} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>{enquiryServices.map((service, index) => <option key={service} value={index}>{service}</option>)}</select><ChevronDown size={17} /></div>{errorFor("service")}</div>
      <div className="form-field message-field"><label htmlFor="message">{f.message} <span>*</span></label><textarea id="message" name="message" value={fields.message} onChange={event => update("message", event.target.value)} placeholder={f.messagePlaceholder} maxLength={1500} rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={`message-count${errors.message ? " message-error" : ""}`} /><div className="message-meta"><span>{errors.message ? errorFor("message") : f.messageNote}</span><span id="message-count" className={fields.message.length >= 1450 ? "near-limit" : ""}>{fields.message.length.toLocaleString("en-GB")} / 1,500</span></div></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={event => update("website", event.target.value)} /></div>
      <div className="consent-field"><label><input type="checkbox" name="consent" checked={fields.consent} onChange={event => update("consent", event.target.checked)} required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} /><span>{f.consent} <Link href="/privacy" target="_blank" rel="noopener noreferrer">{f.consentPolicy}</Link> {f.consentEnd} <span className="required-mark">*</span></span></label>{errors.consent && <span id="consent-error" className="field-error">{errors.consent}</span>}</div>
      {channel === "email" && !emailDeliveryEnabled && <p className="delivery-note"><CircleAlert size={14} />{emailConfigured ? f.deliveryEmailDraft : f.deliveryEmailSetup}</p>}{channel === "whatsapp" && <p className="delivery-note"><MessageCircle size={14} />{whatsappConfigured ? f.deliveryWhatsapp : f.deliveryWhatsappNoRecipient}</p>}
      {errors.form && <div className="form-error" role="alert"><CircleAlert size={18} /><span>{errors.form}</span></div>}
      <button type="submit" className={`button form-submit ${channel === "whatsapp" ? "button-whatsapp" : "button-blue"}`} disabled={pending}>{pending ? <><LoaderCircle size={18} className="spin" />{f.saving}</> : <>{channel === "whatsapp" ? f.submitWhatsapp : f.submitEmail}<ArrowUpRight size={19} /></>}</button><div className="form-reassurance"><ShieldCheck size={14} /><span>{f.reassurance}</span><ArrowRight size={13} /></div>
    </fieldset></form>;
}
