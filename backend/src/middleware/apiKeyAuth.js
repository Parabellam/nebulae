import { API_KEY } from "../config/apiKey.js";

export const validateApiKey = (req, res, next) => {
  const providedApiKey =
    req.headers["x-api-key"] || req.headers["authorization"];

  if (!providedApiKey) {
    return res.status(401).json({
      error:
        "API key requerida. Incluye 'x-api-key' en los headers o 'authorization'",
    });
  }

  const cleanApiKey = providedApiKey.replace("Bearer ", "");

  if (cleanApiKey !== API_KEY) {
    return res.status(403).json({
      error: "API key inválida",
    });
  }

  next();
};
