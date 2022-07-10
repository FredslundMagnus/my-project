export async function articleNames(): Promise<string[]> {
  const articles: string[] = [];
  for await (const dirEntry of Deno.readDir("./articles")) {
    articles.push(dirEntry.name.replace(".md", ""));
  }

  //   const articles = Array.from(Deno.readDir("./articles").map(())).filter((entry) =>
  //     entry.name.endsWith(".md")
  //   ).map((entry) => entry.name.replace(".md", ""));
  console.log(articles);
  return articles;
}
