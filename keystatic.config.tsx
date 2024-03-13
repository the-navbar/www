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
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc";

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
      "Take a sip of water!": ["shows", "guests", "settings"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Settings",
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
        contentField: "description",
      },
      columns: ["publishedOn"],
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        publishedOn: fields.date({ label: "Published on" }),
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
        description: __experimental_mdx_field({
          label: "Description",
        }),
      },
    }),
    guests: collection({
      label: "Guests",
      path: "src/content/guests/*",
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
          }),
          {
            label: "Shows",
            description: "Episodes this guest has appeared in.",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "",
          },
        ),
        links: fields.array(
          fields.object(
            {
              label: fields.text({
                label: "Label",
                validation: { isRequired: true },
              }),
              url: fields.url({
                label: "URL",
                validation: { isRequired: true },
              }),
            },
            { label: "Link", layout: [4, 8] },
          ),
          {
            label: "Links",
            description: "Any personal links the guest would like to share.",
            itemLabel: (props) =>
              props.fields.label.value + " — " + props.fields.url.value,
          },
        ),
      },
    }),
  },
});
