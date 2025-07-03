# Backend Nebulae

## Estructura del Proyecto

### Configuración (`/config`)
- `mongodb.js` - Configuración de conexión a MongoDB
- `apiKey.js` - Configuración de API Key para autenticación

### Controladores (`/controllers`)
- `dataController.js` - Controlador para operaciones generales de datos
- `employeeController.js` - Controlador para operaciones de empleados
- `vehicleController.js` - Controlador para operaciones de vehículos

### Servicios (`/services`)
- `mongoService.js` - Servicio para operaciones con MongoDB
- `employeeService.js` - Servicio para operaciones de empleados
- `vehicleService.js` - Servicio para operaciones de vehículos

### Rutas (`/routes`)
- `dataRoutes.js` - Rutas para operaciones generales de datos
- `employeeRoutes.js` - Rutas para operaciones de empleados
- `vehicleRoutes.js` - Rutas para operaciones de vehículos

## Endpoints Disponibles

### GET `/api/status`
Obtiene el estado de conexión de las bases de datos

### GET `/api/mongo-data`
Obtiene datos de MongoDB

### Empleados
- `GET /api/employees` - Obtener todos los empleados
- `GET /api/employees/:id` - Obtener empleado por ID
- `POST /api/employees` - Crear nuevo empleado
- `PUT /api/employees/:id` - Actualizar empleado
- `DELETE /api/employees/:id` - Eliminar empleado

### Vehículos
- `GET /api/vehicles` - Obtener todos los vehículos
- `GET /api/vehicles/:id` - Obtener vehículo por ID
- `POST /api/vehicles` - Crear nuevo vehículo
- `PUT /api/vehicles/:id` - Actualizar vehículo
- `DELETE /api/vehicles/:id` - Eliminar vehículo

## Variables de Entorno

```env
MONGODB_URL=mongodb://root:example@mongo:27017/admin
MONGODB_DB_NAME=nebulae_mongo_db
API_KEY=api-key-nebulae
```
