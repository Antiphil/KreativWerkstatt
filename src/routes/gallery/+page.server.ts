import { pb } from '$lib/utils/pocketbase.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	let posts = await pb.collection('posts').getFullList({
		sort: '-created'
	});
	return {
		props: {
			posts
		}
	};
};
