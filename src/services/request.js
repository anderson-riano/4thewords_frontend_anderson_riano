import api from "./api";
import { handleResponse, handleError } from "./response";

const request = {
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default request;
