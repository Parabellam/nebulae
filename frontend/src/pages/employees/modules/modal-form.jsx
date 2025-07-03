import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalForm = React.memo(({ open, onClose, employee = null, onSave }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    position: "",
    department: "",
  });

  React.useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        position: employee.position || "",
        department: employee.department || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "",
      });
    }
  }, [employee, open]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const isEditMode = !!employee;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          gutterBottom
        >
          {isEditMode ? "Editar Empleado" : "Crear Nuevo Empleado"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Posición"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departamento"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              {isEditMode ? "Actualizar" : "Crear"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

ModalForm.displayName = "ModalForm";

export default ModalForm;
