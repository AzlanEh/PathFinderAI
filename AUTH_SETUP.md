# Authentication System Setup

This document provides instructions for setting up and configuring the authentication system for PathFinderAI.

## Overview

The authentication system consists of:

1. **Server-side JWT Authentication**: Used for API authentication
2. **NextAuth.js**: Used for web application authentication
3. **Google OAuth**: For social login
4. **Credentials Authentication**: For email/password login

## Environment Variables

Copy the `.env.example` file to `.env` in the root directory and update the values:

```bash
cp .env.example .env
```

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_TOKEN_SECRET`: Secret for JWT access tokens
- `REFRESH_TOKEN_SECRET`: Secret for JWT refresh tokens
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: URL of your Next.js application
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Database Setup

1. Make sure PostgreSQL is installed and running
2. Create a database named `pathfinder`
3. Run Prisma migrations:

```bash
npx prisma migrate dev
```

## Authentication Flow

### Web Application (Next.js)

1. **Sign Up**: `/sign-up` route
   - Creates a new user in the database
   - Redirects to sign-in page

2. **Sign In**: `/sign-in` route
   - Supports email/password login
   - Supports Google OAuth login
   - Creates a session using NextAuth.js

3. **Protected Routes**:
   - Use the NextAuth session to protect routes
   - Check user role for authorization

### API Server (Express)

1. **Register**: `POST /api/v1/user/register`
   - Creates a new user in the database
   - Returns user data without password

2. **Login**: `POST /api/v1/user/login`
   - Validates credentials
   - Returns JWT tokens (access and refresh)
   - Sets HTTP-only cookies

3. **Google Sign-In**: `POST /api/v1/user/google-signin`
   - Validates Google ID token
   - Creates or finds user
   - Returns JWT tokens

4. **Protected Routes**:
   - Use the `verifyJWT` middleware
   - Access user data via `req.user`

5. **Refresh Token**: `POST /api/v1/user/refresh-token`
   - Validates refresh token
   - Issues new access and refresh tokens

6. **Logout**: `GET /api/v1/user/logout`
   - Clears tokens from cookies
   - Removes refresh token from database

## Security Considerations

1. All passwords are hashed using bcrypt
2. JWT tokens are stored in HTTP-only cookies
3. CSRF protection is enabled
4. Token expiration is enforced
5. Refresh tokens are single-use

## Troubleshooting

If you encounter authentication issues:

1. Check that all environment variables are correctly set
2. Ensure the database is properly migrated
3. Verify that cookies are being set correctly
4. Check for CORS issues if accessing the API from a different domain
