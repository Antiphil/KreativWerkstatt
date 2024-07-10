// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// 1.
	const response = await prisma.post.findMany({
		where: { published: true }
	});

	// 2.
	return { feed: response };
}) satisfies PageServerLoad;

export const actions = {
	delete: async ({ request }: any) => {
		const data = await request.formData()
		const id = data.get('id')

		console.log(id)
		const deleteUser = await prisma.post.delete({
			where: {
			  id
			},
		  })
	}
};
