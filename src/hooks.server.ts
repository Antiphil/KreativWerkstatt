import { createInstance } from '$lib/utils/pocketbase';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const public_paths = ['/', '/auth/login', '/gallery', '/impressum', '/about', '/kontakt', '/contact'];

const verifyPath = (path: string) => {
	return public_paths.some((allowedPath) => path === allowedPath || path.startsWith(allowedPath + '/'));
};

export const handle: Handle = async ({ event, resolve }) => {
	const pb = createInstance();
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	event.locals.pb = createInstance();
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();
			event.locals.user = pb.authStore.model;
			event.locals.pb = pb;
		}
	} catch (_) {
		pb.authStore.clear();
	}

	const url = new URL(event.request.url);

	if (event.locals.user === undefined && !verifyPath(url.pathname)) {
		throw redirect(302, '/auth/login');
	}
	const response = await resolve(event);

	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
