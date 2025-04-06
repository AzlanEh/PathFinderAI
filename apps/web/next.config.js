/** @type {import('next').NextConfig} */
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
    tsconfigPath: "./tsconfig.json",
  },
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  images: {
    domains: ["assets.aceternity.com"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "./"),
    };
    return config;
  },
};

export default nextConfig;
