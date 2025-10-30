import User from "../../models/user.model.js";

export const register = async (req, res) => {
  try {
    
    const { name, email, password, confirmPassword, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8–12 chars long and include at least one uppercase, one number, and one special character",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords and confirm password do not match" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, role });
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
