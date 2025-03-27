import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

/**
 * @route GET /api/v1/health
 * @desc Health check endpoint to verify server status
 * @access Public
 */
router.route("/").get((req, res) => {
  // Return a 200 OK response with server status information
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
      },
      "Server is running"
    )
  );
});

export default router;
