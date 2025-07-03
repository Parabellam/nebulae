import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees/employeeController.js";
import { validateApiKey } from "../middleware/apiKeyAuth.js";

const router = express.Router();

// Aplicar middleware de API key a todas las rutas
router.use(validateApiKey);

// Rutas para empleados
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
