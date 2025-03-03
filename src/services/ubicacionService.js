import request from "./request";

const ubicacionService = {
  getProvincias: async () => {
    const response = await request.get("provincias");
    return response.data;
  },
  getCantones: async (provincia_id) => {
    const response = await request.get(`cantones/${provincia_id}`);
    return response.data;
  },
  getDistritos: async (canton_id) => {
    const response = await request.get(`distritos/${canton_id}`);
    return response.data;
  },
};

export default ubicacionService;
