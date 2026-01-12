// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Blog collection schema definition
const blogCollection = defineCollection({
	type: 'content',
	schema: () => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		cover: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	'blog': blogCollection,
};