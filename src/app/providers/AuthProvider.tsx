// src/app/providers/AuthProvider.tsx

import { ReactNode, useEffect, useState } from "react";
import { useSetAtom } from "jotai";

import { useTypewriterLoop } from "@/shared/hooks/useTypewriterLoop";
import axiosInstance from "@/shared/lib/axiosInstance";
import { GoogleUser } from "@/types/User";
import { getCookie } from "@/utils/getCookie";
import { userAtom } from "@/shared/store/userAtom";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useSetAtom(userAtom);

  const message = useTypewriterLoop("Loading...", 80, 2000);

  useEffect(() => {
    // 1️⃣ accessToken URL에서 추출 → 쿠키 저장 → URL 정리
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenFromUrl = urlParams.get("accessToken");

    if (accessTokenFromUrl) {
      document.cookie = `accessToken=${accessTokenFromUrl}; path=/; max-age=3600`;
      localStorage.setItem("accessToken", accessTokenFromUrl);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // 2️⃣ token 확인 (URL 또는 쿠키)
    const token = accessTokenFromUrl || getCookie("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<GoogleUser>("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-sm text-green-400">
        <span>{message}</span>
      </div>
    );
  }

  return <>{children}</>;
}
