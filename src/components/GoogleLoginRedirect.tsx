// src/components/GoogleLoginRedirect.tsx
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { GoogleUser } from "../types/User";

export function GoogleLoginRedirect() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  // 1) 로그인 후 로컬스토리지에서 유저 정보 복원
  useEffect(() => {
    const saved = localStorage.getItem("googleUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    setUser(null);
  };

  // 2) 로그인 시작: Nest.js로 이동
  const startRedirect = () => {
    // 프론트에서는 state 발급 ❌ → Nest에서 처리
    window.location.href = "http://localhost:3000/auth/signin?provider=google";
  };

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
    <Button onClick={startRedirect} className="bg-green-500 hover:bg-green-600">
      <UserCircle className="mr-2 h-5 w-5" /> Google 로그인 (리디렉트)
    </Button>
  );
}
