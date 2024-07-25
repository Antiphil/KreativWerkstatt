import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	locals.pb.authStore.clear();
	console.log('erfolgreich ausgeloggt');
	redirect(303, '/');
};
