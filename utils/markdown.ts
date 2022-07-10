import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

export interface Markdown {
  tags: Array<string>; // "pschology, app",
  date: string; // "09-07-2022",
  title: string; // "New Self-Help App for Better Mental Health and Well-being",
  subtitle: string; // "Meta Learn is a new interactive app based on metacognitive therapy and coaching.",
  image: string; // "https://miro.medium.com/max/1313/1*vCdOvydgw6dOJBW7qDEJzQ.png",
  image_description: string;
  author: string; // "Meta Learn",
  markdown: string;
}

export async function readMarkdown(
  name: string,
): Promise<Markdown | null> {
  const decoder = new TextDecoder("utf-8");
  const filename = "./articles/" + name + ".md";
  try {
    const markdown = Marked.parse(
      decoder.decode(await Deno.readFile(filename)),
    );
    const data = { ...markdown.meta, markdown: markdown.content } as Markdown;
    console.log(data);
    console.log(data.markdown);
    return data;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
