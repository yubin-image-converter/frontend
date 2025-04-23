import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";

interface GoogleUser {
  name: string;
  email: string;
  publicId: string;
  provider: string;
}

export function AuthButton() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
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
    await axiosInstance.get("/auth/logout");
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
