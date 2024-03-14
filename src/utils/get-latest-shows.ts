import { getCollection, type CollectionEntry } from "astro:content";

export async function getLatestShows(
  count?: number,
): Promise<CollectionEntry<"shows">[]> {
  const shows = await getCollection("shows");
  const sortedShows = shows
    .sort((a, b) => b.data.id - a.data.id)
    .filter((show) => !show.data.isDraft);

  return count ? sortedShows.slice(0, count) : sortedShows;
}
