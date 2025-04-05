import { Router } from "express";
import { googleSignIn } from "../controllers/GoogleSignIn.controller.js";
const router = Router();
router.route("/google/auth/signIn/callback").post(googleSignIn);
export default router;
