import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

export interface Markdown {
  tags: Array<string>; // "pschology, app",
  date: string; // "09-07-2022",
  title: string; // "New Self-Help App for Better Mental Health and Well-being",
  subtitle: string; // "Meta Learn is a new interactive app based on metacognitive therapy and coaching.",
  image: string; // "https://miro.medium.com/max/1313/1*vCdOvydgw6dOJBW7qDEJzQ.png",
  author: string; // "Meta Learn",
  markdown: string;
}

export async function readMarkdown(
  name: string,
): Promise<Markdown | null> {
  const decoder = new TextDecoder("utf-8");
  const filename = "./articles/" + name + ".md";
  let markdown: string;
  try {
    markdown = decoder.decode(await Deno.readFile(filename));
    const lines = markdown.replace("\r", "").split("\n");
    const first = lines.findIndex((value) => value == "---");
    const second = lines.findIndex((value, index) =>
      value == "---" && index > first
    );
    const meta = lines.slice(first + 1, second);
    const data = meta.reduce(
      (o, value) => ({
        ...o,
        [value.split(":")[0]]: value.split(":").slice(1).join(":").trim(),
      }),
      {},
    ) as Record<string, string>;
    const info: Markdown = {
      tags: data.tags.split(",").map((e) => e.trim().toUpperCase()),
      date: data.date,
      title: data.title,
      subtitle: data.subtitle,
      image: data.image,
      author: data.author,
      markdown: Marked.parse(markdown).content,
    };
    console.debug(info);
    return info;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
