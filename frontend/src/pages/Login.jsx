import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Save token and role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ Redirect based on role
     
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 font-serif text-indigo-600">
          Task Tracker Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-serif font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-serif font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
