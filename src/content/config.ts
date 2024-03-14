import { z, defineCollection, reference } from "astro:content";

const settingsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      twitterUrl: z.string(),
      discordInviteUrl: z.string(),
      logo: image(),
      ogImage: image(),
    }),
});

const showsCollection = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    introText: z.string(),
    publishedOn: z.date(),
    mp3Url: z.string().url(),
    youtubeVideoId: z.string().optional(),
  }),
});

const guestsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    avatarUrl: z.string().url(),
    shows: z.array(reference("shows")),
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    ),
  }),
});

const navabarTeamCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    avatarUrl: z.string().url(),
    role: z.string(),
  }),
});

export const collections = {
  settings: settingsCollection,
  shows: showsCollection,
  guests: guestsCollection,
  navbarTeam: navabarTeamCollection,
};
