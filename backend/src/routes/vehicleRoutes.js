import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicles/vehicleController.js";
import { validateApiKey } from "../middleware/apiKeyAuth.js";

const router = express.Router();

// Aplicar middleware de API key a todas las rutas
router.use(validateApiKey);

// Rutas para vehículos
router.get("/vehicles", getAllVehicles);
router.get("/vehicles/:id", getVehicleById);
router.post("/vehicles", createVehicle);
router.put("/vehicles/:id", updateVehicle);
router.delete("/vehicles/:id", deleteVehicle);

export default router;
