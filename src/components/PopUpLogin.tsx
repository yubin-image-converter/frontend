// src/components/PopupLogin.tsx
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { GoogleUser } from "../types/User";

export function PopupLogin() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("googleUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    setUser(null);
  };

  // 팝업 모드: code 만 받고 state 는 직접 관리해야 합니다.
  const loginWithCode = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (res: any) => {
      const code = (res as any).code as string;
      try {
        const { data: userInfo } = await axios.get<GoogleUser>(
          "http://localhost:8080/api/users/oauth/callback",
          { params: { provider: "google", code } },
        );
        setUser(userInfo);
        localStorage.setItem("googleUser", JSON.stringify(userInfo));
      } catch (err) {
        console.error("백엔드 로그인 실패", err);
      }
    },
    onError: () => {
      console.error("Google 팝업 로그인 실패");
    },
  });

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <UserCircle className="h-16 w-16 text-muted-foreground" />
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => loginWithCode()}
      className="bg-blue-500 hover:bg-blue-600"
    >
      <UserCircle className="mr-2 h-5 w-5" /> Google 로그인
    </Button>
  );
}
