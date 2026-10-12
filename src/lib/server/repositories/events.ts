import { and, asc, eq, ilike, or, sql } from 'drizzle-orm';
import { db } from '$lib/db';
import { events } from '$lib/db/schema';
import { isUpcomingEvent, sortEventsChronological } from '$lib/utils/date';
import { cleanupUnusedUpload } from '$lib/server/storage';
import type {
	CreateEventInput,
	ListEventsQuery,
	UpdateEventInput
} from '$lib/server/api/schemas/events';

/** Escape LIKE wildcards so user search can't broaden the pattern. */
function escapeLike(input: string): string {
	return input.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
}

export const eventsRepo = {
	async list(opts: ListEventsQuery) {
		if (opts.upcoming) {
			return this.listUpcoming({ limit: opts.limit, offset: opts.offset });
		}

		// `events` doesn't have created_at, so we order by id ascending as a
		// stable insertion-order proxy. Switch to a real date column later if
		// you want chronological sort by event date.
		const where = opts.q
			? or(ilike(events.title, `%${escapeLike(opts.q)}%`), ilike(events.excerpt, `%${escapeLike(opts.q)}%`))
			: undefined;

		const [rows, [{ count }]] = await Promise.all([
			db
				.select()
				.from(events)
				.where(where)
				.orderBy(asc(events.id))
				.limit(opts.limit)
				.offset(opts.offset),
			db.select({ count: sql<number>`count(*)::int` }).from(events).where(where)
		]);

		return { rows, total: count };
	},

	async listUpcoming(opts?: { limit?: number; offset?: number; referenceDate?: Date }) {
		const limit = opts?.limit ?? 5;
		const offset = opts?.offset ?? 0;
		const refDate = opts?.referenceDate ?? new Date();

		const allRows = await db.select().from(events).orderBy(asc(events.id));
		const upcomingRows = allRows.filter((e) => isUpcomingEvent(e.date, refDate));
		const sorted = sortEventsChronological(upcomingRows);
		const rows = sorted.slice(offset, offset + limit);

		return { rows, total: upcomingRows.length };
	},

	findById(id: number) {
		return db
			.select()
			.from(events)
			.where(eq(events.id, id))
			.limit(1)
			.then((rows) => rows[0] ?? null);
	},

	async create(input: CreateEventInput) {
		const [row] = await db.insert(events).values(input).returning();
		return row;
	},

	async update(id: number, input: UpdateEventInput) {
		const existing = input.image !== undefined ? await this.findById(id) : null;

		const [row] = await db
			.update(events)
			.set(input)
			.where(eq(events.id, id))
			.returning();

		if (row && existing?.image && input.image && existing.image !== input.image) {
			await cleanupUnusedUpload(existing.image);
		}

		return row ?? null;
	},

	async remove(id: number) {
		const existing = await this.findById(id);
		const [row] = await db
			.delete(events)
			.where(eq(events.id, id))
			.returning({ id: events.id });

		if (row && existing?.image) {
			await cleanupUnusedUpload(existing.image);
		}

		return row ?? null;
	}
};

