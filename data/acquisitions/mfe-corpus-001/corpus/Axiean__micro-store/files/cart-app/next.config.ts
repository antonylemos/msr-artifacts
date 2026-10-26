import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/cart",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
