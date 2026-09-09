"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronDown, CircleAlert, LoaderCircle, Mail, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { enquiryServices } from "@/lib/content";
import { type EnquiryErrors, type EnquiryResult, validateEnquiry } from "@/lib/enquiry-validation";

export function ContactForm({ initialService = "General enquiry", initialChannel = "email", emailConfigured, emailDeliveryEnabled, whatsappConfigured }: { initialService?: string; initialChannel?: "email" | "whatsapp"; emailConfigured: boolean; emailDeliveryEnabled: boolean; whatsappConfigured: boolean }) {
  const [fields, setFields] = useState({ name: "", email: "", mobile: "", service: initialService, message: "", consent: false, website: "" });
  const [channel, setChannel] = useState<"email" | "whatsapp">(initialChannel);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const requestId = useRef("");
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function update(field: keyof typeof fields, value: string | boolean) {
    setFields(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined, form: undefined }));
    requestId.current = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    requestId.current ||= crypto.randomUUID();
    const payload = { ...fields, channel, requestId: requestId.current };
    const validated = validateEnquiry(payload);
    if (!validated.success) {
      setErrors(validated.errors);
      const first = Object.keys(validated.errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    setErrors({});
    let popup: Window | null = null;
    if (channel === "whatsapp") {
      popup = window.open("about:blank", "_blank");
      if (popup) { popup.opener = null; popup.document.title = "ZAPAL SK — Preparing your message"; popup.document.body.textContent = "Preparing your WhatsApp message…"; }
    }
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as EnquiryResult & { error?: string; errors?: EnquiryErrors };
      if (!response.ok) { setErrors(data.errors || {}); throw new Error(data.error || "We couldn’t save your enquiry. Please try again."); }
      setResult(data);
      if (data.handoffUrl) {
        if (channel === "whatsapp" && popup) popup.location.href = data.handoffUrl;
        else if (channel === "email" && data.handoffUrl.startsWith("mailto:")) window.location.href = data.handoffUrl;
      } else popup?.close();
      requestAnimationFrame(() => { resultRef.current?.focus(); resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
    } catch (error) {
      popup?.close();
      setErrors(current => ({ ...current, form: error instanceof Error ? error.message : "A connection problem occurred. Please try again." }));
    } finally { setPending(false); submitting.current = false; }
  }

  function reset() {
    setResult(null); setErrors({}); setCopied(false); requestId.current = "";
    setFields({ name: "", email: "", mobile: "", service: initialService, message: "", consent: false, website: "" });
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("[name=name]")?.focus());
  }

  if (result) return <div id="enquiry-form" className="contact-form-card form-success" ref={resultRef} tabIndex={-1} role="status"><span className="success-icon"><CheckCheck size={31} strokeWidth={1.5} /></span><p className="eyebrow">A NEW CONNECTION STARTS HERE</p><h2>{result.delivery === "email_sent" ? "Message sent." : result.delivery === "whatsapp_draft" ? "Ready for WhatsApp." : result.delivery === "email_draft" ? "Your email is ready." : "Your enquiry is saved."}</h2><p>{result.message}</p><div className="enquiry-reference"><span>YOUR ENQUIRY REFERENCE</span><strong>{result.id}</strong><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(result.id); setCopied(true); } catch { setCopied(false); } }}>{copied ? <><Check size={13} />Copied</> : "Copy reference"}</button></div>{result.handoffUrl && <a className={`button ${result.delivery === "whatsapp_draft" ? "button-whatsapp" : "button-blue"}`} href={result.handoffUrl} target={result.delivery === "whatsapp_draft" ? "_blank" : undefined} rel="noopener noreferrer">{result.delivery === "whatsapp_draft" ? <><MessageCircle size={18} />Open WhatsApp</> : <><Mail size={18} />Open email app</>}<ArrowUpRight size={17} /></a>}<button type="button" className="text-link new-enquiry" onClick={reset}><RotateCcw size={15} />Send another enquiry</button></div>;

  const errorFor = (field: keyof typeof fields) => errors[field] ? <span id={`${field}-error`} className="field-error">{errors[field]}</span> : null;

  return <form className="contact-form-card" id="enquiry-form" ref={formRef} onSubmit={submit} noValidate aria-label="Contact enquiry form"><div className="form-title"><div><h2>What can we help you with?</h2><p>A few details are all we need to get started.</p></div><span className="form-title-icon"><ArrowUpRight size={24} strokeWidth={1.4} /></span></div>
    <fieldset disabled={pending} className="form-fields"><legend className="sr-only">Your enquiry details</legend><div className="channel-switch" role="group" aria-label="Choose your contact channel"><button type="button" aria-pressed={channel === "email"} className={channel === "email" ? "selected" : ""} onClick={() => { setChannel("email"); requestId.current = ""; }}><Mail size={17} />Email enquiry{channel === "email" && <Check size={14} />}</button><button type="button" aria-pressed={channel === "whatsapp"} className={channel === "whatsapp" ? "selected" : ""} onClick={() => { setChannel("whatsapp"); requestId.current = ""; }}><MessageCircle size={17} />WhatsApp{channel === "whatsapp" && <Check size={14} />}</button></div>
      <div className="form-field"><label htmlFor="name">Name / company name <span>*</span></label><input id="name" name="name" value={fields.name} onChange={event => update("name", event.target.value)} placeholder="Your name or company" autoComplete="organization" required maxLength={160} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errorFor("name")}</div>
      <div className="form-row"><div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" type="email" name="email" value={fields.email} onChange={event => update("email", event.target.value)} placeholder="you@company.com" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errorFor("email")}</div><div className="form-field"><label htmlFor="mobile">Mobile number <span>*</span></label><input id="mobile" type="tel" name="mobile" value={fields.mobile} onChange={event => update("mobile", event.target.value)} placeholder="+421 …" autoComplete="tel" required maxLength={40} aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? "mobile-error" : undefined} />{errorFor("mobile")}</div></div>
      <div className="form-field"><label htmlFor="service">I’m interested in</label><div className="select-wrap"><select id="service" name="service" value={fields.service} onChange={event => update("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>{enquiryServices.map(service => <option key={service} value={service}>{service}</option>)}</select><ChevronDown size={17} /></div>{errorFor("service")}</div>
      <div className="form-field message-field"><label htmlFor="message">Tell us a little about your needs <span>*</span></label><textarea id="message" name="message" value={fields.message} onChange={event => update("message", event.target.value)} placeholder="Your project, your challenge, or simply a question. We’re listening." maxLength={1500} rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={`message-count${errors.message ? " message-error" : ""}`} /><div className="message-meta"><span>{errors.message ? errorFor("message") : "Please don’t include sensitive or confidential information."}</span><span id="message-count" className={fields.message.length >= 1450 ? "near-limit" : ""}>{fields.message.length.toLocaleString("en-GB")} / 1,500</span></div></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={event => update("website", event.target.value)} /></div>
      <div className="consent-field"><label><input type="checkbox" name="consent" checked={fields.consent} onChange={event => update("consent", event.target.checked)} required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} /><span>I agree to the <Link href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</Link> and to being contacted about my enquiry. <span className="required-mark">*</span></span></label>{errors.consent && <span id="consent-error" className="field-error">{errors.consent}</span>}</div>
      {channel === "email" && !emailDeliveryEnabled && <p className="delivery-note"><CircleAlert size={14} />{emailConfigured ? "Your enquiry is saved here, then prepared in your email app for you to send." : "Your enquiry will be securely saved. Direct email delivery is being set up."}</p>}{channel === "whatsapp" && <p className="delivery-note"><MessageCircle size={14} />{whatsappConfigured ? "We’ll save your enquiry and open a prepared WhatsApp message. Press Send in WhatsApp to finish." : "We’ll save your enquiry and prepare a WhatsApp message. Select your ZAPAL SK contact to send it; a direct number is not configured yet."}</p>}
      {errors.form && <div className="form-error" role="alert"><CircleAlert size={18} /><span>{errors.form}</span></div>}
      <button type="submit" className={`button form-submit ${channel === "whatsapp" ? "button-whatsapp" : "button-blue"}`} disabled={pending}>{pending ? <><LoaderCircle size={18} className="spin" />Saving your enquiry…</> : <>{channel === "whatsapp" ? "Continue in WhatsApp" : "Send enquiry"}<ArrowUpRight size={19} /></>}</button><div className="form-reassurance"><ShieldCheck size={14} /><span>Your details are safe with us. No mailing lists, ever.</span><ArrowRight size={13} /></div>
    </fieldset></form>;
}
