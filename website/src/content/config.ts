import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
	loader: glob({
		pattern: "**/[^wip-]*.md",
		base: "./content/docs",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		index: z.number().optional(),
	}),
});

const reference = defineCollection({
	loader: glob({
		pattern: ["**/*.mdx", "!**/wip-*.mdx"],
		base: "./content/reference",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		index: z.number(),
		group: z.enum(["Getting Started", "Connections", "Integrations"]),
	}),
});

export const collections = { docs, reference };
