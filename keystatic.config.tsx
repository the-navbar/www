import {
  collection,
  config,
  fields,
  singleton,
  type LocalConfig,
  type GitHubConfig,
} from "@keystatic/core";
import { Icon } from "@keystar/ui/icon";
import { mic2Icon } from "@keystar/ui/icon/icons/mic2Icon";

import { links } from "@/keystatic/links";

const localStorage: LocalConfig["storage"] = {
  kind: "local",
};

const gitHubStorage: GitHubConfig["storage"] = {
  kind: "github",
  repo: "the-navbar/www",
};

export default config({
  storage: process.env.NODE_ENV === "production" ? gitHubStorage : localStorage,
  ui: {
    brand: {
      name: "The NavBar Podcast",
      mark: () => <Icon src={mic2Icon} />,
    },
    navigation: {
      "Take a sip of water!": ["shows", "guests", "team", "settings"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "src/content/settings/index",
      format: {
        data: "json",
      },
      schema: {
        logo: fields.image({
          label: "Logo",
          directory: "src/assets/settings",
          publicPath: "@/assets/settings",
        }),
        ogImage: fields.image({
          label: "Open Graph Image",
          directory: "src/assets/settings",
          publicPath: "@/assets/settings",
        }),
        title: fields.text({
          label: "Site title",
          description:
            "Will be used for the homepage headline and fallback SEO title tag",
          validation: {
            isRequired: true,
          },
        }),
        description: fields.text({
          label: "Site description",
          description:
            "Will be used for the homepage description and fallback SEO description meta tag",
          multiline: true,
          validation: {
            isRequired: true,
          },
        }),
        twitterUrl: fields.text({
          label: "Twitter URL",
          description: "The Twitter URL for the NavBar account",
          validation: {
            isRequired: true,
          },
        }),
        discordInviteUrl: fields.text({
          label: "Discord Invite URL",
          description: "The URL to join the NavBar Discord server",
          validation: {
            isRequired: true,
          },
        }),
      },
    }),
  },
  collections: {
    shows: collection({
      label: "Shows",
      path: "src/content/shows/*",
      slugField: "title",
      format: {
        contentField: "showNotes",
      },
      columns: ["introText", "publishedOn"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        publishedOn: fields.date({ label: "Published on" }),
        isDraft: fields.checkbox({
          label: "Draft",
          description: "Check to prevent the show from being published",
        }),
        id: fields.number({
          label: "ID",
        }),
        mp3Url: fields.url({
          label: "mp3 URL",
          description: "The URL from the podcast host for the show",
        }),
        youtubeVideoId: fields.text({
          label: "YouTube Video ID",
          description:
            "The ID of the YouTube video for this show — not the full URL",
        }),
        introText: fields.text({
          label: "Description",
          multiline: true,
        }),
        showNotes: fields.mdx({ label: "Show notes" }),
      },
    }),
    guests: collection({
      label: "Guests",
      path: "src/content/guests/*",
      columns: ["name", "avatarUrl"],
      format: {
        data: "json",
      },
      slugField: "name",
      schema: {
        name: fields.slug({
          name: { label: "Name", validation: { isRequired: true } },
        }),
        avatarUrl: fields.url({
          label: "Avatar URL",
          description: "The URL for the guest's avatar",
          validation: { isRequired: true },
        }),
        shows: fields.array(
          fields.relationship({
            label: "Shows",
            collection: "shows",
            validation: { isRequired: true },
          }),
          {
            label: "Shows",
            description: "Episodes this guest has appeared in.",
            itemLabel: (props) => props.value || "",
          },
        ),
        links,
      },
    }),
    team: collection({
      label: "The NavBar Team",
      path: "src/content/team/*",
      slugField: "name",
      format: { contentField: "bio" },
      schema: {
        name: fields.slug({
          name: { label: "Name", validation: { isRequired: true } },
        }),
        avatarUrl: fields.url({
          label: "Avatar URL",
          description: "The URL for the team member's avatar",
          validation: { isRequired: true },
        }),
        bio: fields.mdx({ label: "Bio" }),
        links,
      },
    }),
  },
});
