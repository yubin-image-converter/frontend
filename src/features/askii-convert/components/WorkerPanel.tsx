import { useEffect, useState } from "react";

import { useTypewriterLoop } from "@/shared/hooks";
import { useSocketContext } from "@/shared/hooks/useSocketContext";

interface Worker {
  id: string;
  status: "idle" | "converting" | "error";
}

export function WorkerPanel() {
  const { socket } = useSocketContext();
  const [, setStatusMap] = useState<Record<string, string>>({});
  const [workers] = useState<Worker[]>([]);
  const message = useTypewriterLoop(
    "Waiting for worker connection...",
    80,
    2000,
  );

  useEffect(() => {
    if (!socket) return;

    const handleStatus = (data: Record<string, string>) => {
      setStatusMap(data);
    };

    socket.on("worker_status", handleStatus);

    return () => {
      socket.off("worker_status", handleStatus);
    };
  }, [socket]);

  const renderTerminalLogs = () => {
    if (workers.length === 0) {
      return [`$ ascii_worker --standby`, `>> ${message}`];
    }

    const active = workers.filter((w) => w.status === "converting").length;
    const errored = workers.filter((w) => w.status === "error").length;

    const logs: string[] = [`$ ascii_worker --status`];

    if (active > 0) logs.push(`>> ${active} worker(s) converting...`);
    if (errored > 0) logs.push(`>> ${errored} worker(s) failed.`);
    if (active === 0 && errored === 0)
      logs.push(">> All workers are standing by.");

    return logs;
  };

  return (
    <div className="w-full rounded border border-green-500 bg-black p-6 font-mono text-base text-green-300">
      <h3 className="mb-3 text-lg font-bold uppercase tracking-wider text-green-400">
        [ Worker Status Panel ]
      </h3>

      {/* 터미널 스타일 로그 출력 */}
      <div className="mb-4 whitespace-pre-line text-sm leading-relaxed text-green-400">
        {renderTerminalLogs().map((line, i) => (
          <div key={i} className="animate-fadeIn">
            {line}
          </div>
        ))}
      </div>

      {/* 워커 리스트 */}
      {workers.length > 0 && (
        <div className="max-h-60 overflow-y-auto pr-2">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="mb-2 flex justify-between border-b border-green-700 pb-1 text-sm"
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
