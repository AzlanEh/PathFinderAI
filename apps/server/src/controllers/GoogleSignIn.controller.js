// import prisma from "../../db/prismaDB.js";
import dbClient from "@repo/db/client";
import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateTokens } from "./User.controller.js";
import bcrypt from "bcryptjs";

const googleSignIn = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  console.log(idToken);

  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  // console.log(process.env.GOOGLE_CLIENT_ID);

  const ticket = await googleClient.verifyIdToken({
    idToken,
    // audience:process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { picture, sub, name, email } = payload;
  // Try to find user by Google ID
  let user = await dbClient.user.findFirst({
    where: {
      provider: "google",
      providerId: sub,
    },
  });

  // If user doesn't exist, check if email is already registered
  if (!user) {
    const existingUser = await dbClient.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, "Email already registered with another account");
    }

    // Create new user if not found
    user = await dbClient.user.create({
      data: {
        email,
        provider: "google",
        providerId: sub,
        username: name,
        avatar: picture,
        password: await bcrypt.hash(generateRandomPassword(), 10),
      },
    });
  }

  // Generate tokens for authentication
  const { accessToken, refreshToken } = await generateTokens(user.id);

  // Update user's refresh token
  await dbClient.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const { password, refreshToken: _, ...userResponse } = user;

  // Set secure cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: userResponse,
          accessToken,
          refreshToken,
        },
        "Google sign-in successful"
      )
    );
});
function generateRandomPassword() {
  return Math.random().toString(36).slice(-8);
}
export { googleSignIn };
