import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import Categories from "./pages/Categories";
import AdminDashboard from "./pages/AdminDashboard"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
