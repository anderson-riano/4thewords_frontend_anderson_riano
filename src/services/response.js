export const handleResponse = (response) => {
    return {
      success: response.data.success,
      message: response.data.message || "Operación realizada con éxito",
      data: response.data.data || [],
    };
  };
  
  export const handleError = (error) => {
    console.error("API Error:", error);
  
    let message = "Error desconocido";
    let statusCode = error.response?.status || 500;
  
    if (error.response) {
      message = error.response.data?.message || `Error ${statusCode}`;
    } else if (error.request) {
      message = "No hay respuesta del servidor";
    } else {
      message = "Error al configurar la solicitud";
    }
  
    return {
      success: false,
      statusCode,
      message,
      data: [],
    };
  };
  