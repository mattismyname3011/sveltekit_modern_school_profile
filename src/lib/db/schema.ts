import { boolean, index, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

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

/**
 * users — admin / editor / viewer accounts for the dashboard.
 * Roles are stored as plain strings to keep it open-ended; enforce in code.
 */
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull().default('admin'),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	lastLoginAt: timestamp('last_login_at', { withTimezone: true })
});

/**
 * sessions — server-side session store.
 *
 * `id` is the sha256 of the random session token. We never store the raw
 * token, so even a DB compromise doesn't grant active session access.
 * The cookie holds the raw token; we hash it to look up the session.
 */
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	ip: text('ip'),
	userAgent: text('user_agent')
});

/**
 * audit_logs — append-only record of who-did-what-when.
 *
 * - Email and role are snapshot strings, not foreign keys, so the log stays
 *   useful even if the user is later deleted.
 * - `details` is JSON for free-form context (changed fields, target name, etc.).
 * - Indexed by (user_id, created_at) and (resource, created_at) for the
 *   common filter cases on the audit page.
 */
export const auditLogs = pgTable(
	'audit_logs',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id'),
		userEmail: text('user_email').notNull(),
		userRole: text('user_role').notNull(),
		action: text('action').notNull(),
		resource: text('resource').notNull(),
		resourceId: integer('resource_id'),
		details: jsonb('details'),
		ip: text('ip'),
		userAgent: text('user_agent'),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
	},
	(t) => ({
		byUser: index('audit_logs_user_idx').on(t.userId, t.createdAt),
		byResource: index('audit_logs_resource_idx').on(t.resource, t.createdAt)
	})
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
