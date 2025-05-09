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

    const socket: Socket = io("http://localhost:4000", {
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
  }, [userId, onAsciiComplete, setTxtUrl, setStatus]);
}
// // src/hooks/useSocket.ts
// import { useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// // interface UseSocketOptions {
// //   setPercent: (n: number) => void;
// //   setStatus: (status: "idle" | "converting" | "success" | "error") => void;
// //   setConvertedImageUrl: (url: string) => void;
// // }

// // export function useSocket({
// //   setPercent,
// //   setStatus,
// //   setConvertedImageUrl,
// // }: UseSocketOptions) {
// //   useEffect(() => {
// //     if (!currentUser?.publicId) return;

// //     const socket: Socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
// //       auth: {
// //         userId: currentUser.publicId,
// //       },
// //     });

// //     socket.on("connect", () => {
// //       console.log("connected:", socket.id);
// //     });

// //     socket.on("convert_progress", (data) => {
// //       setPercent(data.percent);
// //       setStatus("converting");
// //     });

// //     socket.on("convert_done", (data) => {
// //       setStatus("success");
// //       setConvertedImageUrl(data.url);
// //     });

// //     socket.on("convert_error", () => {
// //       setStatus("error");
// //     });

// //     socket.on("ascii_complete", (msg) => {
// //       console.log("✅ ASCII 변환 완료 메시지 수신:", msg);
// //       // msg.txtUrl로 화면에 결과 반영
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [currentUser?.publicId]);
// // }

// export function useSocket({
//   userId,
//   onAsciiComplete,
// }: {
//   userId?: string; // optional!
//   onAsciiComplete?: (msg: any) => void;
// }) {
//   useEffect(() => {
//     if (!userId) return;

//     const socket: Socket = io("http://localhost:4000", {
//       path: "/socket.io",
//       auth: { userId },
//     });

//     console.log("✅ Socket connected for", userId);

//     socket.on("connect_error", (err) => {
//       console.error("❌ 연결 실패:", err.message);
//     });

//     socket.on("ascii_complete", async (msg) => {
//       console.log("✅ ASCII 완료 메시지 수신:", msg);

//       const requestId = msg.requestId;
//       if (!requestId) return;

//       const res = await fetch(`/converts/result?requestId=${requestId}`);
//       const data = await res.json();

//       if (res.ok) {
//         setTxtUrl(data.txtUrl); // ✅ 최종 URL 설정
//         setStatus("success");
//       } else {
//         setStatus("error");
//         toast.error(data.message ?? "결과 조회 실패");
//       }
//     });

//     if (onAsciiComplete) {
//       socket.on("ascii_complete", onAsciiComplete);
//     }

//     return () => {
//       socket.disconnect();
//       console.log("❌ Socket disconnected");
//     };
//   }, [userId, onAsciiComplete]);
// }
