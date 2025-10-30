import express from "express";
import { getAllUsers,getAllTasks } from "../controllers/admindashboardcontroller/admin.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Admin dashboard
router.get("/dashboard", verifyToken, isAdmin, getAllTasks);
router.get("/users", verifyToken, isAdmin, getAllUsers);

export default router;
