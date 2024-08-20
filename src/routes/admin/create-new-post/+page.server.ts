import type { PageServerLoad, Actions } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { pb } from '$lib/utils/pocketbase.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

		const uploadDir = path.join(process.cwd(), 'static/uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const processedImages: File[] = [];

		for (const file of data.images) {
			const buffer = Buffer.from(await file.arrayBuffer());

			const image = sharp(buffer).resize(1200, 1200, { fit: 'cover' }).jpeg({ quality: 80 });

			const watermark = await sharp('static/watermark.png').resize(1200, 1200).png().toBuffer();

			const processedImageBuffer = await image.composite([{ input: watermark, gravity: 'centre' }]).toBuffer();

			const fileName = `${Date.now()}-${file.name}`;
			const filePath = path.join(uploadDir, fileName);

			fs.writeFileSync(filePath, processedImageBuffer);

			const processedFile = new File([processedImageBuffer], fileName, { type: 'image/jpeg' });
			processedImages.push(processedFile);
		}

		data.images = processedImages;

		try {
			await pb.collection('posts').create(data);
			fs.rmSync(uploadDir, { recursive: true, force: true });
			return message(formData, 'Post wurde erfolgreich erstellt!');
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
