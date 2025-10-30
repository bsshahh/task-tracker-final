import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token,
      role: user.role,
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
