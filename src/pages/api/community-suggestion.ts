import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (!title) {
    return new Response(
      '<p class="mt-4 font-medium text-red-800">🚨 Please provide a title to your suggestion.</p>',
    );
  }

  if (!body) {
    return new Response(
      '<p class="mt-4 font-medium text-red-800">🚨 Please add a description in the elaboration field.</p>',
    );
  }

  await fetch("https://api.notion.com/v1/pages", {
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

  return new Response(
    '<p class="mt-4 font-medium text-green-700">✅ Successfully sent, thank you!</p>',
  );
};
