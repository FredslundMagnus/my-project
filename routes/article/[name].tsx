/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";

export default function Article(props: PageProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.params.name}</title>
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class={tw`my-6`}>
          Welcome to `fresh`. Try update this great message in the
          ./routes/index.tsx file, and refresh.
        </p>
      </div>
    </Fragment>
  );
}
