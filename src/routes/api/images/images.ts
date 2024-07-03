import { promises as fs } from 'fs';
import path from 'path';

export async function post({ request }: any) {
	const data = await request.formData();
	const title = data.get('title');
	const artist = data.get('artist');
	const images = data.get('file');

	if (!file) {
		return {
			status: 400,
			body: 'No file uploaded'
		};
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const uploadPath = path.join('static/uploads', file.name);

	await fs.writeFile(uploadPath, buffer);

	return {
		status: 200,
		body: 'File uploaded successfully'
	};
}
