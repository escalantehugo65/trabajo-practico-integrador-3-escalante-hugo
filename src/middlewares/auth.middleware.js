import { isValidObjectId } from "mongoose";
import { verifyToken } from "../helpers/jwt.helper.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        msg: "Tenés que iniciar sesión",
      });
    }

    let payload;

    try {
      payload = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        msg: "La sesión es inválida o expiró",
      });
    }

    if (!payload || !isValidObjectId(payload.id)) {
      return res.status(401).json({
        msg: "La sesión es inválida",
      });
    }

    const user = await User.findOne({
      _id: payload.id,
      deletedAt: null,
    });

    if (!user) {
      return res.status(401).json({
        msg: "La sesión ya no está disponible",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
