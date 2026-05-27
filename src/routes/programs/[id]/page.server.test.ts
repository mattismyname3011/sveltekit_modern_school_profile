import { beforeEach, describe, expect, it, vi } from 'vitest';
import { load } from './+page.server';
import { programsRepo } from '$lib/server/repositories/programs';

vi.mock('$lib/server/repositories/programs', () => ({
	programsRepo: {
		findById: vi.fn()
	}
}));

const findById = vi.mocked(programsRepo.findById);

describe('/programs/[id] load', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads program detail data for a valid id', async () => {
		const program = {
			id: 3,
			title: 'Musik & Pertunjukan',
			tag: 'Seni',
			excerpt: 'Wadah ekspresi siswa.',
			image: 'https://example.com/music.jpg',
			post: 'Latihan ansambel dan pentas seni.',
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-01T00:00:00.000Z')
		};
		findById.mockResolvedValueOnce(program);

		await expect(load({ params: { id: '3' } } as Parameters<typeof load>[0])).resolves.toEqual({
			program
		});
		expect(findById).toHaveBeenCalledWith(3);
	});

	it('throws 400 for malformed ids', async () => {
		await expect(load({ params: { id: 'bad' } } as Parameters<typeof load>[0])).rejects.toMatchObject({
			status: 400
		});
		expect(findById).not.toHaveBeenCalled();
	});

	it('throws 404 when the program does not exist', async () => {
		findById.mockResolvedValueOnce(null as never);

		await expect(load({ params: { id: '81' } } as Parameters<typeof load>[0])).rejects.toMatchObject({
			status: 404
		});
		expect(findById).toHaveBeenCalledWith(81);
	});
});
