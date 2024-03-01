import { z, defineCollection } from "astro:content";

const settingsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      twitterHandle: z.string(),
      logo: image(),
    }),
});

const showsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    id: z.number(),
    publishedOn: z.date(),
    mp3Url: z.string().url(),
    youtubeVideoId: z.string().optional(),
  }),
});

export const collections = {
  settings: settingsCollection,
  shows: showsCollection,
};
