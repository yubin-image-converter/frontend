import { useEffect, useState } from "react";

import { AuthModal } from "@/features/auth/AuthModal";
import {
  ConvertedImagePreview,
  ProgressBar,
  StatusMessage,
  UploadForm,
  WorkerPanel,
} from "../components";
import { convertImage } from "@/shared/lib/convertImage";
import { logoutUser } from "@/shared/lib/logoutUser";
import { getCurrentUser } from "@/shared/lib/userStore";
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
  const [authOpen, setAuthOpen] = useState(false);

  const currentUser = getCurrentUser();
  const userId = currentUser?.publicId ?? "";

  useSocket({ userId, setTxtUrl, setStatus });

  const handleConvert = async (file: File, format: Format) => {
    try {
      setStatus("converting");
      setPercent(0);
      const { requestId } = await convertImage(file, format);
      setRequestId(requestId);
    } catch (err) {
      console.error("변환 실패:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!requestId) return;
    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
    });
  }, [requestId]);

  return (
    <div className="flex flex-col gap-6">
      {/* 업로드 & 결과 나란히 */}
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <UploadForm
          onConvert={handleConvert}
          onRequestLogin={() => setAuthOpen(true)}
        />
        {txtUrl && <ConvertedImagePreview txtUrl={txtUrl} />}
      </div>

      {/* 로그인 모달 */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        user={currentUser}
        onLogout={logoutUser}
      />

      {/* 진행 상태 */}
      {status !== "idle" && (
        <>
          <ProgressBar percent={percent} />
          <StatusMessage status={status} />
          <WorkerPanel />
        </>
      )}
    </div>
  );
}
