/** @jsx h */
import { ComponentChildren, h } from "preact";
import { tw } from "@twind";

interface NavProps {
  current?: "a" | "b";
  children?: ComponentChildren;
  class?: string;
}

export function App(props: NavProps) {
  const btn = tw`px-2 py-1 hover:bg-gray-200 text-xl`;
  const footer = tw`bg-[#171717] h-12 content-center grid`;
  const header = tw`flex gap-2 w-full shadow-lg h-16`;
  const nav = tw``;
  const flex_wrapper =
    "display: flex;min-height: 100vh;flex-direction: column;justify-content: flex-start;";
  const footer_shadow =
    "-webkit-box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);-moz-box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);margin-top: auto;";
  return (
    <body style={flex_wrapper}>
      <header class={header}>
        <nav class={nav}>
          <a class={btn} href="../articles">Articles</a>
        </nav>
      </header>
      <main class={props.class}>
        {props.children}
      </main>
      <footer class={footer} style={footer_shadow}>
        <p class={tw`text-white text-center`}>
          {new Date(Date.now()).getFullYear()}{" "}
          - Meta Learn ApS - CVR-nr.: 42014656
        </p>
      </footer>
    </body>
  );
}
