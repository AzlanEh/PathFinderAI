import axios from "axios";
import { redis } from "../utils/helpers.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CACHE_EXPIRATION = 3600; // 1 hour

// Check if YouTube API key is available
if (!YOUTUBE_API_KEY) {
  console.warn("YouTube API key not found. API calls will fail.");
}

export const searchVideos = async (query, maxResults = 10) => {
  const cacheKey = `youtube:search:${query}`;

  try {
    // Check cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    // Check if API key is available
    if (!YOUTUBE_API_KEY) {
      throw new Error("YouTube API key not configured");
    }

    // API call
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    // Transform response
    const results = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      publishedAt: new Date(item.snippet.publishedAt).toISOString(),
      description: item.snippet.description,
    }));

    // Cache results
    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(results));

    return results;
  } catch (error) {
    console.error("YouTube search error:", error);
    throw new Error(`YouTube API Error: ${error.message}`);
  }
};

export const getVideoDetails = async (videoId) => {
  const cacheKey = `youtube:video:${videoId}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    // Check if API key is available
    if (!YOUTUBE_API_KEY) {
      throw new Error("YouTube API key not configured");
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error(`Video with ID ${videoId} not found`);
    }

    const videoData = response.data.items[0];
    const details = {
      videoId,
      title: videoData.snippet.title,
      duration: videoData.contentDetails.duration,
      views: videoData.statistics.viewCount,
      likes: videoData.statistics.likeCount,
      comments: videoData.statistics.commentCount,
      tags: videoData.snippet.tags || [],
      channel: videoData.snippet.channelTitle,
      publishedAt: videoData.snippet.publishedAt,
    };

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(details));
    return details;
  } catch (error) {
    console.error("Video details error:", error);
    throw new Error(`Video details error: ${error.message}`);
  }
};
