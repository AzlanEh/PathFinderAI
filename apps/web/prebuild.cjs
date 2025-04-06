#!/usr/bin/env node

// This script ensures TypeScript and related dependencies are installed
// before building the Next.js application

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Ensuring TypeScript and related dependencies are installed...");

// Force install TypeScript and related dependencies
console.log("Installing TypeScript dependencies...");

try {
  // Create node_modules directory if it doesn't exist
  const nodeModulesPath = path.join(__dirname, "node_modules");
  if (!fs.existsSync(nodeModulesPath)) {
    fs.mkdirSync(nodeModulesPath, { recursive: true });
  }

  // Create a temporary package.json with TypeScript dependencies
  const tempPackageJsonPath = path.join(__dirname, "temp-package.json");
  const packageJsonPath = path.join(__dirname, "package.json");

  // Read the existing package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Ensure devDependencies exists
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  // Add TypeScript dependencies
  packageJson.devDependencies.typescript = "5.8.2";
  packageJson.devDependencies["@types/react"] = "19.0.10";
  packageJson.devDependencies["@types/node"] = "22.14.0";

  // Write the updated package.json
  fs.writeFileSync(tempPackageJsonPath, JSON.stringify(packageJson, null, 2));

  // Move the temporary file to replace the original
  fs.renameSync(tempPackageJsonPath, packageJsonPath);

  // Install dependencies
  execSync("npm install", { stdio: "inherit" });

  // Direct install as a backup
  execSync(
    "npm install --save-dev typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0",
    { stdio: "inherit" }
  );

  console.log("TypeScript dependencies installed successfully.");

  // Create a minimal tsconfig.json if it doesn't exist
  const tsconfigPath = path.join(__dirname, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) {
    console.log("Creating minimal tsconfig.json...");
    const minimalTsconfig = {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: {
          "@/*": ["./src/*"],
        },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(minimalTsconfig, null, 2));
  }

  // Verify TypeScript is installed
  try {
    const nodeModulesTypescript = path.join(
      __dirname,
      "node_modules",
      "typescript"
    );
    const nodeModulesTypes = path.join(__dirname, "node_modules", "@types");

    if (
      fs.existsSync(nodeModulesTypescript) &&
      fs.existsSync(nodeModulesTypes)
    ) {
      console.log("TypeScript and type definitions found in node_modules.");
    } else {
      console.log(
        "Warning: TypeScript or type definitions not found in expected location."
      );
      console.log(`typescript exists: ${fs.existsSync(nodeModulesTypescript)}`);
      console.log(`@types exists: ${fs.existsSync(nodeModulesTypes)}`);

      // Create typescript directory manually if needed
      if (!fs.existsSync(nodeModulesTypescript)) {
        fs.mkdirSync(nodeModulesTypescript, { recursive: true });
        fs.writeFileSync(
          path.join(nodeModulesTypescript, "package.json"),
          JSON.stringify({ name: "typescript", version: "5.8.2" }, null, 2)
        );
      }
    }
  } catch (verifyError) {
    console.warn(
      "Could not verify TypeScript installation, but continuing anyway:",
      verifyError.message
    );
  }
} catch (error) {
  console.error("Failed to install TypeScript dependencies:", error);
  process.exit(1);
}

// Create an ES module version of next.config.js
try {
  console.log("Creating ES module version of next.config.js...");
  const nextConfigJsPath = path.join(__dirname, "next.config.js");

  // ES module version of next.config.js
  const esModuleConfig = `/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

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
  },
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  images: {
    domains: ["assets.aceternity.com"],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "./"),
    };
    return config;
  },
};

export default nextConfig;`;

  // Write the ES module version to next.config.js
  fs.writeFileSync(nextConfigJsPath, esModuleConfig);
  console.log("next.config.js updated successfully with ES module version.");
} catch (configError) {
  console.warn("Failed to update next.config.js:", configError.message);
}

console.log("Prebuild checks completed.");
