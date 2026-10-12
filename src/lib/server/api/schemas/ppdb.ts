import { z } from 'zod';

export const ppdbStatusEnum = z.enum(['open', 'closed', 'coming_soon', 'announcement']);
export type PpdbStatus = z.infer<typeof ppdbStatusEnum>;

const optionalTrimmedString = (max: number) =>
	z
		.string()
		.trim()
		.max(max, `Maksimal ${max} karakter.`)
		.optional()
		.transform((val) => (val === '' ? null : (val ?? null)));

const requiredTrimmedString = (min: number, max: number, label: string) =>
	z
		.string()
		.trim()
		.min(min, `${label} wajib diisi (minimal ${min} karakter).`)
		.max(max, `${label} maksimal ${max} karakter.`);

/**
 * CTA links are rendered as `href` on the public homepage.
 * Only allow safe destinations: internal paths (/..., #...),
 * or http(s)/mailto:/tel: URLs. Rejects `javascript:`, `data:`, etc.
 */
const safeLink = (label: string, min: number, max: number) =>
	requiredTrimmedString(min, max, label).refine(
		(val) => /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(val) && !/^(javascript|data|vbscript|file):/i.test(val.trim()),
		{ message: `${label} harus berupa tautan internal (/, #) atau URL http(s)/mailto:/tel: yang valid.` }
	);

const optionalSafeLink = (max: number) =>
	z
		.string()
		.trim()
		.max(max, `Maksimal ${max} karakter.`)
		.optional()
		.transform((val) => (val === '' ? null : (val ?? null)))
		.refine(
			(val) =>
				val === null ||
				val === undefined ||
				(/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(val) &&
					!/^(javascript|data|vbscript|file):/i.test(val.trim())),
			{ message: 'Tautan harus berupa tautan internal (/, #) atau URL http(s)/mailto:/tel: yang valid.' }
		);

export const updatePpdbSettingsSchema = z.object({
	status: ppdbStatusEnum.default('closed'),
	academicYear: requiredTrimmedString(1, 20, 'Tahun Ajaran'),
	badgeText: requiredTrimmedString(1, 60, 'Label Badge'),
	title: requiredTrimmedString(1, 200, 'Judul Utama'),
	description: requiredTrimmedString(1, 1000, 'Deskripsi Pengumuman'),
	ctaText: requiredTrimmedString(1, 60, 'Teks Tombol Utama'),
	ctaLink: safeLink('Tautan Tombol Utama', 1, 300),
	ctaEnabled: z
		.union([z.boolean(), z.string()])
		.transform((val) => val === true || val === 'true' || val === 'on' || val === '1'),
	secondaryCtaText: optionalTrimmedString(60),
	secondaryCtaLink: optionalSafeLink(300),
	contactPhone: optionalTrimmedString(60),
	contactWhatsapp: optionalTrimmedString(60),
	contactEmail: z
		.string()
		.trim()
		.email('Format email tidak valid.')
		.optional()
		.or(z.literal(''))
		.transform((val) => (val === '' ? null : (val ?? null))),
	officeHours: optionalTrimmedString(120),
	announcementNotes: optionalTrimmedString(1000),
	startDate: optionalTrimmedString(40),
	endDate: optionalTrimmedString(40),
	announcementDate: optionalTrimmedString(40)
});

export type UpdatePpdbSettingsInput = z.infer<typeof updatePpdbSettingsSchema>;
