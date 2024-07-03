export const actions = {
	upload: async ({ request }: any) => {
		const data = await request.formData();
		const title = data.get('title');
		const artist = data.get('artist');
		const images = data.get('file');
		console.log(data);
	}
};
