import { pb } from '$lib/utils/pocketbase.js';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async () => {
	let posts = await pb.collection('posts').getFullList({
		sort: '-created'
	});

	// Collect all unique artist IDs from the posts
	const postIDs = [...new Set(posts.flatMap((post) => post.artists))];

	// Fetch artist details for each unique artist ID
	const artists = await Promise.all(postIDs.map((id) => pb.collection('artists').getOne(id)));

	// Create a map of postID to artist data
	const artistMap = new Map();
	artists.forEach((artist) => {
		artistMap.set(artist.id, artist);
	});

	// Attach artist details to each post
	posts = posts.map((post) => {
		const postArtists = post.artists.map((postID: any) => artistMap.get(postID));
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
		const postID = formData.get('id') as string;
		try {
			await pb.collection('posts').delete(postID);
			return;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
