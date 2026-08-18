import { eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { ppdbSettings, type PpdbSetting } from '$lib/db/schema';
import type { UpdatePpdbSettingsInput } from '$lib/server/api/schemas/ppdb';

export const DEFAULT_PPDB_SETTINGS: Omit<PpdbSetting, 'updatedAt'> = {
	id: 1,
	status: 'closed',
	academicYear: '2026/2027',
	badgeText: 'PPDB 2026/2027',
	title: 'Mulai perjalanan akademik Anda di SMPN 1 Anggana',
	description:
		'Pendaftaran PPDB Tahun Ajaran 2026/2027 saat ini telah ditutup. Kunjungi sekolah kami atau hubungi tim PPDB untuk informasi lengkap.',
	ctaText: 'Hubungi Panitia',
	ctaLink: '/#kontak',
	ctaEnabled: true,
	secondaryCtaText: '(0541) 555-0123',
	secondaryCtaLink: 'tel:+625415550123',
	contactPhone: '(0541) 555-0123',
	contactWhatsapp: '+6281234567890',
	contactEmail: 'info@smp1anggana.sch.id',
	officeHours: 'Senin – Jumat, 07:00 – 15:00 WITA',
	announcementNotes: null,
	startDate: null,
	endDate: null,
	announcementDate: null
};

export const ppdbSettingsRepo = {
	/**
	 * Fetches the singleton PPDB settings (id = 1).
	 * If no record exists yet, automatically creates one with safe defaults.
	 */
	async get(): Promise<PpdbSetting> {
		try {
			const rows = await db
				.select()
				.from(ppdbSettings)
				.where(eq(ppdbSettings.id, 1))
				.limit(1);

			if (rows.length > 0) {
				return rows[0];
			}

			// Upsert default record if not present
			const [created] = await db
				.insert(ppdbSettings)
				.values({
					...DEFAULT_PPDB_SETTINGS,
					updatedAt: new Date()
				})
				.onConflictDoNothing()
				.returning();

			if (created) return created;

			// In case of race condition conflict, fetch again
			const retryRows = await db
				.select()
				.from(ppdbSettings)
				.where(eq(ppdbSettings.id, 1))
				.limit(1);

			return retryRows[0] ?? { ...DEFAULT_PPDB_SETTINGS, updatedAt: new Date() };
		} catch (error) {
			console.error('[ppdbSettingsRepo.get] DB fetch fallback:', error);
			return { ...DEFAULT_PPDB_SETTINGS, updatedAt: new Date() };
		}
	},

	/**
	 * Updates the singleton PPDB settings (id = 1).
	 */
	async update(input: UpdatePpdbSettingsInput): Promise<PpdbSetting> {
		const updateData = {
			status: input.status,
			academicYear: input.academicYear,
			badgeText: input.badgeText,
			title: input.title,
			description: input.description,
			ctaText: input.ctaText,
			ctaLink: input.ctaLink,
			ctaEnabled: input.ctaEnabled,
			secondaryCtaText: input.secondaryCtaText ?? null,
			secondaryCtaLink: input.secondaryCtaLink ?? null,
			contactPhone: input.contactPhone ?? null,
			contactWhatsapp: input.contactWhatsapp ?? null,
			contactEmail: input.contactEmail ?? null,
			officeHours: input.officeHours ?? null,
			announcementNotes: input.announcementNotes ?? null,
			startDate: input.startDate ?? null,
			endDate: input.endDate ?? null,
			announcementDate: input.announcementDate ?? null,
			updatedAt: new Date()
		};

		// Check if record exists
		const existing = await db
			.select({ id: ppdbSettings.id })
			.from(ppdbSettings)
			.where(eq(ppdbSettings.id, 1))
			.limit(1);

		if (existing.length === 0) {
			const [created] = await db
				.insert(ppdbSettings)
				.values({
					id: 1,
					...updateData
				})
				.returning();
			return created;
		}

		const [updated] = await db
			.update(ppdbSettings)
			.set(updateData)
			.where(eq(ppdbSettings.id, 1))
			.returning();

		return updated;
	}
};
