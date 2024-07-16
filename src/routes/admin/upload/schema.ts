import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(5).max(100),
	artists: z.string().min(5).max(100),
	images: z
		.array(z.instanceof(File, { message: 'Bitte lade Bilder hoch' }))
		.min(1, 'Lade bitte mindestens ein Bild hoch')
		.max(4, 'Du kannst maximal nur 4 Bilder hochladen')
		.refine((files) => files.every((file) => file.size < 100_000_000), 'Das Bild ist zu groß. Es darf die Dateigröße von 100mb nicht überschreiten.')
});

export type FormSchema = typeof formSchema;
