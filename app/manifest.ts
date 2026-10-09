import type { MetadataRoute } from "next";

// Lets phones "Add to home screen" with the GarageLog icon and name.
// Next.js serves this at /manifest.webmanifest and links it automatically.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GarageLog",
    short_name: "GarageLog",
    description:
      "Track car maintenance, service reminders by date or mileage, and expenses.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0b0d12",
    theme_color: "#2563eb",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
