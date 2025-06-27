import type { MetadataRoute } from "next";
import { getMessages } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const messages = await getMessages();
  const meta = messages.meta;

  return {
    name: meta.title,
    short_name: meta.title,
    description: meta.description,
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
  };
}
