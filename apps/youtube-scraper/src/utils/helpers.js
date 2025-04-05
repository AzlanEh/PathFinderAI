import Redis from "ioredis";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a mock Redis client if environment variables are not set
let redisClient;

// Create a mock Redis client for development
const createMockRedisClient = () => {
  console.warn("Using in-memory cache instead of Redis.");
  const cache = new Map();

  return {
    status: "ready",
    get: async (key) => cache.get(key),
    set: async (key, value) => cache.set(key, value),
    setex: async (key, ttl, value) => {
      cache.set(key, value);
      setTimeout(() => cache.delete(key), ttl * 1000);
    },
    del: async (key) => cache.delete(key),
    on: () => {},
  };
};

try {
  // Only try to connect to Redis if both host and port are provided
  if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
    console.log(
      "Attempting to connect to Redis at",
      process.env.REDIS_HOST,
      process.env.REDIS_PORT
    );
    redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD || undefined,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
      connectTimeout: 5000, // 5 seconds timeout
      maxRetriesPerRequest: 1,
    });

    // Handle Redis connection errors
    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err);
      // If we get too many errors, fall back to in-memory cache
      if (redisClient.status !== "ready") {
        console.warn(
          "Falling back to in-memory cache due to Redis connection issues."
        );
        redisClient = createMockRedisClient();
      }
    });
  } else {
    // Create a mock Redis client for development
    console.warn("Redis configuration not found. Using in-memory cache.");
    const cache = new Map();

    redisClient = {
      status: "ready",
      get: async (key) => cache.get(key),
      set: async (key, value) => cache.set(key, value),
      setex: async (key, ttl, value) => {
        cache.set(key, value);
        setTimeout(() => cache.delete(key), ttl * 1000);
      },
      del: async (key) => cache.delete(key),
      on: () => {},
    };
  }
} catch (error) {
  console.error("Failed to initialize Redis:", error);
  // Fallback to in-memory cache
  const cache = new Map();

  redisClient = {
    status: "error",
    get: async (key) => cache.get(key),
    set: async (key, value) => cache.set(key, value),
    setex: async (key, ttl, value) => {
      cache.set(key, value);
      setTimeout(() => cache.delete(key), ttl * 1000);
    },
    del: async (key) => cache.delete(key),
    on: () => {},
  };
}

export const redis = redisClient;

export const validateYouTubeId = (id) => {
  const regex = /^[a-zA-Z0-9_-]{11}$/;
  return regex.test(id);
};
