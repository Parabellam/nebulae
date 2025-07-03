import { httpRequest } from "./_httpRequest.js";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";
const API_KEY = process.env.REACT_APP_API_KEY || "api-key-nebulae";

// Configuración base para las peticiones
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
};

export const employeesAdapter = {
  // Obtener todos los empleados
  async getAllEmployees() {
    try {
      const response = await httpRequest.get(
        `${API_BASE_URL}/employees`,
        config
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo empleados:", error);
      throw error;
    }
  },

  // Obtener un empleado por ID
  async getEmployeeById(id) {
    try {
      const response = await httpRequest.get(
        `${API_BASE_URL}/employees/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error obteniendo empleado:", error);
      throw error;
    }
  },

  // Crear un nuevo empleado
  async createEmployee(employeeData) {
    try {
      const response = await httpRequest.post(
        `${API_BASE_URL}/employees`,
        employeeData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error creando empleado:", error);
      throw error;
    }
  },

  // Actualizar un empleado
  async updateEmployee(id, employeeData) {
    try {
      const response = await httpRequest.put(
        `${API_BASE_URL}/employees/${id}`,
        employeeData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error actualizando empleado:", error);
      throw error;
    }
  },

  // Eliminar un empleado
  async deleteEmployee(id) {
    try {
      const response = await httpRequest.delete(
        `${API_BASE_URL}/employees/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error eliminando empleado:", error);
      throw error;
    }
  },
};
