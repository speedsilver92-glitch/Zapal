import { boolean, index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id").notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  mobile: varchar("mobile", { length: 40 }).notNull(),
  service: varchar("service", { length: 64 }).notNull(),
  message: text("message").notNull(),
  channel: varchar("channel", { length: 16 }).notNull(),
  consent: boolean("consent").notNull(),
  deliveryStatus: varchar("delivery_status", { length: 32 }).notNull().default("saved"),
  ipHash: varchar("ip_hash", { length: 64 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("enquiries_rate_limit_idx").on(table.ipHash, table.createdAt)]);
