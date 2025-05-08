import "./App.css";

import { useEffect, useState } from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useSocket } from "./hooks/useSocket";
import axiosInstance from "./lib/axiosInstance";
import { setCurrentUser } from "./lib/userStore";
import { getCookie } from "./lib/utils/getCookie";
import { GoogleUser } from "./types/User";

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
    <div className="flex min-h-screen flex-col bg-black font-mono text-gray-100">
      <Header />
      <Main
        percent={percent}
        status={status}
        setPercent={setPercent}
        setStatus={setStatus}
        setConvertedImageUrl={setConvertedImageUrl}
      />
      <Footer />
    </div>
  );
}

export default App;
