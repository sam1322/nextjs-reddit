import axios from "axios";

// export const GET = async (req: Request) => {
export async function GET(req: Request) {
  const url = new URL(req.url);
  let href = url.searchParams.get("url");

  if (!href) {
    return new Response("Invalid href", { status: 400 });
  }
  console.log("href", href);

  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    href = "https://" + (href.startsWith("www.") ? href : "www." + href);
  }

  
  const res = await axios.get(href);

  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);

  const title = titleMatch ? titleMatch[1] : "";

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)">/
  );

  const description = descriptionMatch ? descriptionMatch[1] : "";

  const imageMatch = res.data.match(
    /<meta property="og:image" content="(.*?)">/
  );

  const imageUrl = imageMatch ? imageMatch[1] : "";

  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  );
}
