import { collection, config, fields, singleton } from "@keystatic/core";
import { Icon } from "@keystar/ui/icon";
import { mic2Icon } from "@keystar/ui/icon/icons/mic2Icon";
import { youtubeIcon } from "@keystar/ui/icon/icons/youtubeIcon";
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc";
import { block, wrapper } from "@keystatic/core/content-components";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "The NavBar Podcast",
      mark: () => <Icon src={mic2Icon} />,
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
        title: fields.text({
          label: "Site title",
          validation: {
            isRequired: true,
          },
        }),
        description: fields.text({
          label: "Site description",
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
          label: "The URL from the podcast host for the show",
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
