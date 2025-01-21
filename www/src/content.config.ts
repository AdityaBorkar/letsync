import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
	loader: glob({
		pattern: '**/!(wip-)*.md',
		base: './cms/docs',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		index: z.number().optional(),
		group: z
			.enum([
				'getting-started',
				'adapters/framework',
				'adapters/client-db',
				'adapters/server-db',
				'adapters/pubsub',
				'adapters/orm',
				'comparisons',
				'contributing',
			])
			.optional(),
	}),
});

const reference = defineCollection({
	loader: glob({
		pattern: '**/!(wip-)*.md',
		base: './cms/reference',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		index: z.number().optional(),
	}),
});

export const collections = { docs, reference };
