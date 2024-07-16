import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await superValidate(event, zod(formSchema));

		const data = {
			title: formData.data.title as string,
			artists: formData.data.artists as string,
			images: formData.data.images
		};
		console.log(data);
		/* if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		}; */
	}
};

/* import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import * as fs from 'fs';

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();

		const files = data.getAll('images');
		const artists = data.get('artist');
		const title = data.get('title');
		const uid = crypto.randomUUID();

		const imageUrls = [];
		for (const file of files) {
			const uniqueName = `${uuidv4()}-${file.name}`;
			const filePath = path.join('static/uploads', uniqueName);
			const fileStream = fs.createWriteStream(filePath);
			fileStream.write(Buffer.from(await file.arrayBuffer()));
			imageUrls.push(`/uploads/${uniqueName}`);
		}

		try {
			await prisma.post.create({
				data: {
					title,
					artists,
					folderID: uid,
					images: {
						create: imageUrls.map((url) => ({ url }))
					}
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
};
 */
