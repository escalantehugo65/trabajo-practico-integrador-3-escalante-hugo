import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import {
  createEventValidation,
  updateEventValidation,
} from "../middlewares/validations/event.validation.js";
import { validateId } from "../middlewares/validations/id.validation.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";

export const eventRoutes = Router();

eventRoutes.use(authMiddleware);

eventRoutes.post(
  "/",
  createEventValidation,
  handleValidationErrors,
  createEvent,
);

eventRoutes.get("/", getAllEvents);

eventRoutes.get("/my", getMyEvents);

eventRoutes.get("/:id", validateId, handleValidationErrors, getEventById);

eventRoutes.put(
  "/:id",
  validateId,
  handleValidationErrors,
  ownerOrAdminMiddleware,
  updateEventValidation,
  handleValidationErrors,
  updateEvent,
);

eventRoutes.delete(
  "/:id",
  validateId,
  handleValidationErrors,
  ownerOrAdminMiddleware,
  deleteEvent,
);
