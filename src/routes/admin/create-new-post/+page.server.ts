import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { pb } from '$lib/utils/pocketbase.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await superValidate(event, zod(formSchema));
		const data = {
			title: formData.data.productTitle as string,
			artists: formData.data.artist as string[],
			categories: formData.data.categorie as string[],
			images: formData.data.images
		};
		try {
			await pb.collection('posts').create(data);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
