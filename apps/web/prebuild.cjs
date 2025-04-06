#!/usr/bin/env node

// This script ensures TypeScript and related dependencies are installed
// before building the Next.js application

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Ensuring TypeScript and related dependencies are installed...");

// Check if node_modules exists and contains typescript
const typescriptPath = path.join(__dirname, "node_modules", "typescript");
const typesReactPath = path.join(__dirname, "node_modules", "@types", "react");
const typesNodePath = path.join(__dirname, "node_modules", "@types", "node");

const needsTypescript = !fs.existsSync(typescriptPath);
const needsTypesReact = !fs.existsSync(typesReactPath);
const needsTypesNode = !fs.existsSync(typesNodePath);

if (needsTypescript || needsTypesReact || needsTypesNode) {
  console.log("Installing missing TypeScript dependencies...");

  try {
    // Install dependencies locally
    execSync(
      "npm install --no-save typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0",
      { stdio: "inherit" }
    );

    console.log("TypeScript dependencies installed successfully.");
  } catch (error) {
    console.error("Failed to install TypeScript dependencies:", error);
    process.exit(1);
  }
} else {
  console.log("TypeScript dependencies are already installed.");
}

// Create a simple check to verify TypeScript is available
try {
  // Try to run tsc --version to verify TypeScript is installed and accessible
  const tscVersion = execSync("npx tsc --version", { stdio: "pipe" })
    .toString()
    .trim();
  console.log(`TypeScript version: ${tscVersion}`);
} catch (error) {
  console.warn(
    "Could not verify TypeScript version, but continuing anyway:",
    error.message
  );
}

console.log("Prebuild checks completed.");
