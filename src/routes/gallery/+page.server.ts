// @ts-ignore
import { PrismaClient } from '@prisma/client';
import prisma from '$lib/prisma';

export async function load() {
	const posts = await prisma.post.findMany({
		include: {
			images: {
				take: 1 // Nimmt nur das erste Bild jedes Posts
			}
		}
	});

	return {
		posts
	};
}
