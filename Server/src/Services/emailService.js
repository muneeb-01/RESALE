import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
  });
};
