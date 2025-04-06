#!/bin/bash
set -e

# Install dependencies
npm install

# Generate Prisma client
cd packages/db
npx prisma generate
cd ../..

# Build the web app
cd apps/web
npm install --no-save typescript @types/react @types/node
npm run build
