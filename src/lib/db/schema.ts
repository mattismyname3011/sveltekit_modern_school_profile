import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * programs
 * id, title, tag, excerpt, image, post, created_at, updated_at
 */
export const programs = pgTable('programs', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	tag: text('tag').notNull(),
	excerpt: text('excerpt').notNull(),
	image: text('image').notNull(),
	post: text('post'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

/**
 * news
 * id, category, date, title, excerpt, image, created_at, updated_at
 *
 * `date` is stored as text so we can keep the human-friendly format
 * (e.g. "12 Mei 2026"). Switch to `timestamp` / `date` later if you
 * want range queries.
 */
export const news = pgTable('news', {
	id: serial('id').primaryKey(),
	category: text('category').notNull(),
	date: text('date').notNull(),
	title: text('title').notNull(),
	excerpt: text('excerpt').notNull(),
	image: text('image').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

/**
 * events (Upcoming Events)
 * id, date (e.g. "12 Jun 2026"), date_day, date_month,
 * title, excerpt, image, time, location
 */
export const events = pgTable('events', {
	id: serial('id').primaryKey(),
	date: text('date').notNull(),
	dateDay: text('date_day').notNull(),
	dateMonth: text('date_month').notNull(),
	title: text('title').notNull(),
	excerpt: text('excerpt').notNull(),
	image: text('image').notNull(),
	time: text('time').notNull(),
	location: text('location').notNull()
});

// Inferred types for use in your app code
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
