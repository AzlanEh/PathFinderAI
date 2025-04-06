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

  console.log("TypeScript dependencies installed successfully.");

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
    }

    // Try to run TypeScript to verify it's working
    const tscOutput = execSync("npx --no-install typescript --version", {
      stdio: "pipe",
    })
      .toString()
      .trim();
    console.log(`TypeScript version: ${tscOutput}`);
  } catch (verifyError) {
    console.warn(
      "Could not verify TypeScript installation, but continuing anyway:",
      verifyError.message
    );
  }
} catch (error) {
  console.error("Failed to install TypeScript dependencies:", error);

  // Try a direct install as a fallback
  try {
    console.log("Trying direct installation as fallback...");
    execSync(
      "npm install --save-dev typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0",
      { stdio: "inherit" }
    );
  } catch (fallbackError) {
    console.error("Fallback installation also failed:", fallbackError);
    process.exit(1);
  }
}

// Copy next.config.cjs to next.config.js to ensure compatibility
try {
  const nextConfigCjsPath = path.join(__dirname, "next.config.cjs");
  const nextConfigJsPath = path.join(__dirname, "next.config.js");

  if (fs.existsSync(nextConfigCjsPath)) {
    console.log("Copying next.config.cjs to next.config.js...");
    fs.copyFileSync(nextConfigCjsPath, nextConfigJsPath);
    console.log("next.config.js updated successfully.");
  }
} catch (configError) {
  console.warn("Failed to update next.config.js:", configError.message);
}

console.log("Prebuild checks completed.");
