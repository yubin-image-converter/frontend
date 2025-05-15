// src/shared/components/Main.tsx
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { ConvertContainer } from "@/features/askii-convert/container/ConvertContainer";
import { useSocket } from "@/features/askii-convert/hooks/useSocket";
import { fetchAsciiResult } from "@/features/askii-convert/services/convertApi";
import { Format } from "@/features/askii-convert/types";
import {
  percentAtom,
  requestIdAtom,
  statusAtom,
  targetPercentAtom,
  txtUrlAtom,
} from "@/shared/store/convertAtoms";

import { convertApi } from "../lib";
import { userAtom } from "../store/userAtom";

export function Main() {
  const setStatus = useSetAtom(statusAtom);
  const setTxtUrl = useSetAtom(txtUrlAtom);
  const setPercent = useSetAtom(percentAtom);
  const [targetPercent, setTargetPercent] = useAtom(targetPercentAtom);
  const [requestId, setRequestId] = useAtom(requestIdAtom);

  const currentUser = useAtomValue(userAtom);
  const userId = currentUser?.publicId ?? "";

  const handleAsciiComplete = useCallback(() => {
    console.log("🎉 ASCII 변환 완료 후처리");
    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
      setStatus("success");
    });
  }, [requestId, setTxtUrl, setStatus]);

  const handleProgressUpdate = useCallback(
    (p: number) => {
      console.log("✅ progress 수신:", p);
      setTargetPercent(p);
    },
    [setTargetPercent],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPercent((prev) => {
        const next = Math.min(prev + 2, targetPercent);
        if (next >= targetPercent) clearInterval(id);
        return next;
      });
    }, 20);
    return () => clearInterval(id);
  }, [targetPercent, setPercent]);

  const handleConvert = async (file: File, format: Format = "jpg") => {
    try {
      setStatus("uploading");
      setPercent(0);
      setTargetPercent(0);
      const { requestId } = await convertApi(file, format);
      setRequestId(requestId);
      setStatus("converting");
    } catch (err) {
      console.error("변환 실패:", err);
      setStatus("error");
    }
  };

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
        <ConvertContainer handleConvert={handleConvert} />
      </div>
    </main>
  );
}
