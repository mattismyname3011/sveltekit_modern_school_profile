import { z } from 'zod';

const trimmedString = (max: number) =>
	z.string().trim().min(1, 'Field is required.').max(max, `Max ${max} characters.`);

const httpsUrl = z
	.string()
	.trim()
	.url('Must be a valid URL.')
	.max(2048)
	.refine((u) => /^https?:\/\//i.test(u), 'URL must start with http(s)://');

export const createNewsSchema = z.object({
	category: trimmedString(60),
	/** Human-friendly date string, e.g. "12 Mei 2026". */
	date: trimmedString(40),
	title: trimmedString(200),
	excerpt: trimmedString(500),
	image: httpsUrl
});

export const updateNewsSchema = createNewsSchema
	.partial()
	.refine((obj) => Object.values(obj).some((v) => v !== undefined), {
		message: 'At least one field must be provided.'
	});

export const listNewsQuerySchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0),
	category: z.string().trim().min(1).max(60).optional(),
	q: z.string().trim().min(1).max(100).optional()
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
export type ListNewsQuery = z.infer<typeof listNewsQuerySchema>;
