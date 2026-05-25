import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { requireUser } from '$lib/server/auth/guard';
import { db } from '$lib/db';
import { events, news, programs } from '$lib/db/schema';

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const [[p], [n], [e]] = await Promise.all([
		db.select({ count: sql<number>`count(*)::int` }).from(programs),
		db.select({ count: sql<number>`count(*)::int` }).from(news),
		db.select({ count: sql<number>`count(*)::int` }).from(events)
	]);

	return {
		stats: {
			programs: p.count,
			news: n.count,
			events: e.count
		}
	};
};
