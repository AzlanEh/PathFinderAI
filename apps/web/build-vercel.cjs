// build-vercel.cjs
const fs = require("node:fs");
const path = require("node:path");

console.log("Creating fallback page for Vercel deployment...");

// Create .next directory if it doesn't exist
const nextDir = path.join(__dirname, ".next");
if (!fs.existsSync(nextDir)) {
  console.log(`Creating .next directory at ${nextDir}...`);
  fs.mkdirSync(nextDir, { recursive: true });
}

// Create server directory if it doesn't exist
const serverDir = path.join(nextDir, "server");
if (!fs.existsSync(serverDir)) {
  console.log(`Creating server directory at ${serverDir}...`);
  fs.mkdirSync(serverDir, { recursive: true });
}

// Create static directory if it doesn't exist
const staticDir = path.join(nextDir, "static");
if (!fs.existsSync(staticDir)) {
  console.log(`Creating static directory at ${staticDir}...`);
  fs.mkdirSync(staticDir, { recursive: true });
}

// Create pages directory
const pagesDir = path.join(serverDir, "pages");
if (!fs.existsSync(pagesDir)) {
  console.log(`Creating pages directory at ${pagesDir}...`);
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Create a simple index.js file for the server
const indexServerPath = path.join(pagesDir, "index.js");
const indexServerContent = `
module.exports = function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(require('fs').readFileSync(require('path').join(__dirname, '../../static/index.html'), 'utf8'));
};
`;

fs.writeFileSync(indexServerPath, indexServerContent);
console.log(`Created server index.js at ${indexServerPath}`);

// Create a simple index.html file
const indexHtmlPath = path.join(staticDir, "index.html");
const indexHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Knowster - Keep Learning, On Track</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #0a0f18;
      color: #ffffff;
      overflow-x: hidden;
    }
    
    /* Navbar styles */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: relative;
      z-index: 50;
      width: 100%;
    }
    
    .logo {
      background-color: #e3e3e3;
      color: #35425a;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-weight: 500;
      text-decoration: none;
    }
    
    .nav-menu {
      background-color: #e3e3e3;
      border-radius: 9999px;
      padding: 0.5rem 2rem;
    }
    
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav-links a {
      color: #0a0f18;
      text-decoration: none;
    }
    
    .nav-links a:hover {
      opacity: 0.75;
    }
    
    .auth-buttons {
      display: flex;
      gap: 0.5rem;
    }
    
    .auth-button {
      background-color: #e3e3e3;
      color: #0a0f18;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 500;
    }
    
    .auth-button:hover {
      opacity: 0.9;
    }
    
    /* Hero section styles */
    .hero-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 70vh;
      margin-top: 2rem;
      text-align: center;
      padding: 0 1rem;
      position: relative;
    }
    
    .hero-content {
      position: relative;
      z-index: 20;
    }
    
    .hero-title {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 1rem;
      background: linear-gradient(to bottom, #ffffff, #707070);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1.2;
      letter-spacing: -0.025em;
    }
    
    .hero-description {
      max-width: 36rem;
      margin: 0 auto 2rem;
      color: #aaaaaa;
      font-size: 1.125rem;
      line-height: 1.5;
    }
    
    .cta-button {
      display: inline-block;
      background-color: #e3e3e3;
      color: #0a0f18;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      z-index: 40;
    }
    
    .cta-button:hover {
      background-color: rgba(227, 227, 227, 0.9);
    }
    
    /* Background effects */
    .background-beams {
      position: absolute;
      inset: 0;
      z-index: 10;
      overflow: hidden;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      opacity: 0.4;
    }
    
    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        gap: 1rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-description {
        font-size: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="navbar">
    <!-- Logo -->
    <a href="/" class="logo">Knowster</a>
    
    <!-- Navigation Menu -->
    <div class="nav-menu">
      <nav class="nav-links">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/resources">Resources</a>
      </nav>
    </div>
    
    <!-- Auth Buttons -->
    <div class="auth-buttons">
      <a href="/sign-in" class="auth-button">Sign In</a>
      <a href="/sign-up" class="auth-button">Join Now</a>
    </div>
  </div>

  <div class="hero-section">
    <div class="background-beams"></div>
    
    <div class="hero-content">
      <h2 class="hero-title">Keep Learning,<br />On Track.</h2>
      <p class="hero-description">
        Elevate your management skills with our cutting-edge courses. Join Our Courses for Comprehensive Learning
      </p>
      
      <div>
        <a href="/courses" class="cta-button">Get Started</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(indexHtmlPath, indexHtmlContent);
console.log(`Created static index.html at ${indexHtmlPath}`);

// Create necessary files for Vercel deployment
const buildIdPath = path.join(nextDir, "BUILD_ID");
fs.writeFileSync(buildIdPath, Date.now().toString());

// Create routes-manifest.json
const routesManifestPath = path.join(nextDir, "routes-manifest.json");
const routesManifest = {
  version: 3,
  basePath: "",
  redirects: [],
  rewrites: [],
  headers: [],
  staticRoutes: [
    {
      page: "/",
      regex: "^/(?:/)?$",
      routeKeys: {},
      namedRegex: "^/(?:/)?$",
    },
  ],
  dynamicRoutes: [],
};
fs.writeFileSync(routesManifestPath, JSON.stringify(routesManifest, null, 2));

// Create build-manifest.json
const buildManifestPath = path.join(nextDir, "build-manifest.json");
const buildManifest = {
  polyfillFiles: [],
  devFiles: [],
  ampDevFiles: [],
  lowPriorityFiles: [],
  rootMainFiles: [],
  pages: {
    "/": [],
  },
  ampFirstPages: [],
};
fs.writeFileSync(buildManifestPath, JSON.stringify(buildManifest, null, 2));

// Create prerender-manifest.json
const prerenderManifestPath = path.join(nextDir, "prerender-manifest.json");
const prerenderManifest = {
  version: 3,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: "previewModeId",
    previewModeSigningKey: "previewModeSigningKey",
    previewModeEncryptionKey: "previewModeEncryptionKey",
  },
};
fs.writeFileSync(
  prerenderManifestPath,
  JSON.stringify(prerenderManifest, null, 2)
);

// Create a simple package.json file for the build
const buildPackageJsonPath = path.join(nextDir, "package.json");
const buildPackageJsonContent = JSON.stringify(
  {
    name: "knowster-fallback",
    version: "1.0.0",
    private: true,
    description: "Fallback page for Knowster",
  },
  null,
  2
);

fs.writeFileSync(buildPackageJsonPath, buildPackageJsonContent);
console.log(`Created package.json at ${buildPackageJsonPath}`);

// Create a simple next.config.js file
const nextConfigPath = path.join(nextDir, "next.config.js");
const nextConfigContent = `
module.exports = {
  // This is a minimal config for the fallback page
};
`;

fs.writeFileSync(nextConfigPath, nextConfigContent);
console.log(`Created next.config.js at ${nextConfigPath}`);

console.log("Fallback page created successfully!");
