import { desc } from 'drizzle-orm';
import { db } from '$lib/db';
import { programs } from '$lib/db/schema';

export async function load() {
	const data = await db.select().from(programs).orderBy(desc(programs.createdAt)).limit(100);

	return {
		programs: data
	};
}
