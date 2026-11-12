import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null }).populate("events");

    return res.status(200).json({
      msg: "Usuarios obtenidos correctamente",
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const user = await User.findOne({ _id: id, deletedAt: null }).populate(
      "events",
    );

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Usuario encontrado",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const data = matchedData(req, { locations: ["body"] });

    const user = await User.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    if (data.profile) {
      user.profile = {
        ...user.profile.toObject(),
        ...data.profile,
      };

      delete data.profile;
    }

    Object.assign(user, data);

    await user.save();

    return res.status(200).json({
      msg: "Usuario actualizado correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        msg: "El valor de un campo único ya está registrado",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos no cumplen las reglas del modelo",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const user = await User.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    await Event.deleteMany({ organizer: id });

    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      msg: "Usuario eliminado lógicamente y eventos eliminados",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
