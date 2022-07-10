import { resize } from "https://deno.land/x/deno_image@0.0.4/mod.ts";
import { convert } from "https://deno.land/x/deno_webp_converter@0.0.3/mod.ts";

export async function resizeImg(
  imageName: string,
  //   width: number | null,
): Promise<string> {
  imageName = "/images/test2.png";
  const w = 736 * 2;
  const name = "./static" + imageName.replace(".png", ".webp");
  console.log(name);
  console.log("sdf");
  const img = await resize(await Deno.readFile("./static" + imageName), {
    width: w,
    aspectRatio: true,
  });
  console.log(img);
  console.log(name);
  console.log(`${Deno.cwd()}/bin`);

  await Deno.writeFile("./static/images/temp.png", img);
  await convert("./static/images/temp.png", name, "-q 80", "-v");
  return name;
}
