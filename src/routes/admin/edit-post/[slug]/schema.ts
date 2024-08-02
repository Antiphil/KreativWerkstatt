import { z } from 'zod';

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const formSchema = z.object({
	title: z.string().min(2).max(50),
	artists: z.array(z.string()), // Array of strings for artist IDs
	categories: z.array(z.string()), // Array of strings for categories
	collectionId: z.string(), // String for collection ID
	collectionName: z.string(), // String for collection name
	created: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: 'Invalid date format'
	}), // ISO date string for created date
	id: z.string(), // String for post ID
	updated: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: 'Invalid date format'
	}),
	images: z
		.array(z.instanceof(File, { message: 'Bitte lade Bilder hoch' }))
		.min(1, 'Lade bitte mindestens ein Bild hoch')
		.max(4, 'Du kannst maximal nur 4 Bilder hochladen')
		.refine((files) => files.every((file) => file.size < 100_000_000), 'Das Bild ist zu groß. Es darf die Dateigröße von 100mb nicht überschreiten.'),
	newImage: z.instanceof(File, { message: 'Please upload a file.' }).refine((f) => f.size < 100_000_000, 'Max 100 kB upload size.')
});

export type FormSchema = typeof formSchema;
