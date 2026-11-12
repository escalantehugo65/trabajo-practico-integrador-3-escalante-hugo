import { body } from "express-validator";
import { Event } from "../../models/event.model.js";
import { Category } from "../../models/category.model.js";

export const createEventValidation = [
  body("title")
    .isString()
    .withMessage("title debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Longitud inválida para title")
    .bail()
    .custom(async (title, { req }) => {
      const found = await Event.findOne({ title });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de title ya está registrado");
      }
      return true;
    }),

  body("description")
    .isString()
    .withMessage("description debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Longitud inválida para description")
    .bail(),

  body("startDate")
    .isString()
    .withMessage("startDate debe ser texto")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .withMessage("La fecha debe ser válida")
    .bail()
    .toDate()
    .custom((date, { req }) => {
      const startDate = req.body.startDate ?? req.event?.startDate;
      const endDate = req.body.endDate ?? req.event?.endDate;
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),

  body("endDate")
    .isString()
    .withMessage("endDate debe ser texto")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .withMessage("La fecha debe ser válida")
    .bail()
    .toDate()
    .custom((date, { req }) => {
      const startDate = req.body.startDate ?? req.event?.startDate;
      const endDate = req.body.endDate ?? req.event?.endDate;
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),

  body("capacity").custom((value) => {
    if (!Number.isInteger(value) || value < 1)
      throw new Error("La capacidad debe ser un entero mayor o igual a 1");
    return true;
  }),

  body("price")
    .optional()
    .custom((value) => {
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0)
        throw new Error("El precio debe ser un número mayor o igual a 0");
      return true;
    }),

  body("status")
    .optional()
    .isString()
    .withMessage("status debe ser texto")
    .bail()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado no es válido"),

  body("location.venue")
    .isString()
    .withMessage("location.venue debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Longitud inválida para location.venue")
    .bail(),

  body("location.address")
    .isString()
    .withMessage("location.address debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage("Longitud inválida para location.address")
    .bail(),

  body("location.city")
    .isString()
    .withMessage("location.city debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud inválida para location.city")
    .bail(),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorías deben ser un arreglo"),

  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un ObjectId válido")
    .bail()
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) throw new Error("La categoría no existe");
      return true;
    }),
];

export const updateEventValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("title debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Longitud inválida para title")
    .bail()
    .custom(async (title, { req }) => {
      const found = await Event.findOne({ title });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de title ya está registrado");
      }
      return true;
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Longitud inválida para description")
    .bail(),

  body("startDate")
    .optional()
    .isString()
    .withMessage("startDate debe ser texto")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .withMessage("La fecha debe ser válida")
    .bail()
    .toDate()
    .custom((date, { req }) => {
      const startDate = req.body.startDate ?? req.event?.startDate;
      const endDate = req.body.endDate ?? req.event?.endDate;
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),

  body("endDate")
    .optional()
    .isString()
    .withMessage("endDate debe ser texto")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .withMessage("La fecha debe ser válida")
    .bail()
    .toDate()
    .custom((date, { req }) => {
      const startDate = req.body.startDate ?? req.event?.startDate;
      const endDate = req.body.endDate ?? req.event?.endDate;
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),

  body("capacity")
    .optional()
    .custom((value) => {
      if (!Number.isInteger(value) || value < 1)
        throw new Error("La capacidad debe ser un entero mayor o igual a 1");
      return true;
    }),

  body("price")
    .optional()
    .custom((value) => {
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0)
        throw new Error("El precio debe ser un número mayor o igual a 0");
      return true;
    }),

  body("status")
    .optional()
    .isString()
    .withMessage("status debe ser texto")
    .bail()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado no es válido"),

  body("location.venue")
    .optional()
    .isString()
    .withMessage("location.venue debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Longitud inválida para location.venue")
    .bail(),

  body("location.address")
    .optional()
    .isString()
    .withMessage("location.address debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage("Longitud inválida para location.address")
    .bail(),

  body("location.city")
    .optional()
    .isString()
    .withMessage("location.city debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud inválida para location.city")
    .bail(),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorías deben ser un arreglo"),

  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un ObjectId válido")
    .bail()
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) throw new Error("La categoría no existe");
      return true;
    }),
];
