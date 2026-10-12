import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GET, HEAD } from './+server';
import { writeFile, unlink, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOADS_DIR } from '$lib/server/storage';

function eventFor(filename: string): Parameters<typeof GET>[0] {
	return {
		params: { filename }
	} as unknown as Parameters<typeof GET>[0];
}

describe('GET & HEAD /uploads/[filename]', () => {
	const testFilename = 'test_serve_sample.png';
	const testFilePath = join(UPLOADS_DIR, testFilename);
	const sampleContent = Buffer.from('test-image-content-bytes');

	beforeEach(async () => {
		await mkdir(UPLOADS_DIR, { recursive: true });
		await writeFile(testFilePath, sampleContent);
	});

	afterEach(async () => {
		try {
			await unlink(testFilePath);
		} catch {}
	});

	it('serves an uploaded file with correct headers and status 200', async () => {
		const res = await GET(eventFor(testFilename));
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('image/png');
		expect(res.headers.get('content-length')).toBe(String(sampleContent.byteLength));
		expect(res.headers.get('cache-control')).toContain('immutable');

		const ab = await res.arrayBuffer();
		expect(Buffer.from(ab).equals(sampleContent)).toBe(true);
	});

	it('responds to HEAD requests with headers and no body', async () => {
		const res = await HEAD(eventFor(testFilename));
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('image/png');
		expect(res.headers.get('content-length')).toBe(String(sampleContent.byteLength));
	});

	it('throws 404 for non-existent files', async () => {
		await expect(GET(eventFor('non_existent_file.png'))).rejects.toMatchObject({
			status: 404
		});
	});

	it('throws 404 for malicious path traversal attempts', async () => {
		await expect(GET(eventFor('../secret.txt'))).rejects.toMatchObject({
			status: 404
		});
	});
});
