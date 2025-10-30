import jwt from "jsonwebtoken";
import { TokenBlacklist } from "../../models/index.js";

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);

    // Save the token in blacklist table
    await TokenBlacklist.create({
      token,
      expiresAt: new Date(decoded.exp * 1000), // store expiry date
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
