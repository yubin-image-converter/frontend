import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { getCookie } from "@/utils/getCookie";

interface GoogleUser {
  name: string;
  email: string;
  publicId: string;
  provider: string;
}

export function AuthButton() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    // AuthButton.tsx - useEffect 안
    if (accessToken) {
      // 쿠키에 저장 (1시간 유효)
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`;

      // URL 정리
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
        localStorage.removeItem("accessToken");
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_AUTHENTICATION_SERVER_URL +
      "/auth/signin?provider=google";
  };

  const handleLogout = async () => {
    // 쿠키 제거 (expires로 무효화)
    document.cookie = "accessToken=; path=/; max-age=0";

    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <UserCircle className="h-16 w-16 text-muted-foreground" />
        <p className="text-center text-sm font-medium">{user.name}</p>
        <p className="text-center text-xs text-muted-foreground">
          {user.email}
        </p>
        <Button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
    >
      <UserCircle className="h-5 w-5" />
      Google 로그인
    </Button>
  );
}
