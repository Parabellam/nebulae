import { MongoClient } from "mongodb";
import { MONGODB_CONFIG } from "../../config/mongodb.js";

class MongoService {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      const client = await MongoClient.connect(MONGODB_CONFIG.url);
      this.connection = client.db(MONGODB_CONFIG.dbName);
      console.log("Conectado a MongoDB");
      return this.connection;
    } catch (error) {
      console.error("Error conectando a MongoDB:", error.message);
      throw error;
    }
  }

  async getData() {
    try {
      if (!this.connection) {
        throw new Error("MongoDB no está conectado");
      }
      return await this.connection.collection("items").find().toArray();
    } catch (error) {
      console.error("Error obteniendo datos de MongoDB:", error.message);
      throw error;
    }
  }

  async close() {
    if (this.connection) {
      try {
        await this.connection.client.close();
        console.log("Conexión a MongoDB cerrada");
      } catch (error) {
        console.error("Error cerrando conexión a MongoDB:", error.message);
      }
    }
  }
}

export default new MongoService();
