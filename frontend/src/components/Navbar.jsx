import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold font-serif">Task Tracker Lite</h1>

      <div className="space-x-4">
        {/* Normal users → Dashboard */}
        {role === "user" && (
          <Link
            to="/dashboard"
            className="hover:bg-indigo-500 px-3 py-2 rounded-lg transition font-serif"
          >
            Dashboard
          </Link>
        )}

        {/* Admin → Admin Dashboard + Categories */}
        {role === "admin" && (
          <>
            <Link
              to="/admin-dashboard"
              className="hover:bg-indigo-500 px-3 py-2 rounded-lg transition font-serif"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/categories"
              className="hover:bg-indigo-500 px-3 py-2 rounded-lg transition font-serif"
            >
              Manage Categories
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg font-medium transition font-serif"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
