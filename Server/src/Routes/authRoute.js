import { Router } from "express";
import passport from "passport";

import { registerUser, verifyOTP, loginUser } from "../Services/authService.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    next(err);
  }
});

router.post("/verify-otp", async (req, res, next) => {
  try {
    const token = await verifyOTP(req.body);
    res.json({ message: "Email verified", token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
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
    res.redirect(`/login/success?token=${req.user.token}`);
  }
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.redirect(`/login/success?token=${req.user.token}`);
  }
);

export default router;
