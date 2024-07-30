import { pb } from '$lib/utils/pocketbase.js';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async () => {
	let posts = await pb.collection('posts').getFullList({
		sort: '-created'
	});

	// Collect all unique artist IDs from the posts
	const artistIds = [...new Set(posts.flatMap((post) => post.artists))];

	// Fetch artist details for each unique artist ID
	const artists = await Promise.all(artistIds.map((id) => pb.collection('artists').getOne(id)));

	// Create a map of artistId to artist data
	const artistMap = new Map();
	artists.forEach((artist) => {
		artistMap.set(artist.id, artist);
	});

	// Attach artist details to each post
	posts = posts.map((post) => {
		const postArtists = post.artists.map((artistId: any) => artistMap.get(artistId));
		return {
			...post,
			artists: postArtists
		};
	});

	return {
		props: {
			posts
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
