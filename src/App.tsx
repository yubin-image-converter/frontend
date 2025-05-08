import "./App.css";

import { useEffect, useState } from "react";

import { AuthButton } from "./components/auth/AuthButton";
import { ProgressBar } from "./components/progress/ProgressBar";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { StatusMessage } from "./components/StatusMessage";
import { UploadForm } from "./components/upload/UploadForm";
import { useSocket } from "./hooks/useSocket";
import axiosInstance from "./lib/axiosInstance";
import { setCurrentUser } from "./lib/userStore";
import { GoogleUser } from "./types/User";
import { getCookie } from "./utils/getCookie";
function App() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "converting" | "success" | "error"
  >("idle");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<GoogleUser>("/users/me");
        setUser(res.data);
        setCurrentUser(res.data); // 전역 저장
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  useSocket({ setPercent, setStatus, setConvertedImageUrl });
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <ResponsiveLayout
        left={<AuthButton />}
        right={
          <UploadForm
            setPercent={setPercent}
            setStatus={setStatus}
            setConvertedImageUrl={setConvertedImageUrl}
            percent={percent}
            status={status}
          />
        }
      />
    </div>
  );
}

export default App;
