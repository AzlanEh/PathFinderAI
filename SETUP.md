# PathFinderAI Project Setup

This document provides instructions for setting up the PathFinderAI project.

## Project Structure

PathFinderAI is a monorepo with the following structure:

- `apps/server`: Express.js backend API
- `apps/web`: Next.js frontend application
- `apps/youtube-scraper`: YouTube data scraper service
- `packages/db`: Shared database package with Prisma

## Prerequisites

- Node.js 18 or higher
- npm 11 or higher
- PostgreSQL database

## Environment Setup

The project uses environment variables for configuration. Each app has its own `.env` file with app-specific variables, and there's a root `.env` file with shared variables.

### Required Environment Variables

#### Root `.env`
- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_TOKEN_SECRET`: Secret for JWT access tokens
- `REFRESH_TOKEN_SECRET`: Secret for JWT refresh tokens
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `YOUTUBE_API_KEY`: YouTube API key
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `REDIS_PASSWORD`: Redis password
- `REDIS_TLS`: Whether to use TLS for Redis connection

#### Server `.env`
- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_TOKEN_SECRET`: Secret for JWT access tokens
- `REFRESH_TOKEN_SECRET`: Secret for JWT refresh tokens
- `PORT`: Server port (default: 8000)

#### Web `.env`
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: URL of your Next.js application
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `PORT`: Web server port (default: 3000)

#### YouTube Scraper `.env`
- `YOUTUBE_API_KEY`: YouTube API key
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `REDIS_PASSWORD`: Redis password
- `REDIS_TLS`: Whether to use TLS for Redis connection
- `PORT`: YouTube scraper port (default: 4001)

#### DB `.env`
- `DATABASE_URL`: PostgreSQL connection string

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AzlanEh/PathFinderAI.git
   cd PathFinderAI
   ```

2. Install dependencies and set up the project:
   ```bash
   npm run setup
   ```

   This command will:
   - Install all dependencies
   - Generate Prisma client
   - Check environment variables

3. Start the development servers:
   ```bash
   npm run dev
   ```

   This will start all services:
   - Web: http://localhost:3000
   - Server: http://localhost:8000
   - YouTube Scraper: http://localhost:4001

## Troubleshooting

If you encounter any issues with the environment setup, run:
```bash
npm run check-env
```

This will check if all required environment variables are set and if all `.env` files exist.

## Database Setup

The project uses Prisma with PostgreSQL. To set up the database:

1. Make sure your PostgreSQL database is running and accessible
2. Update the `DATABASE_URL` in the `.env` files
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --schema=./packages/db/prisma/schema.prisma
   ```

## Authentication

The project uses two authentication systems:

1. **NextAuth.js** for the web application
2. **JWT Authentication** for the API server

Both systems are configured to work together, sharing the same user database.

## Services

### Web Application (Next.js)

The web application provides the user interface for the PathFinderAI platform.

### API Server (Express.js)

The API server provides the backend services for the PathFinderAI platform.

### YouTube Scraper

The YouTube scraper service fetches data from YouTube and caches it in Redis.

## Additional Documentation

- [Authentication System](AUTH_SETUP.md)
- [API Documentation](API_DOCS.md) (if available)
- [Frontend Documentation](FRONTEND_DOCS.md) (if available)
