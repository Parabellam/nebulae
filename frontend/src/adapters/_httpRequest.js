import axios from 'axios';

// Crear instancia de axios con configuración base
const httpRequest = axios.create({
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente
httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error en petición HTTP:', error);
    
    // Manejar errores específicos
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error configurando la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export { httpRequest };
