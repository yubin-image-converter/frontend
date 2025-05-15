import { useSetAtom } from "jotai";
import { ReactNode, useEffect, useState } from "react";

import { useTypewriterLoop } from "@/shared/hooks/useTypewriterLoop";
import axiosInstance from "@/shared/lib/axiosInstance";
import { userAtom } from "@/shared/store/userAtom";
import { GoogleUser } from "@/types/User";
import { getCookie } from "@/utils/getCookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useSetAtom(userAtom);

  const message = useTypewriterLoop("Loading...", 80, 2000);

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
