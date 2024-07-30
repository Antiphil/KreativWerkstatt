import { pb } from '$lib/utils/pocketbase.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	let posts = await pb.collection('posts').getOne(params.slug);
	return {
		props: {
			posts,
			slug: params.slug
		}
	};
};
