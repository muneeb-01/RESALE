import { verifyAccessToken } from "../utils/jwt.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const user = await verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired access token" });
  }
};
