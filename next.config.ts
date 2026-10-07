import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /api/* to the Express API so the browser sees it as same-origin
  // and the httpOnly "token" cookie is stored on this app's domain.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // UploadThing serves files from a subdomain of the app id
        hostname: "vt4gmqxxsp.ufs.sh",
        pathname: "/f/*",
      },
    ],
  },
};

export default nextConfig;
