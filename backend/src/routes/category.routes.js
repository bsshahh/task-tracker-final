import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categorycontroller/category.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Public 
router.get("/", verifyToken, getAllCategories);

//Admin-only 
router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;
