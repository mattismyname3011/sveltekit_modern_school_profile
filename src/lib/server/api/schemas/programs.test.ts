import { describe, expect, it } from 'vitest';
import { createProgramSchema, updateProgramSchema } from './programs';

describe('programs schemas', () => {
	it('validates a program with an uploaded image path', () => {
		const result = createProgramSchema.safeParse({
			title: 'Ekstrakurikuler Robotik',
			tag: 'Teknologi',
			excerpt: 'Belajar merakit robot arduino.',
			image: '/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.image).toBe(
				'/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg'
			);
		}
	});

	it('validates a program with an external https URL', () => {
		const result = createProgramSchema.safeParse({
			title: 'Ekstrakurikuler Pramuka',
			tag: 'Kepanduan',
			excerpt: 'Membentuk karakter tangguh.',
			image: 'https://example.com/pramuka.jpg'
		});

		expect(result.success).toBe(true);
	});

	it('validates partial updates in updateProgramSchema', () => {
		const result = updateProgramSchema.safeParse({
			image: '/uploads/new-robotik-cover.webp'
		});

		expect(result.success).toBe(true);
	});
});
