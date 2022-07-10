/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { articleNames } from "../utils/articles.ts";
import { Markdown, readMarkdown } from "../utils/markdown.ts";

export const handler: Handlers<Markdown[]> = {
  async GET(_, ctx) {
    const names = articleNames();
    const markdowns =
      (await Promise.all(names.map((name) => readMarkdown(name)))).filter((a) =>
        a != null
      ).map((a) => a as Markdown);

    return ctx.render(markdowns);
  },
};

export default function Articles({ data }: PageProps<Markdown[]>) {
  return (
    <Fragment>
      <Head>
        <title>Articles</title>
      </Head>

      {data.map((markdown) => {
        return <div>{markdown.title}</div>;
      })}
    </Fragment>
  );
}
