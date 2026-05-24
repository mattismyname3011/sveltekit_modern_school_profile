/**
 * Admin resource registry.
 *
 * Each resource declares:
 *   - field shape used by the generic form/list
 *   - the Zod schemas (re-used from the API layer)
 *   - the repository (re-used from the API layer)
 *
 * Adding a new resource = register it here. The admin pages auto-pick it up.
 */
import type { ZodSchema } from 'zod';
import { programsRepo } from '$lib/server/repositories/programs';
import { newsRepo } from '$lib/server/repositories/news';
import { eventsRepo } from '$lib/server/repositories/events';
import {
	createProgramSchema,
	updateProgramSchema
} from '$lib/server/api/schemas/programs';
import { createNewsSchema, updateNewsSchema } from '$lib/server/api/schemas/news';
import { createEventSchema, updateEventSchema } from '$lib/server/api/schemas/events';

export type FieldKind = 'text' | 'textarea' | 'url' | 'longtext';

export type AdminField = {
	name: string;
	label: string;
	kind: FieldKind;
	hint?: string;
	required?: boolean;
	/** Show in list view as a column. Default false. */
	listColumn?: boolean;
};

/**
 * Loose typing for the repos: routes only call list/findById/create/update/remove.
 * `unknown` keeps the contract narrow without type gymnastics.
 */
export type RepoLike = {
	list(opts: { limit: number; offset: number }): Promise<{ rows: unknown[]; total: number }>;
	findById(id: number): Promise<unknown>;
	create(input: unknown): Promise<unknown>;
	update(id: number, input: unknown): Promise<unknown>;
	remove(id: number): Promise<unknown>;
};

export type AdminResource = {
	slug: string;
	label: string;
	plural: string;
	repo: RepoLike;
	createSchema: ZodSchema;
	updateSchema: ZodSchema;
	fields: AdminField[];
};

const programsResource: AdminResource = {
	slug: 'programs',
	label: 'Program',
	plural: 'Programs',
	repo: programsRepo as unknown as RepoLike,
	createSchema: createProgramSchema,
	updateSchema: updateProgramSchema,
	fields: [
		{ name: 'title', label: 'Title', kind: 'text', required: true, listColumn: true },
		{ name: 'tag', label: 'Tag', kind: 'text', required: true, listColumn: true },
		{ name: 'excerpt', label: 'Excerpt', kind: 'textarea', required: true },
		{ name: 'image', label: 'Image URL', kind: 'url', required: true },
		{
			name: 'post',
			label: 'Long content',
			kind: 'longtext',
			hint: 'Optional. Markdown or plain text up to 20000 chars.'
		}
	]
};

const newsResource: AdminResource = {
	slug: 'news',
	label: 'News',
	plural: 'News',
	repo: newsRepo as unknown as RepoLike,
	createSchema: createNewsSchema,
	updateSchema: updateNewsSchema,
	fields: [
		{ name: 'category', label: 'Category', kind: 'text', required: true, listColumn: true },
		{ name: 'date', label: 'Date label', kind: 'text', required: true, listColumn: true, hint: 'e.g. "12 Mei 2026"' },
		{ name: 'title', label: 'Title', kind: 'text', required: true, listColumn: true },
		{ name: 'excerpt', label: 'Excerpt', kind: 'textarea', required: true },
		{ name: 'image', label: 'Image URL', kind: 'url', required: true }
	]
};

const eventsResource: AdminResource = {
	slug: 'events',
	label: 'Event',
	plural: 'Events',
	repo: eventsRepo as unknown as RepoLike,
	createSchema: createEventSchema,
	updateSchema: updateEventSchema,
	fields: [
		{ name: 'date', label: 'Date label', kind: 'text', required: true, listColumn: true, hint: 'e.g. "12 Jun 2026"' },
		{ name: 'dateDay', label: 'Day', kind: 'text', required: true, hint: '1–2 digits, e.g. "12"' },
		{ name: 'dateMonth', label: 'Month', kind: 'text', required: true, hint: 'Short label, e.g. "Jun"' },
		{ name: 'title', label: 'Title', kind: 'text', required: true, listColumn: true },
		{ name: 'excerpt', label: 'Excerpt', kind: 'textarea', required: true },
		{ name: 'image', label: 'Image URL', kind: 'url', required: true },
		{ name: 'time', label: 'Time', kind: 'text', required: true, hint: 'e.g. "08:00 WITA"' },
		{ name: 'location', label: 'Location', kind: 'text', required: true, listColumn: true }
	]
};

export const ADMIN_RESOURCES: Record<string, AdminResource> = {
	programs: programsResource,
	news: newsResource,
	events: eventsResource
};

export function findAdminResource(slug: string): AdminResource | null {
	return ADMIN_RESOURCES[slug] ?? null;
}

export function listAdminResources(): AdminResource[] {
	return Object.values(ADMIN_RESOURCES);
}
