// src/shared/components/Main.tsx
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { ConvertContainer } from "@/features/askii-convert/container/ConvertContainer";
import { fetchAsciiResult } from "@/features/askii-convert/services/convertApi";
import { Format } from "@/features/askii-convert/types";
import {
  percentAtom,
  requestIdAtom,
  statusAtom,
  targetPercentAtom,
  txtUrlAtom,
} from "@/shared/store/convertAtoms";

import { useSocketContext } from "../hooks/useSocketContext";
import { convertApi } from "../lib";

export function Main() {
  const setStatus = useSetAtom(statusAtom);
  const setTxtUrl = useSetAtom(txtUrlAtom);
  const setPercent = useSetAtom(percentAtom);
  const [targetPercent, setTargetPercent] = useAtom(targetPercentAtom);
  const [, setRequestId] = useAtom(requestIdAtom);

  const { socket } = useSocketContext();

  const handleAsciiComplete = useCallback(
    (payload: { requestId: string }) => {
      const { requestId } = payload;
      console.log("🎉 ASCII 변환 완료 후처리:", requestId);

      setRequestId(requestId);
      fetchAsciiResult(requestId).then((url) => {
        if (url) setTxtUrl(url);
        setStatus("success");
      });
    },
    [setRequestId, setTxtUrl, setStatus],
  );

  const handleProgressUpdate = useCallback(
    (payload: { progress: number }) => {
      console.log("✅ progress 수신:", payload.progress);
      setTargetPercent(payload.progress);
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

  useEffect(() => {
    if (!socket) return;
    // socket.onAny((event, ...args) => {
    //   console.log("📦 any event from server:", event, args);
    // });

    socket.on("ascii_complete", handleAsciiComplete);
    socket.on("progress_update", handleProgressUpdate);

    return () => {
      socket.off("ascii_complete", handleAsciiComplete);
      socket.off("progress_update", handleProgressUpdate);
    };
  }, [socket, handleAsciiComplete, handleProgressUpdate]);

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

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <ConvertContainer handleConvert={handleConvert} />
      </div>
    </main>
  );
}
