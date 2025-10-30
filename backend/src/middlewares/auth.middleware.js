import jwt from "jsonwebtoken";
import { TokenBlacklist } from "../models/index.js";
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check in DB if token is blacklisted
  const blacklisted = await TokenBlacklist.findOne({ where: { token } });
  if (blacklisted) {
    return res.status(401).json({ message: "Token invalidated. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based middleware (for admin)
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
