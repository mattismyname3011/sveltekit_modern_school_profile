import { describe, expect, it } from 'vitest';
import { createEventSchema, updateEventSchema } from './events';

describe('events schemas', () => {
	it('auto-derives dateDay and dateMonth from ISO date string in createEventSchema', () => {
		const result = createEventSchema.safeParse({
			date: '2026-08-17',
			title: 'Upacara HUT RI',
			excerpt: 'Upacara kemerdekaan di halaman sekolah.',
			image: 'https://example.com/image.jpg',
			time: '07:00 WITA',
			location: 'Halaman Sekolah'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.date).toBe('17 Agu 2026');
			expect(result.data.dateDay).toBe('17');
			expect(result.data.dateMonth).toBe('Agu');
			expect(result.data.title).toBe('Upacara HUT RI');
		}
	});

	it('auto-derives dateDay and dateMonth from ISO date string in updateEventSchema', () => {
		const result = updateEventSchema.safeParse({
			date: '2026-10-15'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.date).toBe('15 Okt 2026');
			expect(result.data.dateDay).toBe('15');
			expect(result.data.dateMonth).toBe('Okt');
		}
	});

	it('preserves existing custom dateDay and dateMonth if explicitly supplied', () => {
		const result = createEventSchema.safeParse({
			date: '17 Agu 2026',
			dateDay: '17',
			dateMonth: 'Agu',
			title: 'Upacara HUT RI',
			excerpt: 'Upacara kemerdekaan di halaman sekolah.',
			image: 'https://example.com/image.jpg',
			time: '07:00 WITA',
			location: 'Halaman Sekolah'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.date).toBe('17 Agu 2026');
			expect(result.data.dateDay).toBe('17');
			expect(result.data.dateMonth).toBe('Agu');
		}
	});

	it('accepts relative /uploads/ image paths in createEventSchema and updateEventSchema', () => {
		const result = createEventSchema.safeParse({
			date: '2026-08-17',
			title: 'Upacara HUT RI',
			excerpt: 'Upacara kemerdekaan di halaman sekolah.',
			image: '/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg',
			time: '07:00 WITA',
			location: 'Halaman Sekolah'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.image).toBe(
				'/uploads/3a92b7e59a00991284108782d32142c6a478360ba1df7a4221dd7d634bbf533b.jpg'
			);
		}

		const updateResult = updateEventSchema.safeParse({
			image: '/uploads/new-event-image.png'
		});
		expect(updateResult.success).toBe(true);
	});

	it('normalizes time with WITA suffix in createEventSchema and updateEventSchema', () => {
		const result = createEventSchema.safeParse({
			date: '2026-08-17',
			title: 'Upacara HUT RI',
			excerpt: 'Upacara kemerdekaan di halaman sekolah.',
			image: 'https://example.com/image.jpg',
			time: '07:30',
			location: 'Halaman Sekolah'
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.time).toBe('07:30 WITA');
		}

		const updateResult = updateEventSchema.safeParse({
			time: '08:00'
		});
		expect(updateResult.success).toBe(true);
		if (updateResult.success) {
			expect(updateResult.data.time).toBe('08:00 WITA');
		}
	});
});


