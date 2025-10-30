import express from "express";
import { register } from "../controllers/authcontroller/register.controller.js";
import { login } from "../controllers/authcontroller/login.controller.js";
import { logout } from "../controllers/authcontroller/logout.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
