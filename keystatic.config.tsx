import { collection, config, fields, singleton } from "@keystatic/core";
import { Icon } from "@keystar/ui/icon";
import { mic2Icon } from "@keystar/ui/icon/icons/mic2Icon";
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc";

export default config({
  storage: {
    kind: process.env.NODE_ENV === "production" ? "cloud" : "local",
  },
  // Keystatic cloud project key
  cloud: { project: "simonswiss/the-navbar" },
  ui: {
    brand: {
      name: "The NavBar Podcast",
      mark: () => <Icon src={mic2Icon} />,
    },
    navigation: {
      "Take a sip of water!": ["shows", "settings"],
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
        twitterHandle: fields.text({
          label: "Twitter handle",
          description: "Your Twitter handle, without the @ symbol",
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
  },
});
