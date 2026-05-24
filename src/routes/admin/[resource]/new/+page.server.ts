import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { requireUser } from '$lib/server/auth/guard';
import { findAdminResource } from '$lib/server/admin/resources';

export const load: PageServerLoad = async (event) => {
	requireUser(event);
	const resource = findAdminResource(event.params.resource);
	if (!resource) throw error(404, 'Unknown resource');
	return {
		resource: {
			slug: resource.slug,
			label: resource.label,
			plural: resource.plural,
			fields: resource.fields
		}
	};
};

export const actions: Actions = {
	default: async (event) => {
		requireUser(event);
		const resource = findAdminResource(event.params.resource);
		if (!resource) throw error(404, 'Unknown resource');

		const form = await event.request.formData();
		const raw: Record<string, unknown> = {};
		for (const f of resource.fields) {
			const v = form.get(f.name);
			if (v === null) continue;
			const s = String(v);
			// Empty optional fields → undefined so Zod's optional()/nullable() picks them up.
			if (s === '' && !f.required) continue;
			raw[f.name] = s;
		}

		const parsed = resource.createSchema.safeParse(raw);
		if (!parsed.success) {
			return fail(400, {
				values: raw,
				message: 'Periksa kembali isian formulir.',
				fieldErrors: parsed.error.flatten().fieldErrors
			});
		}

		try {
			await resource.repo.create(parsed.data);
		} catch (err) {
			console.error(`[admin/${resource.slug}/new]`, err);
			return fail(500, { values: raw, message: 'Gagal menyimpan ke database.' });
		}

		throw redirect(303, `/admin/${resource.slug}`);
	}
};
