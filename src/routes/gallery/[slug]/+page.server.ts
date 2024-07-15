// @ts-ignore
import { PrismaClient } from '@prisma/client';
import prisma from '$lib/prisma';

export async function load({ params }) {
	const post = await prisma.post.findUnique({
		where: { id: parseInt(params.slug) },
		include: { images: true }
	});
	return {
		post
	};
}
