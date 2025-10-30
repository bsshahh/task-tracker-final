import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Todo");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  // ✅ Add new task
  const addTask = async () => {
    if (!title.trim() || !description.trim() || !selectedCategory || !dueDate) {
      alert("Please fill all fields including due date");
      return;
    }

    setAdding(true);
    try {
      const res = await api.post(
        "/tasks",
        {
          title,
          description,
          categoryId: selectedCategory,
          dueDate,
          status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const createdTask = res.data.task;
      const categoryObj = categories.find(
        (c) => c.id === parseInt(selectedCategory)
      );

      setTasks([...tasks, { ...createdTask, Category: categoryObj }]);
      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setDueDate("");
      setStatus("Todo");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  // ✅ Update task status
  const updateStatus = async (taskId, newStatus) => {
    try {
      const res = await api.patch(
        `/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTask = res.data.task;

      setTasks(
        tasks.map((t) =>
          t.id === taskId
            ? { ...t, ...updatedTask, Category: t.Category }
            : t
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // ✅ Delete task
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl mt-8">
          <h1 className="text-2xl font-bold mb-6 font-serif text-indigo-600 text-center">
            Dashboard
          </h1>

          {/* Add Task Form */}
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Category</option>
              {loadingCategories ? (
                <option disabled>Loading categories...</option>
              ) : (
                categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>

            <button
              onClick={addTask}
              disabled={adding}
              className={`${
                adding
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-5 py-3 rounded-lg font-semibold transition font-serif`}
            >
              {adding ? "Adding..." : "Add Task"}
            </button>
          </div>

          {/* ✅ Task List */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-indigo-600 font-serif mb-4">
              My Tasks
            </h2>

            {loadingTasks ? (
              <p className="text-center text-gray-500">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks found</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((t) => {
                  const isPastDue =
                    new Date(t.dueDate).setHours(0, 0, 0, 0) <
                    new Date().setHours(0, 0, 0, 0);
                  return (
                    <li
                      key={t.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded-lg border hover:shadow-md transition"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {t.title}
                        </h3>
                        <p className="text-gray-600">{t.description}</p>
                        <p className="text-sm text-indigo-600 mt-1">
                          Category: {t.Category?.name || "Unassigned"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Due:{" "}
                          {t.dueDate
                            ? new Date(t.dueDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          Status:{" "}
                          <span
                            className={`${
                              t.status === "Done"
                                ? "text-green-600"
                                : t.status === "Doing"
                                ? "text-yellow-600"
                                : "text-gray-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-0 flex gap-3 items-center">
                        {isPastDue ? (
                          <p className="text-red-500 text-sm italic">
                            Due date passed
                          </p>
                        ) : (
                          <select
                            value={t.status}
                            onChange={(e) =>
                              updateStatus(t.id, e.target.value)
                            }
                            className="border p-2 rounded-md text-sm"
                          >
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                          </select>
                        )}

                        <button
                          onClick={() => deleteTask(t.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
