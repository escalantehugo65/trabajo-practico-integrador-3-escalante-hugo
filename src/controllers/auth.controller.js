import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    data.password = await hashPassword(data.password);

    const newUser = await User.create(data);

    return res.status(201).json({
      msg: "Usuario registrado correctamente",
      data: newUser,
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

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req, { locations: ["body"] });

    const user = await User.findOne({ email, deletedAt: null }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({
        msg: "Email o contraseña incorrectos",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        msg: "Email o contraseña incorrectos",
      });
    }

    const token = generateToken({ id: user._id.toString(), role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      msg: "Sesión iniciada correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      msg: "Perfil obtenido correctamente",
      data: req.user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const user = req.user;

    user.profile = {
      ...user.profile.toObject(),
      ...data.profile,
    };

    await user.save();

    return res.status(200).json({
      msg: "Perfil actualizado correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      msg: "Sesión cerrada correctamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
