import { describe, expect, it } from 'vitest';
import { createNewsSchema, updateNewsSchema, slugify } from './news';

describe('news schemas', () => {
	it('validates news with an uploaded image path', () => {
		const result = createNewsSchema.safeParse({
			category: 'Prestasi',
			date: '17 Agu 2026',
			title: 'Juara 1 Lomba Cerdas Cermat',
			slug: slugify('Juara 1 Lomba Cerdas Cermat'),
			excerpt: 'Siswa SMPN 1 Anggana meraih juara pertama.',
			image: '/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.image).toBe(
				'/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg'
			);
			expect(result.data.slug).toBe('juara-1-lomba-cerdas-cermat');
		}
	});

	it('validates partial update in updateNewsSchema with image replacement', () => {
		const result = updateNewsSchema.safeParse({
			image: '/uploads/updated-news-cover.jpg'
		});

		expect(result.success).toBe(true);
	});
});
