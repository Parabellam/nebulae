import express from "express";
import { getStatus } from "../controllers/dataController.js";
import { validateApiKey } from "../middleware/apiKeyAuth.js";

const router = express.Router();

// Aplicar middleware de API key a todas las rutas
router.use(validateApiKey);

// Rutas
router.get("/status", getStatus);

export default router;
