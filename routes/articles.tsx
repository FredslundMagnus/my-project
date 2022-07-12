/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { articleNames } from "../utils/articles.ts";
import { Markdown, readMarkdown } from "../utils/markdown.ts";
import { App } from "../widgets/navigator.tsx";

export const handler: Handlers<Markdown[]> = {
  async GET(_, ctx) {
    const names = await articleNames();
    console.log(ctx.params);
    const markdowns =
      (await Promise.all(names.map((name) => readMarkdown(name)))).filter((a) =>
        a != null
      ).map((a) => a as Markdown);

    return ctx.render(markdowns);
  },
};

export default function Articles({ data }: PageProps<Markdown[]>) {
  const box = tw
    `shadow-lg hover:shadow-xl p-4 grid grid-cols-3 grid-flow-col gap-4 sm:grid-cols-1`;
  const box_layout = tw`col-span-2 row-span-1`;
  const layout = tw`p-4 pl-4 mx-auto max-w-screen-lg grid grid-cols-1 gap-4`;
  const img = tw`row-span-1 col-span-1 align-middle`;
  const h2 = tw`text-xl font-bold text-gray-900 row-span-1`;
  const h3 = tw`text-md text-gray-500 row-span-1`;
  return (
    <Fragment>
      <Head>
        <title>Articles | Meta Learn</title>
        <meta name="description" content="A collection of articles"></meta>
      </Head>
      <App class={layout}>
        {data.map(({ name, image, image_description, title, subtitle }) => {
          return (
            <section>
              <a class={box} href={`article/${name}`}>
                <img class={img} src={image} alt={image_description} />
                <div class={box_layout}>
                  <h2 class={h2}>{title}</h2>
                  <h3 class={h3}>{subtitle}</h3>
                </div>
              </a>
            </section>
          );
        })}
      </App>
    </Fragment>
  );
}
