import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    status: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [taskRes, userRes] = await Promise.all([
        api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setTasks(taskRes.data.tasks || []);
      setUsers(userRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Client-side filter logic
  const filteredTasks = tasks.filter((t) => {
    const matchUser =
      !filters.userId || t.userId?.toString() === filters.userId;
    const matchStatus =
      !filters.status ||
      t.status?.toLowerCase() === filters.status.toLowerCase();
    const matchDueDate =
      !filters.dueDate || t.dueDate?.slice(0, 10) === filters.dueDate;
    return matchUser && matchStatus && matchDueDate;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 font-serif mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* 🔍 Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row gap-4">
          <select
            value={filters.userId}
            onChange={(e) =>
              setFilters({ ...filters, userId: e.target.value })
            }
            className="border p-3 rounded-lg flex-1"
          >
            <option value="">All Users</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="border p-3 rounded-lg flex-1"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <input
            type="date"
            value={filters.dueDate}
            onChange={(e) =>
              setFilters({ ...filters, dueDate: e.target.value })
            }
            className="border p-3 rounded-lg flex-1"
          />
        </div>

        {/* 🧾 Task List */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-serif font-semibold mb-4">All User Tasks</h2>

          {/* 🌀 Loading */}
          {loading && (
            <p className="text-center text-gray-500 animate-pulse">
              Loading tasks...
            </p>
          )}

          {/* ❌ Error */}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          {/* 📭 No Tasks Found */}
          {!loading && !error && filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 italic">
              No tasks found.
            </p>
          )}

          {/* ✅ Tasks List */}
          {!loading && !error && filteredTasks.length > 0 && (
            <ul className="space-y-3">
              {filteredTasks.map((t) => (
                <li
                  key={t.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded-lg border hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{t.title}</h3>
                    <p className="text-gray-600">{t.description}</p>
                    <p className="text-sm text-indigo-600 mt-1">
                      User: {t.User?.name || "Unknown"} | Category:{" "}
                      {t.Category?.name || "None"}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                    <p>Due: {t.dueDate?.slice(0, 10) || "N/A"}</p>
                    <p>Status: {t.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
