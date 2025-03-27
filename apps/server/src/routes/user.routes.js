import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createUser,
  logout,
  login,
  refreshAccessToken,
} from "../controllers/User.controller.js";
const router = Router();
router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout, verifyJWT);
router.route("/refresh/Accesstoken").post(refreshAccessToken);
export default router;
