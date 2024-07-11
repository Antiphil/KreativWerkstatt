import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import * as fa from 'fs';
import fs from 'fs/promises';

export const actions = {
	default: async ({ request }: any) => {
		console.log('test');
		const data = await request.formData();
		/* 		console.log(data);
		let fileArray = Object.values(Object);
		fileArray.forEach((element: any) => {
			console.log(element);
		}); */
		const files = data.getAll('images');
		console.log(files);

		//const uid = crypto.randomUUID();

		//fa.mkdirSync(`static/uploads/${uid}`, { recursive: true });

		//const filePath = path.join(process.cwd(), 'static', 'uploads', `${uid}`, `1.${(data.file as Blob).type.split('/')[1]}`);
		//const dbPath = path.join('static', 'uploads', `${uid}`, `1.${(data.file as Blob).type.split('/')[1]}`);

		try {
			console.log('upload');
			/* await fs.writeFile(filePath, Buffer.from(await (data.file as Blob).arrayBuffer()));
			await prisma.post.create({
				data: {
					id: uid,
					title: data.title,
					artists: data.artist,
					imageid: dbPath
				}
			}); */
		} catch (error) {
			console.error(error);
		}
	}
};
