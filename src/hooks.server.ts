import { createInstance } from '$lib/utils/pocketbase';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const public_paths = ['/', '/auth/login', '/gallery', '/impressum', '/about', '/kontakt'];

const verifyPath = (path: string) => {
	return public_paths.some((allowedPath) => path === allowedPath || path.startsWith(allowedPath + '/'));
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = createInstance();
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	let user: boolean = false;
	const url = new URL(event.request.url);

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		user = event.locals.pb.authStore.isValid;
	} catch (_) {
		event.locals.pb.authStore.clear();
		user = false;
	}
	if (!user && !verifyPath(url.pathname)) {
		throw redirect(302, '/auth/login');
	}
	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
	//console.log(event.locals.pb.authStore);

	return response;
};
