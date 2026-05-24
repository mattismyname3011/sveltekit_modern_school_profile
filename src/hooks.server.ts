import type { Handle } from '@sveltejs/kit';

/**
 * Adds baseline security headers to every response and
 * blocks unknown HTTP methods on /api/* before they reach handlers.
 */
const ALLOWED_API_METHODS = new Set(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD']);

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/')) {
		if (!ALLOWED_API_METHODS.has(event.request.method)) {
			return new Response('Method Not Allowed', { status: 405 });
		}
	}

	const response = await resolve(event);

	// Defense-in-depth headers — cheap to set, useful even on JSON responses.
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
};
