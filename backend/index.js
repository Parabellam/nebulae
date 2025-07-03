import express from "express";
import cors from "cors";
import dataRoutes from "./src/routes/dataRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import vehicleRoutes from "./src/routes/vehicleRoutes.js";
import mongoService from "./src/services/db/mongoService.js";

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization']
}));

app.use(express.json());

// Conectar a las bases de datos al iniciar
async function initializeDatabases() {
  console.log("🚀 Iniciando conexión a bases de datos...");

  try {
    console.log("🔗 Conectando a la base de datos...");
    await Promise.all([mongoService.connect()]);

    console.log("✅ Todas las bases de datos conectadas exitosamente");
  } catch (error) {
    console.error("❌ Error inicializando bases de datos: ");
    console.error("   Detalles:", error);

    // Intentar cerrar conexiones si se establecieron parcialmente
    try {
      await mongoService.close();
    } catch (closeError) {
      console.error("Error cerrando conexiones:", closeError.message);
    }

    throw error;
  }
}

// Inicializar bases de datos
await initializeDatabases();

// Rutas
app.use("/api", dataRoutes);
app.use("/api", employeeRoutes);
app.use("/api", vehicleRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error("Error no manejado:", error);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Manejo de cierre graceful
process.on("SIGINT", async () => {
  console.log("🔄 Cerrando conexiones...");
  try {
    await Promise.all([mongoService.close()]);
    console.log("✅ Conexiones cerradas exitosamente");
  } catch (error) {
    console.error("❌ Error cerrando conexiones:", error);
  }
  process.exit(0);
});

app.listen(3001, () => console.log("🚀 Backend ejecutándose en puerto 3001"));
