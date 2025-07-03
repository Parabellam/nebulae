import mongoService from "../db/mongoService.js";
import { ObjectId } from "mongodb";

class EmployeeService {
  async getAllEmployees() {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }
      return await mongoService.connection
        .collection("employees")
        .find({})
        .toArray();
    } catch (error) {
      console.error("Error obteniendo empleados:", error.message);
      throw error;
    }
  }

  async getEmployeeById(id) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }
      return await mongoService.connection
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error obteniendo empleado:", error.message);
      throw error;
    }
  }

  async createEmployee(employeeData) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const newEmployee = {
        ...employeeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await mongoService.connection
        .collection("employees")
        .insertOne(newEmployee);

      return await this.getEmployeeById(result.insertedId.toString());
    } catch (error) {
      console.error("Error creando empleado:", error.message);
      throw error;
    }
  }

  async updateEmployee(id, updateData) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date(),
      };

      const result = await mongoService.connection
        .collection("employees")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateWithTimestamp });

      if (result.modifiedCount === 0) {
        throw new Error("No se pudo actualizar el empleado");
      }

      return await this.getEmployeeById(id);
    } catch (error) {
      console.error("Error actualizando empleado:", error.message);
      throw error;
    }
  }

  async deleteEmployee(id) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const result = await mongoService.connection
        .collection("employees")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error("No se pudo eliminar el empleado");
      }

      return { message: "Empleado eliminado exitosamente" };
    } catch (error) {
      console.error("Error eliminando empleado:", error.message);
      throw error;
    }
  }
}

export default new EmployeeService();
