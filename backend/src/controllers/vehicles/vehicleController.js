import vehicleService from "../../services/vehicles/vehicleService.js";

// Obtener todos los vehículos
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    console.error("Error obteniendo vehículos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un vehículo por ID
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await vehicleService.getVehicleById(id);
    res.json(vehicle);
  } catch (error) {
    console.error("Error obteniendo vehículo:", error.message);
    if (error.message === "Vehículo no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo vehículo
export const createVehicle = async (req, res) => {
  try {
    const { brand, model, year, license_plate } = req.body;

    if (!brand || !model || !license_plate) {
      return res.status(400).json({
        error: "Marca, modelo y placa son campos obligatorios",
      });
    }

    const vehicleData = {
      brand,
      model,
      year: year || null,
      license_plate,
    };

    const createdVehicle = await vehicleService.createVehicle(vehicleData);
    res.status(201).json(createdVehicle);
  } catch (error) {
    console.error("Error creando vehículo:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un vehículo
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVehicle = await vehicleService.updateVehicle(id, updateData);
    res.json(updatedVehicle);
  } catch (error) {
    console.error("Error actualizando vehículo:", error.message);
    if (error.message === "Vehículo no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un vehículo
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vehicleService.deleteVehicle(id);
    res.json(result);
  } catch (error) {
    console.error("Error eliminando vehículo:", error.message);
    if (error.message === "Vehículo no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
