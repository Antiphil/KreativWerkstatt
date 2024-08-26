import type { PageServerLoad, Actions } from './$types.js';
import { error, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { pb } from '$lib/utils/pocketbase.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}
		const formData = await request.formData();
		const images = formData.getAll('images');

		const uploadDir = path.join(process.cwd(), 'static/uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const processedImages: File[] = [];

		for (const file of images) {
			if (file instanceof File) {
				const buffer = Buffer.from(await file.arrayBuffer());

				const image = sharp(buffer).resize(1200, 1200, { fit: 'cover' }).jpeg({ quality: 80 });

				const watermark = await sharp('static/watermark.png').resize(1200, 1200).png().toBuffer();

				const processedImageBuffer = await image.composite([{ input: watermark, gravity: 'centre' }]).toBuffer();

				const fileName = `${Date.now()}-${file.name}`;
				const filePath = path.join(uploadDir, fileName);

				fs.writeFileSync(filePath, processedImageBuffer);

				const processedFile = new File([processedImageBuffer], fileName, { type: 'image/jpeg' });
				processedImages.push(processedFile);
			} else {
				throw error(400, 'Invalid file format');
			}
		}

		try {
			const record = await locals.pb.collection('posts').create({
				title: formData.get('title'),
				categories: formData.getAll('categorie'),
				artists: formData.getAll('artists'),
				images: processedImages
			});

			return {
				success: true,
				record
			};
		} catch (err) {
			console.error('Error creating post:', err);
			throw error(500, 'Error creating post');
		}
	}
};
