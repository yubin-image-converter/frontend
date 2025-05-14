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
  const [targetPercent, setTargetPercent] = useState(0);
  const [requestId, setRequestId] = useState("");

  const currentUser = getCurrentUser();
  const userId = currentUser?.publicId ?? "";

  // ✅ 1. handleAsciiComplete에서 fetchAsciiResult 호출
  const handleAsciiComplete = useCallback(
    (_msg: any) => {
      console.log("🎉 ASCII 변환 완료 후처리");
      fetchAsciiResult(requestId).then((url) => {
        if (url) setTxtUrl(url);
        setStatus("success");
      });
    },
    [requestId],
  );

  // ✅ 2. handleProgressUpdate는 그대로 진행률 갱신만 담당
  const handleProgressUpdate = useCallback((p: number) => {
    console.log("✅ progress 수신:", p);
    setTargetPercent(p); // ← 바로바로 퍼센트 반영
  }, []);

  // 부드럽게 percent를 targetPercent까지 올려주는 로직
  useEffect(() => {
    const id = setInterval(() => {
      setPercent((prev) => {
        const next = Math.min(prev + 2, targetPercent);
        if (next >= targetPercent) clearInterval(id);
        return next;
      });
    }, 20);
    return () => clearInterval(id);
  }, [targetPercent]);

  const handleConvert = async (file: File) => {
    try {
      setStatus("uploading");
      setPercent(0);
      setTargetPercent(0);
      const { requestId } = await convertApi(file, "jpg");
      setRequestId(requestId);
      setStatus("converting");
    } catch (err) {
      console.error("변환 실패:", err);
      setStatus("error");
    }
  };

  // useEffect(() => {
  //   if (!requestId) return;
  //   fetchAsciiResult(requestId).then((url) => {
  //     if (url) setTxtUrl(url);
  //     setStatus("success");
  //   });
  // }, [requestId]);

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
          onReset={() => {
            setStatus("idle");
            setTxtUrl(null);
          }}
        />
      </div>
    </main>
  );
}
