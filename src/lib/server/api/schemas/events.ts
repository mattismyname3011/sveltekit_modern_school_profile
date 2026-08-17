import { z } from 'zod';
import { formatEventDateParts, formatEventTime } from '$lib/utils/date';

const trimmedString = (max: number) =>
	z.string().trim().min(1, 'Field is required.').max(max, `Max ${max} characters.`);

const imageSchema = z
	.string()
	.trim()
	.min(1, 'Image is required.')
	.max(2048)
	.refine(
		(u) => /^https?:\/\//i.test(u) || /^\/uploads\/[a-zA-Z0-9_.-]+$/i.test(u) || /^\/[a-zA-Z0-9_.-]/.test(u),
		'Must be a valid URL (http/https) or uploaded image path (/uploads/...)'
	);

export const createEventSchema = z
	.object({
		/** Date (e.g. "2026-08-17" or "17 Agu 2026"). */
		date: trimmedString(40),
		/** Numeric day, e.g. "12" or "02". Optional, auto-derived if omitted. */
		dateDay: z
			.string()
			.trim()
			.regex(/^\d{1,2}$/, 'dateDay must be 1-2 digits.')
			.optional(),
		/** Short month label, e.g. "Jun", "Agu". Optional, auto-derived if omitted. */
		dateMonth: trimmedString(10).optional(),
		title: trimmedString(200),
		excerpt: trimmedString(500),
		image: imageSchema,
		/** Time of day, e.g. "08:00 WITA" or "08:00". */
		time: trimmedString(40),
		location: trimmedString(120)
	})
	.transform((data) => {
		const parts = formatEventDateParts(data.date);
		return {
			...data,
			date: parts.date,
			dateDay: data.dateDay ?? parts.dateDay,
			dateMonth: data.dateMonth ?? parts.dateMonth,
			time: formatEventTime(data.time)
		};
	});

export const updateEventSchema = z
	.object({
		date: trimmedString(40).optional(),
		dateDay: z
			.string()
			.trim()
			.regex(/^\d{1,2}$/, 'dateDay must be 1-2 digits.')
			.optional(),
		dateMonth: trimmedString(10).optional(),
		title: trimmedString(200).optional(),
		excerpt: trimmedString(500).optional(),
		image: imageSchema.optional(),
		time: trimmedString(40).optional(),
		location: trimmedString(120).optional()
	})
	.refine((obj) => Object.values(obj).some((v) => v !== undefined), {
		message: 'At least one field must be provided.'
	})
	.transform((data) => {
		const updated: typeof data = { ...data };
		if (data.date) {
			const parts = formatEventDateParts(data.date);
			updated.date = parts.date;
			updated.dateDay = data.dateDay ?? parts.dateDay;
			updated.dateMonth = data.dateMonth ?? parts.dateMonth;
		}
		if (data.time) {
			updated.time = formatEventTime(data.time);
		}
		return updated;
	});

export const listEventsQuerySchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0),
	q: z.string().trim().min(1).max(100).optional(),
	upcoming: z.coerce.boolean().optional()
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type ListEventsQuery = z.infer<typeof listEventsQuerySchema>;

