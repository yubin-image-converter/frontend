import { useState } from "react";

import { AuthModal } from "@/features/auth/AuthModal";
import { logoutUser } from "@/shared/lib/logoutUser";
import { getCurrentUser } from "@/shared/lib/userStore";

import {
  ConvertedImagePreview,
  ProgressBar,
  StatusMessage,
  UploadForm,
  WorkerPanel,
} from "../components";
import { Format } from "../types";

interface Props {
  txtUrl: string | null;
  setTxtUrl: (url: string) => void;
  status: "idle" | "converting" | "success" | "error";
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  percent: number;
  setPercent: (p: number) => void;
  handleConvert: (file: File, format: Format) => Promise<void>;
}

export function ConvertContainer({
  txtUrl,
  setTxtUrl,
  status,
  setStatus,
  percent,
  setPercent,
  handleConvert,
}: Props) {
  const currentUser = getCurrentUser();
  const userId = currentUser?.publicId ?? "";
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 px-4 transition-all duration-300">
      {/* 업로드 & 결과 패널 */}
      <div
        className={`mx-auto flex max-w-none flex-col items-center gap-6 transition-all duration-500 md:flex-row ${
          txtUrl ? "md:items-start md:justify-between" : "md:justify-center"
        }`}
      >
        <UploadForm
          onConvert={handleConvert}
          onRequestLogin={() => setAuthOpen(true)}
        />
        {txtUrl && (
          <div className="w-full min-w-0 max-w-[768px] flex-1">
            <ConvertedImagePreview txtUrl={txtUrl} />
          </div>
        )}
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
