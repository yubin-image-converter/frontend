import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { useTypewriterLoop } from "@/shared/hooks";

interface Worker {
  id: string;
  status: "idle" | "converting" | "error";
}

export function WorkerPanel() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const message = useTypewriterLoop(
    "Waiting for worker connection...",
    80,
    2000,
  );

  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("워커 패널 소켓 연결됨:", socket.id);
    });

    socket.on(
      "worker_status",
      (data: { workerId: string; status: Worker["status"] }) => {
        setWorkers((prev) => {
          const others = prev.filter((w) => w.id !== data.workerId);
          return [...others, { id: data.workerId, status: data.status }];
        });
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full rounded border border-green-500 bg-black p-8 font-mono text-base text-green-300">
      <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-green-400">
        [ Worker Status Panel ]
      </h3>
      {workers.length === 0 ? (
        <p className="italic text-green-600">{message}</p>
      ) : (
        <div className="max-h-60 overflow-y-auto pr-2">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="mb-2 flex justify-between whitespace-nowrap border-b border-green-700 pb-1"
            >
              <span className="w-44 truncate">{worker.id}</span>
              <span
                className={`font-bold ${
                  worker.status === "idle"
                    ? "text-green-400"
                    : worker.status === "converting"
                      ? "text-yellow-300"
                      : "text-red-400"
                }`}
              >
                {worker.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
