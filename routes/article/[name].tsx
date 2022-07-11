/** @jsx h */
import { Fragment, h } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Markdown, readMarkdown } from "../../utils/markdown.ts";
// import { resizeImg } from "../../utils/image.ts";

export const handler: Handlers<Markdown | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const markdown = await readMarkdown(name);
    // await resizeImg(markdown?.image!);
    // console.log(asset(markdown!.image));
    return ctx.render(markdown);
  },
};

export default function Article({ data }: PageProps<Markdown | null>) {
  if (!data) {
    return <h1>Article not found</h1>;
  }
  const website = "https://soft-mouse-32.deno.dev";
  const article_url = `${website}/article/${data.name}`;
  const image_url = `${website}${data.image}`;
  const meta_title = `${data.title} | Meta Learn`;
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
        <link rel="preload" as="image" href={asset(data.image)}></link>
        <link rel="icon" href="/favicon.ico"></link>

        {/* Primary Meta Tags */}
        <title>{meta_title}</title>
        <meta name="title" content={meta_title} />
        <meta name="description" content={data.subtitle}></meta>
        <meta name="keywords" content={data.tags.join(", ")}></meta>
        <meta name="author" content={data.author}></meta>

        {/* Open Graph / Facebook */}
        <meta property="og:url" content={article_url} />
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:image" content={image_url} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={article_url} />
        <meta property="twitter:title" content={meta_title} />
        <meta property="twitter:description" content={data.subtitle} />
        <meta property="twitter:image" content={image_url} />
        <meta property="twitter:site" content="@MetaLearnApp" />
        <meta property="twitter:creator" content={`@${data.author_twitter}`} />

        {/* Extra */}
        <meta property="og:type" content="article"></meta>
        <meta property="og:site_name" content="Meta Learn" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content={data.image_description} />

        {/* Article -> https://ogp.me/ */}
        <meta property="article:published_time" content={data.date} />
        <meta property="article:modified_time" content={data.date} />
        {/* <meta property="article:expiration_time" content="2013-09-16T19:08:47+01:00" /> */}
        <meta property="article:author" content={data.author} />
        <meta property="article:section" content={data.tags[0]} />
        {data.tags.map((tag) => {
          return <meta property="article:tag" content={tag} />;
        })}

        {/* Structured Data -> https://developers.google.com/search/docs/advanced/structured-data/article   (take non amp)*/}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": "${meta_title}",
                "name": "${meta_title}",
                "description": "${data.subtitle}",
                "mainEntityOfPage": "${website}",
                "image": [
                  "${image_url}"
                ],
                "url": "${article_url}",
                "dateCreated": "${data.date}",
                "datePublished": "${data.date}",
                "dateModified": "${data.date}",
                "isAccessibleForFree":"True",
                "author": [{
                    "@type": "Person",
                    "name": "${data.author}",
                    "url": "https://twitter.com/${data.author_twitter}"
                  }],
                "creator": [{
                    "@type": "Person",
                    "name": "${data.author}",
                    "url": "https://twitter.com/${data.author_twitter}"
                  }],
                "publisher": [{
                    "@type": "Organization",
                    "name": "Meta Learn Aps",
                    "url": "${website}",
                    "logo": {
                      "@type": "ImageObject",
                      "width": 384,
                      "height": 384,
                      "url": "${website}/logo.png"
                    }
                }]
              }
              `,
          }}
        >
        </script>
      </Head>
      <article class={article}>
        <h2 class={tags}>{data.tags.map((s) => s.toUpperCase()).join(", ")}</h2>
        <h1 class={h1}>{data.title}</h1>
        <h2 class={subtitle}>{data.subtitle}</h2>
        <img
          class={img}
          // rel="preload"
          // as="image"
          // preload={true}
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
