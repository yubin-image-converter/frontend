import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { GoogleUser } from "../types/User";
import { Button } from "@/components/ui/button.tsx";

export function GoogleLoginButton() {
  const [user, setUser] = useState<GoogleUser | null>(null);

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

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <UserCircle className="text-muted-foreground h-16 w-16" />
        <p className="text-sm font-medium text-center">{user.name}</p>
        <p className="text-xs text-muted-foreground text-center">
          {user.email}
        </p>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded px-4 py-2 text-white"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={(res) => {
        const token = res.credential;
        if (token) {
          const decoded: any = jwtDecode(token);
          const userData: GoogleUser = {
            name: decoded.name,
            email: decoded.email,
            picture: "", // 사용 안함
          };
          setUser(userData);
          localStorage.setItem("googleUser", JSON.stringify(userData));
        }
      }}
      onError={() => {
        console.error("로그인 실패");
      }}
    />
  );
}
