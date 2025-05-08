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
    <div className="w-full rounded-lg border border-green-500 bg-black p-6 font-mono text-base text-green-300 shadow-xl md:w-1/2">
      <h3 className="mb-4 text-lg font-bold tracking-wider text-green-400 uppercase">
        [ Worker Status Panel ]
      </h3>

      {workers.length === 0 ? (
        <p className="text-green-600 italic">
          Waiting for worker connection...
        </p>
      ) : (
        <div className="max-h-60 overflow-y-auto pr-2">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="mb-2 flex justify-between border-b border-green-700 pb-1 whitespace-nowrap"
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
