import { fields } from "@keystatic/core";

export const links = fields.array(
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
);
