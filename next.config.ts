import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
  // Turbopack alias resolution (used by `next dev --turbopack` and `next build --turbopack`)
  turbopack: {
    resolveAlias: {
      "@hooks": "./hooks",
      "@components": "./components",
      "@context": "./context",
      "@utils": "./utils",
      "@assets": "./assets",
      "@constants": "./constants",
    },
  },
  // Webpack alias resolution (used by `next build` without Turbopack)
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hooks": path.resolve(__dirname, "hooks"),
      "@components": path.resolve(__dirname, "components"),
      "@context": path.resolve(__dirname, "context"),
      "@utils": path.resolve(__dirname, "utils"),
      "@assets": path.resolve(__dirname, "assets"),
      "@constants": path.resolve(__dirname, "constants"),
    };
    return config;
  },
};

export default nextConfig;
