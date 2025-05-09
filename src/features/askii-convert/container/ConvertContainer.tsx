import { useEffect, useState } from "react";

import { currentUser } from "@/shared/lib";

import { ConvertedImagePreview } from "../components/ConvertedImagePreview";
import { ProgressBar } from "../components/ProgressBar";
import { UploadForm } from "../components/UploadForm";
import { useSocket } from "../hooks/useSocket";
import { fetchAsciiResult } from "../services/convertApi";

export function ConvertContainer() {
  const [requestId, setRequestId] = useState<string | null>(null);
  const [txtUrl, setTxtUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "converting" | "success" | "error"
  >("idle");
  const [percent, setPercent] = useState(0);

  useSocket({ userId: currentUser?.publicId, onAsciiComplete: handleAscii });
  useEffect(() => {
    if (!requestId) return;
    fetchAsciiResult(requestId).then(setTxtUrl);
  }, [requestId]);

  return (
    <div>
      <UploadForm setRequestId={setRequestId} setStatus={setStatus} />
      <ProgressBar percent={percent} />
      <ConvertedImagePreview txtUrl={txtUrl} />
    </div>
  );
}
