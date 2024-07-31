import { pb } from '$lib/utils/pocketbase.js';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async () => {
	let artists = await pb.collection('artists').getFullList({
		sort: '-created'
	});
	return {
		props: {
			artists
		}
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const artistID = formData.get('id') as string;
		try {
			await pb.collection('artists').delete(artistID);
			return;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
