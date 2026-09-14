# ZAPAL SK

A responsive blue-and-white business website built with Next.js App Router, PostgreSQL, and Drizzle ORM. Photography and Manrope fonts are served locally.

## Site structure

- `/` — homepage with a working three-slide hero and linked services
- `/materials` — materials overview
- `/materials/electrical-components` — electrical systems and components
- `/materials/cables` — cables and connectivity
- `/materials/computer-systems` — computer systems
- `/supply-chain` — supply chain planning, consulting, and optimization
- `/logistics` — logistics and transportation
- `/about` — company introduction
- `/partners` — partnership disciplines and enquiries (no invented commercial relationships)
- `/contacts` — email/WhatsApp enquiry form and interactive address map
- `/privacy` — website privacy notice
- `/sitemap.xml` and `/robots.txt` — search engine discovery

## Contact configuration

The published company contact page at https://www.zapal.sk/Contacts/ lists:

- Zapal SK s. r. o.
- Obchodná 559/37, 811 06 Bratislava, Slovakia
- IČO 53989775
- IČ DPH SK2121542808

The published phone, `+421-90395489`, appears incomplete for a Slovak mobile number. No public email address was listed. The application deliberately does not invent either contact detail.

Copy the applicable settings from `.env.example` into your deployment environment. Do not commit secrets.

1. Set `CONTACT_EMAIL` to the verified recipient address.
2. Set `CONTACT_PHONE` and `CONTACT_WHATSAPP` to verified company numbers. WhatsApp expects an international number including its country code.
3. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` for your email provider. SMTP_FROM must be an authorized sender. Submission email addresses are used only as Reply-To, never as the SMTP sender.
4. Set unique long random values for `ENQUIRY_ADMIN_TOKEN` and `RATE_LIMIT_SALT`.
5. If changing the business address, set `CONTACT_ADDRESS`; the contact page, footer, map, and directions all use that same value.
6. Set `SITE_URL` to the production origin for metadata and sitemap URLs, then rebuild.

### Honest delivery behavior

Every valid enquiry is stored in PostgreSQL before a delivery handoff is attempted.

- With SMTP and CONTACT_EMAIL configured, the server submits an email notification and records its result.
- With only CONTACT_EMAIL configured, the form prepares a mailto draft. The visitor must send it in their mail application.
- Without an email recipient, the form still stores the enquiry and explicitly states that no email was sent.
- WhatsApp opens a URL-encoded draft containing the supplied contact details and message. The visitor must review and send it. With no configured WhatsApp recipient, a generic WhatsApp sharing composer is opened, and the interface clearly asks the visitor to select their intended ZAPAL SK contact.
- Failures never claim successful delivery. Saved references remain available and typed fields are preserved when storage fails.

## Database

`src/db/schema.ts` defines the `enquiries` table. The platform-managed runtime must be bootstrapped before applying the schema in a fresh sandbox. After that, run `npx drizzle-kit push`.

The form validates the name/company, email, mobile number, service, required consent, and message (1–1,500 UTF-16 characters, matching the browser textarea). It includes a honeypot, a 20 KB request limit, same-origin checks, an IP-hash rate limit (five submissions per 15 minutes), and an idempotency key to protect against repeat submissions. Request metadata is never publicly listed.

### Private enquiry access

`GET /api/enquiries` returns the latest 100 enquiries only when a nonempty `ENQUIRY_ADMIN_TOKEN` is set and the request supplies a matching `Authorization: Bearer …` header. It returns 404 while access is unconfigured and 401 for an invalid token. Responses are not cached. Never put the admin token in a browser-facing environment variable or public URL.

The operator is responsible for handling saved enquiries, restricting operator access, reviewing the privacy notice, and applying an appropriate retention/deletion policy before launch. No advertising analytics are installed. The embedded map connects to Google Maps and is described in the privacy notice.

## Development and verification

Install dependencies, preserve the existing DATABASE_URL, prepare the database schema, and use `npm run dev` for local development. For production validation run Next route type generation, TypeScript with noEmit, and `npm run build` before the platform-managed build/start healthcheck.

Browser checks are in `tests/site.spec.ts`. After the managed preview is running, install Chromium with `npx playwright install chromium` and run `npx playwright test`. Set `TEST_BASE_URL` if the preview is not on port 3000. Tests submit clearly labeled QA enquiries but never press Send in an external application. Run against a non-production database and without real SMTP credentials. Use `npx tsx scripts/verify-and-clean-qa.ts` to verify the test records through Drizzle. Add `--clean` to remove only records matching the known QA company-name prefix and the test example.com addresses; other enquiries are not touched.

## Assets

Images are licensed stock photography sourced from Pexels, used as illustrative backgrounds rather than representations of actual employees or assets:

- Port: Kelly, photo 6595780
- Aerial port: Ollie Craig, photo 7519262
- Warehouse: Tiger Lily, photo 4487363
- Electrical systems: ranjeet, photo 28265032
- Cables: cnrdmroglu, photo 15559037
- Logistics: Omar Gerardo, photo 34902065
- Business collaboration: Yan Krukau, photo 7693692
- Servers: panumas nikhomkhai, photo 17489160
- Bratislava: Vish Pix, photo 21625704

Icons: Lucide. Font: Manrope (SIL Open Font License).
