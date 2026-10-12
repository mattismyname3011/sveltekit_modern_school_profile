import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { extractUploadFilename, UPLOADS_DIR } from '$lib/server/storage';

const MIME_MAP: Record<string, string> = {
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp',
	gif: 'image/gif',
	svg: 'image/svg+xml'
};

export const GET: RequestHandler = async ({ params }) => {
	const filename = extractUploadFilename(`/uploads/${params.filename}`);
	if (!filename) {
		throw error(404, 'File not found');
	}

	let data: Buffer;
	try {
		// 1. Primary storage path: static/uploads/
		data = await readFile(join(UPLOADS_DIR, filename));
	} catch {
		try {
			// 2. Production fallback if static assets were compiled into build/client/uploads/
			data = await readFile(join(process.cwd(), 'build', 'client', 'uploads', filename));
		} catch {
			throw error(404, 'File not found');
		}
	}

	const ext = filename.split('.').pop()?.toLowerCase() ?? '';
	const mime = MIME_MAP[ext] ?? 'application/octet-stream';

	return new Response(new Uint8Array(data), {
		status: 200,
		headers: {
			'Content-Type': mime,
			'Content-Length': String(data.byteLength),
			'Cache-Control': 'public, max-age=31536000, immutable',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};

export const HEAD: RequestHandler = async (event) => {
	const res = await GET(event);
	return new Response(null, {
		status: res.status,
		headers: res.headers
	});
};
