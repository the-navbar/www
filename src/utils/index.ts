export * from "./get-latest-shows";

// Allow merging of class strings (supporting Prettier sorting)
export function cx(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
