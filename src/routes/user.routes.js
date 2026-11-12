import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { updateUserValidation } from "../middlewares/validations/user.validation.js";
import { validateId } from "../middlewares/validations/id.validation.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";

export const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.use(adminMiddleware);

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", validateId, handleValidationErrors, getUserById);

userRoutes.put(
  "/:id",
  validateId,
  handleValidationErrors,
  updateUserValidation,
  handleValidationErrors,
  updateUser,
);

userRoutes.delete("/:id", validateId, handleValidationErrors, deleteUser);
