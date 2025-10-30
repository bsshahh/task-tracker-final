import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "http://backend:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
