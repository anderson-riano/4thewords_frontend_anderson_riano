import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
});

export const createCancelToken = () => {
  return axios.CancelToken.source();
};

export default api;
