import type { PageServerLoad, Actions } from './$types.js';
import { pb } from '$lib/utils/pocketbase.js';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const postID = params.slug;
	const post = await pb.collection('posts').getOne(postID, {
		expand: 'relField1,relField2.subRelField'
	});

	return {
		form: await superValidate(post, zod(formSchema))
	};
};

export const actions: Actions = {
	edit: async ({ request, params }) => {
		const postID = params.slug;
		const form = await superValidate(request, zod(formSchema));
		const title = form.data.title as string;
		const artists = form.data.artists as string[];
		const categories = form.data.categories as string[];
		const newImage = form.data.newImage;
		console.log(newImage);

		const data = {
			title,
			artists,
			categories
		};

		try {
			await pb.collection('posts').update(postID, data);
			return message(form, 'Post wurde erfolgreich bearbeitet!');
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
