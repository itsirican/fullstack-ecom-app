import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://fullstack-ecom-app-1.onrender.com`,
});

export default axiosInstance;
