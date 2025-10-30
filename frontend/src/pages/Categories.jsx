import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true); // 🌀 NEW
  const [error, setError] = useState(null); // ❌ Optional error handling

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return;
    try {
      const res = await api.post(
        "/categories",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, res.data.category]);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const updateCategory = async (id) => {
    if (!editName.trim()) return;
    try {
      const res = await api.put(
        `/categories/${id}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories(
        categories.map((c) =>
          c.id === id ? { ...c, name: res.data.name } : c
        )
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl mt-8">
          <h1 className="text-2xl font-bold mb-6 text-indigo-600 font-serif text-center">
            Category Management
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={addCategory}
              className="bg-indigo-600 text-white px-5 py-2 font-serif rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Add Category
            </button>
          </div>

          {/* 🌀 LOADING STATE */}
          {loading && (
            <p className="text-center text-gray-500 animate-pulse">
              Loading categories...
            </p>
          )}

          {/* ❌ ERROR STATE */}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          {/* 📭 EMPTY STATE */}
          {!loading && !error && categories.length === 0 && (
            <p className="text-center text-gray-400 italic">
              No categories found.
            </p>
          )}

          {/* ✅ DATA STATE */}
          {!loading && categories.length > 0 && (
            <ul className="space-y-3">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border hover:shadow-md transition"
                >
                  {editId === c.id ? (
                    <>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => updateCategory(c.id)}
                          className="text-green-600 font-semibold hover:text-green-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500 hover:text-gray-700 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{c.name}</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(c.id, c.name)}
                          className="text-indigo-600 hover:text-indigo-800 font-serif font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(c.id)}
                          className="text-red-500 hover:text-red-700 font-serif font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
