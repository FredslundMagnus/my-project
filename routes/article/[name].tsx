/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Markdown, readMarkdown } from "../../utils/markdown.ts";
import { resizeImg } from "../../utils/image.ts";

export const handler: Handlers<Markdown | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const markdown = await readMarkdown(name);
    // await resizeImg(markdown?.image!);
    return ctx.render(markdown);
  },
};

export default function Article({ data }: PageProps<Markdown | null>) {
  if (!data) {
    return <h1>Article not found</h1>;
  }
  const website = "https://soft-mouse-32.deno.dev";
  const h1 = tw`font-bold text-4xl text-gray-900`;
  const tags = tw`text-gray-500 text-sm tracking-wide`;
  const subtitle = tw`text-2xl text-gray-500 font-normal pt-2 pb-8`;
  const h3 = tw`text-xl font-bold text-gray-900 pt-8`;
  const p = tw`text-gray-600 leading-relaxed text-xl pt-2`;
  const a = tw`underline`;
  const img = tw`pt-2 pb-2`;
  const article = tw`pr-4 pl-4 mx-auto max-w-screen-md pt-16 pb-16`;
  const html = data.markdown(h3, p, a);
  return (
    <Fragment>
      <Head>
        {/* Primary Meta Tags */}
        <title>{data.title}</title>
        <meta name="title" content={data.title} />
        <meta name="description" content={data.subtitle}></meta>
        <meta name="keywords" content={data.tags.join(", ")}></meta>
        <meta name="author" content={data.author}></meta>

        {/* Open Graph / Facebook */}
        <meta property="og:url" content={`${website}/article/${data.name}`} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:image" content={`${website}${data.image}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${website}/article/${data.name}`}
        />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.subtitle} />
        <meta property="twitter:image" content={`${website}${data.image}`} />
        <meta name="twitter:site" content="@MetaLearnApp" />
        <meta name="twitter:creator" content={`@${data.author_twitter}`} />

        {/* Extra */}
        <meta property="og:type" content="article"></meta>
        <meta property="og:site_name" content="Meta Learn" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content={data.image_description} />

        {/* Article */}
        <meta
          property="article:published_time"
          content="2022-07-01T13:28:21.217Z"
        />
        {
          /* article:published_time - datetime - When the article was first
        published. article:modified_time - datetime - When the article was last
        changed. article:expiration_time - datetime - When the article is out of
        date after. article:author - profile array - Writers of the article.
        article:section - string - A high-level section name. E.g. Technology
        article:tag - string array - Tag words associated with this article. */
        }
      </Head>
      <article class={article}>
        <h2 class={tags}>{data.tags.map((s) => s.toUpperCase()).join(", ")}</h2>
        <h1 class={h1}>{data.title}</h1>
        <h2 class={subtitle}>{data.subtitle}</h2>
        <img
          class={img}
          src={data.image}
          height="368px"
          width="736px"
          alt={data.image_description}
        />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Fragment>
  );
}
