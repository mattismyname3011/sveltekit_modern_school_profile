import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
