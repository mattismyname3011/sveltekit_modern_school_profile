import { describe, expect, it } from 'vitest';
import { updatePpdbSettingsSchema } from './ppdb';

describe('ppdb schemas', () => {
	it('validates and applies valid closed settings', () => {
		const parsed = updatePpdbSettingsSchema.safeParse({
			status: 'closed',
			academicYear: '2026/2027',
			badgeText: 'PPDB 2026/2027',
			title: 'Pendaftaran Ditutup',
			description: 'Pendaftaran PPDB periode ini telah selesai.',
			ctaText: 'Hubungi Panitia',
			ctaLink: '/#kontak',
			ctaEnabled: 'true',
			contactPhone: '(0541) 555-0123',
			contactEmail: 'info@smp1anggana.sch.id'
		});

		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.status).toBe('closed');
			expect(parsed.data.ctaEnabled).toBe(true);
			expect(parsed.data.contactEmail).toBe('info@smp1anggana.sch.id');
		}
	});

	it('accepts all four status enum values', () => {
		const statuses = ['open', 'closed', 'coming_soon', 'announcement'] as const;
		for (const status of statuses) {
			const parsed = updatePpdbSettingsSchema.safeParse({
				status,
				academicYear: '2026/2027',
				badgeText: 'PPDB 2026/2027',
				title: 'Test Title',
				description: 'Test Description',
				ctaText: 'Action',
				ctaLink: 'https://example.com',
				ctaEnabled: false
			});
			expect(parsed.success).toBe(true);
			if (parsed.success) {
				expect(parsed.data.status).toBe(status);
			}
		}
	});

	it('rejects invalid status', () => {
		const parsed = updatePpdbSettingsSchema.safeParse({
			status: 'unknown_status',
			academicYear: '2026/2027',
			badgeText: 'PPDB 2026/2027',
			title: 'Test Title',
			description: 'Test Description',
			ctaText: 'Action',
			ctaLink: 'https://example.com',
			ctaEnabled: true
		});
		expect(parsed.success).toBe(false);
	});

	it('rejects invalid email', () => {
		const parsed = updatePpdbSettingsSchema.safeParse({
			status: 'open',
			academicYear: '2026/2027',
			badgeText: 'PPDB 2026/2027',
			title: 'Test Title',
			description: 'Test Description',
			ctaText: 'Action',
			ctaLink: 'https://example.com',
			ctaEnabled: true,
			contactEmail: 'not-an-email'
		});
		expect(parsed.success).toBe(false);
	});
});
