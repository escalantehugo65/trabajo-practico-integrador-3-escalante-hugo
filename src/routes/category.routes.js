import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/validations/category.validation.js";
import { validateId } from "../middlewares/validations/id.validation.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.post(
  "/",
  adminMiddleware,
  createCategoryValidation,
  handleValidationErrors,
  createCategory,
);

categoryRoutes.get("/", getAllCategories);

categoryRoutes.get("/:id", validateId, handleValidationErrors, getCategoryById);

categoryRoutes.put(
  "/:id",
  adminMiddleware,
  validateId,
  handleValidationErrors,
  updateCategoryValidation,
  handleValidationErrors,
  updateCategory,
);

categoryRoutes.delete(
  "/:id",
  adminMiddleware,
  validateId,
  handleValidationErrors,
  deleteCategory,
);
