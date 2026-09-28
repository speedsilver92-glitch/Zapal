import "dotenv/config";
import { and, inArray, like } from "drizzle-orm";
import { db, pool } from "@/db";
import { enquiries } from "@/db/schema";

async function main() {
  const qaOnly = and(like(enquiries.name, "Website QA%"), inArray(enquiries.email, ["website.qa@example.com", "website.qa.whatsapp@example.com", "website.qa.api@example.com", "website.qa.ratelimit@example.com"]));
  const records = await db.select({ id: enquiries.id, channel: enquiries.channel, delivery: enquiries.deliveryStatus }).from(enquiries).where(qaOnly);
  console.log(`Verified ${records.length} clearly labeled QA enquiries in PostgreSQL.`);
  console.log("Stored delivery states:", [...new Set(records.map(row => row.delivery))].join(", ") || "none");
  if (process.argv.includes("--clean")) {
    const deleted = await db.delete(enquiries).where(qaOnly).returning({ id: enquiries.id });
    console.log(`Removed ${deleted.length} QA rows. Other enquiries were not touched.`);
  }
}

main().catch(error => { console.error("QA verification failed:", error instanceof Error ? error.message : error); process.exitCode = 1; }).finally(() => pool.end());
