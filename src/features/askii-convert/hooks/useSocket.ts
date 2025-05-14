import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

import { fetchConvertResult } from "../services/fetchResult";

export function useSocket({
  userId,
  onAsciiComplete,
  onProgressUpdate,
  setTxtUrl,
  setStatus,
}: {
  userId?: string;
  onAsciiComplete?: (msg: any) => void;
  onProgressUpdate?: (progress: number) => void; // 🔥 추가!
  setTxtUrl: (url: string) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
}) {
  useEffect(() => {
    if (!userId) return;

    const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      path: "/socket.io",
      auth: { userId },
    });

    console.log("✅ Socket connected for", userId);

    socket.onAny((event, ...args) => {
      console.log("📡 수신된 소켓 이벤트:", event, args);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ 연결 실패:", err.message);
    });

    // ✅ ASCII 완료 메시지 수신
    socket.on("ascii_complete", async (msg) => {
      console.log("✅ ASCII 완료 메시지 수신:", msg);

      const requestId = msg.requestId;
      if (!requestId) return;

      try {
        const data = await fetchConvertResult(requestId);
        setTxtUrl(data.txtUrl);
        setStatus("success");
      } catch (err: any) {
        console.error("❌ 결과 조회 실패", err);
        setStatus("error");
        toast.error("결과 조회에 실패했습니다");
      }

      onAsciiComplete?.(msg);
    });

    // ✅ Progress 메시지 수신
    socket.on("progress_update", (msg) => {
      console.log("📥 수신된 소켓 이벤트: progress_update", msg); // ✅ 찍힘
      console.log("onProgressUpdate = ", onProgressUpdate); // ✅ 여기 찍어서 진짜 함수인지 확인
      onProgressUpdate?.(msg.progress); // 여기서 함수면 호출될 것
    });

    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, [userId, setTxtUrl, setStatus, onAsciiComplete, onProgressUpdate]);
}
