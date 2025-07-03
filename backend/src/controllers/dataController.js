import mongoService from "../services/db/mongoService.js";

export const getStatus = (req, res) => {
  res.json({
    mongodb: mongoService.connection ? "conectado" : "desconectado",
  });
};
