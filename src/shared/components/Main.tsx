import { useCallback, useEffect, useState } from "react";

import { ConvertContainer } from "@/features/askii-convert/container/ConvertContainer";
import { useSocket } from "@/features/askii-convert/hooks/useSocket";
import { fetchAsciiResult } from "@/features/askii-convert/services/convertApi";
import { getCurrentUser } from "@/shared/lib/userStore";

import { convertApi } from "../lib";

export function Main() {
  const [txtUrl, setTxtUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "converting" | "success" | "error"
  >("idle");
  const [percent, setPercent] = useState(0);
  const [requestId, setRequestId] = useState("");

  const currentUser = getCurrentUser();
  const userId = currentUser?.publicId ?? "";

  console.log(userId);
  const handleAsciiComplete = useCallback((_msg: any) => {
    console.log("🎉 ASCII 변환 완료 후처리");
  }, []);

  const handleProgressUpdate = useCallback((p: number) => {
    console.log("✅ 실제 상태 갱신 중:", p);
    setPercent(p);
  }, []);

  const handleConvert = async (file: File) => {
    try {
      setStatus("uploading");
      setPercent(0);
      const { requestId } = await convertApi(file, "jpg");
      setRequestId(requestId);
      setStatus("converting");
    } catch (err) {
      console.error("변환 실패:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!requestId) return;
    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
      setStatus("success");
    });
  }, [requestId]);

  useSocket({
    userId,
    onAsciiComplete: handleAsciiComplete,
    onProgressUpdate: handleProgressUpdate,
    setTxtUrl,
    setStatus,
  });

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <ConvertContainer
          txtUrl={txtUrl}
          status={status}
          percent={percent}
          handleConvert={handleConvert}
        />
      </div>
    </main>
  );
}
