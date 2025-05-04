// src/pages/oauth/OAuthCallback.tsx

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "@/lib/axiosInstance";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    }

    // 메인 페이지로 리디렉션
    navigate("/", { replace: true });
  }, [location.search, navigate]);

  return <p className="text-center text-muted-foreground">로그인 처리 중...</p>;
}
