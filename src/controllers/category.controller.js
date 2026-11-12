import { matchedData } from "express-validator";
import { Category } from "../models/category.model.js";
import { Event } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const newCategory = await Category.create(data);

    return res.status(201).json({
      msg: "Categoría creada correctamente",
      data: newCategory,
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

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      msg: "Categorías obtenidas correctamente",
      data: categories,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const category = await Category.findById(id).populate("events");

    if (!category) {
      return res.status(404).json({
        msg: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Categoría encontrada",
      data: category,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const data = matchedData(req, { locations: ["body"] });

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        msg: "Categoría no encontrada",
      });
    }

    Object.assign(category, data);

    await category.save();

    return res.status(200).json({
      msg: "Categoría actualizada correctamente",
      data: category,
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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        msg: "Categoría no encontrada",
      });
    }

    await Event.updateMany({ categories: id }, { $pull: { categories: id } });

    await category.deleteOne();

    return res.status(200).json({
      msg: "Categoría eliminada y retirada de sus eventos",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
