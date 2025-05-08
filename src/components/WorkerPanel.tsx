import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Worker {
  id: string;
  status: "idle" | "converting" | "error";
}

export function WorkerPanel() {
  const [workers, setWorkers] = useState<Worker[]>([]);

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
    <div className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-4 font-mono text-sm text-gray-300 shadow md:w-1/4">
      <h3 className="mb-2 text-gray-400">[ 워커 상태 패널 ]</h3>
      {workers.length === 0 ? (
        <p className="text-gray-500">워커 연결 대기 중...</p>
      ) : (
        workers.map((worker) => (
          <p key={worker.id} className="mb-1">
            {worker.id.padEnd(10)}{" "}
            <span
              className={`${
                worker.status === "idle"
                  ? "text-green-400"
                  : worker.status === "converting"
                    ? "text-blue-400"
                    : "text-red-400"
              }`}
            >
              {worker.status}
            </span>
          </p>
        ))
      )}
    </div>
  );
}
