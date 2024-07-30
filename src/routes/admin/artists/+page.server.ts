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
	delete: async ({ request }) => {
		const formData = await request.formData();
		const artistID = formData.get('id') as string;

		console.log(artistID);

		await pb.collection('artists').delete(artistID);

		/* const data = {
			firstname: formData.data.firstname as string,
			lastname: formData.data.lastname as string
		}; */

		/* if (!formData.valid) {
			return fail(400, {
				formData
			});
		}
		try {
			await pb.collection('artists').create(data);
			return {
				formData
			};
		} catch (e) {
			console.error(e);
			throw e;
		} */
	}
};
