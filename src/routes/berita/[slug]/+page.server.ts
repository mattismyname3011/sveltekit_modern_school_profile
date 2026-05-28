import { error } from '@sveltejs/kit';
import { and, desc, eq, ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { newsRepo } from '$lib/server/repositories/news';
import { renderContent } from '$lib/server/markdown';
import { recordPageView } from '$lib/server/analytics/track';
import { db } from '$lib/db';
import { news } from '$lib/db/schema';

export const load: PageServerLoad = async (event) => {
	const post = await newsRepo.findBySlug(event.params.slug);
	if (!post) throw error(404, 'Berita tidak ditemukan');

	// Fire-and-forget — never block render on analytics.
	recordPageView(event, `/berita/${post.slug}`).catch((err) =>
		console.error('[analytics]', err)
	);

	// Related posts: same category first, then any other recent posts to fill 3.
	const sameCat = await db
		.select()
		.from(news)
		.where(and(eq(news.category, post.category), ne(news.id, post.id)))
		.orderBy(desc(news.createdAt))
		.limit(3);

	let related = sameCat;
	if (related.length < 3) {
		const need = 3 - related.length;
		const filler = await db
			.select()
			.from(news)
			.where(ne(news.id, post.id))
			.orderBy(desc(news.createdAt))
			.limit(need + sameCat.length); // overshoot, then dedupe below

		const seen = new Set([post.id, ...sameCat.map((s) => s.id)]);
		for (const f of filler) {
			if (related.length >= 3) break;
			if (seen.has(f.id)) continue;
			related.push(f);
			seen.add(f.id);
		}
	}

	return {
		post: {
			id: post.id,
			title: post.title,
			slug: post.slug,
			category: post.category,
			date: post.date,
			image: post.image,
			excerpt: post.excerpt,
			contentHtml: renderContent(post.content)
		},
		related: related.slice(0, 3).map((r) => ({
			id: r.id,
			title: r.title,
			slug: r.slug,
			category: r.category,
			date: r.date,
			excerpt: r.excerpt,
			image: r.image
		}))
	};
};
