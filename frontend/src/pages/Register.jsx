import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👁 for show/hide icon (lucide-react is already available)

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    adminKey: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // 🔐 Regex (same as backend)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Client-side validations (mirror backend)
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email address (e.g., user@example.com)");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be 8–12 characters, include one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (form.role === "admin" && form.adminKey !== "ADMIN123") {
      setError("Invalid admin key!");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 font-serif text-indigo-600">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email (e.g. johndoe@gmail.com)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be a valid email format (e.g. name@example.com)
            </p>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <p className="text-xs text-gray-500 mt-1">
              8–12 chars, 1 uppercase, 1 number, 1 special symbol
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Role Selection */}
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Admin Key Field (only if Admin selected) */}
          {form.role === "admin" && (
            <input
              type="text"
              placeholder="Enter Admin Key"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
            />
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-serif font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>

          {/* Error Below Button */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center mt-2">
              {error}
            </p>
          )}
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-serif font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
