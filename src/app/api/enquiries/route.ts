import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { getContactDetails } from "@/lib/contact";
import { type EnquiryPayload, type EnquiryResult, validateEnquiry } from "@/lib/enquiry-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const responseHeaders = { "Cache-Control": "no-store" };

function messageText(data: EnquiryPayload, id: string) {
  return `ZAPAL SK — Website enquiry\n\nName / company: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nInterest: ${data.service}\n\n${data.message}\n\nEnquiry reference: ${id}\nThe sender agreed to be contacted about this enquiry.`;
}

function resultFor(data: EnquiryPayload, id: string, delivery: string): EnquiryResult {
  const contact = getContactDetails();
  const text = messageText(data, id);
  if (data.channel === "whatsapp") return { id, delivery: "whatsapp_draft", handoffUrl: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, recipientConfigured: Boolean(contact.whatsapp), message: contact.whatsapp ? "Your enquiry has been saved and your WhatsApp message is ready. Review it and press Send in WhatsApp to complete your message." : "Your enquiry has been saved. A direct WhatsApp number has not yet been configured. Select your ZAPAL SK contact in WhatsApp, then review and send the prepared message." };
  if (delivery === "email_sent") return { id, delivery, handoffUrl: null, recipientConfigured: true, message: "Your enquiry has been saved and the email notification was successfully submitted to our mail service. Thank you for getting in touch." };
  if (contact.email) return { id, delivery: delivery === "email_failed" ? "email_failed" : "email_draft", handoffUrl: `mailto:${contact.email}?subject=${encodeURIComponent(`ZAPAL SK enquiry — ${data.service}`)}&body=${encodeURIComponent(text)}`, recipientConfigured: true, message: delivery === "email_failed" ? "Your enquiry has been saved, but the email notification could not be delivered. You can send the prepared message using your email app below. Please keep your reference." : "Your enquiry has been saved. Open your email app, review the prepared message, and press Send to email it to our team." };
  return { id, delivery: "saved", handoffUrl: null, recipientConfigured: false, message: "Your enquiry is securely saved with the reference below. Direct email delivery is not configured yet, so no email has been sent. Please keep your reference for follow-up." };
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const allowedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
    if (origin) {
      let originHost = "";
      try { originHost = new URL(origin).host; } catch { /* An invalid or null origin is not trusted. */ }
      if (!originHost || originHost !== allowedHost) return NextResponse.json({ error: "This request origin is not allowed." }, { status: 403, headers: responseHeaders });
    }
    if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Please submit your enquiry as JSON." }, { status: 415, headers: responseHeaders });
    if (Number(request.headers.get("content-length") || 0) > 20000) return NextResponse.json({ error: "Your enquiry is too large." }, { status: 413, headers: responseHeaders });
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 20000) return NextResponse.json({ error: "Your enquiry is too large." }, { status: 413, headers: responseHeaders });
    let input: unknown;
    try { input = JSON.parse(raw); } catch { return NextResponse.json({ error: "Please provide a valid enquiry." }, { status: 400, headers: responseHeaders }); }
    const parsed = validateEnquiry(input);
    if (!parsed.success) return NextResponse.json({ error: "Please check the highlighted fields.", errors: parsed.errors }, { status: 400, headers: responseHeaders });
    const data = parsed.data;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
    const ipHash = createHash("sha256").update(`${process.env.RATE_LIMIT_SALT || "zapal-enquiry-rate-limit"}:${ip}`).digest("hex");
    const stored = await db.transaction(async tx => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${ipHash}))`);
      const [existing] = await tx.select().from(enquiries).where(eq(enquiries.requestId, data.requestId)).limit(1);
      if (existing) return { kind: "existing" as const, record: existing };
      const [recent] = await tx.select({ total: count() }).from(enquiries).where(and(eq(enquiries.ipHash, ipHash), gte(enquiries.createdAt, new Date(Date.now() - 15 * 60 * 1000))));
      if (recent.total >= 5) return { kind: "limited" as const };
      const [record] = await tx.insert(enquiries).values({ requestId: data.requestId, name: data.name, email: data.email, mobile: data.mobile, service: data.service, message: data.message, channel: data.channel, consent: data.consent, ipHash, deliveryStatus: data.channel === "whatsapp" ? "whatsapp_draft" : "saved" }).onConflictDoNothing({ target: enquiries.requestId }).returning();
      if (!record) return { kind: "conflict" as const };
      return { kind: "created" as const, record };
    });
    if (stored.kind === "limited") return NextResponse.json({ error: "You’ve sent several enquiries recently. Please wait 15 minutes before trying again." }, { status: 429, headers: { ...responseHeaders, "Retry-After": "900" } });
    if (stored.kind === "conflict") return NextResponse.json({ error: "This request is already being processed. Please try again in a moment." }, { status: 409, headers: responseHeaders });
    const record = stored.record;
    if (stored.kind === "existing") {
      if (record.name !== data.name || record.email !== data.email || record.mobile !== data.mobile || record.message !== data.message || record.service !== data.service || record.channel !== data.channel) return NextResponse.json({ error: "This request reference is already in use. Please refresh before sending a new enquiry." }, { status: 409, headers: responseHeaders });
      return NextResponse.json(resultFor(data, record.id, record.deliveryStatus), { headers: responseHeaders });
    }
    let delivery = record.deliveryStatus;
    const contact = getContactDetails();
    if (data.channel === "email" && contact.emailDeliveryEnabled) {
      try {
        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: process.env.SMTP_SECURE === "true" || port === 465, auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, disableFileAccess: true, disableUrlAccess: true });
        const info = await transporter.sendMail({ from: process.env.SMTP_FROM, to: contact.email, replyTo: { name: data.name, address: data.email }, subject: `ZAPAL SK enquiry — ${data.service}`, text: messageText(data, record.id) });
        if (!info.accepted?.length) throw new Error("No accepted SMTP recipients");
        delivery = "email_sent";
      } catch (error) {
        console.error("Enquiry email notification failed:", error instanceof Error ? error.name : "SMTP failure");
        delivery = "email_failed";
      }
      await db.update(enquiries).set({ deliveryStatus: delivery }).where(eq(enquiries.id, record.id));
    } else if (data.channel === "email" && contact.email) {
      delivery = "email_draft";
      await db.update(enquiries).set({ deliveryStatus: delivery }).where(eq(enquiries.id, record.id));
    }
    return NextResponse.json(resultFor(data, record.id, delivery), { status: 201, headers: responseHeaders });
  } catch (error) {
    console.error("Enquiry storage failed:", error instanceof Error ? error.name : "Unknown error");
    return NextResponse.json({ error: "We couldn’t save your enquiry right now. Your form has been kept — please try again shortly." }, { status: 503, headers: responseHeaders });
  }
}

export async function GET(request: NextRequest) {
  const secret = process.env.ENQUIRY_ADMIN_TOKEN;
  if (!secret) return NextResponse.json({ error: "Not found" }, { status: 404, headers: responseHeaders });
  const provided = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const expectedBuffer = Buffer.from(secret);
  const actualBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { ...responseHeaders, "WWW-Authenticate": "Bearer" } });
  try {
    const rows = await db.select({ id: enquiries.id, name: enquiries.name, email: enquiries.email, mobile: enquiries.mobile, service: enquiries.service, message: enquiries.message, channel: enquiries.channel, deliveryStatus: enquiries.deliveryStatus, createdAt: enquiries.createdAt }).from(enquiries).orderBy(desc(enquiries.createdAt)).limit(100);
    return NextResponse.json({ enquiries: rows }, { headers: responseHeaders });
  } catch { return NextResponse.json({ error: "Enquiries are temporarily unavailable." }, { status: 503, headers: responseHeaders }); }
}
