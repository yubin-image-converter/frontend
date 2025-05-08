import { useEffect } from "react";

interface UseAsciiSocketProps {
  requestId: string;
  onComplete: (url: string) => void;
}

export function useAsciiSocket({ requestId, onComplete }: UseAsciiSocketProps) {
  useEffect(() => {
    if (!requestId) return;

    const socket = new WebSocket("ws://localhost:3001/ascii");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "ascii_complete" && data.requestId === requestId) {
          onComplete(data.txtUrl);
        }
      } catch (err) {
        console.error("WebSocket parsing error", err);
      }
    };

    return () => {
      socket.close();
    };
  }, [requestId, onComplete]);
}
