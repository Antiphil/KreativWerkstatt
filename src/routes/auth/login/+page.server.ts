import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { json } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
		};
		try {
			// Füge hier deine Authentifizierungslogik hinzu
			await locals.pb.collection('users').authWithPassword(data.username, data.password);
		} catch (e) {
			console.error(e);
			throw e;
		}
		redirect(303, '/admin');
	}
};
