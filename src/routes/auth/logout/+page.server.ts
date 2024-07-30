import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { serialize } from 'cookie';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	try {
		locals.pb.authStore.clear();
		locals.user = null;

		const message = 'Du hast dich erfolgreich ausgeloggt!';
		return {
			message
		};
	} catch (e) {
		console.error('Error in logout load function:', e);
		throw e;
	}
};
