// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		cover: image().optional(), // 画像がない場合も許容
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {
	'blog': blogCollection,
};