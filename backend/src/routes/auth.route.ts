import express, { response } from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";
import { OAuth2Client } from "google-auth-library";


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.post("/google", authController.loginWithGoogle());

export default router;