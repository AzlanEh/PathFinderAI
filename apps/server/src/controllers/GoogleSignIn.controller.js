// import prisma from "../../db/prismaDB.js";
import client from "@repo/db/client";
import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "@utils/asyncHandler";
import { ApiError } from "@utils/ApiError";
import { ApiResponse } from "@utils/ApiResponse";
import { generateTokens } from "../controllers/User.controller.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const googleSignIn = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  console.log(idToken);

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  // console.log(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken,
    // audience:process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { picture, sub, name, email } = payload;
  let user = await client.user.findUnique({
    where: {
      provider_providerId: {
        provider: "google",
        providerId: sub,
      },
    },
  });
  if (!user) {
    const existingUser = await client.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, "Email already registered with this email");
    }
  }
  user = await client.user.create({
    data: {
      email,
      provider: "google",
      providerId: sub,
      username: name,
      avatar: picture,
      password: await bcrypt.hash(generateRandomPassword(), 10),
    },
  });
  const { accessToken, refreshToken } = await generateTokens(user.id);
  const { password, refreshToken: _, ...userResponse } = user;
  return res
    .status(200)
    .cookie("accessToken", accessToken) //cookieOptions
    .cookie("refreshToken", refreshToken) //cookieOptions
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
