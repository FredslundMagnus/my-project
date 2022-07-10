import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

type formatter = (h3: string, p: string, a: string) => string;

export interface Markdown {
  name: string;
  tags: Array<string>; // "pschology, app",
  date: string; // "09-07-2022",
  title: string; // "New Self-Help App for Better Mental Health and Well-being",
  subtitle: string; // "Meta Learn is a new interactive app based on metacognitive therapy and coaching.",
  image: string; // "https://miro.medium.com/max/1313/1*vCdOvydgw6dOJBW7qDEJzQ.png",
  image_description: string;
  author: string; // "Meta Learn",
  author_twitter: string; // "@MetaLearnApp"
  markdown: formatter;
}

function cleanMarkdown(markdown: string): formatter {
  function inner(h3: string, p: string, a: string): string {
    markdown = markdown.replaceAll("<h3", `<h3 class="${h3}" `);
    markdown = markdown.replaceAll("<p>", `<p class="${p}">`);
    markdown = markdown.replaceAll("<a href", `<a class="${a}" href`);
    return markdown;
  }
  return inner;
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
    const data = {
      ...markdown.meta,
      name: name,
      markdown: cleanMarkdown(markdown.content),
    } as Markdown;
    console.log(data);
    console.log(markdown.content);
    return data;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
