// src/app/providers/AuthProvider.tsx

import { ReactNode, useEffect } from "react";

import axiosInstance from "@/shared/lib/axiosInstance";
import { setCurrentUser } from "@/shared/lib/userStore";
import { GoogleUser } from "@/types/User";
import { getCookie } from "@/utils/getCookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<GoogleUser>("/users/me");
        setCurrentUser(res.data); // 전역 저장
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
