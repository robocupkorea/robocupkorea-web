import type { MetadataRoute } from "next";
import { getMessages } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const messages = await getMessages();
  const meta = messages.meta;

  return {
    name: meta.title,
    short_name: meta.title,
    description: meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
