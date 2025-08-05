import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateOTP, getOTPExpiration } from "../utils/otpGenerator.js";
import { sendOTPEmail } from "./emailService.js";

export const registerUser = async ({ email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      throw new Error("Email already exists and is verified");
    }

    // Generate OTP and expiration
    const otp = generateOTP();
    const otpExpires = getOTPExpiration();

    let user;
    if (existingUser) {
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save({ validateBeforeSave: false });
      user = existingUser;
    } else {
      user = new User({
        email,
        password: await bcrypt.hash(password, 10),
        otp,
        otpExpires,
        isVerified: false,
      });
      await user.save({ validateBeforeSave: false });
    }
    await sendOTPEmail(email, otp);
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const verifyOTP = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
    await User.deleteOne({ email }); // Delete unverified user
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    throw new Error("User not found or not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const handleSocialLogin = async (profile, provider) => {
  const field = provider === "google" ? "googleId" : "facebookId";
  let user = await User.findOne({ [field]: profile.id });

  if (!user && profile.emails && profile.emails[0]) {
    user = await User.create({
      email: profile.emails[0].value,
      [field]: profile.id,
      isVerified: true,
    });
  }

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
