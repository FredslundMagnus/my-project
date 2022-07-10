export function articleNames(): string[] {
  const articles = Array.from(Deno.readDirSync("./articles")).filter((entry) =>
    entry.name.endsWith(".md")
  ).map((entry) => entry.name.replace(".md", ""));
  console.log(articles);
  return articles;
}
