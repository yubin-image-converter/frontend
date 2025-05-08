// src/hooks/useSocket.ts
import { currentUser } from "@/lib/userStore";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
}

export function useSocket({
  setPercent,
  setStatus,
  setConvertedImageUrl,
}: UseSocketOptions) {
  useEffect(() => {
    if (!currentUser?.publicId) return;

    const socket: Socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      auth: {
        userId: currentUser.publicId,
      },
    });

    socket.on("connect", () => {
      console.log("connected:", socket.id);
    });

    socket.on("convert_progress", (data) => {
      setPercent(data.percent);
      setStatus("converting");
    });

    socket.on("convert_done", (data) => {
      setStatus("success");
      setConvertedImageUrl(data.url);
    });

    socket.on("convert_error", () => {
      setStatus("error");
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser?.publicId]);
}
