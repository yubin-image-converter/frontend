import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL + "/api", // 공통 prefix
  withCredentials: true, // 쿠키 포함 필수!
});

export default axiosInstance;
