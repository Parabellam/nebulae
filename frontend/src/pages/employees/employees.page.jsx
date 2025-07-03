import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ModalForm from "./modules/modal-form.jsx";
import { employeesAdapter } from "../../adapters/employees.adapters.js";

const EmployeesPage = React.memo(() => {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState(null);

  // Cargar empleados al montar el componente
  React.useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeesAdapter.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
      setError("Error al cargar los empleados. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este empleado?")
    ) {
      try {
        await employeesAdapter.deleteEmployee(employeeId);
        // Recargar la lista después de eliminar
        await loadEmployees();
      } catch (error) {
        console.error("Error eliminando empleado:", error);
        alert("Error al eliminar el empleado. Por favor, intenta de nuevo.");
      }
    }
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (editingEmployee) {
        // Actualizar empleado existente
        await employeesAdapter.updateEmployee(
          editingEmployee._id,
          employeeData
        );
      } else {
        // Crear nuevo empleado
        await employeesAdapter.createEmployee(employeeData);
      }

      // Recargar la lista después de crear/actualizar
      await loadEmployees();
      setModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error guardando empleado:", error);
      alert("Error al guardar el empleado. Por favor, intenta de nuevo.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Gestión de Empleados
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateEmployee}
          sx={{ backgroundColor: "#1976d2" }}
        >
          Crear Empleado
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de empleados">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Posición</strong>
              </TableCell>
              <TableCell>
                <strong>Departamento</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay empleados registrados
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow
                  key={employee._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department || "-"}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditEmployee(employee)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteEmployee(employee._id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalForm
        open={modalOpen}
        onClose={handleCloseModal}
        employee={editingEmployee}
        onSave={handleSaveEmployee}
      />
    </Box>
  );
});

export default EmployeesPage;
