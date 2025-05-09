import "./App.css";

import { useEffect, useState } from "react";

import { useSocket } from "@/features/askii-convert/hooks/useSocket";
import { Footer, Header, Main } from "@/shared/components";
import { setCurrentUser } from "@/shared/lib";
import axiosInstance from "@/shared/lib/axiosInstance";
import { GoogleUser } from "@/types/User";
import { getCookie } from "@/utils/getCookie";

function App() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "converting" | "success" | "error"
  >("idle");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(
    null,
  );
  const [txtUrl, setTxtUrl] = useState<string | null>(null);

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

  // useSocket({ setPercent, setStatus, setConvertedImageUrl });
  useSocket({
    userId: user?.publicId,
    onAsciiComplete: (msg) => {
      console.log("✅ ASCII complete:", msg);
      setTxtUrl(msg.txtUrl);
    },
  });
  return (
    <div className="flex min-h-screen flex-col bg-black font-mono text-gray-100">
      <Header />
      <Main
        percent={percent}
        status={status}
        setPercent={setPercent}
        setStatus={setStatus}
        setConvertedImageUrl={setConvertedImageUrl}
        txtUrl={txtUrl}
      />
      <Footer />
    </div>
  );
}

export default App;
