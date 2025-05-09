// src/shared/lib/logoutUser.ts

import axiosInstance from "./axiosInstance";
import { clearCurrentUser } from "./userStore";

export function logoutUser() {
  document.cookie = "accessToken=; path=/; max-age=0";
  delete axiosInstance.defaults.headers.common["Authorization"];
  clearCurrentUser();
  window.location.reload(); // 필요시 router.replace("/")도 가능
}
