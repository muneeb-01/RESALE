import jwt from "jsonwebtoken";
import { promisify } from "util";
import config from "../config/config.js";

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export const generateAccessToken = async (payload) => {
  return await signAsync(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const generateRefreshToken = async (payload) => {
  return await signAsync(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

export const verifyAccessToken = async (token) => {
  return await verifyAsync(token, config.jwt.secret);
};

export const verifyRefreshToken = async (token) => {
  return await verifyAsync(token, config.jwt.refreshSecret);
};
