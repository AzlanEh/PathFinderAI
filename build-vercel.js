// build-vercel.js
const { execSync } = require('child_process');

console.log('Installing TypeScript and type definitions...');
execSync('npm install --no-save typescript@5.8.2 @types/react@19.0.10 @types/node@22.14.0', { stdio: 'inherit' });

console.log('Building Next.js app...');
execSync('next build', { stdio: 'inherit' });
