import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newsRepo } from '$lib/server/repositories/news';
import { renderContent } from '$lib/server/markdown';
import { recordPageView } from '$lib/server/analytics/track';

export const load: PageServerLoad = async (event) => {
	const post = await newsRepo.findBySlug(event.params.slug);
	if (!post) throw error(404, 'Berita tidak ditemukan');

	// Fire-and-forget — never block render on analytics.
	recordPageView(event, `/berita/${post.slug}`).catch((err) =>
		console.error('[analytics]', err)
	);

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
		}
	};
};
