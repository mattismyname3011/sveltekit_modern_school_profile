import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { requireUser } from '$lib/server/auth/guard';
import { ppdbSettingsRepo } from '$lib/server/repositories/ppdb';
import { updatePpdbSettingsSchema } from '$lib/server/api/schemas/ppdb';
import { audit } from '$lib/server/audit/log';

export const load: PageServerLoad = async (event) => {
	requireUser(event);
	const settings = await ppdbSettingsRepo.get();

	return {
		settings: {
			id: settings.id,
			status: settings.status,
			academicYear: settings.academicYear,
			badgeText: settings.badgeText,
			title: settings.title,
			description: settings.description,
			ctaText: settings.ctaText,
			ctaLink: settings.ctaLink,
			ctaEnabled: settings.ctaEnabled,
			secondaryCtaText: settings.secondaryCtaText ?? '',
			secondaryCtaLink: settings.secondaryCtaLink ?? '',
			contactPhone: settings.contactPhone ?? '',
			contactWhatsapp: settings.contactWhatsapp ?? '',
			contactEmail: settings.contactEmail ?? '',
			officeHours: settings.officeHours ?? '',
			announcementNotes: settings.announcementNotes ?? '',
			startDate: settings.startDate ?? '',
			endDate: settings.endDate ?? '',
			announcementDate: settings.announcementDate ?? '',
			updatedAt: settings.updatedAt.toISOString()
		}
	};
};

export const actions: Actions = {
	save: async (event) => {
		requireUser(event);
		const form = await event.request.formData();

		const payload = {
			status: form.get('status'),
			academicYear: form.get('academicYear'),
			badgeText: form.get('badgeText'),
			title: form.get('title'),
			description: form.get('description'),
			ctaText: form.get('ctaText'),
			ctaLink: form.get('ctaLink'),
			ctaEnabled: form.get('ctaEnabled') === 'on' || form.get('ctaEnabled') === 'true',
			secondaryCtaText: form.get('secondaryCtaText'),
			secondaryCtaLink: form.get('secondaryCtaLink'),
			contactPhone: form.get('contactPhone'),
			contactWhatsapp: form.get('contactWhatsapp'),
			contactEmail: form.get('contactEmail'),
			officeHours: form.get('officeHours'),
			announcementNotes: form.get('announcementNotes'),
			startDate: form.get('startDate'),
			endDate: form.get('endDate'),
			announcementDate: form.get('announcementDate')
		};

		const parsed = updatePpdbSettingsSchema.safeParse(payload);
		if (!parsed.success) {
			return fail(400, {
				message: 'Periksa kembali isian formulir.',
				fieldErrors: parsed.error.flatten().fieldErrors
			});
		}

		const updated = await ppdbSettingsRepo.update(parsed.data);

		await audit(event, {
			action: 'ppdb.update',
			resource: 'ppdb_settings',
			resourceId: 1,
			details: {
				status: updated.status,
				academicYear: updated.academicYear,
				title: updated.title,
				ctaText: updated.ctaText,
				ctaEnabled: updated.ctaEnabled
			}
		});

		return {
			ok: true,
			settings: {
				...updated,
				updatedAt: updated.updatedAt.toISOString()
			}
		};
	}
};
