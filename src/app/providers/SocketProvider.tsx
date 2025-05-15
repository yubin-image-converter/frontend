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

    const socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      transports: ["websocket"],
      query: { userId: user.publicId },
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [user?.publicId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
