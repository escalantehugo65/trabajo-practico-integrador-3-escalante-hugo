import { param } from "express-validator";

export const validateId = [
  param("id").isMongoId().withMessage("El id debe ser un ObjectId válido"),
];
