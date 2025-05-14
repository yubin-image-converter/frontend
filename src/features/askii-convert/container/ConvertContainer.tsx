import { useState } from "react";

import { AuthModal } from "@/features/auth/AuthModal";
import { logoutUser } from "@/shared/lib/logoutUser";
import { getCurrentUser } from "@/shared/lib/userStore";

import { ConvertedImagePreview, UploadForm, WorkerPanel } from "../components";
import { AsciiLoadingPanel } from "../components/AsciiLoadingPanel";
import { Format } from "../types";

interface Props {
  txtUrl: string | null;
  handleConvert: (file: File, format: Format) => void;
  status: "idle" | "uploading" | "converting" | "success" | "error";
  onReset: () => void;
  percent: number;
}

export function ConvertContainer({
  txtUrl,
  handleConvert,
  status,
  onReset,
  percent,
}: Props) {
  const currentUser = getCurrentUser();
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
          status={status}
          onReset={onReset}
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
          <AsciiLoadingPanel status={status} percent={percent} />
          <WorkerPanel />
        </>
      )}
    </div>
  );
}
