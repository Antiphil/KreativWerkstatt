import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { pb } from '$lib/utils/pocketbase.js';
import fs from 'fs';
import sharp from 'sharp';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await superValidate(event, zod(formSchema));

		let images = formData.data.images;
		console.log(images);
		const processedFiles = [];

		for (const file of images) {
			const buffer = Buffer.from(await file.arrayBuffer());

			// Hauptbild verarbeiten
			const image = sharp(buffer)
				.resize(800, 800, { fit: 'cover' }) // Größe und Beschnitt festlegen
				.jpeg({ quality: 80 }); // Komprimierung festlegen

			// Wasserzeichen laden
			const watermark = await sharp('static/watermark.svg')
				.resize(100, 100) // Größe des Wasserzeichens anpassen
				.png()
				.toBuffer();

			// Bild mit Wasserzeichen überlagern
			const processedImage = await image
				.composite([{ input: watermark, gravity: 'southeast' }]) // Position des Wasserzeichens festlegen
				.toBuffer();

			processedFiles.push(processedImage);
		}
		console.log(processedFiles);

		const imageData = new FormData();
		processedFiles.forEach((file, index) => {
			imageData.append(`file${index}`, file);
		});
		console.log(imageData);

		const data = {
			title: formData.data.productTitle as string,
			artists: formData.data.artist as string[],
			categories: formData.data.categorie as string[],
			images: processedFiles
		};
		try {
			//await pb.collection('posts').create(data);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
