import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import client from "@repo/db/client";
import Jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // Verify token
    let decodedToken;
    try {
      decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please login again.",
        });
      }
      throw new ApiError(401, "Invalid token. Please login again.");
    }

    // Find user
    const user = await client.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        provider: true,
        phoneNo: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "User not found. Please login again.");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Authentication failed. Please login again."
    );
  }
});
