import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL + "/api",
  withCredentials: false,
});

// 앱 시작 시 localStorage에서 토큰 불러오기
const token = localStorage.getItem("accessToken");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
