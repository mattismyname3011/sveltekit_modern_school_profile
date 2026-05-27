import { error } from '@sveltejs/kit';
import { parseId } from '$lib/server/api/parse';
import { programsRepo } from '$lib/server/repositories/programs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseId(params.id);
	if (id === null) {
		error(400, 'Program id tidak valid.');
	}

	const program = await programsRepo.findById(id);
	if (!program) {
		error(404, 'Program tidak ditemukan.');
	}

	return { program };
};
