import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

import { fetchConvertResult } from "../services/fetchResult";

export function useSocket({
  userId,
  onAsciiComplete,
  setTxtUrl,
  setStatus,
}: {
  userId?: string;
  onAsciiComplete?: (msg: any) => void;
  setTxtUrl: (url: string) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
}) {
  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:4000", {
      path: "/socket.io",
      auth: { userId },
    });

    console.log("✅ Socket connected for", userId);

    socket.on("connect_error", (err) => {
      console.error("❌ 연결 실패:", err.message);
    });

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

    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, [userId]);
}
