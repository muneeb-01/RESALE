import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import { generateOTP, getOTPExpiration } from "../utils/otpGenerator.js";
import { sendOTPEmail } from "./emailService.js";
import refreshTokenStore from "../models/refreshToken.js";
import config from "../config/config.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const generateTokens = async (user, res) => {
  try {
    const payload = { userId: user._id.toString(), email: user.email };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    // 7 * 24 * 60 * 60 *
    // Store refresh token
    const expires = new Date(Date.now() + 10000); // 7 days
    await refreshTokenStore.save(refreshToken, user._id.toString(), expires);
    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified,
        displayName: user.displayName,
      },
    };
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

export const handleSocialLogin = async (req, profile, provider) => {
  try {
    const field = provider === "google" ? "googleId" : "facebookId";
    const email =
      profile.emails && profile.emails.length > 0
        ? profile.emails[0].value
        : null;

    let user = await User.findOne({ [field]: profile.id }).lean();
    if (!user && email) {
      user = await User.findOne({ email }).lean();
      if (user) {
        await User.updateOne(
          { email },
          {
            [field]: profile.id,
            isVerified: true,
            displayName:
              profile.displayName || profile.name?.givenName || "Unknown",
          }
        );
        user = await User.findOne({ email }).lean();
      } else {
        // Create new user
        user = await User.create({
          email,
          [field]: profile.id,
          isVerified: true,
          displayName:
            profile.displayName || profile.name?.givenName || "Unknown",
        });
      }
    } else if (!user) {
      // No email provided; prompt client to provide email
      return { needsEmail: true, profile, provider };
    }
    // Generate tokens and set refresh token cookie
    return await generateTokens(user, req.res);
  } catch (error) {
    throw new Error(`Social login failed: ${error.message}`);
  }
};

export const registerUser = async (req, { email, password }) => {
  try {
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser && existingUser.isVerified) {
      throw new Error("Email already exists and is verified");
    }
    const otp = generateOTP();
    const otpExpires = getOTPExpiration();

    let user;
    if (existingUser) {
      await User.updateOne(
        { email },
        { otp, otpExpires },
        { validateBeforeSave: false }
      );
      user = await User.findOne({ email }).lean();
    } else {
      user = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        otp,
        otpExpires,
        isVerified: false,
      });
    }
    await sendOTPEmail(email, otp);
    return { message: "OTP sent to email", email };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const verifyOTP = async (req, { email, otp }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      await User.deleteOne({ email });
      throw new Error("Invalid or expired OTP");
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return await generateTokens(user, req.res);
  } catch (error) {
    throw new Error(`OTP verification failed: ${error.message}`);
  }
};

export const loginUser = async (req, { email, password }) => {
  try {
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user || !user.isVerified) {
      throw new Error("User not found or not verified");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return await generateTokens(user, req.res);
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    const storedToken = await refreshTokenStore.find(refreshToken);
    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    const payload = await jwt.verify(refreshToken, config.jwt.refreshSecret);
    const user = await User.findById(payload.userId).lean();
    if (!user) {
      throw new Error("User not found");
    }

    return await generateTokens(user, res);
  } catch (error) {
    throw new Error(`Token refresh failed: ${error.message}`);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await refreshTokenStore.delete(refreshToken);
      res.clearCookie("refreshToken");
    }
    return { message: "Logged out successfully" };
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};
