import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

const basePayload = () => ({ name: "Website QA Company", email: "website.qa@example.com", mobile: "+421900000000", service: "General enquiry", message: "Website QA enquiry. This is an automated functionality check, not a real customer request.", channel: "email", consent: true, requestId: randomUUID(), website: "" });

// Pin the UI language to English so label-based assertions are deterministic
// regardless of the test runner's browser language.
test.beforeEach(async ({ context, baseURL }) => {
  const host = new URL(baseURL || "http://127.0.0.1:3000").hostname;
  await context.addCookies([{ name: "zapal_locale", value: "en", domain: host, path: "/" }]);
});

test("homepage, carousel, materials navigation, and imagery", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Connecting supply.");
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Smarter planning.");
  await page.getByRole("button", { name: "Previous slide", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Connecting supply.");
  await page.getByRole("button", { name: "Show materials categories" }).click();
  await expect(page.locator("#materials-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#materials-menu")).toHaveCount(0);
  await expect(page.locator(".service-card")).toHaveCount(3);
  await page.locator("#solutions").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.locator(".home-about").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await expect.poll(() => page.locator(".hero-photograph img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/home-first-screen.png" });
  expect(errors).toEqual([]);
});

test("all sitemap routes are available and FAQs expand", async ({ page, request }) => {
  for (const path of ["/materials", "/materials/electrical-components", "/materials/cables", "/materials/computer-systems", "/supply-chain", "/logistics", "/about", "/partners", "/contacts", "/privacy", "/sitemap.xml", "/robots.txt"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  expect((await request.get("/not-a-real-page")).status()).toBe(404);
  await page.goto("/supply-chain");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Supply Chain Planning");
  const question = page.getByRole("button", { name: "Can you improve an existing supply chain?" });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Yes. We can review the way your current network operates", { exact: false })).toBeVisible();
  await page.getByRole("link", { name: "Discuss your requirements" }).click();
  // The select now stores an index; assert on the selected option's visible label.
  await expect(page.locator("select[name=service] option:checked")).toHaveText("Supply Chain Planning");
});

test("navigation hierarchy matches the ZAPAL SK sitemap", async ({ page }) => {
  await page.goto("/");
  // Top-level branches of the sitemap.
  await expect(page.locator(".desktop-nav .nav-link")).toHaveText(["Materials & Supply", "Supply Chain", "Logistics", "About us", "Partners", "Contacts"]);
  // Materials sub-branches (Electrical / Cables / Computer systems).
  await page.locator(".dropdown-toggle").click();
  await expect(page.locator("#materials-menu a")).toHaveText(["Electrical Systems & Components", "Cables & Connectivity", "Computer Systems", "Explore all materials"]);
  // Full labels shown in the mobile menu, matching the sitemap wording.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-navigation > div > a")).toHaveText([
    "Materials & Supply", "Supply Chain Planning & Consulting", "Logistics & Transportation", "About us", "Partners", "Contacts",
  ]);
  await expect(page.locator(".mobile-subnav a")).toHaveText(["Electrical Systems & Components", "Cables & Connectivity", "Computer Systems"]);
});

test("About page shows the company story, supply-chain flow, and translates", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".about-story-head h2")).toHaveText("Connecting Technology, Supply and Logistics");
  await expect(page.locator(".about-story-intro p")).toHaveCount(3);
  await expect(page.locator(".about-story-block h3")).toHaveText(["From Requirement to Delivery", "Experience Built on Real Projects"]);
  await expect(page.locator(".supply-flow-step")).toHaveCount(7);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Requirement");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Final Delivery");
  await expect(page.getByText("We do not simply move goods.", { exact: false })).toBeVisible();
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".about-story-head h2")).toHaveText("Зʼєднуємо технології, постачання та логістику");
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Вимога");
});

test("Partners page shows the network story, segments, and translates", async ({ page }) => {
  await page.goto("/partners");
  await expect(page.locator(".partner-story-head h2")).toHaveText("Strong Manufacturers. Direct Cooperation. Reliable Supply.");
  await expect(page.locator(".partner-story-intro p")).toHaveCount(4);
  await expect(page.locator(".segment-card")).toHaveCount(6);
  await expect(page.locator(".segment-card h3").first()).toHaveText("Optical Technologies & Components");
  await expect(page.locator(".partner-closing-strong")).toContainText("We find the right source.");
  // Featured DJI partner logo is shown, loads, and is labelled with its name.
  const djiLogo = page.locator('.partner-logo-card img[alt="DJI"]');
  await expect(djiLogo).toBeVisible();
  await expect(djiLogo).toHaveJSProperty("complete", true);
  expect(await djiLogo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".partner-logo-name")).toHaveText(["DJI", "ZTO Cable", "ZTT", "YICHOU", "MONEYPRO"]);
  for (const alt of ["ZTO Cable", "ZTT", "YICHOU", "MONEYPRO"]) {
    const logo = page.locator(`.partner-logo-card img[alt="${alt}"]`);
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator('.partner-logo-card[href="https://ztockable.com"]')).toHaveCount(1);
  await expect(page.locator('.partner-logo-card[href="https://zttgroup.com"]')).toHaveCount(1);
  await expect(page.locator('.partner-logo-card[href="https://nbyichou.com"]')).toHaveCount(1);
  await expect(page.locator('.partner-logo-card[href="https://www.moneyprouav.com/"]')).toHaveCount(1);
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".partner-story-head h2")).toHaveText("Сильні виробники. Пряма співпраця. Надійне постачання.");
  await expect(page.locator(".segment-card h3").first()).toHaveText("Оптичні технології та компоненти");
});

test("Logistics page shows the international story, modes, flow, and translates", async ({ page }) => {
  await page.goto("/logistics");
  await expect(page.locator(".logistics-story-head h2")).toHaveText("International Logistics. From Origin to Final Destination.");
  await expect(page.locator(".logistics-story-intro p")).toHaveCount(4);
  await expect(page.locator(".logistics-modes .segment-card h3")).toHaveText(["Sea Freight", "Air Freight", "Ground Logistics", "Multimodal Transportation"]);
  await expect(page.locator(".logistics-block h3")).toHaveText(["Cross-Border Logistics", "Customs & Documentation Support", "Dangerous & Special Cargo", "Warehousing & Transit Network"]);
  await expect(page.locator(".supply-flow-step")).toHaveCount(8);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Factory collection");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Final delivery");
  await expect(page.locator(".logistics-flow-strong")).toContainText("we manage the journey");
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2")).toHaveText("Міжнародна логістика. Від джерела до кінцевого пункту.");
  await expect(page.locator(".logistics-modes .segment-card h3").first()).toHaveText("Морські перевезення");
});

test("Supply Chain page shows the management story, checklist, flows, and translates", async ({ page }) => {
  await page.goto("/supply-chain");
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("We Design the Supply Chain. We Help You Run It.");
  await expect(page.locator(".scm-checklist li")).toHaveCount(9);
  await expect(page.locator(".logistics-block h3")).toHaveText(["Sourcing & Supplier Strategy", "Supply Chain Optimization", "Supply Chain Consulting", "From Consulting to Execution"]);
  await expect(page.locator(".scm-execution-flow .supply-flow-label")).toHaveText(["Analyze", "Design", "Source", "Procure", "Coordinate", "Deliver"]);
  await expect(page.locator(".logistics-flow-strong")).toContainText("We help build them and make them work");
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Ми проєктуємо ланцюг постачання. Ми допомагаємо ним керувати.");
  await expect(page.locator(".scm-execution-flow .supply-flow-label").first()).toHaveText("Аналіз");
});

test("Materials page shows the sourcing story, categories, flow, and translates", async ({ page }) => {
  await page.goto("/materials");
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("From Manufacturer to Your Project");
  await expect(page.locator(".material-grid .service-card")).toHaveCount(3);
  await expect(page.locator(".segment-card h3")).toHaveText(["Electrical Systems & Components", "Fiber Optics & Cable Solutions", "Optical Technologies", "Cameras & Imaging Equipment", "Antennas & Communication Equipment", "Computer Systems & Spare Parts"]);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Requirement analysis");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Final delivery");
  await expect(page.locator(".logistics-flow-strong")).toContainText("from the right manufacturer");
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Від виробника до вашого проєкту");
  await expect(page.locator(".segment-card h3").first()).toHaveText("Електричні системи та компоненти");
});

test("Electrical components category shows its detailed story and translates", async ({ page }) => {
  await page.goto("/materials/electrical-components");
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Reliable Components. Direct Sourcing. International Supply.");
  await expect(page.locator(".component-checklist li")).toHaveCount(10);
  await expect(page.locator(".logistics-block h3")).toHaveText(["Spare Parts & Replacement Components", "Technical & Commercial Coordination"]);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Technical Requirement");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Final Delivery");
  await expect(page.locator(".logistics-flow-strong")).toContainText("We identify the source and organize the supply");
  // Translates with the language switcher.
  await page.goto("/materials/electrical-components");
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Надійні компоненти. Прямий підбір. Міжнародне постачання.");
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Технічна вимога");
});

test("Cables category shows its detailed story and translates", async ({ page }) => {
  await page.goto("/materials/cables");
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Connectivity and Power for Every Project");
  await expect(page.locator(".component-checklist")).toHaveCount(0);
  await expect(page.locator(".logistics-block h3")).toHaveText(["Fiber Optic Cables", "Power Cables", "Solar Cables", "Special Cables", "Direct Manufacturer Sourcing"]);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Technical Specification");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Final Delivery");
  await expect(page.locator(".logistics-flow-strong")).toContainText("The right cable. The right manufacturer.");
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Звʼязок та енергія для кожного проєкту");
  await expect(page.locator(".logistics-block h3").first()).toHaveText("Оптоволоконні кабелі");
});

test("Computer Systems category shows its detailed story and translates", async ({ page }) => {
  await page.goto("/materials/computer-systems");
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Computing Solutions, Components & Spare Parts");
  await expect(page.locator(".component-checklist li")).toHaveCount(9);
  await expect(page.locator(".logistics-block h3")).toHaveText(["Spare Parts & Replacement Components", "Technical & Commercial Coordination", "International Supply & Logistics"]);
  await expect(page.locator(".supply-flow-label").first()).toHaveText("Specification / BOM");
  await expect(page.locator(".supply-flow-label").last()).toHaveText("Delivery");
  await expect(page.locator(".logistics-flow-strong")).toContainText("From specification to system.");
  // Translates with the language switcher.
  await page.locator(".lang-trigger").click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator(".logistics-story-head h2").first()).toHaveText("Обчислювальні рішення, компоненти та запчастини");
  await expect(page.locator(".logistics-flow-strong")).toContainText("Від специфікації до системи");
});

test("contact validation, character cap, and persistent enquiry", async ({ page }) => {
  await page.goto("/contacts");
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.locator("input[name=name]")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Please enter a valid email address.", { exact: true })).toBeVisible();
  await page.locator("textarea[name=message]").fill("a".repeat(1500));
  await expect(page.locator("#message-count")).toHaveText("1,500 / 1,500");
  await page.locator("textarea[name=message]").press("End");
  await page.locator("textarea[name=message]").press("b");
  expect((await page.locator("textarea[name=message]").inputValue()).length).toBe(1500);
  await page.locator("input[name=name]").fill("Website QA Company");
  await page.locator("input[name=email]").fill("website.qa@example.com");
  await page.locator("input[name=mobile]").fill("+421900000000");
  await page.locator("textarea[name=message]").fill("Website QA enquiry. This is an automated functionality check, not a real customer request.");
  await page.locator("input[name=consent]").check();
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  // With CONTACT_EMAIL set but no SMTP, the enquiry is saved and a mailto draft is prepared.
  await expect(page.getByRole("heading", { name: /Your email is ready\.|Your enquiry is saved\.|Message sent\./ })).toBeVisible();
  await expect(page.locator(".enquiry-reference strong")).toHaveText(/^[0-9a-f-]{36}$/);
  await page.getByRole("button", { name: "Send another enquiry" }).click();
  await expect(page.locator("input[name=name]")).toHaveValue("");
  await expect(page.locator(".map-container iframe")).toHaveAttribute("src", /Vajnorsk/);
  await page.screenshot({ path: "artifacts/contacts-desktop.png", fullPage: true });
});

test("WhatsApp preserves all contact details in a draft", async ({ page, context }) => {
  await context.route("https://wa.me/**", route => route.fulfill({ status: 200, contentType: "text/plain", body: "WhatsApp draft handoff verified. No message was sent." }));
  await page.goto("/contacts?channel=whatsapp&service=Partnership%20opportunity");
  await expect(page.locator("select[name=service] option:checked")).toHaveText("Partnership opportunity");
  await page.locator("input[name=name]").fill("Website QA Partner");
  await page.locator("input[name=email]").fill("website.qa.whatsapp@example.com");
  await page.locator("input[name=mobile]").fill("+421900000000");
  await page.locator("textarea[name=message]").fill("Website QA WhatsApp draft. No external message should be sent.");
  await page.locator("input[name=consent]").check();
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Continue in WhatsApp", exact: true }).click();
  const popup = await popupPromise;
  await expect(page.getByRole("heading", { name: "Ready for WhatsApp." })).toBeVisible();
  const href = await page.getByRole("link", { name: "Open WhatsApp" }).getAttribute("href");
  // WhatsApp recipient is configured, so the draft targets the real number.
  expect(href).toMatch(/^https:\/\/wa\.me\/42190395489\?text=/);
  const text = new URL(href!).searchParams.get("text")!;
  expect(text).toContain("Website QA Partner");
  expect(text).toContain("website.qa.whatsapp@example.com");
  expect(text).toContain("+421900000000");
  expect(text).toContain("Partnership opportunity");
  expect(text).toContain("No external message should be sent.");
  await popup.close();
});

test("mobile navigation and contact form have no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  // The mobile menu shows the full "Logistics & Transportation" label.
  await expect(page.locator("#mobile-navigation").getByRole("link", { name: "Logistics & Transportation", exact: true })).toBeVisible();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Cables & Connectivity", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cables & Connectivity");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await page.goto("/");
  await page.waitForTimeout(700);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.goto("/contacts");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator("#enquiry-form").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "artifacts/contacts-mobile.png", fullPage: true });
});

test("API rejects invalid input, protects data, and prevents duplicate submissions", async ({ request }) => {
  expect((await request.get("/api/enquiries")).status()).toBe(404);
  expect((await request.post("/api/enquiries", { data: { ...basePayload(), message: "a".repeat(1501) } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...basePayload(), consent: false } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...basePayload(), email: "invalid" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...basePayload(), website: "spam" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: basePayload(), headers: { Origin: "https://untrusted.example" } })).status()).toBe(403);
  const payload = { ...basePayload(), email: "website.qa.api@example.com" };
  const first = await request.post("/api/enquiries", { data: payload });
  expect(first.status()).toBe(201);
  const second = await request.post("/api/enquiries", { data: payload });
  expect(second.status()).toBe(200);
  expect((await first.json()).id).toBe((await second.json()).id);
});

test("API rate limits excessive submissions", async ({ request }) => {
  const headers = { "X-Forwarded-For": "198.51.100.47" };
  for (let index = 0; index < 5; index++) {
    const response = await request.post("/api/enquiries", { data: { ...basePayload(), email: "website.qa.ratelimit@example.com" }, headers });
    expect(response.status(), `submission ${index + 1}`).toBe(201);
  }
  const response = await request.post("/api/enquiries", { data: { ...basePayload(), email: "website.qa.ratelimit@example.com" }, headers });
  expect(response.status()).toBe(429);
  expect(response.headers()["retry-after"]).toBe("900");
});

test("language switcher: top-right, three languages, translates and persists", async ({ page }) => {
  await page.goto("/");
  const trigger = page.locator(".lang-trigger");
  await expect(trigger).toBeVisible();
  const box = await trigger.boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  expect(box!.x + box!.width, "switcher is right-aligned").toBeGreaterThan(vw - 130);
  expect(box!.y, "switcher is at the top").toBeLessThan(40);

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".desktop-nav .nav-link").first()).toHaveText("Materials & Supply");

  await trigger.click();
  await expect(page.locator(".lang-menu .lang-name")).toHaveText(["Slovensky", "English", "Česky", "Українська"]);

  await page.locator('.lang-menu button:has-text("Slovensky")').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "sk");
  await expect(page.locator(".desktop-nav .nav-link").first()).toHaveText("Materiály a dodávky");
  await expect(page.locator(".nav-cta")).toContainText("Kontaktujte");
  // The whole page body translates, not just the nav.
  await expect(page.locator("h1").first()).toContainText("Spájame dodávky");
  await expect(page.locator(".promise h2").first()).toContainText("Kvalita");
  await expect(page.locator(".cta-banner h2")).toContainText("Posuňme vaše podnikanie");

  await trigger.click();
  await page.locator('.lang-menu button:has-text("Česky")').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page.locator(".desktop-nav .nav-link").nth(1)).toHaveText("Dodavatelský řetězec");

  // Ukrainian translates the whole page too.
  await trigger.click();
  await page.locator('.lang-menu button:has-text("Українська")').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await expect(page.locator(".desktop-nav .nav-link").first()).toHaveText("Матеріали та постачання");
  await expect(page.locator("h1").first()).toContainText("Зʼєднуємо постачання");
  await expect(page.locator(".cta-banner h2")).toContainText("Рухаймо ваш бізнес");

  // Persists across navigation
  await page.goto("/contacts");
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await expect(page.locator(".lang-code")).toHaveText("UA");
});

test("header menu is sticky and stays pinned while scrolling", async ({ page }) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).toHaveCSS("position", "sticky");
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  const box = (await header.boundingBox())!;
  expect(box.y, "header stays pinned to the top").toBeLessThanOrEqual(1);
  await expect(page.locator(".desktop-nav .nav-link").first()).toBeVisible();
  await expect(page.locator(".site-header.scrolled")).toHaveCount(1);
  // Anchored jump is not hidden behind the sticky header.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.querySelector("#solutions")?.scrollIntoView());
  await page.waitForTimeout(400);
  const headerBox = (await header.boundingBox())!;
  const target = (await page.locator("#solutions").boundingBox())!;
  expect(target.y, "section clears the sticky header").toBeGreaterThan(headerBox.y + headerBox.height - 40);
});
