import express from "express";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller/task.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getUserTasks);
router.patch("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
