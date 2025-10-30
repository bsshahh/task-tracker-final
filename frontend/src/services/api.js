import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "http://backend:3000/api";

const api = axios.create({ baseURL });

export default api;
