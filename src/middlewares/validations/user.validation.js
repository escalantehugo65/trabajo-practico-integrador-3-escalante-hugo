import { body } from "express-validator";
import { User } from "../../models/user.model.js";

export const updateUserValidation = [
  body("username")
    .optional()
    .isString()
    .withMessage("username debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Longitud inválida para username")
    .bail()
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumérico")
    .bail()
    .toLowerCase()
    .custom(async (username, { req }) => {
      const found = await User.findOne({ username });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de username ya está registrado");
      }
      return true;
    }),

  body("email")
    .optional()
    .isString()
    .withMessage("email debe ser texto")
    .bail()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("El email no es válido")
    .bail()
    .custom(async (email, { req }) => {
      const found = await User.findOne({ email });
      if (found && found._id.toString() !== req.params.id) {
        throw new Error("El valor de email ya está registrado");
      }
      return true;
    }),

  body("password")
    .optional()
    .isString()
    .withMessage("password debe ser texto")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Longitud inválida para password")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe tener 8 caracteres, una mayúscula, una minúscula y un número",
    ),

  body("role")
    .optional()
    .isString()
    .withMessage("role debe ser texto")
    .bail()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),

  body("profile.firstName")
    .optional()
    .isString()
    .withMessage("profile.firstName debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud inválida para profile.firstName")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre y apellido solo deben contener letras"),

  body("profile.lastName")
    .optional()
    .isString()
    .withMessage("profile.lastName debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud inválida para profile.lastName")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre y apellido solo deben contener letras"),

  body("profile.birthDate")
    .optional()
    .isString()
    .withMessage("La fecha debe ser texto")
    .bail()
    .isISO8601({ strict: true })
    .withMessage("La fecha de nacimiento debe ser válida")
    .bail()
    .custom((date) => {
      if (new Date(date) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    })
    .toDate(),

  body("profile.phone")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser texto")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("El teléfono debe contener entre 8 y 15 dígitos")
    .isNumeric({ no_symbols: true })
    .withMessage("El teléfono solo debe contener números"),
];
