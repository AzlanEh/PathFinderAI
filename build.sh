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
npm run build
