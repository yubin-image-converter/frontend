import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // 공통 prefix
  withCredentials: true, // 쿠키 포함 필수!
});

export default axiosInstance;
