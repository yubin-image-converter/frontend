// src/hooks/useSocket.ts
import { currentUser } from "@/lib/userStore";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
}

// export function useSocket({
//   setPercent,
//   setStatus,
//   setConvertedImageUrl,
// }: UseSocketOptions) {
//   useEffect(() => {
//     if (!currentUser?.publicId) return;

//     const socket: Socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
//       auth: {
//         userId: currentUser.publicId,
//       },
//     });

//     socket.on("connect", () => {
//       console.log("connected:", socket.id);
//     });

//     socket.on("convert_progress", (data) => {
//       setPercent(data.percent);
//       setStatus("converting");
//     });

//     socket.on("convert_done", (data) => {
//       setStatus("success");
//       setConvertedImageUrl(data.url);
//     });

//     socket.on("convert_error", () => {
//       setStatus("error");
//     });

//     socket.on("ascii_complete", (msg) => {
//       console.log("✅ ASCII 변환 완료 메시지 수신:", msg);
//       // msg.txtUrl로 화면에 결과 반영
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [currentUser?.publicId]);
// }

export function useSocket({
  userId,
  onAsciiComplete,
}: {
  userId?: string; // optional!
  onAsciiComplete?: (msg: any) => void;
}) {
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io("http://localhost:4000", {
      path: "/socket.io",
      auth: { userId },
    });

    console.log("✅ Socket connected for", userId);

    socket.on("connect_error", (err) => {
      console.error("❌ 연결 실패:", err.message);
    });

    if (onAsciiComplete) {
      socket.on("ascii_complete", onAsciiComplete);
    }

    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, [userId, onAsciiComplete]);
}
