import { matchedData } from "express-validator";
import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    data.organizer = req.user._id;

    const newEvent = await Event.create(data);

    return res.status(201).json({
      msg: "Evento creado correctamente",
      data: newEvent,
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

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({ path: "organizer", match: { deletedAt: null } })
      .populate("categories");

    return res.status(200).json({
      msg: "Eventos obtenidos correctamente",
      data: events,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .populate({ path: "organizer", match: { deletedAt: null } })
      .populate("categories");

    return res.status(200).json({
      msg: "Tus eventos fueron obtenidos correctamente",
      data: events,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const event = await Event.findById(id)
      .populate({ path: "organizer", match: { deletedAt: null } })
      .populate("categories");

    if (!event) {
      return res.status(404).json({
        msg: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Evento encontrado",
      data: event,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const event = req.event;

    if (data.location) {
      event.location = {
        ...event.location.toObject(),
        ...data.location,
      };

      delete data.location;
    }

    Object.assign(event, data);

    await event.save();

    return res.status(200).json({
      msg: "Evento actualizado correctamente",
      data: event,
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

export const deleteEvent = async (req, res) => {
  try {
    const event = req.event;

    await event.deleteOne();

    return res.status(200).json({
      msg: "Evento eliminado físicamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
