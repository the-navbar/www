import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (!title) {
    const feedback = "Please provide a title.";
    return redirect(`/?feedback=${feedback}`);
  }

  if (!body) {
    const feedback = "Please fill out a description in the elaboration field.";
    return redirect(`/?feedback=${feedback}`);
  }

  const data = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.NOTION_API_SECRET}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: {
        database_id: import.meta.env.NOTION_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        Status: {
          select: {
            name: "New",
          },
        },
        Tags: {
          multi_select: [
            {
              name: "Community suggestion",
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ type: "text", text: { content: body } }],
          },
        },
      ],
    }),
  }).then((res) => res.json());

  console.log({ data });

  const feedback = "Successfully sent, thank you!";

  return redirect(`/?feedback=${feedback}`);
};
