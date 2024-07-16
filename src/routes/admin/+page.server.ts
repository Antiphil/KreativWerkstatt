import fs from 'fs/promises';
import path from 'path';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.post.findMany({
		where: { published: true }
	});

	return { feed: response };
}) satisfies PageServerLoad;

export const actions = {
	delete: async ({ request }: any) => {
		const data = await request.formData();
		const id = data.get('id');

		const filePath = path.join(process.cwd(), 'static', 'uploads', `${id}`);

		try {
			fs.rm(filePath, { recursive: true });
			await prisma.post.delete({
				where: {
					id
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
};
