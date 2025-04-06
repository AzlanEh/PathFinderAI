// build-vercel.cjs
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Install TypeScript and type definitions
console.log('Installing TypeScript and type definitions...');
execSync('npm install --no-save typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0', { stdio: 'inherit' });

// Create a simple tsconfig.json if it doesn't exist
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (!fs.existsSync(tsconfigPath)) {
  console.log('Creating tsconfig.json...');
  const tsconfig = {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": false,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  };
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
}

// Create a simple next-env.d.ts if it doesn't exist
const nextEnvPath = path.join(__dirname, 'next-env.d.ts');
if (!fs.existsSync(nextEnvPath)) {
  console.log('Creating next-env.d.ts...');
  fs.writeFileSync(nextEnvPath, '/// <reference types="next" />\n/// <reference types="next/types/global" />\n');
}

// Build Next.js app
console.log('Building Next.js app...');
execSync('NODE_OPTIONS=--max_old_space_size=4096 next build', { stdio: 'inherit' });
