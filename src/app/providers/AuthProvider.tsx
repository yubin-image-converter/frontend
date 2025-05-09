// src/app/providers/AuthProvider.tsx

import { ReactNode, useEffect, useState } from "react";

import { useTypewriterLoop } from "@/shared/hooks/useTypewriterLoop"; // ✅ 추가
import axiosInstance from "@/shared/lib/axiosInstance";
import { setCurrentUser } from "@/shared/lib/userStore";
import { GoogleUser } from "@/types/User";
import { getCookie } from "@/utils/getCookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const message = useTypewriterLoop("Loading user info...", 80, 2000); // ✅ 반복 메시지

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<GoogleUser>("/users/me");
        setCurrentUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-sm text-green-400">
        <span>{message}</span>
      </div>
    );
  }

  return <>{children}</>;
}
