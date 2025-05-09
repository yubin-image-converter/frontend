import { useEffect, useState } from "react";

import { AuthModal } from "@/features/auth/AuthModal"; // ✅ default import일 경우
import axiosInstance from "@/shared/lib/axiosInstance";
import { convertImage } from "@/shared/lib/convertImage";
import {
  clearCurrentUser,
  getCurrentUser,
  setCurrentUser,
} from "@/shared/lib/userStore";

import {
  ConvertedImagePreview,
  ProgressBar,
  StatusMessage,
  UploadForm,
  WorkerPanel,
} from "../components";
import { useSocket } from "../hooks/useSocket";
import { fetchAsciiResult } from "../services/convertApi";
import { Format } from "../types";

export function ConvertContainer() {
  const [requestId, setRequestId] = useState("");
  const [txtUrl, setTxtUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "converting" | "success" | "error"
  >("idle");
  const [percent, setPercent] = useState(0);
  const [authOpen, setAuthOpen] = useState(false); // ✅ auth modal state

  const userId = getCurrentUser()?.publicId ?? "";

  useSocket({
    userId,
    onAsciiComplete: (msg) => {
      console.log("✅ ASCII 완료:", msg);
      setTxtUrl(msg.txtUrl);
      setStatus("success");
    },
  });

  const handleConvert = async (file: File, format: Format) => {
    try {
      setStatus("converting");
      setPercent(0);
      const { requestId } = await convertImage(file, format);
      setRequestId(requestId);
    } catch (err) {
      setStatus("error");
      console.error("변환 실패:", err);
    }
  };

  const currentUser = getCurrentUser();

  // const handleLogout = () => {
  //   document.cookie = "accessToken=; path=/; max-age=0";
  //   setAuthOpen(false);
  //   window.location.reload(); // 또는 setUser(null)
  // };
  // ConvertContainer.tsx 내부에서

  const handleLogout = () => {
    // 1. 쿠키 제거
    document.cookie = "accessToken=; path=/; max-age=0";

    // 2. axios 헤더 제거
    delete axiosInstance.defaults.headers.common["Authorization"];

    // 3. 전역 상태 초기화
    clearCurrentUser();

    // 4. 새로고침 (선택적으로 리렌더용 상태 초기화도 가능)
    window.location.reload();
  };

  useEffect(() => {
    if (!requestId) return;
    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
    });
  }, [requestId]);

  return (
    <div className="flex flex-col gap-6">
      {/* 업로드 영역 */}
      <UploadForm
        onConvert={handleConvert}
        onRequestLogin={() => setAuthOpen(true)}
      />

      {/* 로그인 모달 */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* 진행률 / 상태 메시지 */}
      {status !== "idle" && (
        <>
          <ProgressBar percent={percent} />
          <StatusMessage status={status} />
          <WorkerPanel />
        </>
      )}

      {/* 결과 ASCII */}
      {txtUrl && <ConvertedImagePreview txtUrl={txtUrl} />}
    </div>
  );
}
