/**
 * API registry — the single source of truth for what endpoints exist,
 * what they expect, and what they return.
 *
 * Both the human-readable docs (/docs) and the machine-readable spec
 * (/api/docs) are rendered from this object, so adding or changing an
 * endpoint here updates both surfaces at once.
 */

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type FieldDoc = {
	name: string;
	type: string;
	required?: boolean;
	description: string;
};

export type EndpointDoc = {
	/** Stable slug used as the URL anchor in /docs. */
	id: string;
	method: HttpMethod;
	path: string;
	summary: string;
	description?: string;
	auth: 'public' | 'admin';
	rateLimit: { limit: number; windowSec: number };
	pathParams?: FieldDoc[];
	queryParams?: FieldDoc[];
	requestBody?: FieldDoc[];
	responseExample?: unknown;
};

export type ResourceDoc = {
	/** URL slug — appears as /docs/<slug>. */
	slug: string;
	label: string;
	description: string;
	endpoints: EndpointDoc[];
};

const READ_LIMIT = { limit: 120, windowSec: 60 };
const READ_ONE_LIMIT = { limit: 240, windowSec: 60 };
const WRITE_LIMIT = { limit: 20, windowSec: 60 };

// -----------------------------------------------------------------------
// programs
// -----------------------------------------------------------------------
const programs: ResourceDoc = {
	slug: 'programs',
	label: 'Programs',
	description: 'Daftar program akademik & ekstrakurikuler sekolah.',
	endpoints: [
		{
			id: 'list-programs',
			method: 'GET',
			path: '/api/programs',
			summary: 'List programs',
			description: 'Mengambil daftar program dengan pagination dan filter opsional.',
			auth: 'public',
			rateLimit: READ_LIMIT,
			queryParams: [
				{ name: 'limit', type: 'integer (1–100)', description: 'Jumlah item per halaman. Default 20.' },
				{ name: 'offset', type: 'integer ≥ 0', description: 'Offset pagination. Default 0.' },
				{ name: 'tag', type: 'string', description: 'Filter exact-match berdasarkan tag.' },
				{ name: 'q', type: 'string', description: 'Pencarian case-insensitive di title + excerpt.' }
			],
			responseExample: {
				ok: true,
				data: {
					items: [
						{
							id: 1,
							title: 'Sains & Laboratorium',
							tag: 'Akademik',
							excerpt: 'Pembelajaran berbasis eksperimen ...',
							image: 'https://example.com/img.jpg',
							post: null,
							createdAt: '2026-05-01T08:00:00.000Z',
							updatedAt: '2026-05-01T08:00:00.000Z'
						}
					],
					pagination: { total: 6, limit: 20, offset: 0 }
				}
			}
		},
		{
			id: 'get-program',
			method: 'GET',
			path: '/api/programs/:id',
			summary: 'Get program by id',
			auth: 'public',
			rateLimit: READ_ONE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID program.' }],
			responseExample: {
				ok: true,
				data: {
					id: 1,
					title: 'Sains & Laboratorium',
					tag: 'Akademik',
					excerpt: '...',
					image: 'https://example.com/img.jpg',
					post: null,
					createdAt: '2026-05-01T08:00:00.000Z',
					updatedAt: '2026-05-01T08:00:00.000Z'
				}
			}
		},
		{
			id: 'create-program',
			method: 'POST',
			path: '/api/programs',
			summary: 'Create program',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			requestBody: [
				{ name: 'title', type: 'string (1–160)', required: true, description: 'Judul program.' },
				{ name: 'tag', type: 'string (1–60)', required: true, description: 'Kategori/label.' },
				{ name: 'excerpt', type: 'string (1–500)', required: true, description: 'Deskripsi singkat.' },
				{ name: 'image', type: 'string (URL https)', required: true, description: 'URL gambar.' },
				{ name: 'post', type: 'string | null', description: 'Konten panjang opsional, max 20000 char.' }
			],
			responseExample: { ok: true, data: { id: 7, title: '...', tag: '...' } }
		},
		{
			id: 'update-program',
			method: 'PATCH',
			path: '/api/programs/:id',
			summary: 'Update program',
			description: 'Partial update. Minimal satu field harus dikirim.',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID program.' }],
			requestBody: [
				{ name: 'title', type: 'string (1–160)', description: 'Optional.' },
				{ name: 'tag', type: 'string (1–60)', description: 'Optional.' },
				{ name: 'excerpt', type: 'string (1–500)', description: 'Optional.' },
				{ name: 'image', type: 'string (URL https)', description: 'Optional.' },
				{ name: 'post', type: 'string | null', description: 'Optional.' }
			]
		},
		{
			id: 'delete-program',
			method: 'DELETE',
			path: '/api/programs/:id',
			summary: 'Delete program',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID program.' }],
			responseExample: { ok: true, data: { id: 7 } }
		}
	]
};

// -----------------------------------------------------------------------
// news
// -----------------------------------------------------------------------
const news: ResourceDoc = {
	slug: 'news',
	label: 'News',
	description: 'Berita dan pengumuman sekolah.',
	endpoints: [
		{
			id: 'list-news',
			method: 'GET',
			path: '/api/news',
			summary: 'List news',
			auth: 'public',
			rateLimit: READ_LIMIT,
			queryParams: [
				{ name: 'limit', type: 'integer (1–100)', description: 'Default 20.' },
				{ name: 'offset', type: 'integer ≥ 0', description: 'Default 0.' },
				{ name: 'category', type: 'string', description: 'Filter exact-match category.' },
				{ name: 'q', type: 'string', description: 'Pencarian title + excerpt.' }
			]
		},
		{
			id: 'get-news',
			method: 'GET',
			path: '/api/news/:id',
			summary: 'Get news by id',
			auth: 'public',
			rateLimit: READ_ONE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID berita.' }]
		},
		{
			id: 'create-news',
			method: 'POST',
			path: '/api/news',
			summary: 'Create news',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			requestBody: [
				{ name: 'category', type: 'string (1–60)', required: true, description: 'Kategori berita.' },
				{ name: 'date', type: 'string (1–40)', required: true, description: 'Tanggal human, mis. "12 Mei 2026".' },
				{ name: 'title', type: 'string (1–200)', required: true, description: 'Judul.' },
				{ name: 'excerpt', type: 'string (1–500)', required: true, description: 'Ringkasan.' },
				{ name: 'image', type: 'string (URL https)', required: true, description: 'URL gambar.' }
			]
		},
		{
			id: 'update-news',
			method: 'PATCH',
			path: '/api/news/:id',
			summary: 'Update news',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID berita.' }],
			requestBody: [
				{ name: 'category', type: 'string', description: 'Optional.' },
				{ name: 'date', type: 'string', description: 'Optional.' },
				{ name: 'title', type: 'string', description: 'Optional.' },
				{ name: 'excerpt', type: 'string', description: 'Optional.' },
				{ name: 'image', type: 'string', description: 'Optional.' }
			]
		},
		{
			id: 'delete-news',
			method: 'DELETE',
			path: '/api/news/:id',
			summary: 'Delete news',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID berita.' }]
		}
	]
};

// -----------------------------------------------------------------------
// events
// -----------------------------------------------------------------------
const events: ResourceDoc = {
	slug: 'events',
	label: 'Events',
	description: 'Agenda kegiatan dan event sekolah.',
	endpoints: [
		{
			id: 'list-events',
			method: 'GET',
			path: '/api/events',
			summary: 'List events',
			auth: 'public',
			rateLimit: READ_LIMIT,
			queryParams: [
				{ name: 'limit', type: 'integer (1–100)', description: 'Default 20.' },
				{ name: 'offset', type: 'integer ≥ 0', description: 'Default 0.' },
				{ name: 'q', type: 'string', description: 'Pencarian title + excerpt.' }
			]
		},
		{
			id: 'get-event',
			method: 'GET',
			path: '/api/events/:id',
			summary: 'Get event by id',
			auth: 'public',
			rateLimit: READ_ONE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID acara.' }]
		},
		{
			id: 'create-event',
			method: 'POST',
			path: '/api/events',
			summary: 'Create event',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			requestBody: [
				{ name: 'date', type: 'string (1–40)', required: true, description: 'Tanggal human, mis. "12 Jun 2026".' },
				{ name: 'dateDay', type: 'string (1–2 digit)', required: true, description: 'Tanggal numerik, mis. "12".' },
				{ name: 'dateMonth', type: 'string (1–10)', required: true, description: 'Bulan singkat, mis. "Jun".' },
				{ name: 'title', type: 'string (1–200)', required: true, description: 'Judul.' },
				{ name: 'excerpt', type: 'string (1–500)', required: true, description: 'Ringkasan.' },
				{ name: 'image', type: 'string (URL https)', required: true, description: 'URL gambar.' },
				{ name: 'time', type: 'string (1–40)', required: true, description: 'Waktu acara, mis. "08:00 WITA".' },
				{ name: 'location', type: 'string (1–120)', required: true, description: 'Lokasi.' }
			]
		},
		{
			id: 'update-event',
			method: 'PATCH',
			path: '/api/events/:id',
			summary: 'Update event',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID acara.' }],
			requestBody: [
				{ name: 'date', type: 'string', description: 'Optional.' },
				{ name: 'dateDay', type: 'string', description: 'Optional.' },
				{ name: 'dateMonth', type: 'string', description: 'Optional.' },
				{ name: 'title', type: 'string', description: 'Optional.' },
				{ name: 'excerpt', type: 'string', description: 'Optional.' },
				{ name: 'image', type: 'string', description: 'Optional.' },
				{ name: 'time', type: 'string', description: 'Optional.' },
				{ name: 'location', type: 'string', description: 'Optional.' }
			]
		},
		{
			id: 'delete-event',
			method: 'DELETE',
			path: '/api/events/:id',
			summary: 'Delete event',
			auth: 'admin',
			rateLimit: WRITE_LIMIT,
			pathParams: [{ name: 'id', type: 'integer', required: true, description: 'ID acara.' }]
		}
	]
};

export const apiRegistry: { resources: ResourceDoc[] } = {
	resources: [programs, news, events]
};

/** Find a resource by slug. */
export function findResource(slug: string): ResourceDoc | undefined {
	return apiRegistry.resources.find((r) => r.slug === slug);
}
