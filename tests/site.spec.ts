import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

const basePayload = () => ({ name: "Website QA Company", email: "website.qa@example.com", mobile: "+421900000000", service: "General enquiry", message: "Website QA enquiry. This is an automated functionality check, not a real customer request.", channel: "email", consent: true, requestId: randomUUID(), website: "" });

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
  await expect(page.locator("select[name=service]")).toHaveValue("Supply Chain Planning");
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
  await expect(page.getByRole("heading", { name: "Your enquiry is saved." })).toBeVisible();
  await expect(page.locator(".enquiry-reference strong")).toHaveText(/^[0-9a-f-]{36}$/);
  await expect(page.getByText("Direct email delivery is not configured yet", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Send another enquiry" }).click();
  await expect(page.locator("input[name=name]")).toHaveValue("");
  await expect(page.locator("iframe[title^='Interactive map']")).toHaveAttribute("src", /Obchodn/);
  await page.screenshot({ path: "artifacts/contacts-desktop.png", fullPage: true });
});

test("WhatsApp preserves all contact details in a draft", async ({ page, context }) => {
  await context.route("https://wa.me/**", route => route.fulfill({ status: 200, contentType: "text/plain", body: "WhatsApp draft handoff verified. No message was sent." }));
  await page.goto("/contacts?channel=whatsapp&service=Partnership%20opportunity");
  await expect(page.locator("select[name=service]")).toHaveValue("Partnership opportunity");
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
  expect(href).toMatch(/^https:\/\/wa\.me\/\?text=/);
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
  await page.locator("#mobile-navigation").getByRole("link", { name: "Cables", exact: true }).click();
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
