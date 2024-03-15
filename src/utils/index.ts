import { type CollectionEntry } from "astro:content";

export * from "./get-latest-shows";

// Allow merging of class strings (supporting Prettier sorting)
export function cx(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// Pretty date formatting
export function getPrettyDate(
  date: CollectionEntry<"shows">["data"]["publishedOn"],
  month: Intl.DateTimeFormatOptions["month"] = "long",
): string {
  return new Date(date).toLocaleDateString("au-AU", {
    year: "numeric",
    month,
    day: "numeric",
  });
}
