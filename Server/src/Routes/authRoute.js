import express from "express";
import passport from "passport";
import {
  registerUser,
  verifyOTP,
  loginUser,
  refreshToken,
  logoutUser,
} from "../services/authService.js";
import config from "../config/config.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const result = await verifyOTP(req, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await loginUser(req, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const result = await refreshToken(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { result } = req.user;
    res.redirect(
      `${config.frontendUrl}/login/success?token=${result.accessToken}`
    );
  }
);

router.post("/logout", async (req, res) => {
  try {
    const result = await logoutUser(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
