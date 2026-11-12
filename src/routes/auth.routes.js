import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
  profileValidation,
} from "../middlewares/validations/auth.validation.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  register,
);

authRoutes.post("/login", loginValidation, handleValidationErrors, login);

authRoutes.get("/profile", authMiddleware, getProfile);

authRoutes.put(
  "/profile",
  authMiddleware,
  profileValidation,
  handleValidationErrors,
  updateProfile,
);

authRoutes.post("/logout", authMiddleware, logout);
