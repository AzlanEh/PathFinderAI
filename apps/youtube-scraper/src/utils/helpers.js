import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Required for Redis Cloud
});

export const validateYouTubeId = (id) => {
  const regex = /^[a-zA-Z0-9_-]{11}$/;
  return regex.test(id);
};
