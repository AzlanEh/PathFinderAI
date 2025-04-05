#!/usr/bin/env node

/**
 * This script checks if all required environment variables are set
 * and creates a report of the environment setup.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define required environment variables for each app
const requiredEnvVars = {
  root: [
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'YOUTUBE_API_KEY',
  ],
  server: [
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'PORT',
  ],
  web: [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ],
  'youtube-scraper': [
    'YOUTUBE_API_KEY',
    'PORT',
  ],
  db: [
    'DATABASE_URL',
  ],
};

// Check if environment variables are set
function checkEnvVars(appName, vars) {
  console.log(`\n=== Checking ${appName} environment variables ===`);
  
  const missing = [];
  const set = [];
  
  vars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    } else {
      set.push(varName);
    }
  });
  
  if (missing.length > 0) {
    console.log(`❌ Missing environment variables: ${missing.join(', ')}`);
  } else {
    console.log('✅ All required environment variables are set');
  }
  
  console.log(`✓ Set variables: ${set.join(', ')}`);
  
  return missing.length === 0;
}

// Check if .env files exist
function checkEnvFiles() {
  console.log('\n=== Checking .env files ===');
  
  const rootDir = path.resolve(__dirname, '..');
  const envFiles = [
    { path: path.join(rootDir, '.env'), name: 'Root .env' },
    { path: path.join(rootDir, 'apps/server/.env'), name: 'Server .env' },
    { path: path.join(rootDir, 'apps/web/.env'), name: 'Web .env' },
    { path: path.join(rootDir, 'apps/youtube-scraper/.env'), name: 'YouTube Scraper .env' },
    { path: path.join(rootDir, 'packages/db/.env'), name: 'DB .env' },
  ];
  
  envFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
      console.log(`✅ ${file.name} exists`);
    } else {
      console.log(`❌ ${file.name} does not exist`);
    }
  });
}

// Main function
function main() {
  console.log('=== Environment Setup Check ===');
  
  let allGood = true;
  
  // Check each app's environment variables
  Object.entries(requiredEnvVars).forEach(([appName, vars]) => {
    const result = checkEnvVars(appName, vars);
    allGood = allGood && result;
  });
  
  // Check .env files
  checkEnvFiles();
  
  console.log('\n=== Summary ===');
  if (allGood) {
    console.log('✅ All required environment variables are set');
  } else {
    console.log('❌ Some environment variables are missing');
    console.log('Please check the report above and update your .env files accordingly');
  }
}

main();
