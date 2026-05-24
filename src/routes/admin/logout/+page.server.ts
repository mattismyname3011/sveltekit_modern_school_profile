import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearSessionCookie, destroySession } from '$lib/server/auth/session';

// Direct GET to /admin/logout shouldn't show anything — redirect.
export const load: PageServerLoad = async () => {
	throw redirect(303, '/admin/login');
};

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (locals.sessionId) await destroySession(locals.sessionId);
		clearSessionCookie(cookies);
		throw redirect(303, '/admin/login');
	}
};
