import employeeService from "../../services/employees/employeeService.js";

// Obtener todos los empleados
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    console.error("Error obteniendo empleados:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un empleado por ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error obteniendo empleado:", error.message);
    if (error.message === "Empleado no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
  try {
    const { name, email, position, department } = req.body;

    if (!name || !email || !position) {
      return res.status(400).json({
        error: "Nombre, email y posición son campos obligatorios",
      });
    }

    const employeeData = {
      name,
      email,
      position,
      department: department || "",
    };

    const createdEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(createdEmployee);
  } catch (error) {
    console.error("Error creando empleado:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un empleado
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedEmployee = await employeeService.updateEmployee(
      id,
      updateData
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error actualizando empleado:", error.message);
    if (error.message === "Empleado no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un empleado
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);
    res.json(result);
  } catch (error) {
    console.error("Error eliminando empleado:", error.message);
    if (error.message === "Empleado no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
