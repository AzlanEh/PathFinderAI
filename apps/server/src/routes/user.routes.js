import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createUser,
  logout,
  login,
  refreshAccessToken,
} from "../controllers/User.controller.js";
const router = Router();
// Public routes
router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/refresh-token").post(refreshAccessToken);

// Protected routes (require authentication)
router.route("/logout").get(verifyJWT, logout);
export default router;
