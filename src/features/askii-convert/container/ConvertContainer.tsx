// src/features/askii-convert/container/ConvertContainer.tsx
import { useEffect, useState } from "react";
import {
  UploadForm,
  ProgressBar,
  StatusMessage,
  ConvertedImagePreview,
  WorkerPanel,
  Format,
} from "../components";
import { fetchAsciiResult } from "../services/convertApi";
import { convertImage } from "@/shared/lib/convertImage";
import { useSocket } from "../hooks/useSocket";
import { getCurrentUser } from "@/shared/lib/userStore";

export function ConvertContainer() {
  const [requestId, setRequestId] = useState<string>("");
  const [txtUrl, setTxtUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "converting" | "success" | "error"
  >("idle");
  const [percent, setPercent] = useState<number>(0);
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

  useEffect(() => {
    if (!requestId) return;
    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
    });
  }, [requestId]);

  return (
    <div className="flex flex-col gap-6">
      <UploadForm
        onConvert={handleConvert}
        disabled={status === "converting"}
      />

      {status !== "idle" && (
        <>
          <ProgressBar percent={percent} />
          <StatusMessage status={status} />
          <WorkerPanel />
        </>
      )}

      {txtUrl && <ConvertedImagePreview txtUrl={txtUrl} />}
    </div>
  );
}
