import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
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
			firstname: formData.data.firstname as string,
			lastname: formData.data.lastname as string
		};

		if (!formData.valid) {
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
		}
	}
};
