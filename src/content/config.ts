import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().optional(),
      heroImage: z.union([image(), z.string()]).optional(),
      readingTime: z.number().optional(),
      slug: z.string().optional(), // ✅ new override field
    }),
});

const hubs = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.union([image(), z.string()]).optional(),
      slug: z.string().optional(),
      hubType: z.enum(['regions', 'grapes', 'styles', 'producers']),
    }),
});

export const collections = { blog, hubs };
