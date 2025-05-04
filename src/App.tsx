import "./App.css";

import { useEffect } from "react";

import { AuthButton } from "./components/AuthButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";
import axiosInstance from "./lib/axiosInstance";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);

      // axios 기본 헤더 설정
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;

      // URL에서 토큰 제거 (replace로 기록도 없앰)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<AuthButton />} right={<UploadForm />} />
    </div>
  );
}
export default App;
