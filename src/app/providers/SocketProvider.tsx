import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SocketContext } from "@/shared/contexts/SocketContext";
import { userAtom } from "@/shared/store/userAtom";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (!user?.publicId) return;

    console.log("🟡 Connecting socket for user:", user.publicId);

    const socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      transports: ["websocket"],
      auth: { userId: user.publicId }, // ✅ 수정된 부분
    });

    socketInstance.on("connect", () => {
      console.log("🟢 WebSocket connected:", socketInstance.id);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("❌ WebSocket connect error:", err);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🔌 Disconnecting socket");
      socketInstance.disconnect();
    };
  }, [user?.publicId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
