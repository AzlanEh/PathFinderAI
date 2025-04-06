// build-vercel.cjs
const { execSync } = require("child_process");

console.log("Installing TypeScript and type definitions...");
execSync(
  "npm install --no-save typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0",
  { stdio: "inherit" }
);

// Make sure we're in the right directory
process.chdir(__dirname);

// Set NODE_OPTIONS to enable ES modules
process.env.NODE_OPTIONS = "--experimental-vm-modules";

console.log("Building Next.js app...");
// Use npx to run the locally installed next
execSync("npx next build", { stdio: "inherit" });
