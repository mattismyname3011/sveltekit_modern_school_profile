import { timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';
import { ApiError } from './response';

/**
 * Bearer-token auth for write endpoints.
 *
 * The token is read from the API_ADMIN_TOKEN env var (server-only) so it
 * can be rotated without code changes. Comparison uses a constant-time
 * algorithm to avoid leaking information through timing.
 *
 * Returns null on success, or a Response on failure (caller should return it).
 */
export function requireAdmin(event: RequestEvent): Response | null {
	const expected = env.API_ADMIN_TOKEN;

	if (!expected || expected.length < 16) {
		// Refuse to authenticate against a weak/missing token rather than fail open.
		return ApiError.internal('API auth is misconfigured.');
	}

	const header = event.request.headers.get('authorization') ?? '';
	const match = header.match(/^Bearer\s+(.+)$/i);
	if (!match) return ApiError.unauthorized();

	const provided = match[1].trim();
	if (!constantTimeEqual(provided, expected)) return ApiError.unauthorized();

	return null;
}

function constantTimeEqual(a: string, b: string): boolean {
	const ab = Buffer.from(a, 'utf8');
	const bb = Buffer.from(b, 'utf8');
	// timingSafeEqual requires equal length; pad to longest to avoid early return leak.
	const len = Math.max(ab.length, bb.length);
	const pa = Buffer.alloc(len);
	const pb = Buffer.alloc(len);
	ab.copy(pa);
	bb.copy(pb);
	const eq = timingSafeEqual(pa, pb);
	return eq && ab.length === bb.length;
}
