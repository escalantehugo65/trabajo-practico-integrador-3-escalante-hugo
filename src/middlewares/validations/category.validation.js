import { body } from "express-validator";
import { Category } from "../../models/category.model.js";

export const createCategoryValidation = [
  body("name")
    .isString()
    .withMessage("name debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Longitud inválida para name")
    .bail()
    .toLowerCase()
    .custom(async (name, { req }) => {
      const found = await Category.findOne({ name });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de name ya está registrado");
      }
      return true;
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser texto")
    .bail()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Longitud inválida para description")
    .bail(),
];

export const updateCategoryValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("name debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Longitud inválida para name")
    .bail()
    .toLowerCase()
    .custom(async (name, { req }) => {
      const found = await Category.findOne({ name });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de name ya está registrado");
      }
      return true;
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser texto")
    .bail()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Longitud inválida para description")
    .bail(),
];
