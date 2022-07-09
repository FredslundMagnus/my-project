/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Markdown, readMarkdown } from "../../utils/markdown.ts";

export const handler: Handlers<Markdown | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const markdown = await readMarkdown(name);
    return ctx.render(markdown);
  },
};

export default function Article({ data }: PageProps<Markdown | null>) {
  if (!data) {
    return <h1>Article not found</h1>;
  }

  const body = tw`mt-6`;
  const html = data.markdown;
  return (
    <Fragment>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p>{data.tags.join(", ")}</p>
        <h1 class={tw`font-bold text-4xl`}>{data.title}</h1>
        <img
          src={data.image}
          height="368px"
          width="736px"
          alt="This alt text should be fixed"
          // loading="lazy"
        />
        <div
          class={`${body} markdown-body`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Fragment>
  );
}
