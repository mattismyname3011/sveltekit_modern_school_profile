import { describe, expect, it } from 'vitest';
import { DEFAULT_PPDB_SETTINGS } from './ppdb';

describe('ppdb repository defaults', () => {
	it('provides valid initial closed default settings', () => {
		expect(DEFAULT_PPDB_SETTINGS.id).toBe(1);
		expect(DEFAULT_PPDB_SETTINGS.status).toBe('closed');
		expect(DEFAULT_PPDB_SETTINGS.academicYear).toBe('2026/2027');
		expect(DEFAULT_PPDB_SETTINGS.ctaText).toBe('Hubungi Panitia');
		expect(DEFAULT_PPDB_SETTINGS.ctaEnabled).toBe(true);
	});
});
