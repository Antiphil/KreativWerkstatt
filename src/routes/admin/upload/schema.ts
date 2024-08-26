import { z } from 'zod';
import { pb } from '$lib/utils/pocketbase.js';

export let artists = await pb.collection('artists').getFullList({
	sort: '-created'
});

export const categories = [
	{
		id: 'holzbretter',
		label: 'Holzbretter'
	},
	{
		id: 'vogelhäuser',
		label: 'Vogelhäuser'
	},
	{
		id: 'lasercut',
		label: 'Lasercut Produkte'
	},
	{
		id: '3dprint',
		label: '3D Druck Produkte'
	},
	{
		id: 'tonkugeln',
		label: 'Tonkugeln'
	},
	{
		id: 'tonfiguren',
		label: 'Tonfiguren'
	}
];

export const formSchema = z.object({
	productTitle: z.string().min(2).max(50),
	categorie: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'Du musst mindestens eine Kategorie auswählen.'
	}),
	artist: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'Du musst mindestens einen Beschäftigten Auswählen.'
	}),
	images: z
		.array(z.instanceof(File, { message: 'Bitte lade Bilder hoch' }))
		.min(1, 'Lade bitte mindestens ein Bild hoch')
		.max(4, 'Du kannst maximal nur 4 Bilder hochladen')
		.refine((files) => files.every((file) => file.size < 100_000_000), 'Das Bild ist zu groß. Es darf die Dateigröße von 100mb nicht überschreiten.')
});

export type FormSchema = typeof formSchema;
