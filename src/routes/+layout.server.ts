import type { LayoutServerLoad } from './$types';
import { ppdbSettingsRepo } from '$lib/server/repositories/ppdb';

export const load: LayoutServerLoad = async () => {
	const ppdb = await ppdbSettingsRepo.get();
	return {
		ppdb: {
			status: ppdb.status,
			academicYear: ppdb.academicYear,
			badgeText: ppdb.badgeText,
			title: ppdb.title,
			description: ppdb.description,
			ctaText: ppdb.ctaText,
			ctaLink: ppdb.ctaLink,
			ctaEnabled: ppdb.ctaEnabled,
			secondaryCtaText: ppdb.secondaryCtaText,
			secondaryCtaLink: ppdb.secondaryCtaLink,
			contactPhone: ppdb.contactPhone,
			contactWhatsapp: ppdb.contactWhatsapp,
			contactEmail: ppdb.contactEmail,
			officeHours: ppdb.officeHours,
			announcementNotes: ppdb.announcementNotes,
			startDate: ppdb.startDate,
			endDate: ppdb.endDate,
			announcementDate: ppdb.announcementDate
		}
	};
};
