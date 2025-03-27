// import prisma from "../../db/prismaDB.js";
import client from "@repo/db/client";
import { asyncHandler } from "@utils/asyncHandler";
import { ApiError } from "@utils/ApiError";
import { ApiResponse } from "@utils/ApiResponse";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  console.log(email, password);
  const existedUser = await client.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existedUser) {
    throw new ApiError(
      409,
      "User is already created with this email id...Chose another email"
    );
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await client.user.create({
    data: {
      email: email,
      password: hashPassword,
      provider: "manual",
    },
  });
  const { password: _, ...userResponse } = newUser;
  return res.json(
    new ApiResponse(200, userResponse, "User registered successfully")
  );
});
const generateTokens = async (userId) => {
  try {
    const accessToken = Jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d" }
    );

    const refreshToken = Jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d" }
    );

    await client.user.update({
      where: { id: userId },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate tokens");
  }
};
const refreshAccessToken = async (req, res) => {
  const RefreshToken = req.cookies.RefreshToken || req.body.RefreshToken;

  if (!RefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decodedToken = Jwt.verify(
      RefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await client.user.findFirst({
      where: {
        id: decodedToken.id,
        refreshToken: RefreshToken,
      },
      select: {
        id: true,
        refreshToken: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user.id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existedUser = await client.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      avatar: true,
      provider: true,
      providerId: true,
      phoneNo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  if (!existedUser) {
    throw new ApiError(
      409,
      "User is not found with this email. Please Sign In first"
    );
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existedUser.password
  );
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Password");
  }
  const { password: _, ...userData } = existedUser;
  const { accessToken, refreshToken } = await generateTokens(existedUser.id);
  await client.user.update({
    where: { id: existedUser.id },
    data: { refreshToken: refreshToken },
  });
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, userData, "user log in successfully"));
});
const logout = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  await client.user.update({
    where: { id: user_id },
    data: { refreshToken: null },
  });
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { createUser, generateTokens, refreshAccessToken, login, logout };
