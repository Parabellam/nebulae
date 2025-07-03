import mongoService from "../db/mongoService.js";

class VehicleService {
  async getAllVehicles() {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }
      return await mongoService.connection
        .collection("vehicles")
        .find({})
        .toArray();
    } catch (error) {
      console.error("Error obteniendo vehículos:", error.message);
      throw error;
    }
  }

  async getVehicleById(id) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }
      return await mongoService.connection
        .collection("vehicles")
        .findOne({ _id: new mongoService.connection.ObjectId(id) });
    } catch (error) {
      console.error("Error obteniendo vehículo:", error.message);
      throw error;
    }
  }

  async createVehicle(vehicleData) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const newVehicle = {
        ...vehicleData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await mongoService.connection
        .collection("vehicles")
        .insertOne(newVehicle);

      return await this.getVehicleById(result.insertedId.toString());
    } catch (error) {
      console.error("Error creando vehículo:", error.message);
      throw error;
    }
  }

  async updateVehicle(id, updateData) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date(),
      };

      const result = await mongoService.connection
        .collection("vehicles")
        .updateOne(
          { _id: new mongoService.connection.ObjectId(id) },
          { $set: updateWithTimestamp }
        );

      if (result.modifiedCount === 0) {
        throw new Error("No se pudo actualizar el vehículo");
      }

      return await this.getVehicleById(id);
    } catch (error) {
      console.error("Error actualizando vehículo:", error.message);
      throw error;
    }
  }

  async deleteVehicle(id) {
    try {
      if (!mongoService.connection) {
        throw new Error("MongoDB no está conectado");
      }

      const result = await mongoService.connection
        .collection("vehicles")
        .deleteOne({ _id: new mongoService.connection.ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error("No se pudo eliminar el vehículo");
      }

      return { message: "Vehículo eliminado exitosamente" };
    } catch (error) {
      console.error("Error eliminando vehículo:", error.message);
      throw error;
    }
  }
}

export default new VehicleService();
