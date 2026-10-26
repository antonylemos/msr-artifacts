import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  // Enables the standalone output mode, which creates a minimal, production-ready
  // server with only the necessary files. This is essential for creating small
  // and efficient Docker images.
  output: "standalone",

  images: {
    // Whitelists external domains for Next.js Image Optimization. This is a security
    // and performance feature to prevent misuse and ensure optimized image delivery.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },

  /**
   * Configures the core of the Multi-Zone micro-frontend architecture.
   * Rewrites allow us to map a URL path to a different destination, making
   * multiple independent applications appear as a single, unified site.
   */
  async rewrites() {
    return [
      {
        // Any request starting with /cart...
        source: "/cart/:path*",
        // ...will be transparently proxied to the cart-app running on its own port.
        // This is the magic that combines the two micro-frontends.
        destination: "http://cart-app:3000/cart/:path*",
      },
    ];
  },
};

export default nextConfig;
