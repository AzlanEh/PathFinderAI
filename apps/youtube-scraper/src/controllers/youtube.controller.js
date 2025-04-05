import express from "express";
import { searchVideos, getVideoDetails } from "../services/youtube.service.js";

const router = express.Router();

// @desc    Search YouTube videos
// @route   GET /api/youtube/search
router.get("/search", async (req, res) => {
  try {
    const { q, max } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query required" });
    }

    const results = await searchVideos(q, max || 10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Get video metadata
// @route   GET /api/youtube/video/:id
router.get("/video/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const details = await getVideoDetails(videoId);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
